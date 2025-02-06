import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Review } from "@/types/reviews";
import { ReviewList } from "@/components/admin/reviews/ReviewList";
import { ReviewDetails } from "@/components/admin/reviews/ReviewDetails";

export default function AdminReviews() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const { data: reviews, refetch } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          service:services(title),
          profiles:profiles!reviews_user_id_profiles_fkey(full_name, email),
          review_reports(
            id,
            reason,
            status,
            reporter:profiles!review_reports_reporter_id_fkey(full_name, email)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }

      return data as unknown as Review[];
    },
  });

  const updateReviewStatus = async (reviewId: string, status: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ status })
      .eq("id", reviewId);

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
      description: `A avaliação foi ${status === "active" ? "ativada" : "removida"}.`,
    });

    refetch();
    setSelectedReview(null);
  };

  const updateReportStatus = async (
    reportId: string,
    status: "resolved" | "dismissed"
  ) => {
    const { error } = await supabase
      .from("review_reports")
      .update({ status })
      .eq("id", reportId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar denúncia",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Denúncia atualizada com sucesso",
      description: `A denúncia foi ${
        status === "resolved" ? "resolvida" : "descartada"
      }.`,
    });

    refetch();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Início
        </Button>
        <h1 className="text-3xl font-bold">Gestão de Avaliações</h1>
        <p className="text-muted-foreground">
          Gerencie as avaliações e denúncias da plataforma
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Denúncias</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews?.map((review) => (
              <ReviewList
                key={review.id}
                review={review}
                onViewDetails={setSelectedReview}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedReview}
        onOpenChange={(open) => !open && setSelectedReview(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Avaliação</DialogTitle>
            <DialogDescription>
              Revise a avaliação e suas denúncias
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <ReviewDetails
              review={selectedReview}
              onUpdateStatus={updateReviewStatus}
              onUpdateReportStatus={updateReportStatus}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}