import { Footer, MainHeader } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export default function CoreTeamDashboard() {
  const { auth, registrations, shgs, orders, kyc, logout } = useApp();
  const navigate = useNavigate();

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="bg-[#0B6B3A] text-white"
          data-ocid="coreteam.primary_button"
        >
          Login
        </Button>
      </div>
    );
  }

  const stateData = [
    {
      state: "Chhattisgarh",
      members: registrations.length,
      shgs: shgs.length,
      growth: 15,
    },
    { state: "Madhya Pradesh", members: 2400, shgs: 180, growth: 22 },
    { state: "Uttar Pradesh", members: 1800, shgs: 120, growth: 18 },
    { state: "Maharashtra", members: 1200, shgs: 90, growth: 12 },
    { state: "Bihar", members: 980, shgs: 65, growth: 25 },
  ];

  const maxMembers = Math.max(...stateData.map((d) => d.members));

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#0B6B3A] text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Core Team Dashboard 👑</h1>
            <p className="text-green-100 text-sm">
              National Monitoring & Analytics
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
            data-ocid="coreteam.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Members", value: "12,500+", icon: "👥" },
            { label: "SHG Groups", value: shgs.length.toString(), icon: "🏡" },
            {
              label: "Total Orders",
              value: orders.length.toString(),
              icon: "📦",
            },
            {
              label: "KYC Pending",
              value: kyc
                .filter((k) => k.status === "pending")
                .length.toString(),
              icon: "⚠️",
            },
            { label: "States", value: "15+", icon: "🗺" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#D7E6DC] p-4 text-center"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="font-extrabold text-lg text-[#0B6B3A]">
                {s.value}
              </div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* State distribution */}
        <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6 mb-6">
          <h2 className="font-bold text-lg text-[#1F2933] mb-6">
            State-wise Member Distribution
          </h2>
          <div className="space-y-4">
            {stateData.map((d, i) => (
              <div
                key={i}
                className="flex items-center gap-4"
                data-ocid={`coreteam.item.${i + 1}`}
              >
                <div className="w-24 text-sm font-medium text-gray-700 shrink-0">
                  {d.state}
                </div>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-6 bg-gradient-to-r from-[#0B6B3A] to-[#2F9A5A] rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(d.members / maxMembers) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">
                      {d.members.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-semibold w-12 text-right">
                  +{d.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Member Dashboard",
              path: "/dashboard/member",
              icon: "👤",
              desc: "Profile, KYC, ID Card, Orders, Wallet",
            },
            {
              title: "SHG Dashboard",
              path: "/dashboard/shg",
              icon: "🏡",
              desc: "Group management, Products, Sales, Training",
            },
            {
              title: "Branch Dashboard",
              path: "/dashboard/branch",
              icon: "🏢",
              desc: "Local members, Performance, Reports",
            },
          ].map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#D7E6DC] p-6"
              data-ocid={`coreteam.item.${i + 1}`}
            >
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-bold text-[#1F2933] mb-1">{d.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{d.desc}</p>
              <Button
                size="sm"
                onClick={() => navigate({ to: d.path as "/" })}
                className="bg-[#0B6B3A] text-white text-xs"
                data-ocid={"coreteam.primary_button"}
              >
                View Dashboard
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
