import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Copy, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SIDEBAR_ITEMS = [
  { id: "overview", label: "Dashboard Overview", icon: "📊" },
  { id: "users", label: "User Management", icon: "👥" },
  { id: "access", label: "Access Code Control", icon: "🔑" },
  { id: "kyc", label: "KYC Management", icon: "📋" },
  { id: "shg", label: "SHG Management", icon: "🏨" },
  { id: "products", label: "Product Management", icon: "🛒" },
  { id: "orders", label: "Order Management", icon: "📦" },
  { id: "income", label: "Income & Wallet", icon: "💰" },
  { id: "branches", label: "Branch & Location", icon: "🏢" },
  { id: "idcard", label: "ID Card System", icon: "🪺" },
  { id: "certificate", label: "Certificate System", icon: "📜" },
  { id: "cms", label: "CMS Control", icon: "🖼" },
  { id: "notices", label: "News & Notices", icon: "📰" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    blocked: "bg-gray-100 text-gray-700",
    active: "bg-green-100 text-green-700",
    disabled: "bg-red-100 text-red-700",
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    confirmed: "bg-[#EAF6EE] text-[#0B6B3A]",
    placed: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

function OverviewPanel() {
  const { registrations, shgs, orders, kyc } = useApp();
  const totalMembers = registrations.length;
  const pendingKYC = kyc.filter((k) => k.status === "pending").length;
  const totalOrders = orders.length;
  const totalIncome = orders
    .filter((o) => o.status === "delivered")
    .reduce((a, o) => a + o.total, 0);

  const stats = [
    {
      label: "Total Members",
      value: totalMembers,
      icon: "👥",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "SHG Groups",
      value: shgs.length,
      icon: "🏡",
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: "📦",
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Total Income",
      value: `\u20b9${totalIncome.toLocaleString()}`,
      icon: "💰",
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "KYC Pending",
      value: pendingKYC,
      icon: "⚠️",
      color: "bg-orange-50 text-orange-700",
    },
    {
      label: "Branches",
      value: 8,
      icon: "🏢",
      color: "bg-indigo-50 text-indigo-700",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-xl p-4 ${s.color}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold">{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-4">
          <h3 className="font-bold text-[#1F2933] mb-4">
            Recent Registrations
          </h3>
          <div className="space-y-3">
            {registrations.slice(0, 5).map((r, i) => (
              <div
                key={r.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                data-ocid={`registrations.item.${i + 1}`}
              >
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-gray-500">
                    {r.role} | {r.mobile}
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#D7E6DC] p-4">
          <h3 className="font-bold text-[#1F2933] mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o, i) => (
              <div
                key={o.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                data-ocid={`orders.item.${i + 1}`}
              >
                <div>
                  <div className="font-semibold text-sm">{o.userName}</div>
                  <div className="text-xs text-gray-500">
                    {o.id} | ₹{o.total}
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersPanel() {
  const {
    registrations,
    updateRegistrationStatus,
    deleteRegistration,
    generateAccessCode,
  } = useApp();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = registrations.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (
      search &&
      !r.name.toLowerCase().includes(search.toLowerCase()) &&
      !r.mobile.includes(search)
    )
      return false;
    return true;
  });

  const handleApprove = (id: string, mobile: string) => {
    updateRegistrationStatus(id, "approved");
    generateAccessCode(mobile);
    toast.success("User approved and access code generated!");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">User Management</h2>
        <div className="flex gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-48"
            data-ocid="users.search_input"
          />
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-32" data-ocid="users.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border border-[#D7E6DC] overflow-hidden"
        data-ocid="users.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Mobile
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Role
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                  data-ocid={`users.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.mobile}</td>
                  <td className="px-4 py-3 text-gray-600">{r.role}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {r.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(r.id, r.mobile)}
                          className="bg-[#0B6B3A] text-white text-xs h-7 px-2"
                          data-ocid={"users.primary_button"}
                        >
                          Approve
                        </Button>
                      )}
                      {r.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateRegistrationStatus(r.id, "rejected");
                            toast.success("User rejected");
                          }}
                          className="text-red-600 border-red-300 text-xs h-7 px-2"
                          data-ocid="users.delete_button"
                        >
                          Reject
                        </Button>
                      )}
                      {r.status === "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateRegistrationStatus(r.id, "blocked");
                            toast.success("User blocked");
                          }}
                          className="text-orange-600 border-orange-300 text-xs h-7 px-2"
                          data-ocid="users.delete_button"
                        >
                          Block
                        </Button>
                      )}
                      {r.status === "blocked" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            updateRegistrationStatus(r.id, "approved");
                            toast.success("User unblocked");
                          }}
                          className="bg-[#0B6B3A] text-white text-xs h-7 px-2"
                          data-ocid="users.primary_button"
                        >
                          Unblock
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          deleteRegistration(r.id);
                          toast.success("User deleted");
                        }}
                        className="text-red-600 border-red-300 text-xs h-7 px-2"
                        data-ocid="users.delete_button"
                      >
                        Del
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AccessCodePanel() {
  const {
    registrations,
    accessCodes,
    accessCodeStatus,
    generateAccessCode,
    resetAccessCode,
    toggleAccessCode,
  } = useApp();
  const [copied, setCopied] = useState<string | null>(null);

  const approvedUsers = registrations.filter((r) => r.status === "approved");

  const copyCode = (code: string, mobile: string) => {
    navigator.clipboard.writeText(code);
    setCopied(mobile);
    setTimeout(() => setCopied(null), 2000);
    toast.success("Code copied!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">
        Access Code Control
      </h2>
      <div
        className="bg-white rounded-xl border border-[#D7E6DC] overflow-hidden"
        data-ocid="access.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Mobile
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Access Code
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvedUsers.map((r, i) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-100"
                  data-ocid={`access.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.mobile}</td>
                  <td className="px-4 py-3">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono font-bold">
                      {accessCodes[r.mobile] || "Not generated"}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={
                        accessCodeStatus[r.mobile] ||
                        (accessCodes[r.mobile] ? "active" : "none")
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {!accessCodes[r.mobile] ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            generateAccessCode(r.mobile);
                            toast.success("Code generated!");
                          }}
                          className="bg-[#0B6B3A] text-white text-xs h-7 px-2"
                          data-ocid="access.primary_button"
                        >
                          Generate
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              copyCode(accessCodes[r.mobile], r.mobile)
                            }
                            variant="outline"
                            className="text-xs h-7 px-2"
                            data-ocid="access.secondary_button"
                          >
                            {copied === r.mobile ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              resetAccessCode(r.mobile);
                              toast.success("Code reset!");
                            }}
                            variant="outline"
                            className="text-xs h-7 px-2"
                            data-ocid="access.secondary_button"
                          >
                            Reset
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              toggleAccessCode(r.mobile);
                              toast.success("Status toggled!");
                            }}
                            variant="outline"
                            className={`text-xs h-7 px-2 ${accessCodeStatus[r.mobile] === "disabled" ? "text-green-600" : "text-red-600"}`}
                            data-ocid="access.toggle"
                          >
                            {accessCodeStatus[r.mobile] === "disabled"
                              ? "Enable"
                              : "Disable"}
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KYCPanel() {
  const { kyc, updateKYCStatus } = useApp();
  const [note, setNote] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">KYC Management</h2>
      <div
        className="bg-white rounded-xl border border-[#D7E6DC] overflow-hidden"
        data-ocid="kyc.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Mobile
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Documents
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {kyc.map((k, i) => (
                <tr
                  key={k.id}
                  className="border-t border-gray-100"
                  data-ocid={`kyc.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium">{k.userName}</td>
                  <td className="px-4 py-3 text-gray-600">{k.mobile}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    Aadhaar, PAN, Bank Passbook
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={k.status} />
                  </td>
                  <td className="px-4 py-3">
                    {k.status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateKYCStatus(k.id, "approved");
                            toast.success("KYC Approved");
                          }}
                          className="bg-[#0B6B3A] text-white text-xs h-7 px-2"
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
                              "Document not clear",
                            );
                            toast.success("KYC Rejected");
                          }}
                          className="text-red-600 border-red-300 text-xs h-7 px-2"
                          data-ocid="kyc.delete_button"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {k.status !== "pending" && (
                      <span className="text-xs text-gray-400">
                        {k.status === "approved"
                          ? "✅ Verified"
                          : "❌ Rejected"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Suppress unused variable warning */}
      <div className="hidden">{note}</div>
      <div className="hidden">
        <Button onClick={() => setNote("")}>x</Button>
      </div>
    </div>
  );
}

function SHGPanel() {
  const { shgs, addSHG, deleteSHG } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    state: "Chhattisgarh",
    district: "",
    memberCount: 0,
    leader: "",
    leaderMobile: "",
    members: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSHG(form);
    setShowForm(false);
    toast.success("SHG created!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">SHG Management</h2>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#0B6B3A] text-white"
          data-ocid="shg.primary_button"
        >
          + Create SHG
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="SHG Name"
              required
              data-ocid="shg.input"
            />
            <Input
              value={form.location}
              onChange={(e) =>
                setForm((p) => ({ ...p, location: e.target.value }))
              }
              placeholder="Location"
              required
              data-ocid="shg.input"
            />
            <Input
              value={form.district}
              onChange={(e) =>
                setForm((p) => ({ ...p, district: e.target.value }))
              }
              placeholder="District"
              required
              data-ocid="shg.input"
            />
            <Input
              value={form.leader}
              onChange={(e) =>
                setForm((p) => ({ ...p, leader: e.target.value }))
              }
              placeholder="Leader Name"
              required
              data-ocid="shg.input"
            />
            <Input
              value={form.leaderMobile}
              onChange={(e) =>
                setForm((p) => ({ ...p, leaderMobile: e.target.value }))
              }
              placeholder="Leader Mobile"
              required
              data-ocid="shg.input"
            />
            <div className="sm:col-span-2 flex gap-2">
              <Button
                type="submit"
                className="bg-[#0B6B3A] text-white"
                data-ocid="shg.submit_button"
              >
                Create SHG
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="shg.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-ocid="shg.list"
      >
        {shgs.map((s, i) => (
          <div
            key={s.id}
            className="bg-white rounded-xl border border-[#D7E6DC] p-5"
            data-ocid={`shg.item.${i + 1}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#1F2933]">{s.name}</h3>
                <p className="text-sm text-gray-600">
                  {s.location}, {s.district}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  deleteSHG(s.id);
                  toast.success("SHG deleted");
                }}
                className="text-red-600 border-red-300 text-xs"
                data-ocid="shg.delete_button"
              >
                Delete
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <span className="bg-[#EAF6EE] rounded-lg px-2 py-1">
                👥 {s.memberCount} Members
              </span>
              <span className="bg-[#EAF6EE] rounded-lg px-2 py-1">
                👩‍💼 Leader: {s.leader}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPanel() {
  const { products, addProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Textiles",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(form);
    setShowForm(false);
    toast.success("Product added!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">Product Management</h2>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#0B6B3A] text-white"
          data-ocid="products.primary_button"
        >
          + Add Product
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Product Name"
              required
              data-ocid="products.input"
            />
            <Input
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              placeholder="Category"
              data-ocid="products.input"
            />
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((p) => ({ ...p, price: +e.target.value }))
              }
              placeholder="Price (\u20b9)"
              required
              data-ocid="products.input"
            />
            <Input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm((p) => ({ ...p, stock: +e.target.value }))
              }
              placeholder="Stock"
              data-ocid="products.input"
            />
            <div className="sm:col-span-2">
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Description"
                rows={3}
                data-ocid="products.textarea"
              />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <Button
                type="submit"
                className="bg-[#0B6B3A] text-white"
                data-ocid="products.submit_button"
              >
                Add Product
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="products.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div
        className="bg-white rounded-xl border border-[#D7E6DC] overflow-hidden"
        data-ocid="products.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-100"
                  data-ocid={`products.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3">₹{p.price}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        deleteProduct(p.id);
                        toast.success("Product deleted");
                      }}
                      className="text-red-600 border-red-300 text-xs h-7"
                      data-ocid="products.delete_button"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrdersPanel() {
  const { orders, updateOrderStatus } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">Order Management</h2>
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-36" data-ocid="orders.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              "all",
              "placed",
              "confirmed",
              "shipped",
              "delivered",
              "cancelled",
            ].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="bg-white rounded-xl border border-[#D7E6DC] overflow-hidden"
        data-ocid="orders.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Order ID
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Customer
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[#0B6B3A] font-semibold">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr
                  key={o.id}
                  className="border-t border-gray-100"
                  data-ocid={`orders.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-3">{o.userName}</td>
                  <td className="px-4 py-3 font-semibold">₹{o.total}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      onValueChange={(v) => {
                        updateOrderStatus(o.id, v as never);
                        toast.success("Status updated");
                      }}
                      defaultValue={o.status}
                    >
                      <SelectTrigger
                        className="w-32 h-7 text-xs"
                        data-ocid="orders.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "placed",
                          "confirmed",
                          "shipped",
                          "delivered",
                          "cancelled",
                        ].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IncomePanel() {
  const { registrations, wallet, addWalletTransaction } = useApp();
  const [withdrawRequests] = useState([
    {
      id: "WR001",
      name: "Priya Sharma",
      mobile: "9876543210",
      amount: 1500,
      status: "pending",
      date: "2024-03-20",
    },
    {
      id: "WR002",
      name: "Sunita Devi",
      mobile: "9876543211",
      amount: 800,
      status: "pending",
      date: "2024-03-21",
    },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">Income & Wallet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4">
          <div className="text-2xl">💰</div>
          <div className="text-2xl font-extrabold text-green-700">₹4,300</div>
          <div className="text-sm text-green-600">Total Wallet Balance</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-2xl">📈</div>
          <div className="text-2xl font-extrabold text-blue-700">₹2.5Cr</div>
          <div className="text-sm text-blue-600">Total Income Generated</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4">
          <div className="text-2xl">⏳</div>
          <div className="text-2xl font-extrabold text-orange-700">2</div>
          <div className="text-sm text-orange-600">Pending Withdrawals</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#D7E6DC] p-4 mb-6">
        <h3 className="font-bold mb-4">Member Wallets</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Member</th>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Mobile</th>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Balance</th>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations
                .filter((r) => r.status === "approved")
                .map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-t"
                    data-ocid={`income.item.${i + 1}`}
                  >
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2">{r.mobile}</td>
                    <td className="px-4 py-2 font-bold">
                      ₹{wallet?.[r.mobile]?.balance || 0}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          addWalletTransaction(
                            r.mobile,
                            500,
                            "credit",
                            "Admin credit",
                          );
                          toast.success("\u20b9500 credited!");
                        }}
                        className="bg-[#0B6B3A] text-white text-xs h-7"
                        data-ocid="income.primary_button"
                      >
                        + Credit
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#D7E6DC] p-4">
        <h3 className="font-bold mb-4">Withdrawal Requests</h3>
        <div className="space-y-3">
          {withdrawRequests.map((w, i) => (
            <div
              key={w.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              data-ocid={`income.item.${i + 1}`}
            >
              <div>
                <div className="font-semibold text-sm">{w.name}</div>
                <div className="text-xs text-gray-500">
                  {w.mobile} | ₹{w.amount}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-[#0B6B3A] text-white text-xs h-7"
                  data-ocid="income.primary_button"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 text-xs h-7"
                  data-ocid="income.delete_button"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BranchesPanel() {
  const [branches, setBranches] = useState([
    {
      id: "B001",
      name: "Bilaspur Central",
      state: "Chhattisgarh",
      district: "Bilaspur",
      address: "MG Road",
      manager: "Kavita Patel",
      memberCount: 120,
      isActive: true,
    },
    {
      id: "B002",
      name: "Raipur North",
      state: "Chhattisgarh",
      district: "Raipur",
      address: "Gandhi Nagar",
      manager: "Sunita Sharma",
      memberCount: 85,
      isActive: true,
    },
    {
      id: "B003",
      name: "Durg Branch",
      state: "Chhattisgarh",
      district: "Durg",
      address: "Nehru Chowk",
      manager: "Meena Verma",
      memberCount: 95,
      isActive: true,
    },
    {
      id: "B004",
      name: "Korba Center",
      state: "Chhattisgarh",
      district: "Korba",
      address: "Indira Colony",
      manager: "Anita Singh",
      memberCount: 60,
      isActive: false,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    address: "",
    manager: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setBranches((prev) => [
      ...prev,
      {
        id: `B${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        ...form,
        memberCount: 0,
        isActive: true,
      },
    ]);
    setShowForm(false);
    toast.success("Branch added!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">Branch & Location</h2>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#0B6B3A] text-white"
          data-ocid="branches.primary_button"
        >
          + Add Branch
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Branch Name"
              required
              data-ocid="branches.input"
            />
            <Input
              value={form.state}
              onChange={(e) =>
                setForm((p) => ({ ...p, state: e.target.value }))
              }
              placeholder="State"
              required
              data-ocid="branches.input"
            />
            <Input
              value={form.district}
              onChange={(e) =>
                setForm((p) => ({ ...p, district: e.target.value }))
              }
              placeholder="District"
              required
              data-ocid="branches.input"
            />
            <Input
              value={form.manager}
              onChange={(e) =>
                setForm((p) => ({ ...p, manager: e.target.value }))
              }
              placeholder="Manager Name"
              required
              data-ocid="branches.input"
            />
            <div className="sm:col-span-2">
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Full Address"
                required
                data-ocid="branches.input"
              />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <Button
                type="submit"
                className="bg-[#0B6B3A] text-white"
                data-ocid="branches.submit_button"
              >
                Add Branch
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="branches.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((b, i) => (
          <div
            key={b.id}
            className="bg-white rounded-xl border border-[#D7E6DC] p-5"
            data-ocid={`branches.item.${i + 1}`}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-[#1F2933]">{b.name}</h3>
                <p className="text-sm text-gray-600">
                  {b.district}, {b.state}
                </p>
                <p className="text-sm text-gray-600">Manager: {b.manager}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={b.isActive ? "active" : "disabled"} />
                <span className="text-xs text-gray-500">
                  {b.memberCount} members
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IDCardPanel() {
  const { registrations } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof registrations)[0] | null>(
    null,
  );

  const results =
    search.length > 2
      ? registrations.filter(
          (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.mobile.includes(search),
        )
      : [];

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">ID Card System</h2>
      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member by name or mobile..."
          data-ocid="idcard.search_input"
        />
      </div>
      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] mb-6">
          {results.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => setSelected(r)}
              className="w-full text-left px-4 py-2 hover:bg-[#EAF6EE] border-b last:border-0 text-sm"
              data-ocid="idcard.button"
            >
              {r.name} - {r.mobile} ({r.role})
            </button>
          ))}
        </div>
      )}
      {selected && (
        <div className="flex flex-col items-center gap-4">
          <div className="id-card print-full" data-ocid="idcard.card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <div className="font-extrabold text-base">
                  ANSHIKA UDHYOG CENTER
                </div>
                <div className="text-green-100 text-xs">
                  Self Employment Revolution Scheme
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/30 rounded-xl flex items-center justify-center text-2xl font-bold">
                {selected.name.charAt(0)}
              </div>
              <div>
                <div className="font-extrabold text-lg">{selected.name}</div>
                <div className="text-green-100 text-xs">{selected.role}</div>
                <div className="text-green-100 text-xs">
                  ID: MOB-{selected.mobile.slice(-5)}
                </div>
                <div className="text-green-100 text-xs">
                  {selected.district}, {selected.state}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs text-green-100 border-t border-white/20 pt-3">
              <span>ISO 9001:2015</span>
              <span>Valid: 2024-2025</span>
              <span>MCA Registered</span>
            </div>
          </div>
          <Button
            onClick={() => window.print()}
            className="bg-[#0B6B3A] text-white no-print"
            data-ocid="idcard.primary_button"
          >
            💾 Download / Print ID Card
          </Button>
        </div>
      )}
    </div>
  );
}

function CertificatePanel() {
  const { registrations } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof registrations)[0] | null>(
    null,
  );

  const results =
    search.length > 2
      ? registrations.filter(
          (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.mobile.includes(search),
        )
      : [];

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">
        Certificate System
      </h2>
      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member..."
          data-ocid="certificate.search_input"
        />
      </div>
      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] mb-6">
          {results.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => setSelected(r)}
              className="w-full text-left px-4 py-2 hover:bg-[#EAF6EE] border-b last:border-0 text-sm"
              data-ocid="certificate.button"
            >
              {r.name} - {r.role}
            </button>
          ))}
        </div>
      )}
      {selected && (
        <div className="flex flex-col items-center gap-4">
          <div
            className="certificate max-w-lg w-full"
            data-ocid="certificate.card"
          >
            <div className="text-center border-b-2 border-[#0B6B3A] pb-4 mb-4">
              <div className="text-4xl mb-2">🌿</div>
              <div className="text-lg font-extrabold text-[#0B6B3A]">
                ANSHIKA UDHYOG CENTER
              </div>
              <div className="text-sm text-gray-600">
                DMVV BHARTIY MAHILA SHAKTI FOUNDATION
              </div>
              <div className="text-xs text-gray-500">
                ISO 9001:2015 | MCA Registered
              </div>
            </div>
            <div className="text-center py-4">
              <div className="text-xl font-bold text-gray-700 mb-4">
                CERTIFICATE OF MEMBERSHIP
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is to certify that
              </p>
              <div className="text-2xl font-extrabold text-[#0B6B3A] my-3">
                {selected.name}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                is a registered <strong>{selected.role}</strong> of ANSHIKA
                UDHYOG CENTER and has successfully enrolled in the Self
                Employment Revolution Scheme.
              </p>
              <div className="mt-4 text-xs text-gray-500">
                Registered on: {selected.registeredAt} | ID: MOB-
                {selected.mobile.slice(-5)}
              </div>
            </div>
            <div className="flex justify-between items-end mt-6 border-t-2 border-[#0B6B3A] pt-4">
              <div className="text-center">
                <div className="w-16 border-t border-gray-400 mb-1" />
                <div className="text-xs text-gray-500">Signature</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">💚</div>
              </div>
              <div className="text-center">
                <div className="w-16 border-t border-gray-400 mb-1" />
                <div className="text-xs text-gray-500">Director</div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => window.print()}
            className="bg-[#0B6B3A] text-white no-print"
            data-ocid="certificate.primary_button"
          >
            💾 Download Certificate
          </Button>
        </div>
      )}
    </div>
  );
}

function NoticesAdminPanel() {
  const { actor } = useActor();
  const [localNotices, setLocalNotices] = useState([
    {
      id: "N001",
      title: "New Skill Training Batch Starting",
      content: "Registration open for next skill training batch.",
      type: "news",
      isActive: true,
    },
    {
      id: "N002",
      title: "SHG Annual Meeting - Bilaspur",
      content: "All SHG leaders invited to annual district meeting.",
      type: "notice",
      isActive: true,
    },
    {
      id: "N003",
      title: "Income Distribution Q1 2026",
      content: "Quarterly income distribution processed.",
      type: "news",
      isActive: true,
    },
  ]);
  const [form, setForm] = useState({ title: "", content: "", type: "notice" });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = { id: `N${Date.now()}`, ...form, isActive: true };
    setLocalNotices((prev) => [newNotice, ...prev]);
    if (actor) {
      try {
        await actor.createNotice(form.title, form.content, form.type as never);
      } catch {
        // Ignore backend errors in demo
      }
    }
    setShowForm(false);
    toast.success("Notice created!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1F2933]">News & Notices</h2>
        <Button
          onClick={() => setShowForm((v) => !v)}
          className="bg-[#0B6B3A] text-white"
          data-ocid="notices.primary_button"
        >
          + Add Notice
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Notice Title"
                  required
                  data-ocid="notices.input"
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  placeholder="Content"
                  rows={3}
                  required
                  data-ocid="notices.textarea"
                />
              </div>
              <Select
                onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}
                defaultValue="notice"
              >
                <SelectTrigger data-ocid="notices.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notice">Notice</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-[#0B6B3A] text-white"
                data-ocid="notices.submit_button"
              >
                Publish
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                data-ocid="notices.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {localNotices.map((n, i) => (
          <div
            key={n.id}
            className="bg-white rounded-xl border border-[#D7E6DC] p-4 flex justify-between items-start"
            data-ocid={`notices.item.${i + 1}`}
          >
            <div>
              <Badge
                className={
                  n.type === "news"
                    ? "bg-blue-100 text-blue-700 mb-2"
                    : "bg-[#EAF6EE] text-[#0B6B3A] mb-2"
                }
              >
                {n.type}
              </Badge>
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{n.content}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Switch
                checked={n.isActive}
                onCheckedChange={(checked) =>
                  setLocalNotices((prev) =>
                    prev.map((x) =>
                      x.id === n.id ? { ...x, isActive: checked } : x,
                    ),
                  )
                }
                data-ocid="notices.switch"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setLocalNotices((prev) => prev.filter((x) => x.id !== n.id))
                }
                className="text-red-600 border-red-300 text-xs"
                data-ocid="notices.delete_button"
              >
                Del
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useActor } from "@/hooks/useActor";

function NotificationsPanel() {
  const { addNotification, notifications } = useApp();
  const [form, setForm] = useState({ title: "", message: "", target: "All" });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(form);
    setForm({ title: "", message: "", target: "All" });
    toast.success("Notification sent!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">Notifications</h2>
      <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
        <h3 className="font-bold mb-4">Broadcast Message</h3>
        <form onSubmit={handleSend} className="space-y-4">
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Notification title"
            required
            data-ocid="notifications.input"
          />
          <Textarea
            value={form.message}
            onChange={(e) =>
              setForm((p) => ({ ...p, message: e.target.value }))
            }
            placeholder="Message content"
            rows={3}
            required
            data-ocid="notifications.textarea"
          />
          <Select
            onValueChange={(v) => setForm((p) => ({ ...p, target: v }))}
            defaultValue="All"
          >
            <SelectTrigger data-ocid="notifications.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["All", "Members", "SHG Leaders", "Staff", "Core Team"].map(
                (t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full bg-[#0B6B3A] text-white"
            data-ocid="notifications.submit_button"
          >
            🔔 Send Notification
          </Button>
        </form>
      </div>

      <div>
        <h3 className="font-bold mb-4">Sent Notifications</h3>
        {notifications.length === 0 ? (
          <p
            className="text-gray-500 text-sm"
            data-ocid="notifications.empty_state"
          >
            No notifications sent yet.
          </p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div
                key={n.id}
                className="bg-white rounded-xl border border-[#D7E6DC] p-4"
                data-ocid={`notifications.item.${i + 1}`}
              >
                <div className="flex justify-between">
                  <div className="font-bold text-sm">{n.title}</div>
                  <Badge className="bg-[#EAF6EE] text-[#0B6B3A] text-xs">
                    {n.target}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mt-1">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportsPanel() {
  const { registrations, orders } = useApp();
  const monthlyData = [
    { month: "Oct", count: 85 },
    { month: "Nov", count: 120 },
    { month: "Dec", count: 98 },
    { month: "Jan", count: 145 },
    { month: "Feb", count: 160 },
    { month: "Mar", count: registrations.length },
  ];
  const maxCount = Math.max(...monthlyData.map((d) => d.count));
  const orderStats = [
    "placed",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ].map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
    revenue: orders
      .filter((o) => o.status === s)
      .reduce((a, o) => a + o.total, 0),
  }));

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">
        Reports & Analytics
      </h2>

      {/* Growth chart */}
      <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
        <h3 className="font-bold mb-4">Member Growth (Last 6 Months)</h3>
        <div className="flex items-end gap-3 h-32">
          {monthlyData.map((d) => (
            <div
              key={d.month}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div className="text-xs text-gray-600">{d.count}</div>
              <div
                className="w-full bg-[#0B6B3A] rounded-t-md transition-all"
                style={{ height: `${(d.count / maxCount) * 100}px` }}
              />
              <div className="text-xs text-gray-500">{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Order stats */}
      <div className="bg-white rounded-xl border border-[#D7E6DC] p-6 mb-6">
        <h3 className="font-bold mb-4">Order Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EAF6EE]">
              <tr>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Status</th>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Count</th>
                <th className="text-left px-4 py-2 text-[#0B6B3A]">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {orderStats.map((s, i) => (
                <tr
                  key={s.status}
                  className="border-t"
                  data-ocid={`reports.item.${i + 1}`}
                >
                  <td className="px-4 py-2">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-2">{s.count}</td>
                  <td className="px-4 py-2">₹{s.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order status pie (CSS) */}
      <div className="bg-white rounded-xl border border-[#D7E6DC] p-6">
        <h3 className="font-bold mb-4">Order Status Distribution</h3>
        <div className="flex flex-wrap gap-3">
          {orderStats.map((s) => (
            <div key={s.status} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-sm ${
                  s.status === "delivered"
                    ? "bg-green-500"
                    : s.status === "shipped"
                      ? "bg-blue-500"
                      : s.status === "confirmed"
                        ? "bg-[#0B6B3A]"
                        : s.status === "placed"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                }`}
              />
              <span className="text-sm">
                {s.status}: {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success("Settings saved!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">Settings</h2>
      <div className="bg-white rounded-xl border border-[#D7E6DC] p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Site Name
              </label>
              <Input
                value={form.siteName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, siteName: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Tagline
              </label>
              <Input
                value={form.tagline}
                onChange={(e) =>
                  setForm((p) => ({ ...p, tagline: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Contact Phone
              </label>
              <Input
                value={form.contactPhone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactPhone: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Contact Email
              </label>
              <Input
                type="email"
                value={form.contactEmail}
                onChange={(e) =>
                  setForm((p) => ({ ...p, contactEmail: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                WhatsApp Number
              </label>
              <Input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((p) => ({ ...p, whatsapp: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                UPI ID
              </label>
              <Input
                value={form.upiId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, upiId: e.target.value }))
                }
                data-ocid="settings.input"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#0B6B3A] text-white"
            data-ocid="settings.submit_button"
          >
            💾 Save Settings
          </Button>
        </form>
      </div>
    </div>
  );
}

const PANEL_MAP: Record<string, React.ComponentType> = {
  overview: OverviewPanel,
  users: UsersPanel,
  access: AccessCodePanel,
  kyc: KYCPanel,
  shg: SHGPanel,
  products: ProductsPanel,
  orders: OrdersPanel,
  income: IncomePanel,
  branches: BranchesPanel,
  idcard: IDCardPanel,
  certificate: CertificatePanel,
  cms: () => (
    <div>
      <h2 className="text-xl font-bold text-[#1F2933] mb-6">CMS Control</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6">
          <h3 className="font-bold mb-4">Logo & Branding</h3>
          <div
            className="border-2 border-dashed border-[#0B6B3A]/30 rounded-xl p-6 text-center"
            data-ocid="cms.dropzone"
          >
            <div className="text-4xl mb-2">🖼</div>
            <p className="text-sm text-gray-600">Upload new logo</p>
            <Button
              className="mt-3 bg-[#0B6B3A] text-white text-sm"
              data-ocid="cms.upload_button"
            >
              Choose File
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#D7E6DC] p-6">
          <h3 className="font-bold mb-4">About Text</h3>
          <Textarea
            rows={6}
            defaultValue="ANSHIKA UDHYOG CENTER is a flagship initiative..."
            data-ocid="cms.textarea"
          />
          <Button
            className="mt-3 bg-[#0B6B3A] text-white"
            data-ocid="cms.save_button"
          >
            Save Content
          </Button>
        </div>
      </div>
    </div>
  ),
  notices: NoticesAdminPanel,
  notifications: NotificationsPanel,
  reports: ReportsPanel,
  settings: SettingsPanel,
};

export default function AdminDashboard() {
  const { auth, logout } = useApp();
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect route
  if (!auth.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EAF6EE]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-card">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-[#0B6B3A] mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">Admin login required</p>
          <Button
            onClick={() => navigate({ to: "/login" })}
            className="bg-[#0B6B3A] text-white"
            data-ocid="admin.primary_button"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const ActivePanel = PANEL_MAP[activePanel] || OverviewPanel;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden cursor-default"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
              alt="AUC"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-bold text-white text-xs">ANSHIKA UDHYOG</div>
              <div className="text-green-200 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActivePanel(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${
                activePanel === item.id
                  ? "bg-white/20 text-white"
                  : "text-green-100"
              }`}
              data-ocid={`admin.${item.id}.link`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 text-green-200 hover:text-white text-sm w-full"
            data-ocid="admin.logout_button"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-[#D7E6DC] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="lg:hidden"
              data-ocid="admin.toggle"
            >
              <Menu className="h-5 w-5 text-[#0B6B3A]" />
            </button>
            <div>
              <h1 className="font-bold text-[#0B6B3A] text-sm">
                👑 Super Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">ANSHIKA UDHYOG CENTER</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-[#0B6B3A] hover:underline"
              data-ocid="admin.link"
            >
              🏠 Website
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="text-xs"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="h-3 w-3 mr-1" /> Logout
            </Button>
          </div>
        </header>

        {/* Panel content */}
        <main className="flex-1 p-4 md:p-6">
          <ActivePanel />
        </main>
      </div>
    </div>
  );
}
