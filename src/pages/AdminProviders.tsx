import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";

interface ProviderProfile {
  full_name: string | null;
  email: string | null;
}

type Provider = {
  id: string;
  user_id: string;
  business_name: string | null;
  description: string | null;
  status: "pending" | "approved" | "rejected" | "suspended";
  verified: boolean | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  profiles: ProviderProfile | null;
};

export default function AdminProviders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const { data: providers, refetch } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("providers")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Provider[];
    },
  });

  const updateProviderStatus = async (
    providerId: string,
    status: Provider["status"]
  ) => {
    const { error } = await supabase
      .from("providers")
      .update({ status })
      .eq("id", providerId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Status atualizado com sucesso",
      description: `O prestador foi ${
        status === "approved" ? "aprovado" : "rejeitado"
      }.`,
    });

    refetch();
    setSelectedProvider(null);
  };

  const deleteProvider = async (providerId: string) => {
    const { error } = await supabase
      .from("providers")
      .delete()
      .eq("id", providerId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir prestador",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Prestador excluído com sucesso",
      description: "O prestador foi removido do sistema.",
    });

    refetch();
    setSelectedProvider(null);
  };

  const getStatusBadge = (status: Provider["status"]) => {
    const variants = {
      pending: "default",
      approved: "secondary",
      rejected: "destructive",
      suspended: "outline",
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status === "pending" && "Pendente"}
        {status === "approved" && "Aprovado"}
        {status === "rejected" && "Rejeitado"}
        {status === "suspended" && "Suspenso"}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Início
        </Button>
        <h1 className="text-3xl font-bold">Gestão de Prestadores</h1>
        <p className="text-muted-foreground">
          Gerencie os prestadores de serviço da plataforma
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers?.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>{provider.profiles?.full_name}</TableCell>
                <TableCell>{provider.business_name}</TableCell>
                <TableCell>{provider.profiles?.email}</TableCell>
                <TableCell>{provider.phone}</TableCell>
                <TableCell>{getStatusBadge(provider.status)}</TableCell>
                <TableCell>
                  {new Date(provider.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedProvider}
        onOpenChange={() => setSelectedProvider(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Prestador</DialogTitle>
            <DialogDescription>
              Revise as informações e atualize o status do prestador
            </DialogDescription>
          </DialogHeader>

          {selectedProvider && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Nome Completo</h4>
                <p>{selectedProvider.profiles?.full_name}</p>
              </div>
              <div>
                <h4 className="font-medium">Nome da Empresa</h4>
                <p>{selectedProvider.business_name}</p>
              </div>
              <div>
                <h4 className="font-medium">Descrição</h4>
                <p>{selectedProvider.description}</p>
              </div>
              <div>
                <h4 className="font-medium">Status Atual</h4>
                <p>{getStatusBadge(selectedProvider.status)}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            {selectedProvider?.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() =>
                    updateProviderStatus(selectedProvider.id, "rejected")
                  }
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Rejeitar
                </Button>
                <Button
                  onClick={() =>
                    updateProviderStatus(selectedProvider.id, "approved")
                  }
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Aprovar
                </Button>
              </>
            )}
            {selectedProvider?.status === "approved" && (
              <Button
                variant="destructive"
                onClick={() =>
                  updateProviderStatus(selectedProvider.id, "suspended")
                }
              >
                <XCircle className="mr-2 h-4 w-4" />
                Suspender
              </Button>
            )}
            {(selectedProvider?.status === "rejected" ||
              selectedProvider?.status === "suspended") && (
              <Button
                onClick={() =>
                  updateProviderStatus(selectedProvider.id, "approved")
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Reativar
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() => selectedProvider && deleteProvider(selectedProvider.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Prestador
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}