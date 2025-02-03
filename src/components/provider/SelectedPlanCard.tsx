import { Card } from "@/components/ui/card";

interface SelectedPlanCardProps {
  name: string;
  description: string;
  price: string;
}

export function SelectedPlanCard({ name, description, price }: SelectedPlanCardProps) {
  return (
    <Card className="bg-accent/10 p-4 rounded-lg mb-6">
      <h2 className="font-semibold mb-2">Plano Selecionado: {name}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-sm font-medium mt-2">{price} KZ/mês</p>
    </Card>
  );
}