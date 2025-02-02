import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { UserTypeProvider } from "@/contexts/UserTypeContext";
import Index from "@/pages/Index";
import { CheckoutPage } from "@/components/checkout/CheckoutPage";
import ProviderVerification from "@/pages/ProviderVerification";
import ProviderPlans from "@/pages/ProviderPlans";

function App() {
  return (
    <UserTypeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/provider-verification" element={<ProviderVerification />} />
          <Route path="/provider-plans" element={<ProviderPlans />} />
        </Routes>
        <Toaster />
      </Router>
    </UserTypeProvider>
  );
}

export default App;