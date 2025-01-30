import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReparosPage from "./pages/Reparos";
import AguaPage from "./pages/Agua";
import ElectricidadePage from "./pages/Electricidade";
import CasaPage from "./pages/Casa";
import ComprasPage from "./pages/Compras";
import SaudePage from "./pages/Saude";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reparos" element={<ReparosPage />} />
          <Route path="/agua" element={<AguaPage />} />
          <Route path="/electricidade" element={<ElectricidadePage />} />
          <Route path="/casa" element={<CasaPage />} />
          <Route path="/compras" element={<ComprasPage />} />
          <Route path="/saude" element={<SaudePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;