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
              size="icon"
              onClick={() => copyToClipboard(reference)}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}