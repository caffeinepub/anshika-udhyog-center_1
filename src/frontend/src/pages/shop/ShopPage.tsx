import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Textiles",
  "Handicrafts",
  "Organic Products",
  "Art & Craft",
  "Eco Products",
];

const PRODUCT_IMAGES: Record<string, string> = {
  Textiles: "/assets/generated/gallery-skill-training.dim_600x400.jpg",
  Handicrafts: "/assets/generated/gallery-market-linkage.dim_600x400.jpg",
  "Organic Products": "/assets/generated/gallery-microfinance.dim_600x400.jpg",
  "Art & Craft":
    "/assets/generated/gallery-certificate-ceremony.dim_600x400.jpg",
  "Eco Products": "/assets/generated/gallery-shg-meeting.dim_600x400.jpg",
};

export default function ShopPage() {
  const { products, cart, addToCart, removeFromCart, updateCartQty } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen">
      <MainHeader />
      <main>
        {/* Hero */}
        <div className="bg-[#0B6B3A] text-white py-12 px-4 text-center">
          <h1 className="text-3xl font-extrabold mb-2">🛒 AUC Marketplace</h1>
          <p className="text-green-100">
            Handcrafted products by rural women artisans
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[#0B6B3A] text-white"
                    : "bg-[#EAF6EE] text-[#0B6B3A] hover:bg-[#0B6B3A] hover:text-white"
                }`}
                data-ocid="shop.tab"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="shop.list"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-card card-hover overflow-hidden"
                data-ocid={`shop.item.${i + 1}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      PRODUCT_IMAGES[product.category] ||
                      "/assets/generated/gallery-skill-training.dim_600x400.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#0B6B3A] text-white text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-gray-700 text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1F2933] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-[#0B6B3A]">
                      ₹{product.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white text-xs px-3"
                      data-ocid="shop.primary_button"
                    >
                      + Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 bg-[#0B6B3A] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl z-40"
          data-ocid="shop.open_modal_button"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col"
              data-ocid="shop.sheet"
            >
              <div className="bg-[#0B6B3A] text-white p-4 flex items-center justify-between">
                <h2 className="font-bold">🛒 Cart ({cartCount} items)</h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  data-ocid="shop.close_button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div
                    className="text-center py-12 text-gray-500"
                    data-ocid="cart.empty_state"
                  >
                    <div className="text-4xl mb-3">🛒</div>
                    <p>Cart is empty</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-sm">
                          {item.productName}
                        </div>
                        <div className="text-[#0B6B3A] font-bold">
                          ₹{item.price}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQty(
                              item.productId,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="w-6 h-6 rounded-full bg-[#EAF6EE] flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQty(item.productId, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full bg-[#EAF6EE] flex items-center justify-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-400 hover:text-red-600"
                        data-ocid="cart.delete_button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total:</span>
                    <span className="text-[#0B6B3A]">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl"
                    onClick={() => {
                      setCartOpen(false);
                      navigate({ to: "/shop/checkout" });
                    }}
                    data-ocid="cart.primary_button"
                  >
                    Proceed to Checkout →
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
