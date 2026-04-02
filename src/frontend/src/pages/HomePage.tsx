import { Footer, MainHeader } from "@/components/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { useActor } from "@/hooks/useActor";
import {
  useCounterAnimation,
  useIntersectionObserver,
} from "@/hooks/useCounter";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Typing Hero ──────────────────────────────────────────────────────────────
function HeroSection() {
  const { displayText, isFading } = useTypingAnimation();
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-women-empowerment.dim_1600x900.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌱 Self Employment Revolution Scheme
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            <span
              className={`block transition-all duration-400 ${
                isFading
                  ? "opacity-0 -translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {displayText}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 text-base md:text-lg mb-8 leading-relaxed"
          >
            ANSHIKA UDHYOG CENTER provides skill training, micro-finance, and
            market linkage to rural women across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              onClick={() => navigate({ to: "/register" })}
              className="bg-white text-[#0B6B3A] hover:bg-green-50 font-bold px-6 py-3 rounded-full shadow-lg text-base"
              data-ocid="hero.primary_button"
            >
              Join the Revolution 🚀
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-white text-white hover:bg-white/20 px-6 py-3 rounded-full text-base"
              data-ocid="hero.secondary_button"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Floating badges */}
        <div className="absolute right-8 top-1/3 hidden md:flex flex-col gap-4">
          <div className="float-badge bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-xl">
            <div className="text-2xl font-extrabold text-[#0B6B3A]">
              12,500+
            </div>
            <div className="text-xs text-gray-600 font-medium">Members</div>
          </div>
          <div
            className="float-badge bg-[#0B6B3A] rounded-2xl p-4 text-center shadow-xl"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-2xl font-extrabold text-white">850+</div>
            <div className="text-xs text-green-100 font-medium">SHG Groups</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Counter Section ───────────────────────────────────────────────────────────
function CounterSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const members = useCounterAnimation(12500, 2000, isVisible);
  const shgs = useCounterAnimation(850, 2000, isVisible);
  const orders = useCounterAnimation(45000, 2000, isVisible);

  return (
    <section id="impact" className="gradient-green py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Our Impact in Numbers
          </h2>
          <p className="text-green-100 mt-2">Transforming lives across India</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: members, suffix: "+", label: "Members", icon: "👥" },
            { value: shgs, suffix: "+", label: "SHG Groups", icon: "🏡" },
            {
              value: orders,
              suffix: "+",
              label: "Orders Fulfilled",
              icon: "📦",
            },
            {
              value: 2.5,
              suffix: "Cr+",
              label: "Total Income",
              icon: "💰",
              prefix: "₹",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="stat-number text-white">
                {item.prefix}
                {typeof item.value === "number" && item.value > 100
                  ? item.value.toLocaleString()
                  : item.value}
                {item.suffix}
              </div>
              <div className="text-green-100 text-sm font-medium mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
              🌱 About Us
            </span>
            <h2 className="text-3xl font-bold text-[#1F2933] mt-2 mb-4">
              ANSHIKA UDHYOG CENTER
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              ANSHIKA UDHYOG CENTER is a flagship initiative of{" "}
              <strong>DMVV BHARTIY MAHILA SHAKTI FOUNDATION</strong>, dedicated
              to uplifting rural women through sustainable self-employment and
              economic empowerment.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We bridge the gap between skill and opportunity by providing
              comprehensive training, micro-financing, and direct market access
              to artisans and entrepreneurs across India.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-[#EAF6EE] text-[#0B6B3A] border-[#0B6B3A]/30 px-3 py-1.5">
                ✓ ISO 9001:2015 Certified
              </Badge>
              <Badge className="bg-[#EAF6EE] text-[#0B6B3A] border-[#0B6B3A]/30 px-3 py-1.5">
                ✓ MCA Registered
              </Badge>
              <Badge className="bg-[#EAF6EE] text-[#0B6B3A] border-[#0B6B3A]/30 px-3 py-1.5">
                ✓ Govt. Recognized
              </Badge>
              <Badge className="bg-[#EAF6EE] text-[#0B6B3A] border-[#0B6B3A]/30 px-3 py-1.5">
                ✓ 15+ States Active
              </Badge>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src="/assets/generated/gallery-group-empowerment.dim_600x400.jpg"
                alt="Women Empowerment"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 gradient-green/80 p-4">
                <p className="text-white font-semibold">
                  1000+ Villages Covered
                </p>
                <p className="text-green-100 text-sm">
                  15 States | 120+ Districts
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Schemes ───────────────────────────────────────────────────────────────────
function SchemesSection() {
  const schemes = [
    {
      icon: "🎓",
      title: "Skill Training",
      desc: "Comprehensive vocational training in textiles, handicrafts, food processing, beauty & wellness, and digital literacy for rural women.",
      color: "#EAF6EE",
    },
    {
      icon: "🏦",
      title: "Micro Finance",
      desc: "Low-interest micro-loans, savings programs, and financial literacy training to help women start and grow their own businesses.",
      color: "#EAF6EE",
    },
    {
      icon: "🛒",
      title: "Market Linkage",
      desc: "Direct connection to buyers, e-commerce platforms, government procurement, and retail channels for selling handmade products.",
      color: "#EAF6EE",
    },
  ];

  return (
    <section id="schemes" className="py-16 bg-[#EAF6EE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            🏆 Government Schemes
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            Our Core Programs
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Empowering women through three pillars of sustainable development
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schemes.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card card-hover"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-[#1F2933] mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              <Link to="/register">
                <Button
                  className="mt-4 w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-full text-sm"
                  data-ocid="scheme.primary_button"
                >
                  Apply Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Women Empowerment ─────────────────────────────────────────────────────────
function WomenEmpowermentSection() {
  const features = [
    {
      icon: "👩‍🏫",
      title: "कौशल विकास",
      desc: "Skill development through 50+ vocational courses in textiles, craft, food, technology and more.",
      stat: "50+ Courses",
    },
    {
      icon: "💼",
      title: "उद्यमिता",
      desc: "Supporting women entrepreneurs with mentorship, business planning, and startup capital.",
      stat: "2000+ Entrepreneurs",
    },
    {
      icon: "👩‍🤝‍👩",
      title: "सामूहिक शक्ति",
      desc: "SHG formation to build collective strength, share resources, and support each other in growth.",
      stat: "850+ SHG Groups",
    },
    {
      icon: "🎓",
      title: "शिक्षा",
      desc: "Digital and financial literacy programs ensuring women can navigate modern economic systems.",
      stat: "100% Literacy Focus",
    },
    {
      icon: "🩺",
      title: "स्वास्थ्य सेवा",
      desc: "Health insurance, nutrition guidance, and wellness programs for members and their families.",
      stat: "5000+ Beneficiaries",
    },
    {
      icon: "🏦",
      title: "वित्तीय सरलता",
      desc: "Zero-collateral micro-loans, savings groups, and insurance schemes for financial security.",
      stat: "₹2.5Cr+ Disbursed",
    },
  ];

  return (
    <section id="empowerment" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            💪 Women First
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            महिला सशक्तिकरण
          </h2>
          <p className="text-gray-600 mt-2">
            Holistic empowerment across six dimensions of women's lives
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#EAF6EE] rounded-2xl p-6 card-hover"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-base font-bold text-[#1F2933] mb-1">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{f.desc}</p>
              <span className="inline-block bg-[#0B6B3A] text-white text-xs px-3 py-1 rounded-full font-semibold">
                {f.stat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── State Coverage ────────────────────────────────────────────────────────────
function StateCoverageSection() {
  const states = [
    "Chhattisgarh",
    "Madhya Pradesh",
    "Maharashtra",
    "Uttar Pradesh",
    "Bihar",
    "Jharkhand",
    "Odisha",
    "Rajasthan",
    "West Bengal",
    "Gujarat",
    "Telangana",
    "Karnataka",
    "Assam",
    "Punjab",
    "Haryana",
  ];

  return (
    <section id="states" className="py-16 bg-[#EAF6EE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            📍 Pan India
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            Active in 15+ States
          </h2>
          <p className="text-gray-600 mt-2">
            Spreading the revolution of self-employment across India
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {states.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-[#0B6B3A]/30 text-[#0B6B3A] px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-[#0B6B3A] hover:text-white transition-colors cursor-pointer"
            >
              📍 {s}
            </motion.span>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "States Covered", value: "15+" },
            { label: "Districts", value: "120+" },
            { label: "Villages", value: "1000+" },
            { label: "Centers", value: "250+" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold text-[#0B6B3A]">
                {item.value}
              </div>
              <div className="text-gray-600 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────────
function GallerySection() {
  const images = [
    {
      src: "/assets/generated/gallery-skill-training.dim_600x400.jpg",
      caption: "Skill Training Workshop",
    },
    {
      src: "/assets/generated/gallery-shg-meeting.dim_600x400.jpg",
      caption: "SHG Group Meeting",
    },
    {
      src: "/assets/generated/gallery-market-linkage.dim_600x400.jpg",
      caption: "Market Linkage Program",
    },
    {
      src: "/assets/generated/gallery-microfinance.dim_600x400.jpg",
      caption: "Micro Finance Session",
    },
    {
      src: "/assets/generated/gallery-certificate-ceremony.dim_600x400.jpg",
      caption: "Certificate Distribution",
    },
    {
      src: "/assets/generated/gallery-group-empowerment.dim_600x400.jpg",
      caption: "Women Empowerment Group",
    },
  ];

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            📸 Gallery
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            Our Work in Pictures
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-xl overflow-hidden shadow-card card-hover group"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-semibold text-sm">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Member, Bilaspur",
      text: "ANSHIKA UDHYOG CENTER changed my life. I learned textile design and now earn ₹15,000 per month from home. My children's education is secured.",
      initials: "PS",
      stars: 5,
    },
    {
      name: "Sunita Devi",
      role: "SHG Leader, Raipur",
      text: "The micro-finance program helped me start my own pickle business. Today I employ 5 women from my village. Truly a life-changing initiative.",
      initials: "SD",
      stars: 5,
    },
    {
      name: "Kavita Patel",
      role: "Center Coordinator, Durg",
      text: "Being a coordinator has given me responsibility and respect. I've helped 200+ women join the scheme. The support from AUC is exceptional.",
      initials: "KP",
      stars: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#EAF6EE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            ⭐ Success Stories
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            What Our Members Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j} className="text-yellow-400">
                      ★
                    </span>
                  ))}
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B6B3A] flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[#1F2933] text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── News Section ──────────────────────────────────────────────────────────────
function NewsSection() {
  const { actor, isFetching } = useActor();
  const { data: notices = [] } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getNotices();
      return all.filter((n) => n.isActive).slice(0, 3);
    },
    enabled: !!actor && !isFetching,
  });

  const fallbackNotices = [
    {
      id: BigInt(1),
      title: "New Skill Training Batch Starting March 2026",
      content:
        "Registration open for the new batch of free skill training in textile, handicraft, and food processing.",
      noticeType: "news",
      createdAt: BigInt(0),
      publishedBy: {} as never,
      isActive: true,
    },
    {
      id: BigInt(2),
      title: "SHG Annual Meeting - Bilaspur",
      content:
        "All SHG leaders are invited to the annual district meeting on 15th April 2026 at District Center.",
      noticeType: "notice",
      createdAt: BigInt(0),
      publishedBy: {} as never,
      isActive: true,
    },
    {
      id: BigInt(3),
      title: "Income Distribution for Q1 2026",
      content:
        "Quarterly income distribution has been processed. Members can check their wallet for credited amounts.",
      noticeType: "news",
      createdAt: BigInt(0),
      publishedBy: {} as never,
      isActive: true,
    },
  ];

  const displayNotices = notices.length > 0 ? notices : fallbackNotices;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            📰 Latest Updates
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">
            News & Notices
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayNotices.map((n, i) => (
            <motion.div
              key={String(n.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-[#D7E6DC] rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <Badge
                className={`mb-3 text-xs ${
                  String(n.noticeType) === "news"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-[#EAF6EE] text-[#0B6B3A]"
                }`}
              >
                {String(n.noticeType) === "news" ? "📰 News" : "📌 Notice"}
              </Badge>
              <h3 className="font-bold text-[#1F2933] text-sm mb-2">
                {n.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-3">{n.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", mobile: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 bg-[#EAF6EE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#1F8A4C] text-sm font-semibold uppercase tracking-wider">
            📧 Get In Touch
          </span>
          <h2 className="text-3xl font-bold text-[#1F2933] mt-2">Contact Us</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h3 className="font-bold text-lg text-[#1F2933] mb-6">
              Send us a Message
            </h3>
            {submitted ? (
              <div
                className="text-center py-8 text-green-600"
                data-ocid="contact.success_state"
              >
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm text-gray-500 mt-1">
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Full Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Mobile Number
                  </label>
                  <Input
                    value={form.mobile}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mobile: e.target.value }))
                    }
                    placeholder="Your mobile number"
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Your message"
                    rows={4}
                    required
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl"
                  data-ocid="contact.submit_button"
                >
                  Send Message 🚀
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-bold text-lg text-[#1F2933] mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: "📍",
                    label: "Address",
                    value: "Bilaspur, Chhattisgarh, India",
                  },
                  { icon: "📞", label: "Phone", value: "+91-9876543200" },
                  {
                    icon: "📧",
                    label: "Email",
                    value: "info@anshikaudhyog.in",
                  },
                  { icon: "💬", label: "WhatsApp", value: "+91-9876543200" },
                  {
                    icon: "🕐",
                    label: "Office Hours",
                    value: "Mon-Sat: 9AM - 6PM",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">
                        {item.label}
                      </div>
                      <div className="text-sm text-[#1F2933] font-semibold">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0B6B3A] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">🏢 Head Office</h3>
              <p className="text-green-100 text-sm">
                DMVV BHARTIY MAHILA SHAKTI FOUNDATION
              </p>
              <p className="text-green-100 text-sm mt-1">
                Bilaspur, Chhattisgarh - 495001
              </p>
              <Link to="/register">
                <Button
                  className="mt-4 bg-white text-[#0B6B3A] hover:bg-green-50 font-bold rounded-full w-full"
                  data-ocid="contact.primary_button"
                >
                  Register Now 🚀
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PWA Banner ────────────────────────────────────────────────────────────────
function PWABanner() {
  const { canInstall, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="pwa-banner no-print"
        data-ocid="pwa.toast"
      >
        <span>📱 Install ANSHIKA UDHYOG CENTER App</span>
        <Button
          size="sm"
          onClick={install}
          className="bg-white text-[#0B6B3A] hover:bg-green-50 font-bold px-4 rounded-full text-xs"
          data-ocid="pwa.primary_button"
        >
          Install
        </Button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-green-200 hover:text-white text-sm"
          data-ocid="pwa.close_button"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <MainHeader />
      <main>
        <HeroSection />
        <CounterSection />
        <AboutSection />
        <SchemesSection />
        <WomenEmpowermentSection />
        <StateCoverageSection />
        <GallerySection />
        <TestimonialsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <PWABanner />
    </div>
  );
}
