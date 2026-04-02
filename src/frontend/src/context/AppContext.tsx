import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Registration {
  id: string;
  name: string;
  fatherHusbandName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  street: string;
  district: string;
  state: string;
  pincode: string;
  aadhaar: string;
  pan: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountHolder: string;
  role: string;
  status: "pending" | "approved" | "rejected" | "blocked";
  registeredAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  shgId?: string;
}

export interface Order {
  id: string;
  userMobile: string;
  userName: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";
  address: string;
  paymentMethod: string;
  createdAt: string;
}

export interface SHGGroup {
  id: string;
  name: string;
  location: string;
  state: string;
  district: string;
  memberCount: number;
  leader: string;
  leaderMobile: string;
  createdAt: string;
  members: string[];
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface KYCSubmission {
  id: string;
  mobile: string;
  userName: string;
  aadhaarDoc: string;
  panDoc: string;
  bankDoc: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  note?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  target: string;
  createdAt: string;
}

export interface AppSettings {
  siteName: string;
  tagline: string;
  contactPhone: string;
  contactEmail: string;
  whatsapp: string;
  upiId: string;
}

type WalletData = Record<
  string,
  {
    balance: number;
    transactions: {
      id: string;
      desc: string;
      amount: number;
      type: "credit" | "debit";
      date: string;
    }[];
  }
>;

interface AuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  userRole: string;
  userMobile: string;
  userName: string;
}

