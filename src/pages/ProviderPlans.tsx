import { PricingPlans } from "@/components/pricing/PricingPlans";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProviderPlans() {
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    navigate("/provider-verification", { state: { planId } });
  };

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Comece a Oferecer Seus Serviços
        </h1>
        <p className="text-xl text-muted-foreground">
          Escolha o plano ideal para o seu negócio
        </p>
      </div>

      <PricingPlans onPlanSelect={handlePlanSelect} />
    </div>
  );
}