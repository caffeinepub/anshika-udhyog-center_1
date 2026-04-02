import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import BranchDashboard from "@/pages/branch/BranchDashboard";
import CoreTeamDashboard from "@/pages/coreteam/CoreTeamDashboard";
import MemberDashboard from "@/pages/member/MemberDashboard";
import SHGDashboard from "@/pages/shg/SHGDashboard";
import CheckoutPage from "@/pages/shop/CheckoutPage";
import OrderTrackingPage from "@/pages/shop/OrderTrackingPage";
import ShopPage from "@/pages/shop/ShopPage";
import StaffDashboard from "@/pages/staff/StaffDashboard";

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      <Toaster position="top-right" />
    </AppProvider>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});
const memberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/member",
  component: MemberDashboard,
});
const shgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/shg",
  component: SHGDashboard,
});
const branchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/branch",
  component: BranchDashboard,
});
const staffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/staff",
  component: StaffDashboard,
});
const coreteamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/coreteam",
  component: CoreTeamDashboard,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/checkout",
  component: CheckoutPage,
});
const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/order-tracking",
  component: OrderTrackingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  adminRoute,
  memberRoute,
  shgRoute,
  branchRoute,
  staffRoute,
  coreteamRoute,
  shopRoute,
  checkoutRoute,
  orderTrackingRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