interface AppContextType {
  auth: AuthState;
  registrations: Registration[];
  accessCodes: Record<string, string>;
  accessCodeStatus: Record<string, "active" | "disabled">;
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  kyc: KYCSubmission[];
  shgs: SHGGroup[];
  notifications: Notification[];
  settings: AppSettings;
  wallet: WalletData;
  loginAdmin: (id: string, password: string) => boolean;
  loginUser: (mobile: string, code: string, role: string) => boolean;
  logout: () => void;
  addRegistration: (
    reg: Omit<Registration, "id" | "status" | "registeredAt">,
  ) => void;
  updateRegistrationStatus: (
    id: string,
    status: Registration["status"],
  ) => void;
  deleteRegistration: (id: string) => void;
  generateAccessCode: (mobile: string) => string;
  resetAccessCode: (mobile: string) => string;
  toggleAccessCode: (mobile: string) => void;
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: Omit<Order, "id" | "createdAt">) => string;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  addKYC: (k: Omit<KYCSubmission, "id" | "submittedAt">) => void;
  updateKYCStatus: (
    id: string,
    status: KYCSubmission["status"],
    note?: string,
  ) => void;
  addSHG: (s: Omit<SHGGroup, "id" | "createdAt">) => void;
  updateSHG: (id: string, s: Partial<SHGGroup>) => void;
  deleteSHG: (id: string) => void;
  addNotification: (n: Omit<Notification, "id" | "createdAt">) => void;
  updateSettings: (s: Partial<AppSettings>) => void;
  addWalletTransaction: (
    mobile: string,
    amount: number,
    type: "credit" | "debit",
    desc: string,
  ) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const SAMPLE_REGISTRATIONS: Registration[] = [
  {
    id: "REG001",
    name: "Priya Sharma",
    fatherHusbandName: "Ramesh Sharma",
    dob: "1990-05-15",
    gender: "Female",
    mobile: "9876543210",
    email: "priya@example.com",
    street: "MG Road, Ward 5",
    district: "Bilaspur",
    state: "Chhattisgarh",
    pincode: "495001",
    aadhaar: "1234-5678-9012",
    pan: "ABCDE1234F",
    bankName: "State Bank of India",
    accountNumber: "12345678901",
    ifsc: "SBIN0001234",
    accountHolder: "Priya Sharma",
    role: "Member",
    status: "approved",
    registeredAt: "2024-01-15",
  },
  {
    id: "REG002",
    name: "Sunita Devi",
    fatherHusbandName: "Mohan Lal",
    dob: "1985-08-22",
    gender: "Female",
    mobile: "9876543211",
    email: "sunita@example.com",
    street: "Gandhi Nagar, Block A",
    district: "Raipur",
    state: "Chhattisgarh",
    pincode: "492001",
    aadhaar: "2345-6789-0123",
    pan: "FGHIJ5678K",
    bankName: "Bank of India",
    accountNumber: "23456789012",
    ifsc: "BKID0002345",
    accountHolder: "Sunita Devi",
    role: "SHG Leader",
    status: "approved",
    registeredAt: "2024-01-20",
  },
  {
    id: "REG003",
    name: "Kavita Patel",
    fatherHusbandName: "Suresh Patel",
    dob: "1992-11-10",
    gender: "Female",
    mobile: "9876543212",
    email: "kavita@example.com",
    street: "Nehru Chowk, Sector 3",
    district: "Durg",
    state: "Chhattisgarh",
    pincode: "491001",
    aadhaar: "3456-7890-1234",
    pan: "KLMNO9012P",
    bankName: "Punjab National Bank",
    accountNumber: "34567890123",
    ifsc: "PUNB0003456",
    accountHolder: "Kavita Patel",
    role: "Center Coordinator",
    status: "approved",
    registeredAt: "2024-02-05",
  },
  {
    id: "REG004",
    name: "Meena Yadav",
    fatherHusbandName: "Vijay Yadav",
    dob: "1988-03-30",
    gender: "Female",
    mobile: "9876543213",
    email: "meena@example.com",
    street: "Indira Colony",
    district: "Korba",
    state: "Chhattisgarh",
    pincode: "495677",
    aadhaar: "4567-8901-2345",
    pan: "PQRST3456Q",
    bankName: "Canara Bank",
    accountNumber: "45678901234",
    ifsc: "CNRB0004567",
    accountHolder: "Meena Yadav",
    role: "Member",
    status: "pending",
    registeredAt: "2024-03-10",
  },
  {
    id: "REG005",
    name: "Anita Singh",
    fatherHusbandName: "Ravi Singh",
    dob: "1995-07-18",
    gender: "Female",
    mobile: "9876543214",
    email: "anita@example.com",
    street: "Sadar Bazar, Plot 12",
    district: "Rajnandgaon",
    state: "Chhattisgarh",
    pincode: "491441",
    aadhaar: "5678-9012-3456",
    pan: "UVWXY7890R",
    bankName: "Union Bank",
    accountNumber: "56789012345",
    ifsc: "UBIN0005678",
    accountHolder: "Anita Singh",
    role: "Staff",
    status: "approved",
    registeredAt: "2024-03-15",
  },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "P001",
    name: "Handwoven Silk Saree",
    category: "Textiles",
    price: 1200,
    stock: 25,
    description:
      "Beautiful handwoven silk saree made by skilled artisans from Chhattisgarh. Natural dyes, traditional patterns.",
    imageUrl: "",
    shgId: "SHG001",
  },
  {
    id: "P002",
    name: "Bamboo Craft Set",
    category: "Handicrafts",
    price: 650,
    stock: 40,
    description:
      "Eco-friendly bamboo craft set including baskets, decorative items. Handcrafted by tribal women artists.",
    imageUrl: "",
    shgId: "SHG001",
  },
  {
    id: "P003",
    name: "Organic Turmeric Powder",
    category: "Organic Products",
    price: 180,
    stock: 100,
    description:
      "Pure organic turmeric from Chhattisgarh farms. Grown without pesticides by women farmers. 500g pack.",
    imageUrl: "",
    shgId: "SHG002",
  },
  {
    id: "P004",
    name: "Madhubani Art Painting",
    category: "Art & Craft",
    price: 2500,
    stock: 10,
    description:
      "Authentic Madhubani painting on canvas, 12x16 inches. Made by trained women artists.",
    imageUrl: "",
    shgId: "SHG002",
  },
  {
    id: "P005",
    name: "Herbal Soap Collection",
    category: "Organic Products",
    price: 320,
    stock: 60,
    description:
      "Set of 5 herbal soaps - neem, turmeric, rose, sandalwood, lavender. Handmade by women SHG.",
    imageUrl: "",
    shgId: "SHG001",
  },
  {
    id: "P006",
    name: "Jute Bag Set",
    category: "Eco Products",
    price: 480,
    stock: 35,
    description:
      "Set of 3 eco-friendly jute bags in various sizes. Handmade, durable, and stylish. Perfect for shopping.",
    imageUrl: "",
    shgId: "SHG002",
  },
];

