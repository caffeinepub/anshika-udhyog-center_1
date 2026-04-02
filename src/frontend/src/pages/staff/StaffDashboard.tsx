import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function StaffDashboard() {
  const {
    auth,
    registrations,
    kyc,
    updateKYCStatus,
    updateRegistrationStatus,
    logout,
  } = useApp();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="bg-[#0B6B3A] text-white"
          data-ocid="staff.primary_button"
        >
          Login
        </Button>
      </div>
    );
  }

  const pendingKYC = kyc.filter((k) => k.status === "pending");
  const allUsers = registrations.slice(0, 10);

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-[#0B6B3A] text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{auth.userRole} Dashboard 📊</h1>
            <p className="text-green-100 text-sm">
              Staff Portal | ANSHIKA UDHYOG CENTER
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
            data-ocid="staff.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="kyc">
          <TabsList className="mb-6 bg-[#EAF6EE]">
            <TabsTrigger
              value="kyc"
              className="data-[state=active]:bg-[#0B6B3A] data-[state=active]:text-white"
              data-ocid="staff.tab"
            >
              📋 KYC Queue
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-[#0B6B3A] data-[state=active]:text-white"
              data-ocid="staff.tab"
            >
              👥 Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kyc">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg mb-4">
                KYC Verification Queue ({pendingKYC.length} pending)
              </h2>
              {pendingKYC.length === 0 ? (
                <p
                  className="text-gray-500 text-center py-8"
                  data-ocid="kyc.empty_state"
                >
                  ✅ All KYC requests processed!
                </p>
              ) : (
                <div className="space-y-4" data-ocid="kyc.list">
                  {pendingKYC.map((k, i) => (
                    <div
                      key={k.id}
                      className="border border-[#D7E6DC] rounded-xl p-4"
                      data-ocid={`kyc.item.${i + 1}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold">{k.userName}</div>
                          <div className="text-sm text-gray-500">
                            {k.mobile} | Submitted: {k.submittedAt}
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Badge className="bg-gray-100 text-gray-600 text-xs">
                              Aadhaar
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-600 text-xs">
                              PAN
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-600 text-xs">
                              Bank Passbook
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              updateKYCStatus(k.id, "approved");
                              toast.success("KYC Approved!");
                            }}
                            className="bg-[#0B6B3A] text-white text-xs"
                            data-ocid="kyc.primary_button"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateKYCStatus(
                                k.id,
                                "rejected",
                                "Documents unclear",
                              );
                              toast.success("KYC Rejected");
                            }}
                            className="text-red-600 border-red-300 text-xs"
                            data-ocid="kyc.delete_button"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg mb-4">User Management</h2>
              <div className="overflow-x-auto" data-ocid="users.table">
                <table className="w-full text-sm">
                  <thead className="bg-[#EAF6EE]">
                    <tr>
                      <th className="text-left px-4 py-2 text-[#0B6B3A]">
                        Name
                      </th>
                      <th className="text-left px-4 py-2 text-[#0B6B3A]">
                        Mobile
                      </th>
                      <th className="text-left px-4 py-2 text-[#0B6B3A]">
                        Role
                      </th>
                      <th className="text-left px-4 py-2 text-[#0B6B3A]">
                        Status
                      </th>
                      <th className="text-left px-4 py-2 text-[#0B6B3A]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((r, i) => (
                      <tr
                        key={r.id}
                        className="border-t"
                        data-ocid={`users.item.${i + 1}`}
                      >
                        <td className="px-4 py-2 font-medium">{r.name}</td>
                        <td className="px-4 py-2">{r.mobile}</td>
                        <td className="px-4 py-2">{r.role}</td>
                        <td className="px-4 py-2">
                          <Badge
                            className={
                              r.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {r.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2">
                          {r.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                updateRegistrationStatus(r.id, "approved");
                                toast.success("Approved!");
                              }}
                              className="bg-[#0B6B3A] text-white text-xs h-6"
                              data-ocid="users.primary_button"
                            >
                              Approve
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
