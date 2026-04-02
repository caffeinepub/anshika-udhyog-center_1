import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const USER_ROLES = [
  "Member",
  "SHG Leader",
  "Center Coordinator",
  "Branch Manager",
  "Staff",
  "HR",
  "Core Team",
];

const ROLE_PATHS: Record<string, string> = {
  Member: "/dashboard/member",
  "SHG Leader": "/dashboard/shg",
  "Center Coordinator": "/dashboard/branch",
  "Branch Manager": "/dashboard/branch",
  Staff: "/dashboard/staff",
  HR: "/dashboard/staff",
  "Core Team": "/dashboard/coreteam",
};

export default function LoginPage() {
  const { loginAdmin, loginUser } = useApp();
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = loginAdmin(adminId, adminPwd);
    setAdminLoading(false);
    if (ok) {
      toast.success("Welcome, Admin!");
      navigate({ to: "/admin" });
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    setUserLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = loginUser(mobile, code, role);
    setUserLoading(false);
    if (ok) {
      toast.success("Login successful!");
      const path = ROLE_PATHS[role] || "/dashboard/member";
      navigate({ to: path as "/" });
    } else {
      toast.error("Invalid mobile or access code. Please check with admin.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF6EE] flex flex-col">
      {/* Top bar */}
      <div className="bg-[#0B6B3A] text-white text-xs py-1.5 text-center">
        🇮🇳 DMVV BHARTIY MAHILA SHAKTI FOUNDATION | ISO 9001:2015 | MCA
        Registered
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <img
                src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
                alt="AUC Logo"
                className="h-20 w-20 rounded-full mx-auto mb-3 object-cover shadow-lg"
              />
            </Link>
            <h1 className="text-xl font-extrabold text-[#0B6B3A]">
              ANSHIKA UDHYOG CENTER
            </h1>
            <p className="text-sm text-gray-600">
              Self Employment Revolution Scheme
            </p>
          </div>

          <div
            className="bg-white rounded-2xl shadow-card overflow-hidden"
            data-ocid="login.card"
          >
            {/* Green header */}
            <div className="bg-[#0B6B3A] p-5 text-white text-center">
              <h2 className="font-bold text-lg">🔐 Secure Login Portal</h2>
              <p className="text-green-100 text-xs mt-1">
                Access your AUC account
              </p>
            </div>

            <div className="p-6">
              <Tabs defaultValue="user">
                <TabsList className="w-full mb-6 bg-[#EAF6EE]">
                  <TabsTrigger
                    value="user"
                    className="flex-1 data-[state=active]:bg-[#0B6B3A] data-[state=active]:text-white"
                    data-ocid="login.tab"
                  >
                    User Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="flex-1 data-[state=active]:bg-[#0B6B3A] data-[state=active]:text-white"
                    data-ocid="login.tab"
                  >
                    Admin Login
                  </TabsTrigger>
                </TabsList>

                {/* User login */}
                <TabsContent value="user">
                  <form onSubmit={handleUserLogin} className="space-y-4">
                    <div>
                      <label
                        htmlFor="role-select"
                        className="text-sm font-medium text-gray-700 block mb-1"
                      >
                        Select Role
                      </label>
                      <Select onValueChange={setRole}>
                        <SelectTrigger
                          id="role-select"
                          data-ocid="login.select"
                        >
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_ROLES.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="login-mobile"
                        className="text-sm font-medium text-gray-700 block mb-1"
                      >
                        Registered Mobile Number
                      </label>
                      <Input
                        id="login-mobile"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        required
                        data-ocid="login.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="login-code"
                        className="text-sm font-medium text-gray-700 block mb-1"
                      >
                        Access Code
                      </label>
                      <Input
                        id="login-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="Enter your access code"
                        required
                        data-ocid="login.input"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Access code is provided by admin after registration
                        approval.
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl font-bold py-2.5"
                      disabled={userLoading}
                      data-ocid="login.submit_button"
                    >
                      {userLoading ? "Logging in..." : "Login 🚀"}
                    </Button>
                  </form>
                  <div className="mt-4 text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Forgot access code?{" "}
                      <a
                        href="#"
                        className="text-[#0B6B3A] font-semibold hover:underline"
                      >
                        Contact Admin
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      New user?{" "}
                      <Link
                        to="/register"
                        className="text-[#0B6B3A] font-semibold hover:underline"
                        data-ocid="login.link"
                      >
                        Register Here
                      </Link>
                    </p>
                  </div>
                </TabsContent>

                {/* Admin Login */}
                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Admin Username
                      </label>
                      <Input
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        placeholder="Enter admin username"
                        required
                        data-ocid="login.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Password
                      </label>
                      <Input
                        type="password"
                        value={adminPwd}
                        onChange={(e) => setAdminPwd(e.target.value)}
                        placeholder="Enter password"
                        required
                        data-ocid="login.input"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl font-bold py-2.5"
                      disabled={adminLoading}
                      data-ocid="login.submit_button"
                    >
                      {adminLoading ? "Authenticating..." : "👑 Admin Login"}
                    </Button>
                  </form>
                  <div className="mt-4 p-3 bg-[#EAF6EE] rounded-lg">
                    <p className="text-xs text-gray-600 text-center">
                      ⚠️ This area is restricted to authorized administrators
                      only.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-[#0B6B3A] text-sm hover:underline"
              data-ocid="login.link"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#0B6B3A] text-white text-xs py-3 text-center">
        © {new Date().getFullYear()} ANSHIKA UDHYOG CENTER | All Rights Reserved
      </div>
    </div>
  );
}
