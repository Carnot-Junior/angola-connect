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
import { CheckCircle, XCircle } from "lucide-react";

export function ModerationReviewList() {
  const { toast } = useToast();

  const { data: reviews, refetch } = useQuery({
    queryKey: ["moderation-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          service:services(title),
          profiles:profiles!reviews_user_id_profiles_fkey(full_name, email)
        `)
        .eq("moderation_status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateReviewStatus = async (id: string, status: string, notes: string = "") => {
    const { error } = await supabase
      .from("reviews")
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
      description: `A avaliação foi ${status === "approved" ? "aprovada" : "rejeitada"}.`,
    });

    refetch();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Comentário</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews?.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.service?.title}</TableCell>
              <TableCell>
                {review.profiles?.full_name || review.profiles?.email}
              </TableCell>
              <TableCell>{review.rating}/5</TableCell>
              <TableCell className="max-w-md">
                <p className="line-clamp-2">{review.comment}</p>
              </TableCell>
              <TableCell>
                {new Date(review.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateReviewStatus(review.id, "approved")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateReviewStatus(review.id, "rejected")}
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