import { Footer, MainHeader } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, auth, settings, addOrder, clearCart } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [orderId, setOrderId] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({
    name: auth.userName || "",
    mobile: auth.userMobile || "",
    address: "",
    district: "",
    state: "Chhattisgarh",
    pincode: "",
  });

  const cartTotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  if (cart.length === 0 && !ordered) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-[#1F2933] mb-3">
              Cart is empty
            </h2>
            <Button
              onClick={() => navigate({ to: "/shop" })}
              className="bg-[#0B6B3A] text-white"
              data-ocid="checkout.primary_button"
            >
              Shop Now
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = addOrder({
      userMobile: form.mobile,
      userName: form.name,
      items: cart.map((c) => ({
        productId: c.productId,
        productName: c.productName,
        quantity: c.quantity,
        price: c.price,
      })),
      total: cartTotal,
      status: "placed",
      address: `${form.address}, ${form.district}, ${form.state} - ${form.pincode}`,
      paymentMethod,
    });
    setOrderId(id);
    clearCart();
    setOrdered(true);
    toast.success("Order placed successfully!");
  };

  if (ordered) {
    return (
      <div className="min-h-screen">
        <MainHeader />
        <div
          className="max-w-md mx-auto px-4 py-16 text-center"
          data-ocid="checkout.success_state"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#0B6B3A] mb-2">
              Order Placed!
            </h2>
            <p className="text-gray-600 mb-2">Your order has been confirmed</p>
            <div className="bg-[#EAF6EE] rounded-xl p-4 my-4">
              <p className="text-sm text-gray-600">Order ID:</p>
              <p className="font-mono font-extrabold text-[#0B6B3A] text-lg">
                {orderId}
              </p>
            </div>
            <div className="flex gap-3 justify-center mt-4">
              <Button
                onClick={() => navigate({ to: "/shop/order-tracking" })}
                className="bg-[#0B6B3A] text-white"
                data-ocid="checkout.primary_button"
              >
                Track Order
              </Button>
              <Button
                onClick={() => navigate({ to: "/shop" })}
                variant="outline"
                className="border-[#0B6B3A] text-[#0B6B3A]"
                data-ocid="checkout.secondary_button"
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#1F2933] mb-6">🛒 Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order form */}
          <form onSubmit={handleOrder} className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="text-sm font-medium text-gray-700 block mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="checkout-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="checkout.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-mobile"
                      className="text-sm font-medium text-gray-700 block mb-1"
                    >
                      Mobile
                    </label>
                    <Input
                      id="checkout-mobile"
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, mobile: e.target.value }))
                      }
                      required
                      data-ocid="checkout.input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="text-sm font-medium text-gray-700 block mb-1"
                  >
                    Address
                  </label>
                  <Input
                    id="checkout-address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="Street, Ward, Block"
                    required
                    data-ocid="checkout.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-district"
                      className="text-sm font-medium text-gray-700 block mb-1"
                    >
                      District
                    </label>
                    <Input
                      id="checkout-district"
                      value={form.district}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, district: e.target.value }))
                      }
                      required
                      data-ocid="checkout.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-pincode"
                      className="text-sm font-medium text-gray-700 block mb-1"
                    >
                      Pincode
                    </label>
                    <Input
                      id="checkout-pincode"
                      value={form.pincode}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, pincode: e.target.value }))
                      }
                      required
                      data-ocid="checkout.input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6">
              <h2 className="font-bold text-lg mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "UPI", label: "📱 UPI Payment", desc: settings.upiId },
                  { id: "QR", label: "📒 QR Code", desc: "Scan to pay" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-colors ${
                      paymentMethod === method.id
                        ? "border-[#0B6B3A] bg-[#EAF6EE]"
                        : "border-gray-200 hover:border-[#0B6B3A]/50"
                    }`}
                    data-ocid="checkout.radio"
                  >
                    <div className="font-semibold text-sm">{method.label}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {method.desc}
                    </div>
                  </button>
                ))}
              </div>
              {paymentMethod === "UPI" && (
                <div className="mt-4 p-4 bg-[#EAF6EE] rounded-xl">
                  <p className="text-sm font-medium">
                    UPI ID: <strong>{settings.upiId}</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Pay and share screenshot with admin for order confirmation
                  </p>
                </div>
              )}
              {paymentMethod === "QR" && (
                <div className="mt-4 p-4 bg-[#EAF6EE] rounded-xl text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-2xl">
                    📒
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    QR code for payment
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl py-3 text-base font-bold"
              data-ocid="checkout.submit_button"
            >
              🚀 Place Order - ₹{cartTotal.toLocaleString()}
            </Button>
          </form>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#D7E6DC] p-6 h-fit">
            <h2 className="font-bold text-lg mb-4">
              Order Summary ({cartCount} items)
            </h2>
            <div className="space-y-3 mb-4">
              {cart.map((item, i) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center"
                  data-ocid={`checkout.item.${i + 1}`}
                >
                  <div>
                    <div className="font-medium text-sm">
                      {item.productName}
                    </div>
                    <div className="text-xs text-gray-500">
                      x{item.quantity}
                    </div>
                  </div>
                  <div className="font-bold">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 mb-3">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg text-[#0B6B3A]">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
