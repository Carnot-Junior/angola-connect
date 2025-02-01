import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ROICalculator() {
  const [clientsPerMonth, setClientsPerMonth] = useState(50);
  const [averageValue, setAverageValue] = useState(2000);

  const calculatePotentialEarnings = (planMultiplier: number) => {
    return (clientsPerMonth * averageValue * planMultiplier).toLocaleString('pt-AO');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de Potencial de Ganhos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clients">Número estimado de clientes por mês</Label>
          <Input
            id="clients"
            type="number"
            value={clientsPerMonth}
            onChange={(e) => setClientsPerMonth(Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor médio por serviço (KZ)</Label>
          <Input
            id="value"
            type="number"
            value={averageValue}
            onChange={(e) => setAverageValue(Number(e.target.value))}
            min={100}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold">Plano Essencial</h4>
            <p className="text-2xl font-bold text-primary mt-2">
              {calculatePotentialEarnings(1)} KZ
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-accent/5">
            <h4 className="font-semibold">Plano Avançado</h4>
            <p className="text-2xl font-bold text-primary mt-2">
              {calculatePotentialEarnings(1.5)} KZ
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-primary/5">
            <h4 className="font-semibold">Plano Premium</h4>
            <p className="text-2xl font-bold text-primary mt-2">
              {calculatePotentialEarnings(2)} KZ
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}