import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Essencial",
    price: "2.500",
    description: "Para profissionais iniciando no mercado digital",
    features: [
      "Visibilidade moderada",
      "300 visualizações/mês",
      "Acesso básico às estatísticas",
      "30% reinvestido em marketing",
    ],
    color: "border-gray-200",
    popular: false,
  },
  {
    name: "Avançado",
    price: "3.700",
    description: "Para profissionais que querem crescer mais rápido",
    features: [
      "Alta visibilidade (topo das buscas)",
      "700 visualizações/mês",
      "Estatísticas detalhadas",
      "1 impulsionamento mensal no Instagram",
      "40% reinvestido em marketing",
    ],
    color: "border-primary",
    popular: true,
  },
  {
    name: "Premium",
    price: "4.000",
    description: "Para profissionais que querem dominar o mercado",
    features: [
      "Visibilidade máxima com destaque em banners",
      "Visualizações ilimitadas",
      "3 impulsionamentos mensais (Instagram e Facebook)",
      "Prioridade no suporte",
      "50% reinvestido em marketing",
      "Curso gratuito de marketing digital",
    ],
    color: "border-accent",
    popular: false,
  },
];

export function PricingPlans() {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Escolha o Plano Ideal</h2>
        <p className="text-muted-foreground">
          Comece com 2 meses grátis e escolha o melhor plano para seu negócio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "relative flex flex-col",
              plan.popular && "border-2 border-primary shadow-lg"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  Mais Popular
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> KZ/mês</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={cn(
                  "w-full",
                  plan.popular ? "bg-primary" : "bg-secondary"
                )}
              >
                Começar Agora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          * Os primeiros 2 meses são grátis para novos usuários. Cancele a
          qualquer momento.
        </p>
      </div>
    </div>
  );
}