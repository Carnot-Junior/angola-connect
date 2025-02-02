import { ROICalculator } from "./ROICalculator";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { TrialBanner } from "@/components/pricing/TrialBanner";
import { useNavigate } from "react-router-dom";
import { ProviderRegistrationButton } from "@/components/provider/ProviderRegistrationButton";

export function ProviderSection() {
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    navigate(`/provider-verification?plan=${planId}`);
  };

  return (
    <section className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Comece a Oferecer Seus Serviços
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Alcance mais clientes e expanda seu negócio
        </p>
        <ProviderRegistrationButton className="mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <TrialBanner />
        <ROICalculator />
        <PricingPlans onPlanSelect={handlePlanSelect} />
        
        <div className="text-center mt-8">
          <p className="text-lg text-muted-foreground mb-4">
            Pronto para começar? Registre-se agora e aproveite 2 meses grátis!
          </p>
          <ProviderRegistrationButton 
            variant="outline"
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}