import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { UserTypeProvider } from "@/contexts/UserTypeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import ProviderVerification from "@/pages/ProviderVerification";
import ProviderPlans from "@/pages/ProviderPlans";
import AdminProviders from "@/pages/AdminProviders";

function App() {
  return (
    <AuthProvider>
      <UserTypeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/checkout"
              element={
                <AuthGuard>
                  <CheckoutPage />
                </AuthGuard>
              }
            />
            <Route
              path="/provider-verification"
              element={
                <AuthGuard>
                  <ProviderVerification />
                </AuthGuard>
              }
            />
            <Route
              path="/provider-plans"
              element={
                <AuthGuard>
                  <ProviderPlans />
                </AuthGuard>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthGuard requireAdmin>
                  <AdminProviders />
                </AuthGuard>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </UserTypeProvider>
    </AuthProvider>
  );
}

export default App;