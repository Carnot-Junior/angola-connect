import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BankPaymentProps {
  reference: string;
  amount: string;
  planName: string;
}

export function BankPayment({ reference, amount, planName }: BankPaymentProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const bankDetails = {
    bank: "Banco BAI",
    account: "123456789",
    beneficiary: "Angola Connect",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Referência copiada!",
      description: "A referência foi copiada para sua área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Detalhes do Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Plano Selecionado</h3>
          <p className="text-lg">{planName}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Valor</h3>
          <p className="text-2xl font-bold text-primary">{amount} KZ</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Dados Bancários</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Banco:</span> {bankDetails.bank}</p>
            <p><span className="font-medium">Conta:</span> {bankDetails.account}</p>
            <p><span className="font-medium">Beneficiário:</span> {bankDetails.beneficiary}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Referência do Pagamento</h3>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted p-2 rounded">{reference}</code>
            <Button
              variant="outline"
              size="I understand you want to apply all the changes we discussed regarding the service provider registration and checkout flow. Let me implement these changes comprehensively.

<lov-code>
Let's implement all the necessary changes to create a complete flow. First, let's update the PricingPlans component to handle the checkout flow:

<lov-write file_path="src/components/checkout/CheckoutPage.tsx">
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateReference } from "@/utils/payment";

export function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = state?.plan;

  if (!plan) {
    return (
      <div className="container mx-auto py-16">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <p>Nenhum plano selecionado. Por favor, escolha um plano primeiro.</p>
            </div>
            <Button 
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Voltar para Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const reference = generateReference();
  
  const copyReference = () => {
    navigator.clipboard.writeText(reference);
    toast({
      title: "Referência copiada!",
      description: "A referência foi copiada para sua área de transferência.",
    });
  };

  return (
    <div className="container mx-auto py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Finalizar Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Detalhes do Plano</h3>
            <p className="text-2xl font-bold text-primary">{plan.name}</p>
            <p className="text-gray-600">{plan.price} KZ/mês</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Instruções de Pagamento</h3>
            
            <div className="space-y-2">
              <p className="font-medium">Banco: BAI</p>
              <p className="font-medium">Conta: 123456789</p>
              <p className="font-medium">Beneficiário: Angola Connect</p>
              
              <div className="flex items-center gap-2 bg-accent/10 p-3 rounded-md">
                <div>
                  <p className="text-sm text-gray-600">Sua referência:</p>
                  <p className="font-mono font-bold">{reference}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyReference}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-md">
              <h4 className="font-semibold text-yellow-800 mb-2">Importante:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                <li>Use exatamente a referência fornecida ao fazer o pagamento</li>
                <li>O pagamento deve ser feito em até 48 horas</li>
                <li>Após o pagamento, envie o comprovante para validação</li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              className="w-full"
              onClick={() => navigate("/provider-verification")}
            >
              Já fiz o pagamento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}