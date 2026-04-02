import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export default function BranchDashboard() {
  const { auth, registrations, orders, logout } = useApp();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="bg-[#0B6B3A] text-white"
          data-ocid="branch.primary_button"
        >
          Login
        </Button>
      </div>
    );
  }

  const localMembers = registrations.slice(0, 8);
  const metrics = [
    { label: "Target Members", target: 200, achieved: localMembers.length },
    { label: "Target Revenue", target: 500000, achieved: 245000 },
    { label: "Target SHGs", target: 20, achieved: 8 },
  ];

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-[#0B6B3A] text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Branch Dashboard 🏢</h1>
            <p className="text-green-100 text-sm">
              {auth.userRole} | Bilaspur Branch
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
            data-ocid="branch.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        {/* Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-white rounded-xl border border-[#D7E6DC] p-4"
              data-ocid={`branch.item.${i + 1}`}
            >
              <h3 className="font-bold text-sm text-gray-700 mb-2">
                {m.label}
              </h3>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Achieved: {m.achieved.toLocaleString()}</span>
                <span>Target: {m.target.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-[#0B6B3A] rounded-full"
                  style={{
                    width: `${Math.min((m.achieved / m.target) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="text-xs font-bold text-[#0B6B3A] mt-1">
                {((m.achieved / m.target) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>

        {/* Local members */}
        <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6 mb-6">
          <h2 className="font-bold text-lg text-[#1F2933] mb-4">
            Local Members
          </h2>
          <div className="overflow-x-auto" data-ocid="branch.table">
            <table className="w-full text-sm">
              <thead className="bg-[#EAF6EE]">
                <tr>
                  <th className="text-left px-4 py-2 text-[#0B6B3A]">Name</th>
                  <th className="text-left px-4 py-2 text-[#0B6B3A]">Mobile</th>
                  <th className="text-left px-4 py-2 text-[#0B6B3A]">Role</th>
                  <th className="text-left px-4 py-2 text-[#0B6B3A]">Status</th>
                </tr>
              </thead>
              <tbody>
                {localMembers.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-t"
                    data-ocid={`branch.item.${i + 1}`}
                  >
                    <td className="px-4 py-2">{r.name}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
          <h2 className="font-bold text-lg text-[#1F2933] mb-4">
            Monthly Report Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New Members", value: "12", trend: "+15%" },
              { label: "Active SHGs", value: "8", trend: "+2" },
              {
                label: "Orders",
                value: orders.length.toString(),
                trend: "+20%",
              },
              { label: "Revenue", value: "₹24,500", trend: "+8%" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-3 bg-[#EAF6EE] rounded-xl"
              >
                <div className="font-extrabold text-xl text-[#0B6B3A]">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
                <div className="text-xs font-semibold text-green-600">
                  {s.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
