import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  reference: string;
  amount: string;
  expiryDate: string;
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const { plan, providerData } = location.state || {};
  
  if (!plan || !providerData) {
    navigate("/provider-plans");
    return null;
  }

  const paymentDetails: PaymentDetails = {
    bankName: "Banco BAI",
    accountNumber: "00000000000000000",
    reference: generateReference(),
    amount: `${plan.price} KZ`,
    expiryDate: getExpiryDate(),
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Referência copiada para a área de transferência",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Pagamento</h1>
        
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Plano</h2>
          <div className="space-y-2 mb-6">
            <p><span className="font-medium">Plano:</span> {plan.name}</p>
            <p><span className="font-medium">Valor:</span> {plan.price} KZ/mês</p>
            <p className="text-sm text-muted-foreground">2 meses grátis incluídos</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Instruções de Pagamento</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Banco</p>
              <p>{paymentDetails.bankName}</p>
            </div>
            
            <div>
              <p className="font-medium mb-1">Número da Conta</p>
              <p>{paymentDetails.accountNumber}</p>
            </div>
            
            <div>
              <p className="font-medium mb-1">Referência</p>
              <div className="flex items-center gap-2">
                <p className="font-mono bg-accent/20 px-3 py-1 rounded">
                  {paymentDetails.reference}
                </p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(paymentDetails.reference)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-1">Valor a Pagar</p>
              <p className="text-lg font-semibold text-primary">
                {paymentDetails.amount}
              </p>
            </div>
            
            <div>
              <p className="font-medium mb-1">Prazo para Pagamento</p>
              <p>{paymentDetails.expiryDate}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-accent/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Próximos Passos:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Faça uma transferência bancária com o valor exato indicado</li>
                <li>Use a referência fornecida na descrição da transferência</li>
                <li>Aguarde a confirmação do pagamento (pode levar até 24 horas)</li>
                <li>Você receberá uma notificação quando o pagamento for confirmado</li>
              </ol>
            </div>

            <Button 
              className="w-full"
              onClick={() => navigate("/provider-dashboard")}
            >
              Voltar para o Painel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Helper functions
function generateReference(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `REF${timestamp}${random}`;
}

function getExpiryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toLocaleDateString('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}