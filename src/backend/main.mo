import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  type Address = {
    fullAddress : Text;
    city : Text;
    district : Text;
    state : Text;
    pincode : Text;
  };

  type GalleryItem = {
    id : Nat;
    image : Storage.ExternalBlob;
    caption : Text;
    category : Text;
    createdAt : Int;
    isActive : Bool;
  };

  type NoticeType = {
    #news;
    #notice;
  };

  type Notice = {
    id : Nat;
    title : Text;
    content : Text;
    noticeType : NoticeType;
    createdAt : Int;
    publishedBy : Principal;
    isActive : Bool;
  };

  type Branch = {
    id : Nat;
    name : Text;
    state : Text;
    district : Text;
    address : Address;
    manager : Principal;
    memberCount : Nat;
    createdAt : Int;
    isActive : Bool;
  };

  public type UserProfile = {
    name : Text;
    mobile : Text;
    role : Text;
    address : ?Address;
    aadhaar : ?Text;
    pan : ?Text;
    bankDetails : ?Text;
    status : Text;
    registeredAt : Int;
  };

  module Branch {
    public func compare(branch1 : Branch, branch2 : Branch) : Order.Order {
      Nat.compare(branch1.id, branch2.id);
    };
  };

  let notices = Map.empty<Nat, Notice>();
  let branches = Map.empty<Nat, Branch>();
  let gallery = Map.empty<Nat, GalleryItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextNoticeId = 0;
  var nextBranchId = 0;
  var nextGalleryId = 0;

  // Mixins
  include MixinStorage();

  // Include prefabricated authentication system for non-public endpoints
  // required by user-approval system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let approvalState = UserApproval.initState(accessControlState);

  // Approval state functions required by instructions
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // User profile management functions (required by instructions)

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or admin can view any profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Branch management

  public shared ({ caller }) func createBranch(name : Text, state : Text, district : Text, address : Address, manager : Principal) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create branches");
    };
    let id = nextBranchId;
    let branch : Branch = {
      id;
      name;
      state;
      district;
      address;
      manager;
      memberCount = 0;
      createdAt = Time.now();
      isActive = true;
    };
    branches.add(id, branch);
    nextBranchId += 1;
    id;
  };

  public shared ({ caller }) func updateBranch(id : Nat, name : Text, state : Text, district : Text, address : Address, manager : Principal, memberCount : Nat, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update branches");
    };
    switch (branches.get(id)) {
      case (null) { Runtime.trap("Branch not found") };
      case (?existingBranch) {
        let updatedBranch : Branch = {
          id;
          name;
          state;
          district;
          address;
          manager;
          memberCount;
          createdAt = existingBranch.createdAt;
          isActive;
        };
        branches.add(id, updatedBranch);
      };
    };
  };

  public shared ({ caller }) func deleteBranch(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete branches");
    };
    branches.remove(id);
  };

  // Gallery management

  public shared ({ caller }) func uploadGalleryItem(image : Storage.ExternalBlob, caption : Text, category : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can upload gallery items");
    };
    let id = nextGalleryId;
    let item : GalleryItem = {
      id;
      image;
      caption;
      category;
      createdAt = Time.now();
      isActive = true;
    };
    gallery.add(id, item);
    nextGalleryId += 1;
    id;
  };

  public shared ({ caller }) func updateGalleryItem(id : Nat, caption : Text, category : Text, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gallery items");
    };
    switch (gallery.get(id)) {
      case (null) { Runtime.trap("Gallery item not found") };
      case (?existingItem) {
        let updatedItem : GalleryItem = {
          id;
          image = existingItem.image;
          caption;
          category;
          createdAt = existingItem.createdAt;
          isActive;
        };
        gallery.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    gallery.remove(id);
  };

  // Notice management

  public shared ({ caller }) func createNotice(title : Text, content : Text, noticeType : NoticeType) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create notices");
    };
    let id = nextNoticeId;
    let notice : Notice = {
      id;
      title;
      content;
      noticeType;
      createdAt = Time.now();
      publishedBy = caller;
      isActive = true;
    };
    notices.add(id, notice);
    nextNoticeId += 1;
    id;
  };

  public shared ({ caller }) func updateNotice(id : Nat, title : Text, content : Text, noticeType : NoticeType, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update notices");
    };
    switch (notices.get(id)) {
      case (null) { Runtime.trap("Notice not found") };
      case (?existingNotice) {
        let updatedNotice : Notice = {
          id;
          title;
          content;
          noticeType;
          createdAt = existingNotice.createdAt;
          publishedBy = existingNotice.publishedBy;
          isActive;
        };
        notices.add(id, updatedNotice);
      };
    };
  };

  public shared ({ caller }) func deleteNotice(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete notices");
    };
    notices.remove(id);
  };

  // Query endpoints - these are public read operations, accessible to all authenticated users

  public query ({ caller }) func getBranches() : async [Branch] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view branches");
    };
    branches.values().toArray().sort();
  };

  public query ({ caller }) func getBranch(id : Nat) : async Branch {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view branch details");
    };
    switch (branches.get(id)) {
      case (null) { Runtime.trap("Branch not found") };
      case (?branch) { branch };
    };
  };

  public query ({ caller }) func getGallery() : async [GalleryItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view gallery");
    };
    gallery.values().toArray();
  };

  public query ({ caller }) func getNotices() : async [Notice] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view notices");
    };
    notices.values().toArray();
  };

  public query ({ caller }) func getNotice(id : Nat) : async Notice {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view notice details");
    };
    switch (notices.get(id)) {
      case (null) { Runtime.trap("Notice not found") };
      case (?notice) { notice };
    };
  };
};
