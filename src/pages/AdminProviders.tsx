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
import { Settings, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function AdminProviders() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: providers, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar provedores",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="space-x-4">
          <Button onClick={() => navigate("/admin/plans")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Gerenciar Planos
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Provedores</h2>

          {isLoading ? (
            <p className="text-center py-4">Carregando provedores...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Empresa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Data de Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers?.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">
                      {provider.business_name}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          provider.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : provider.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {provider.status === "approved"
                          ? "Aprovado"
                          : provider.status === "pending"
                          ? "Pendente"
                          : "Rejeitado"}
                      </span>
                    </TableCell>
                    <TableCell>{provider.phone}</TableCell>
                    <TableCell>{provider.address}</TableCell>
                    <TableCell>
                      {new Date(provider.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}