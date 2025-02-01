import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function TrialBanner() {
  const { toast } = useToast();

  const handleStartTrial = () => {
    toast({
      title: "Teste Gratuito Ativado!",
      description: "Aproveite 2 meses de recursos premium sem custo.",
    });
  };

  return (
    <div className="bg-accent/10 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">
            Experimente Grátis por 2 Meses!
          </h3>
          <p className="text-sm text-muted-foreground">
            Acesso completo a todos os recursos premium sem compromisso
          </p>
        </div>
        <Button onClick={handleStartTrial} className="whitespace-nowrap">
          Começar Teste Grátis
        </Button>
      </div>
    </div>
  );
}