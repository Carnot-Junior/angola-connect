import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Dados mockados para exemplo
const mockProviders = [
  {
    id: 1,
    fullName: "João da Silva",
    idNumber: "123456789",
    phoneNumber: "+244 923 456 789",
    address: "Rua Principal, 123, Luanda",
    experience: "5 anos de experiência em serviços elétricos...",
    status: "pending",
  },
  {
    id: 2,
    fullName: "Maria Santos",
    idNumber: "987654321",
    phoneNumber: "+244 923 456 790",
    address: "Avenida Central, 456, Luanda",
    experience: "10 anos de experiência em encanamento...",
    status: "approved",
  },
];

export default function AdminProviders() {
  const [providers, setProviders] = useState(mockProviders);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setProviders(
      providers.map((provider) =>
        provider.id === id
          ? { ...provider, status: "approved" }
          : provider
      )
    );
    toast({
      title: "Provedor aprovado",
      description: "O provedor foi aprovado com sucesso.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestão de Provedores</h1>
        </div>

        <div className="grid gap-6">
          {providers.map((provider) => (
            <Card key={provider.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{provider.fullName}</CardTitle>
                    <CardDescription>ID: {provider.idNumber}</CardDescription>
                  </div>
                  <Badge
                    variant={provider.status === "approved" ? "default" : "secondary"}
                  >
                    {provider.status === "approved" ? "Aprovado" : "Pendente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Contato</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experiência</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.experience}
                    </p>
                  </div>
                  {provider.status === "pending" && (
                    <Button
                      className="w-full"
                      onClick={() => handleApprove(provider.id)}
                    >
                      Aprovar Provedor
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}