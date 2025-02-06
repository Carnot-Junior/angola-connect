import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function ModerationServiceList() {
  const { toast } = useToast();

  const { data: services, refetch } = useQuery({
    queryKey: ["moderation-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select(`
          *,
          provider:providers(business_name)
        `)
        .eq("moderation_status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateServiceStatus = async (id: string, status: string, notes: string = "") => {
    const { error } = await supabase
      .from("services")
      .update({ moderation_status: status, moderation_notes: notes })
      .eq("id", id);

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
      description: `O serviço foi ${status === "approved" ? "aprovado" : "rejeitado"}.`,
    });

    refetch();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead>Prestador</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.title}</TableCell>
              <TableCell>{service.provider?.business_name}</TableCell>
              <TableCell className="max-w-md">
                <p className="line-clamp-2">{service.description}</p>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">Pendente</Badge>
              </TableCell>
              <TableCell>
                {new Date(service.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateServiceStatus(service.id, "approved")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateServiceStatus(service.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rejeitar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}