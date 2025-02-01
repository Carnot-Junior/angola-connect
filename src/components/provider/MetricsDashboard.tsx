import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, MousePointer, MessageCircle, Users, TrendingUp } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const MetricsCard = ({ title, value, icon, description }: MetricsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

interface MetricsDashboardProps {
  plan: {
    name: string;
    monthlyValue: number;
    marketingPercentage: number;
  };
  metrics: {
    views: number;
    clicks: number;
    messages: number;
    conversions: number;
    averageValue: number;
  };
}

export function MetricsDashboard({ plan, metrics }: MetricsDashboardProps) {
  const marketingInvestment = (plan.monthlyValue * plan.marketingPercentage) / 100;
  const estimatedROI = metrics.conversions * metrics.averageValue;
  const roiPercentage = ((estimatedROI / marketingInvestment) * 100) - 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Painel de Métricas</h2>
        <p className="text-muted-foreground">
          {plan.name} - Investimento em Marketing: {marketingInvestment.toLocaleString('pt-AO')} KZ/mês ({plan.marketingPercentage}% do valor)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Visualizações"
          value={metrics.views.toLocaleString('pt-AO')}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricsCard
          title="Cliques"
          value={metrics.clicks.toLocaleString('pt-AO')}
          icon={<MousePointer className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricsCard
          title="Mensagens"
          value={metrics.messages.toLocaleString('pt-AO')}
          icon={<MessageCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricsCard
          title="Clientes Convertidos"
          value={metrics.conversions.toLocaleString('pt-AO')}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Retorno sobre Investimento (ROI)</CardTitle>
          <CardDescription>
            Baseado em um valor médio de {metrics.averageValue.toLocaleString('pt-AO')} KZ por cliente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Investimento em Marketing
            </span>
            <span className="font-bold">
              {marketingInvestment.toLocaleString('pt-AO')} KZ
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Retorno Estimado
            </span>
            <span className="font-bold text-primary">
              {estimatedROI.toLocaleString('pt-AO')} KZ
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                ROI Percentual
              </span>
              <span className="font-bold text-primary">
                +{roiPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={Math.min(roiPercentage, 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição do Investimento em Marketing</CardTitle>
          <CardDescription>
            Como seu investimento em marketing é distribuído
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Facebook & Instagram</span>
              <span className="text-sm font-medium">
                {(marketingInvestment * 0.5).toLocaleString('pt-AO')} KZ
              </span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Google Ads</span>
              <span className="text-sm font-medium">
                {(marketingInvestment * 0.3).toLocaleString('pt-AO')} KZ
              </span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Influenciadores</span>
              <span className="text-sm font-medium">
                {(marketingInvestment * 0.2).toLocaleString('pt-AO')} KZ
              </span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}