const SAMPLE_SHGS: SHGGroup[] = [
  {
    id: "SHG001",
    name: "Shakti Mahila Mandal",
    location: "Takhatpur",
    state: "Chhattisgarh",
    district: "Bilaspur",
    memberCount: 12,
    leader: "Sunita Devi",
    leaderMobile: "9876543211",
    createdAt: "2023-06-01",
    members: [
      "Priya Sharma",
      "Kavita Patel",
      "Meena Yadav",
      "Anita Singh",
      "Pooja Tiwari",
      "Rekha Verma",
    ],
  },
  {
    id: "SHG002",
    name: "Nari Shakti Group",
    location: "Mungeli",
    state: "Chhattisgarh",
    district: "Mungeli",
    memberCount: 10,
    leader: "Kavita Patel",
    leaderMobile: "9876543212",
    createdAt: "2023-08-15",
    members: [
      "Sunita Devi",
      "Priya Sharma",
      "Anita Singh",
      "Seema Bai",
      "Lalita Sahu",
    ],
  },
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD001",
    userMobile: "9876543210",
    userName: "Priya Sharma",
    items: [
      {
        productId: "P001",
        productName: "Handwoven Silk Saree",
        quantity: 1,
        price: 1200,
      },
    ],
    total: 1200,
    status: "delivered",
    address: "MG Road, Bilaspur, CG 495001",
    paymentMethod: "UPI",
    createdAt: "2024-03-01",
  },
  {
    id: "ORD002",
    userMobile: "9876543211",
    userName: "Sunita Devi",
    items: [
      {
        productId: "P002",
        productName: "Bamboo Craft Set",
        quantity: 2,
        price: 650,
      },
      {
        productId: "P003",
        productName: "Organic Turmeric",
        quantity: 1,
        price: 180,
      },
    ],
    total: 1480,
    status: "shipped",
    address: "Gandhi Nagar, Raipur, CG 492001",
    paymentMethod: "QR",
    createdAt: "2024-03-10",
  },
  {
    id: "ORD003",
    userMobile: "9876543212",
    userName: "Kavita Patel",
    items: [
      {
        productId: "P004",
        productName: "Madhubani Art Painting",
        quantity: 1,
        price: 2500,
      },
    ],
    total: 2500,
    status: "confirmed",
    address: "Nehru Chowk, Durg, CG 491001",
    paymentMethod: "UPI",
    createdAt: "2024-03-18",
  },
];

