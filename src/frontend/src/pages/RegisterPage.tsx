import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const ROLES = [
  "Member",
  "SHG Leader",
  "Center Coordinator",
  "Branch Manager",
  "Staff",
  "HR",
  "Core Team",
];
const BANKS = [
  "State Bank of India",
  "Bank of India",
  "Punjab National Bank",
  "Canara Bank",
  "Bank of Baroda",
  "Union Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
];

export default function RegisterPage() {
  const { addRegistration } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    fatherHusbandName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    street: "",
    district: "",
    state: "",
    pincode: "",
    aadhaar: "",
    pan: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    accountHolder: "",
    role: "",
  });

  const set = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRegistration(form);
    setSubmitted(true);
    toast.success("Registration submitted successfully!");
  };

  const stepLabels = ["Personal Info", "Address & Documents", "Bank & Role"];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#EAF6EE] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center"
          data-ocid="register.success_state"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#0B6B3A] mb-3">
            Registration Submitted!
          </h2>
          <p className="text-gray-600 mb-2">
            Your application has been received and is under review.
          </p>
          <p className="text-gray-600 mb-6">
            Admin will verify your documents and generate your{" "}
            <strong>Access Code</strong> after approval.
          </p>
          <div className="bg-[#EAF6EE] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#0B6B3A] font-medium">
              ⏳ Processing time: 2-3 working days
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: "/" })}
            className="bg-[#0B6B3A] text-white w-full rounded-xl"
            data-ocid="register.primary_button"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF6EE]">
      <div className="bg-[#0B6B3A] text-white text-xs py-1.5 text-center">
        🇮🇳 DMVV BHARTIY MAHILA SHAKTI FOUNDATION | ISO 9001:2015 | MCA
        Registered
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img
              src="/assets/generated/auc-logo-mark-transparent.dim_200x200.png"
              alt="AUC"
              className="h-16 w-16 rounded-full mx-auto mb-2 object-cover"
            />
          </Link>
          <h1 className="font-extrabold text-[#0B6B3A] text-xl">
            New Member Registration
          </h1>
          <p className="text-gray-600 text-sm">ANSHIKA UDHYOG CENTER</p>
        </div>

        {/* Step indicator */}
        <div
          className="flex items-center gap-2 mb-8"
          data-ocid="register.panel"
        >
          {stepLabels.map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors ${
                  step > i + 1
                    ? "bg-[#0B6B3A] text-white"
                    : step === i + 1
                      ? "bg-[#0B6B3A] text-white ring-4 ring-[#0B6B3A]/20"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= i + 1 ? "text-[#0B6B3A]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div
                  className={`hidden sm:block absolute w-full h-0.5 top-4 left-1/2 transition-colors ${
                    step > i + 1 ? "bg-[#0B6B3A]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="bg-[#0B6B3A] px-6 py-4 text-white">
            <h2 className="font-bold">
              Step {step}: {stepLabels[step - 1]}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Full Name *
                      </label>
                      <Input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Full name"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Father/Husband Name *
                      </label>
                      <Input
                        value={form.fatherHusbandName}
                        onChange={(e) =>
                          set("fatherHusbandName", e.target.value)
                        }
                        placeholder="Father/Husband name"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Date of Birth *
                      </label>
                      <Input
                        type="date"
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Gender *
                      </label>
                      <Select onValueChange={(v) => set("gender", v)}>
                        <SelectTrigger data-ocid="register.select">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Mobile Number *
                      </label>
                      <Input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => set("mobile", e.target.value)}
                        placeholder="10-digit mobile"
                        pattern="[0-9]{10}"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="Email address"
                        data-ocid="register.input"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl"
                    data-ocid="register.primary_button"
                  >
                    Next: Address & Documents →
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Street Address *
                      </label>
                      <Input
                        value={form.street}
                        onChange={(e) => set("street", e.target.value)}
                        placeholder="Street, Ward, Block"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        District *
                      </label>
                      <Input
                        value={form.district}
                        onChange={(e) => set("district", e.target.value)}
                        placeholder="District"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        State *
                      </label>
                      <Select onValueChange={(v) => set("state", v)}>
                        <SelectTrigger data-ocid="register.select">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Pincode *
                      </label>
                      <Input
                        value={form.pincode}
                        onChange={(e) => set("pincode", e.target.value)}
                        placeholder="6-digit pincode"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Aadhaar Number *
                      </label>
                      <Input
                        value={form.aadhaar}
                        onChange={(e) => set("aadhaar", e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        PAN Number *
                      </label>
                      <Input
                        value={form.pan}
                        onChange={(e) =>
                          set("pan", e.target.value.toUpperCase())
                        }
                        placeholder="ABCDE1234F"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 border-[#0B6B3A] text-[#0B6B3A]"
                      data-ocid="register.secondary_button"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl"
                      data-ocid="register.primary_button"
                    >
                      Next: Bank Details →
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Bank Name *
                      </label>
                      <Select onValueChange={(v) => set("bankName", v)}>
                        <SelectTrigger data-ocid="register.select">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {BANKS.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Account Number *
                      </label>
                      <Input
                        value={form.accountNumber}
                        onChange={(e) => set("accountNumber", e.target.value)}
                        placeholder="Account number"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        IFSC Code *
                      </label>
                      <Input
                        value={form.ifsc}
                        onChange={(e) =>
                          set("ifsc", e.target.value.toUpperCase())
                        }
                        placeholder="IFSC code"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Account Holder Name *
                      </label>
                      <Input
                        value={form.accountHolder}
                        onChange={(e) => set("accountHolder", e.target.value)}
                        placeholder="As per bank records"
                        required
                        data-ocid="register.input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Role Applying For *
                      </label>
                      <Select onValueChange={(v) => set("role", v)}>
                        <SelectTrigger data-ocid="register.select">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="bg-[#EAF6EE] rounded-xl p-4 text-sm text-gray-600">
                    <p>
                      ℹ️ After submission, admin will review your application and
                      provide an Access Code after approval (2-3 working days).
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 border-[#0B6B3A] text-[#0B6B3A]"
                      data-ocid="register.secondary_button"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#0B6B3A] hover:bg-[#1F8A4C] text-white rounded-xl"
                      data-ocid="register.submit_button"
                    >
                      🚀 Submit Registration
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-[#0B6B3A] text-sm hover:underline"
            data-ocid="register.link"
          >
            Already registered? Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
