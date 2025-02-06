import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Settings, CreditCard, UserCheck, UserX, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { EditProviderDialog } from "@/components/admin/EditProviderDialog";

interface Provider {
  id: string;
  user_id: string;
  business_name: string | null;
  description: string | null;
  status: "pending" | "approved" | "rejected" | "suspended";
  verified: boolean | null;
  phone: string | null;
  address: string | null;
  profiles: {
    full_name: string | null;
    email: string | null;
  };
}

export default function AdminProviders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: providers, refetch } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("providers")
        .select(`
          *,
          profiles:profiles!providers_user_id_profiles_fkey(full_name, email)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar provedores",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Provider[];
    },
  });

  const updateProviderStatus = async (providerId: string, status: Provider["status"]) => {
    const { error } = await supabase
      .from("providers")
      .update({ status })
      .eq("id", providerId);

    if (error) {
      toast({
        title: "Erro ao atualizar status",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Status atualizado",
      description: `O prestador foi ${
        status === "approved"
          ? "aprovado"
          : status === "rejected"
          ? "rejeitado"
          : "suspenso"
      } com sucesso.`,
    });

    refetch();
  };

  const getStatusBadge = (status: Provider["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspenso</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="space-x-4">
          <Button onClick={() => navigate("/admin/plans")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Gerenciar Planos
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/reviews")}>
            <Settings className="mr-2 h-4 w-4" />
            Gerenciar Avaliações
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Prestadores de Serviço</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome / Empresa</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers?.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {provider.business_name || "Não informado"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {provider.profiles?.full_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{provider.profiles?.email}</p>
                      <p className="text-sm">{provider.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(provider.status)}</TableCell>
                  <TableCell>{provider.address || "Não informado"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProvider(provider);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {provider.status !== "approved" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() =>
                            updateProviderStatus(provider.id, "approved")
                          }
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                      {provider.status !== "suspended" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            updateProviderStatus(provider.id, "suspended")
                          }
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditProviderDialog
        provider={selectedProvider}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={refetch}
      />
    </div>
  );
}