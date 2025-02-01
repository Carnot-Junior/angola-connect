import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agua from "./pages/Agua";
import Casa from "./pages/Casa";
import Compras from "./pages/Compras";
import Electricidade from "./pages/Electricidade";
import Reparos from "./pages/Reparos";
import Saude from "./pages/Saude";
import NotFound from "./pages/NotFound";
import ProviderProfile from "./pages/ProviderProfile";
import ProviderVerification from "./pages/ProviderVerification";
import AdminProviders from "./pages/AdminProviders";
import { UserTypeProvider } from "./contexts/UserTypeContext";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <UserTypeProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agua" element={<Agua />} />
          <Route path="/casa" element={<Casa />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/electricidade" element={<Electricidade />} />
          <Route path="/reparos" element={<Reparos />} />
          <Route path="/saude" element={<Saude />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />
          <Route path="/provider-verification" element={<ProviderVerification />} />
          <Route path="/admin/providers" element={<AdminProviders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </UserTypeProvider>
    </Router>
  );
}

export default App;