import { Footer, MainHeader } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { motion } from "motion/react";
import { useState } from "react";

const ORDER_STEPS = ["placed", "confirmed", "shipped", "delivered"];

const STEP_LABELS: Record<
  string,
  { label: string; icon: string; desc: string }
> = {
  placed: {
    label: "Order Placed",
    icon: "📎",
    desc: "Your order has been received",
  },
  confirmed: {
    label: "Confirmed",
    icon: "✅",
    desc: "Order confirmed by seller",
  },
  shipped: { label: "Shipped", icon: "🚚", desc: "Out for delivery" },
  delivered: { label: "Delivered", icon: "🎉", desc: "Package delivered!" },
};

export default function OrderTrackingPage() {
  const { orders } = useApp();
  const [orderId, setOrderId] = useState("");
  const [found, setFound] = useState<(typeof orders)[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find((o) => o.id === orderId.trim().toUpperCase());
    if (order) {
      setFound(order);
      setNotFound(false);
    } else {
      setFound(null);
      setNotFound(true);
    }
  };

  const currentStepIndex = found ? ORDER_STEPS.indexOf(found.status) : -1;

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1F2933]">
            Track Your Order 📦
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Enter your order ID to track status
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            placeholder="Enter Order ID (e.g. ORD001)"
            className="flex-1"
            data-ocid="tracking.search_input"
          />
          <Button
            type="submit"
            className="bg-[#0B6B3A] text-white px-6"
            data-ocid="tracking.primary_button"
          >
            Track
          </Button>
        </form>

        {/* Sample order IDs hint */}
        <div className="bg-[#EAF6EE] rounded-xl p-3 mb-6 text-xs text-gray-600">
          <strong>Sample order IDs:</strong>{" "}
          {orders
            .slice(0, 3)
            .map((o) => o.id)
            .join(", ")}
        </div>

        {notFound && (
          <div
            className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
            data-ocid="tracking.error_state"
          >
            <div className="text-2xl mb-2">❌</div>
            <p className="text-red-600 font-semibold">Order not found</p>
            <p className="text-sm text-gray-500 mt-1">
              Please check the order ID
            </p>
          </div>
        )}

        {found && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#D7E6DC] p-6"
            data-ocid="tracking.panel"
          >
            <div className="flex justify-between mb-6">
              <div>
                <div className="font-mono font-bold text-lg">{found.id}</div>
                <div className="text-sm text-gray-500">
                  Ordered: {found.createdAt}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#0B6B3A] text-lg">
                  ₹{found.total}
                </div>
                <div className="text-sm text-gray-500">
                  {found.paymentMethod}
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />
              <div
                className="absolute top-6 left-0 h-0.5 bg-[#0B6B3A] z-0 transition-all duration-500"
                style={{
                  width: `${Math.max(0, (currentStepIndex / (ORDER_STEPS.length - 1)) * 100)}%`,
                }}
              />
              <div className="flex justify-between relative z-10">
                {ORDER_STEPS.map((step, i) => {
                  const isCompleted = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  const stepInfo = STEP_LABELS[step];
                  return (
                    <motion.div
                      key={step}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isCompleted ? 1 : 0.8 }}
                      className="flex flex-col items-center gap-2"
                      data-ocid={`tracking.item.${i + 1}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${
                          isCompleted
                            ? "bg-[#0B6B3A] text-white"
                            : "bg-gray-100 text-gray-400"
                        } ${isCurrent ? "ring-4 ring-[#0B6B3A]/20" : ""}`}
                      >
                        {stepInfo.icon}
                      </div>
                      <div
                        className={`text-xs font-semibold text-center ${
                          isCompleted ? "text-[#0B6B3A]" : "text-gray-400"
                        }`}
                      >
                        {stepInfo.label}
                      </div>
                      <div className="text-xs text-gray-400 text-center hidden sm:block">
                        {stepInfo.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Order items */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h3 className="font-bold mb-3">Items</h3>
              {found.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm py-1"
                >
                  <span>
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-[#0B6B3A] pt-2 border-t">
                <span>Total</span>
                <span>₹{found.total}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#EAF6EE] rounded-xl">
              <p className="text-xs text-gray-600">
                📍 Delivery: {found.address}
              </p>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
