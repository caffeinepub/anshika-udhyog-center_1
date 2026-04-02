import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Address {
    city: string;
    district: string;
    state: string;
    fullAddress: string;
    pincode: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface Notice {
    id: bigint;
    noticeType: NoticeType;
    title: string;
    content: string;
    createdAt: bigint;
    publishedBy: Principal;
    isActive: boolean;
}
export interface Branch {
    id: bigint;
    manager: Principal;
    name: string;
    createdAt: bigint;
    memberCount: bigint;
    isActive: boolean;
    district: string;
    state: string;
    address: Address;
}
export interface GalleryItem {
    id: bigint;
    createdAt: bigint;
    isActive: boolean;
    caption: string;
    category: string;
    image: ExternalBlob;
}
export interface UserProfile {
    pan?: string;
    status: string;
    bankDetails?: string;
    name: string;
    role: string;
    aadhaar?: string;
    address?: Address;
    mobile: string;
    registeredAt: bigint;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum NoticeType {
    notice = "notice",
    news = "news"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBranch(name: string, state: string, district: string, address: Address, manager: Principal): Promise<bigint>;
    createNotice(title: string, content: string, noticeType: NoticeType): Promise<bigint>;
    deleteBranch(id: bigint): Promise<void>;
    deleteGalleryItem(id: bigint): Promise<void>;
    deleteNotice(id: bigint): Promise<void>;
    getBranch(id: bigint): Promise<Branch>;
    getBranches(): Promise<Array<Branch>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGallery(): Promise<Array<GalleryItem>>;
    getNotice(id: bigint): Promise<Notice>;
    getNotices(): Promise<Array<Notice>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    updateBranch(id: bigint, name: string, state: string, district: string, address: Address, manager: Principal, memberCount: bigint, isActive: boolean): Promise<void>;
    updateGalleryItem(id: bigint, caption: string, category: string, isActive: boolean): Promise<void>;
    updateNotice(id: bigint, title: string, content: string, noticeType: NoticeType, isActive: boolean): Promise<void>;
    uploadGalleryItem(image: ExternalBlob, caption: string, category: string): Promise<bigint>;
}
