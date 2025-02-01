import { MetricsDashboard } from "@/components/provider/MetricsDashboard";

// Example data - in a real app, this would come from your backend
const mockData = {
  plan: {
    name: "Plano Avançado",
    monthlyValue: 3700,
    marketingPercentage: 40,
  },
  metrics: {
    views: 1200,
    clicks: 150,
    messages: 50,
    conversions: 10,
    averageValue: 2000,
  },
};

export default function ProviderDashboard() {
  return (
    <div className="container mx-auto py-8">
      <MetricsDashboard plan={mockData.plan} metrics={mockData.metrics} />
    </div>
  );
}