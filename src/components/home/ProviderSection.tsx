import { ROICalculator } from "./ROICalculator";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { TrialBanner } from "@/components/pricing/TrialBanner";

export function ProviderSection() {
  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <TrialBanner />
        <ROICalculator />
        <PricingPlans />
      </div>
    </section>
  );
}