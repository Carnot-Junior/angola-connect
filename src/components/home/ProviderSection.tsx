import { ROICalculator } from "./ROICalculator";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { TrialBanner } from "@/components/pricing/TrialBanner";
import { useNavigate } from "react-router-dom";

export function ProviderSection() {
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    navigate(`/provider-verification?plan=${planId}`);
  };

  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <TrialBanner />
        <ROICalculator />
        <PricingPlans onPlanSelect={handlePlanSelect} />
      </div>
    </section>
  );
}