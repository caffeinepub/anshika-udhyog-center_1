import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Schemes", href: "/#schemes" },
  { label: "Women Empowerment", href: "/#empowerment" },
  { label: "Impact", href: "/#impact" },
  { label: "State Coverage", href: "/#states" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
  { label: "Shop", href: "/shop" },
];

type AppRoute =
  | "/"
  | "/login"
  | "/register"
  | "/admin"
  | "/dashboard/member"
  | "/dashboard/shg"
  | "/dashboard/branch"
  | "/dashboard/staff"
  | "/dashboard/coreteam"
  | "/shop"
  | "/shop/checkout"
  | "/shop/order-tracking";

function getDashboardPath(role: string): AppRoute {
  const map: Record<string, AppRoute> = {
    Member: "/dashboard/member",
    "SHG Leader": "/dashboard/shg",
    "Center Coordinator": "/dashboard/branch",
    "Branch Manager": "/dashboard/branch",
    Staff: "/dashboard/staff",
    HR: "/dashboard/staff",
    "Core Team": "/dashboard/coreteam",
  };
  return map[role] || "/dashboard/member";
}

export function MainHeader() {
  const { cart, auth, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname !== "/") {
        navigate({ to: "/" }).then(() => {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-nav">
      {/* Utility bar */}
      <div className="bg-[#0B6B3A] text-white text-xs py-1.5 px-4 text-center">
        <span>
          🇮🇳 DMVV BHARTIY MAHILA SHAKTI FOUNDATION&nbsp;|&nbsp;ISO 9001:2015
          Certified&nbsp;|&nbsp;MCA Registered
        </span>
      </div>

      {/* Main header */}
      <div className="bg-[#EAF6EE] border-b border-[#D7E6DC]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
              alt="AUC Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-[#0B6B3A] text-base md:text-lg leading-tight">
                ANSHIKA UDHYOG CENTER
              </div>
              <div className="text-[#1F8A4C] text-xs font-medium">
                Self Employment Revolution Scheme
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/shop" className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#0B6B3A] hover:bg-[#0B6B3A]/10"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            {auth.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to={auth.isAdmin ? "/admin" : getDashboardPath(auth.userRole)}
                >
                  <Button
                    size="sm"
                    className="bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white text-xs px-3"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  className="text-[#0B6B3A] border-[#0B6B3A] text-xs px-3"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#0B6B3A] text-[#0B6B3A] hover:bg-[#0B6B3A] hover:text-white text-xs"
                    data-ocid="header.link"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white text-xs"
                    data-ocid="header.primary_button"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex flex-col gap-1 p-2 rounded-md hover:bg-[#0B6B3A]/10 transition-colors"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-[#0B6B3A]" />
              ) : (
                <>
                  <span className="hamburger-line-1 bg-[#0B6B3A] rounded-full block" />
                  <span className="hamburger-line-2 bg-[#0B6B3A] rounded-full block" />
                  <span className="hamburger-line-3 bg-[#0B6B3A] rounded-full block" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar - desktop */}
      <nav className="hidden lg:block bg-[#0B6B3A]">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/#") ? (
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="px-3 py-3 text-white text-sm font-semibold hover:bg-white/10 transition-colors rounded-sm"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href as AppRoute}
                    className="px-3 py-3 text-white text-sm font-semibold hover:bg-white/10 transition-colors rounded-sm block"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay fixed inset-0 z-50 flex flex-col"
          data-ocid="nav.modal"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-white font-bold">ANSHIKA UDHYOG CENTER</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-white"
              data-ocid="nav.close_button"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
          <ul className="flex flex-col items-center gap-2 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/#") ? (
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-white text-xl font-semibold py-3 hover:text-green-200 transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    to={link.href as AppRoute}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-xl font-semibold py-3 hover:text-green-200 transition-colors block"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            {!auth.isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-xl font-semibold py-3"
                    data-ocid="nav.link"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-xl font-semibold py-3"
                    data-ocid="nav.link"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  return (
    <footer className="bg-[#0B6B3A] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
              alt="AUC"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-bold text-sm">ANSHIKA UDHYOG CENTER</div>
              <div className="text-green-200 text-xs">
                Self Employment Revolution
              </div>
            </div>
          </div>
          <p className="text-green-100 text-sm">
            Empowering rural women through skill training, micro-finance, and
            market linkage across India.
          </p>
          <div className="flex gap-3 mt-4 text-lg">
            <span className="text-green-200 cursor-pointer hover:text-white">
              📘
            </span>
            <span className="text-green-200 cursor-pointer hover:text-white">
              🐦
            </span>
            <span className="text-green-200 cursor-pointer hover:text-white">
              📷
            </span>
            <span className="text-green-200 cursor-pointer hover:text-white">
              ▶️
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-100">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Home",
              "About Us",
              "Schemes",
              "Impact",
              "Gallery",
              "Contact",
            ].map((l) => (
              <li key={l}>
                <a
                  href="/"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-100">Services</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Skill Training",
              "Micro Finance",
              "Market Linkage",
              "SHG Formation",
              "ID Card",
              "Certificates",
            ].map((l) => (
              <li key={l}>
                <a
                  href="/"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-100">Contact</h4>
          <ul className="space-y-2 text-sm text-green-100">
            <li>📍 Bilaspur, Chhattisgarh</li>
            <li>📞 +91-9876543200</li>
            <li>📧 info@anshikaudhyog.in</li>
            <li>💬 WhatsApp: +91-9876543200</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-green-200">
        <p>
          © {year} ANSHIKA UDHYOG CENTER | DMVV BHARTIY MAHILA SHAKTI FOUNDATION
        </p>
        <p className="mt-1">
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