const SAMPLE_WALLET: WalletData = {
  "9876543210": {
    balance: 2500,
    transactions: [
      {
        id: "T001",
        desc: "Commission - Saree sale",
        amount: 500,
        type: "credit",
        date: "2024-03-01",
      },
      {
        id: "T002",
        desc: "Training bonus",
        amount: 2000,
        type: "credit",
        date: "2024-02-15",
      },
    ],
  },
  "9876543211": {
    balance: 1800,
    transactions: [
      {
        id: "T003",
        desc: "SHG commission",
        amount: 1800,
        type: "credit",
        date: "2024-03-10",
      },
    ],
  },
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateCode(): string {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() =>
    loadFromStorage("auc_auth", {
      isAdmin: false,
      isLoggedIn: false,
      userRole: "",
      userMobile: "",
      userName: "",
    }),
  );

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const stored = loadFromStorage<Registration[]>("auc_registrations", []);
    if (stored.length === 0) {
      saveToStorage("auc_registrations", SAMPLE_REGISTRATIONS);
      return SAMPLE_REGISTRATIONS;
    }
    return stored;
  });

  const [accessCodes, setAccessCodes] = useState<Record<string, string>>(() => {
    const stored = loadFromStorage<Record<string, string>>(
      "auc_access_codes",
      {},
    );
    if (Object.keys(stored).length === 0) {
      const codes: Record<string, string> = {};
      for (const r of SAMPLE_REGISTRATIONS.filter(
        (r) => r.status === "approved",
      )) {
        codes[r.mobile] = generateCode();
      }
      saveToStorage("auc_access_codes", codes);
      return codes;
    }
    return stored;
  });

  const [accessCodeStatus, setAccessCodeStatus] = useState<
    Record<string, "active" | "disabled">
  >(() => loadFromStorage("auc_access_code_status", {}));

  const [products, setProducts] = useState<Product[]>(() => {
    const stored = loadFromStorage<Product[]>("auc_products", []);
    if (stored.length === 0) {
      saveToStorage("auc_products", SAMPLE_PRODUCTS);
      return SAMPLE_PRODUCTS;
    }
    return stored;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = loadFromStorage<Order[]>("auc_orders", []);
    if (stored.length === 0) {
      saveToStorage("auc_orders", SAMPLE_ORDERS);
      return SAMPLE_ORDERS;
    }
    return stored;
  });

  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage("auc_cart", []),
  );

  const [kyc, setKyc] = useState<KYCSubmission[]>(() => {
    const stored = loadFromStorage<KYCSubmission[]>("auc_kyc", []);
    if (stored.length === 0) {
      const sampleKyc: KYCSubmission[] = [
        {
          id: "KYC001",
          mobile: "9876543210",
          userName: "Priya Sharma",
          aadhaarDoc: "aadhaar_priya.pdf",
          panDoc: "pan_priya.pdf",
          bankDoc: "bank_priya.pdf",
          status: "approved",
          submittedAt: "2024-01-16",
        },
        {
          id: "KYC002",
          mobile: "9876543213",
          userName: "Meena Yadav",
          aadhaarDoc: "aadhaar_meena.pdf",
          panDoc: "pan_meena.pdf",
          bankDoc: "bank_meena.pdf",
          status: "pending",
          submittedAt: "2024-03-11",
        },
      ];
      saveToStorage("auc_kyc", sampleKyc);
      return sampleKyc;
    }
    return stored;
  });

  const [shgs, setShgs] = useState<SHGGroup[]>(() => {
    const stored = loadFromStorage<SHGGroup[]>("auc_shgs", []);
    if (stored.length === 0) {
      saveToStorage("auc_shgs", SAMPLE_SHGS);
      return SAMPLE_SHGS;
    }
    return stored;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() =>
    loadFromStorage("auc_notifications", []),
  );

  const [settings, setSettings] = useState<AppSettings>(() =>
    loadFromStorage("auc_settings", {
      siteName: "ANSHIKA UDHYOG CENTER",
      tagline: "Self Employment Revolution Scheme",
      contactPhone: "+91-9876543200",
      contactEmail: "info@anshikaudhyog.in",
      whatsapp: "+91-9876543200",
      upiId: "anshikaudhyog@upi",
    }),
  );

  const [wallet, setWallet] = useState<WalletData>(() =>
    loadFromStorage("auc_wallet", SAMPLE_WALLET),
  );

  // Persist changes
  useEffect(() => {
    saveToStorage("auc_auth", auth);
  }, [auth]);
  useEffect(() => {
    saveToStorage("auc_registrations", registrations);
  }, [registrations]);
  useEffect(() => {
    saveToStorage("auc_access_codes", accessCodes);
  }, [accessCodes]);
  useEffect(() => {
    saveToStorage("auc_access_code_status", accessCodeStatus);
  }, [accessCodeStatus]);
  useEffect(() => {
    saveToStorage("auc_products", products);
  }, [products]);
  useEffect(() => {
    saveToStorage("auc_orders", orders);
  }, [orders]);
  useEffect(() => {
    saveToStorage("auc_cart", cart);
  }, [cart]);
  useEffect(() => {
    saveToStorage("auc_kyc", kyc);
  }, [kyc]);
  useEffect(() => {
    saveToStorage("auc_shgs", shgs);
  }, [shgs]);
  useEffect(() => {
    saveToStorage("auc_notifications", notifications);
  }, [notifications]);
  useEffect(() => {
    saveToStorage("auc_settings", settings);
  }, [settings]);
  useEffect(() => {
    saveToStorage("auc_wallet", wallet);
  }, [wallet]);

  const loginAdmin = useCallback((id: string, password: string): boolean => {
    if (id === "admin" && password === "504560@AUC") {
      const newAuth = {
        isAdmin: true,
        isLoggedIn: true,
        userRole: "admin",
        userMobile: "",
        userName: "Admin",
      };
      setAuth(newAuth);
      localStorage.setItem(
        "auc_admin_session",
        JSON.stringify({ loggedIn: true, timestamp: Date.now() }),
      );
      return true;
    }
    return false;
  }, []);

  const loginUser = useCallback(
    (mobile: string, code: string, role: string): boolean => {
      const storedCode = accessCodes[mobile];
      const status = accessCodeStatus[mobile];
      if (storedCode && storedCode === code && status !== "disabled") {
        const reg = registrations.find((r) => r.mobile === mobile);
        if (!reg || reg.status !== "approved") return false;
        const newAuth = {
          isAdmin: false,
          isLoggedIn: true,
          userRole: role || reg.role,
          userMobile: mobile,
          userName: reg.name,
        };
        setAuth(newAuth);
        return true;
      }
      return false;
    },
    [accessCodes, accessCodeStatus, registrations],
  );

  const logout = useCallback(() => {
    setAuth({
      isAdmin: false,
      isLoggedIn: false,
      userRole: "",
      userMobile: "",
      userName: "",
    });
    localStorage.removeItem("auc_admin_session");
  }, []);

  const addRegistration = useCallback(
    (reg: Omit<Registration, "id" | "status" | "registeredAt">) => {
      const newReg: Registration = {
        ...reg,
        id: `REG${generateId()}`,
        status: "pending",
        registeredAt: new Date().toISOString().split("T")[0],
      };
      setRegistrations((prev) => [newReg, ...prev]);
    },
    [],
  );

  const updateRegistrationStatus = useCallback(
    (id: string, status: Registration["status"]) => {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      );
      if (status === "approved") {
        const reg = registrations.find((r) => r.id === id);
        if (reg && !accessCodes[reg.mobile]) {
          const code = generateCode();
          setAccessCodes((prev) => ({ ...prev, [reg.mobile]: code }));
          setAccessCodeStatus((prev) => ({ ...prev, [reg.mobile]: "active" }));
        }
      }
    },
    [registrations, accessCodes],
  );

  const deleteRegistration = useCallback((id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const generateAccessCode = useCallback((mobile: string): string => {
    const code = generateCode();
    setAccessCodes((prev) => ({ ...prev, [mobile]: code }));
    setAccessCodeStatus((prev) => ({ ...prev, [mobile]: "active" }));
    return code;
  }, []);

  const resetAccessCode = useCallback((mobile: string): string => {
    const code = generateCode();
    setAccessCodes((prev) => ({ ...prev, [mobile]: code }));
    return code;
  }, []);

  const toggleAccessCode = useCallback((mobile: string) => {
    setAccessCodeStatus((prev) => ({
      ...prev,
      [mobile]: prev[mobile] === "disabled" ? "active" : "disabled",
    }));
  }, []);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [{ ...p, id: `P${generateId()}` }, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addOrder = useCallback((o: Omit<Order, "id" | "createdAt">): string => {
    const id = `ORD${generateId()}`;
    const newOrder: Order = {
      ...o,
      id,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return id;
  }, []);

  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"]) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    },
    [],
  );

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.productId === item.productId);
      if (exists)
        return prev.map((c) =>
          c.productId === item.productId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c,
        );
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }, []);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    setCart((prev) =>
      prev.map((c) =>
        c.productId === productId ? { ...c, quantity: qty } : c,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addKYC = useCallback(
    (k: Omit<KYCSubmission, "id" | "submittedAt">) => {
      const existing = kyc.find((x) => x.mobile === k.mobile);
      if (existing) {
        setKyc((prev) =>
          prev.map((x) =>
            x.mobile === k.mobile
              ? {
                  ...x,
                  ...k,
                  status: "pending",
                  submittedAt: new Date().toISOString().split("T")[0],
                }
              : x,
          ),
        );
      } else {
        setKyc((prev) => [
          {
            ...k,
            id: `KYC${generateId()}`,
            submittedAt: new Date().toISOString().split("T")[0],
          },
          ...prev,
        ]);
      }
    },
    [kyc],
  );

  const updateKYCStatus = useCallback(
    (id: string, status: KYCSubmission["status"], note?: string) => {
      setKyc((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status, note } : k)),
      );
    },
    [],
  );

  const addSHG = useCallback((s: Omit<SHGGroup, "id" | "createdAt">) => {
    setShgs((prev) => [
      {
        ...s,
        id: `SHG${generateId()}`,
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  }, []);

  const updateSHG = useCallback((id: string, s: Partial<SHGGroup>) => {
    setShgs((prev) => prev.map((g) => (g.id === id ? { ...g, ...s } : g)));
  }, []);

  const deleteSHG = useCallback((id: string) => {
    setShgs((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const addNotification = useCallback(
    (n: Omit<Notification, "id" | "createdAt">) => {
      setNotifications((prev) => [
        { ...n, id: generateId(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    },
    [],
  );

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...s }));
  }, []);

  const addWalletTransaction = useCallback(
    (
      mobile: string,
      amount: number,
      type: "credit" | "debit",
      desc: string,
    ) => {
      setWallet((prev) => {
        const current = prev[mobile] || { balance: 0, transactions: [] };
        const newBalance =
          type === "credit"
            ? current.balance + amount
            : current.balance - amount;
        return {
          ...prev,
          [mobile]: {
            balance: Math.max(0, newBalance),
            transactions: [
              {
                id: generateId(),
                desc,
                amount,
                type,
                date: new Date().toISOString().split("T")[0],
              },
              ...current.transactions,
            ],
          },
        };
      });
    },
    [],
  );

  const value: AppContextType = {
    auth,
    registrations,
    accessCodes,
    accessCodeStatus,
    products,
    orders,
    cart,
    kyc,
    shgs,
    notifications,
    settings,
    wallet,
    loginAdmin,
    loginUser,
    logout,
    addRegistration,
    updateRegistrationStatus,
    deleteRegistration,
    generateAccessCode,
    resetAccessCode,
    toggleAccessCode,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    addKYC,
    updateKYCStatus,
    addSHG,
    updateSHG,
    deleteSHG,
    addNotification,
    updateSettings,
    addWalletTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
