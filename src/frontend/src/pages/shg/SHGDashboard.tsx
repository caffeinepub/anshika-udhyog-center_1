import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SHGDashboard() {
  const { auth, shgs, products, orders, addProduct, logout } = useApp();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Textiles",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
  });

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button
          onClick={() => navigate({ to: "/login" })}
          className="bg-[#0B6B3A] text-white"
          data-ocid="shg.primary_button"
        >
          Login
        </Button>
      </div>
    );
  }

  const myShg = shgs.find((s) => s.leaderMobile === auth.userMobile) || shgs[0];
  const shgOrders = orders.filter((o) =>
    o.items.some(
      (i) => products.find((p) => p.id === i.productId)?.shgId === myShg?.id,
    ),
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({ ...productForm, shgId: myShg?.id });
    setShowAddProduct(false);
    toast.success("Product added!");
  };

  const trainings = [
    {
      title: "Advanced Textile Weaving",
      duration: "3 days",
      status: "upcoming",
      date: "Apr 15, 2026",
    },
    {
      title: "Organic Product Making",
      duration: "2 days",
      status: "completed",
      date: "Mar 10, 2026",
    },
    {
      title: "Digital Marketing for SHGs",
      duration: "1 day",
      status: "upcoming",
      date: "Apr 22, 2026",
    },
  ];

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-[#0B6B3A] text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">SHG Dashboard 🏡</h1>
            <p className="text-green-100 text-sm">
              {myShg?.name || "Your SHG"}
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
            data-ocid="shg.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        {/* Group Info */}
        {myShg && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Members", value: myShg.memberCount, icon: "👥" },
              { label: "Location", value: myShg.location, icon: "📍" },
              { label: "District", value: myShg.district, icon: "🏡" },
              { label: "Leader", value: myShg.leader, icon: "👩‍💼" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-[#D7E6DC] p-4 text-center"
              >
                <div className="text-2xl">{s.icon}</div>
                <div className="font-bold text-sm">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members */}
          <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
            <h2 className="font-bold text-[#1F2933] mb-4">Group Members</h2>
            <div className="space-y-2" data-ocid="shg.list">
              {(
                myShg?.members || [
                  "Priya Sharma",
                  "Sunita Devi",
                  "Kavita Patel",
                ]
              ).map((m, i) => (
                <div
                  key={m}
                  className="flex items-center gap-3 p-2 bg-[#EAF6EE] rounded-lg"
                  data-ocid={`shg.item.${i + 1}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center text-sm font-bold">
                    {m.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#1F2933]">Our Products</h2>
              <Button
                size="sm"
                onClick={() => setShowAddProduct((v) => !v)}
                className="bg-[#0B6B3A] text-white text-xs"
                data-ocid="shg.primary_button"
              >
                + Add
              </Button>
            </div>
            {showAddProduct && (
              <form
                onSubmit={handleAddProduct}
                className="space-y-3 mb-4 p-4 bg-[#EAF6EE] rounded-xl"
              >
                <Input
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Product name"
                  required
                  data-ocid="shg.input"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((p) => ({ ...p, price: +e.target.value }))
                    }
                    placeholder="Price"
                    data-ocid="shg.input"
                  />
                  <Input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm((p) => ({ ...p, stock: +e.target.value }))
                    }
                    placeholder="Stock"
                    data-ocid="shg.input"
                  />
                </div>
                <Textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Description"
                  rows={2}
                  data-ocid="shg.textarea"
                />
                <Button
                  type="submit"
                  className="w-full bg-[#0B6B3A] text-white"
                  data-ocid="shg.submit_button"
                >
                  Add Product
                </Button>
              </form>
            )}
            <div className="space-y-2">
              {products
                .filter((p) => p.shgId === myShg?.id)
                .map((p, i) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                    data-ocid={`shg.item.${i + 1}`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#0B6B3A]">₹{p.price}</div>
                      <div className="text-xs text-gray-500">
                        Stock: {p.stock}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Sales */}
          <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
            <h2 className="font-bold text-[#1F2933] mb-4">Sales Tracker</h2>
            {shgOrders.length === 0 ? (
              <p
                className="text-gray-500 text-sm"
                data-ocid="sales.empty_state"
              >
                No sales yet.
              </p>
            ) : (
              <div className="space-y-2">
                {shgOrders.map((o, i) => (
                  <div
                    key={o.id}
                    className="flex justify-between p-3 bg-gray-50 rounded-lg"
                    data-ocid={`sales.item.${i + 1}`}
                  >
                    <div className="text-sm">{o.userName}</div>
                    <div className="font-bold text-[#0B6B3A]">₹{o.total}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Training */}
          <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
            <h2 className="font-bold text-[#1F2933] mb-4">Training Programs</h2>
            <div className="space-y-3" data-ocid="training.list">
              {trainings.map((t, i) => (
                <div
                  key={t.title}
                  className="p-3 bg-[#EAF6EE] rounded-xl"
                  data-ocid={`training.item.${i + 1}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm">{t.title}</div>
                      <div className="text-xs text-gray-500">
                        {t.date} | {t.duration}
                      </div>
                    </div>
                    <Badge
                      className={
                        t.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
