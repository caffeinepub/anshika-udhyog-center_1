import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MemberDashboard() {
  const { auth, registrations, kyc, orders, wallet, addKYC, logout } = useApp();
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState("");

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAF6EE]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-card">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-[#0B6B3A] mb-2">
            Login Required
          </h2>
          <Button
            onClick={() => navigate({ to: "/login" })}
            className="bg-[#0B6B3A] text-white"
            data-ocid="member.primary_button"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const member = registrations.find((r) => r.mobile === auth.userMobile);
  const memberKYC = kyc.find((k) => k.mobile === auth.userMobile);
  const memberOrders = orders.filter((o) => o.userMobile === auth.userMobile);
  const memberWallet = wallet?.[auth.userMobile] || {
    balance: 0,
    transactions: [],
  };

  const handleKYCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addKYC({
      mobile: auth.userMobile,
      userName: auth.userName,
      aadhaarDoc: "aadhaar_uploaded.pdf",
      panDoc: "pan_uploaded.pdf",
      bankDoc: "bank_uploaded.pdf",
      status: "pending",
    });
    toast.success("KYC documents submitted!");
  };

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount);
    if (!amount || amount > memberWallet.balance) {
      toast.error("Invalid withdrawal amount");
      return;
    }
    toast.success(`Withdrawal request of \u20b9${amount} submitted!`);
    setWithdrawAmount("");
  };

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome bar */}
        <div className="bg-[#0B6B3A] text-white rounded-2xl p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome, {auth.userName}! 👋</h1>
            <p className="text-green-100 text-sm">
              {auth.userRole} | {auth.userMobile}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="border-white text-white hover:bg-white/20"
            data-ocid="member.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="w-full mb-6 flex flex-wrap gap-1 bg-[#EAF6EE] h-auto p-1">
            {[
              { value: "profile", label: "👤 Profile" },
              { value: "kyc", label: "📋 KYC" },
              { value: "idcard", label: "🪺 ID Card" },
              { value: "certificates", label: "📜 Certificates" },
              { value: "orders", label: "🛒 Orders" },
              { value: "wallet", label: "💰 Wallet" },
            ].map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="data-[state=active]:bg-[#0B6B3A] data-[state=active]:text-white text-xs"
                data-ocid="member.tab"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                My Profile
              </h2>
              {member ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: member.name },
                    { label: "Mobile", value: member.mobile },
                    { label: "Role", value: member.role },
                    { label: "Email", value: member.email || "Not provided" },
                    { label: "District", value: member.district },
                    { label: "State", value: member.state },
                    {
                      label: "Member ID",
                      value: `MOB-${member.mobile.slice(-5)}`,
                    },
                    { label: "Status", value: member.status },
                    { label: "Registered", value: member.registeredAt },
                  ].map((f) => (
                    <div key={f.label} className="bg-[#EAF6EE] rounded-lg p-3">
                      <div className="text-xs text-gray-500 font-medium">
                        {f.label}
                      </div>
                      <div className="font-semibold text-sm text-[#1F2933]">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-8 text-gray-500"
                  data-ocid="profile.empty_state"
                >
                  <p>Profile not found. Please complete registration.</p>
                  <Link to="/register">
                    <Button
                      className="mt-3 bg-[#0B6B3A] text-white"
                      data-ocid="member.primary_button"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          {/* KYC */}
          <TabsContent value="kyc">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                KYC Upload
              </h2>
              {memberKYC ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-semibold">KYC Status:</span>
                    <Badge
                      className={
                        memberKYC.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : memberKYC.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {memberKYC.status}
                    </Badge>
                  </div>
                  {memberKYC.status === "pending" && (
                    <p
                      className="text-sm text-gray-600"
                      data-ocid="kyc.loading_state"
                    >
                      ⏳ Documents under review. Please wait 2-3 working days.
                    </p>
                  )}
                  {memberKYC.status === "approved" && (
                    <p
                      className="text-sm text-green-600"
                      data-ocid="kyc.success_state"
                    >
                      ✅ KYC verified successfully!
                    </p>
                  )}
                  {memberKYC.status === "rejected" && (
                    <div data-ocid="kyc.error_state">
                      <p className="text-sm text-red-600 mb-3">
                        ❌ KYC rejected:{" "}
                        {memberKYC.note || "Document not clear"}. Please
                        resubmit.
                      </p>
                      <form onSubmit={handleKYCSubmit} className="space-y-3">
                        <div className="border-2 border-dashed border-[#0B6B3A]/30 rounded-xl p-4 text-center">
                          <p className="text-sm text-gray-600">
                            Reupload Aadhaar Card
                          </p>
                          <Button
                            type="button"
                            className="mt-2 bg-[#EAF6EE] text-[#0B6B3A] text-xs"
                            data-ocid="kyc.upload_button"
                          >
                            Choose File
                          </Button>
                        </div>
                        <Button
                          type="submit"
                          className="bg-[#0B6B3A] text-white w-full"
                          data-ocid="kyc.submit_button"
                        >
                          Resubmit KYC
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleKYCSubmit} className="space-y-4">
                  {[
                    { label: "Aadhaar Card", desc: "Front and back" },
                    { label: "PAN Card", desc: "Clear scan" },
                    {
                      label: "Bank Passbook",
                      desc: "First page with account details",
                    },
                  ].map((doc) => (
                    <div
                      key={doc.label}
                      className="border-2 border-dashed border-[#0B6B3A]/30 rounded-xl p-4"
                      data-ocid="kyc.dropzone"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{doc.label}</p>
                          <p className="text-xs text-gray-500">{doc.desc}</p>
                        </div>
                        <Button
                          type="button"
                          className="bg-[#EAF6EE] text-[#0B6B3A] text-xs"
                          data-ocid="kyc.upload_button"
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="submit"
                    className="w-full bg-[#0B6B3A] text-white"
                    data-ocid="kyc.submit_button"
                  >
                    Submit KYC Documents
                  </Button>
                </form>
              )}
            </div>
          </TabsContent>

          {/* ID Card */}
          <TabsContent value="idcard">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                Digital ID Card
              </h2>
              {member ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="id-card" data-ocid="idcard.card">
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
                        alt="AUC"
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div className="font-extrabold text-xs">
                          ANSHIKA UDHYOG CENTER
                        </div>
                        <div className="text-green-100 text-xs">
                          Self Employment Revolution Scheme
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-base">
                          {member.name}
                        </div>
                        <div className="text-green-100 text-xs">
                          {member.role}
                        </div>
                        <div className="text-green-100 text-xs">
                          ID: MOB-{member.mobile.slice(-5)}
                        </div>
                        <div className="text-green-100 text-xs">
                          {member.district}, {member.state}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-white/20 pt-3 flex justify-between text-xs text-green-100">
                      <span>ISO 9001:2015</span>
                      <span>Valid 2024-2025</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.print()}
                    className="bg-[#0B6B3A] text-white no-print"
                    data-ocid="idcard.primary_button"
                  >
                    💾 Download ID Card
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500" data-ocid="idcard.empty_state">
                  Complete registration to get your ID card.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                Certificates
              </h2>
              <div className="space-y-3" data-ocid="certificates.list">
                {[
                  {
                    title: "Membership Certificate",
                    date: "2024-01-15",
                    status: "available",
                  },
                  {
                    title: "Skill Training - Textiles",
                    date: "2024-02-20",
                    status: "available",
                  },
                  {
                    title: "Entrepreneurship Program",
                    date: "2024-03-10",
                    status: "pending",
                  },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-[#EAF6EE] rounded-xl"
                    data-ocid={`certificates.item.${i + 1}`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{cert.title}</div>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          cert.status === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {cert.status}
                      </Badge>
                      {cert.status === "available" && (
                        <Button
                          size="sm"
                          onClick={() => window.print()}
                          className="bg-[#0B6B3A] text-white text-xs h-7"
                          data-ocid={"certificates.primary_button"}
                        >
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="mt-4 w-full border-[#0B6B3A] text-[#0B6B3A]"
                variant="outline"
                data-ocid="certificates.primary_button"
              >
                + Request New Certificate
              </Button>
            </div>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                My Orders
              </h2>
              {memberOrders.length === 0 ? (
                <div
                  className="text-center py-8"
                  data-ocid="orders.empty_state"
                >
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-gray-600">No orders yet.</p>
                  <Link to="/shop">
                    <Button
                      className="mt-3 bg-[#0B6B3A] text-white"
                      data-ocid="orders.primary_button"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {memberOrders.map((o, i) => (
                    <div
                      key={o.id}
                      className="border border-[#D7E6DC] rounded-xl p-4"
                      data-ocid={`orders.item.${i + 1}`}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-mono text-sm font-bold">
                          {o.id}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            o.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : o.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {o.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {o.items.map((i) => i.productName).join(", ")}
                      </p>
                      <p className="text-sm font-bold text-[#0B6B3A] mt-1">
                        ₹{o.total}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Wallet */}
          <TabsContent value="wallet">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg text-[#1F2933] mb-4">
                Wallet & Earnings
              </h2>
              <div className="bg-[#0B6B3A] text-white rounded-xl p-6 mb-6">
                <div className="text-3xl font-extrabold">
                  ₹{memberWallet.balance.toFixed(2)}
                </div>
                <div className="text-green-100 text-sm">Available Balance</div>
                <div className="mt-4 flex gap-3">
                  <Input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Amount"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 w-32"
                    data-ocid="wallet.input"
                  />
                  <Button
                    onClick={handleWithdraw}
                    className="bg-white text-[#0B6B3A] font-bold"
                    data-ocid="wallet.primary_button"
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
              <h3 className="font-bold mb-3">Transaction History</h3>
              {memberWallet.transactions.length === 0 ? (
                <p
                  className="text-gray-500 text-sm"
                  data-ocid="wallet.empty_state"
                >
                  No transactions yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {memberWallet.transactions.map((t, i) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      data-ocid={`wallet.item.${i + 1}`}
                    >
                      <div>
                        <div className="font-medium text-sm">{t.desc}</div>
                        <div className="text-xs text-gray-500">{t.date}</div>
                      </div>
                      <div
                        className={`font-bold text-sm ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {t.type === "credit" ? "+" : "-"}₹{t.amount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
