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
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface Review {
  id: string;
  service_id: string;
  user_id: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  service: {
    title: string;
  };
  profiles: {
    full_name: string | null;
    email: string | null;
  };
  review_reports: {
    id: string;
    reason: string;
    status: "pending" | "resolved" | "dismissed";
    reporter: {
      full_name: string | null;
      email: string | null;
    };
  }[];
}

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
          profiles:user_id(full_name, email),
          review_reports(
            id,
            reason,
            status,
            reporter:reporter_id(full_name, email)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Review[];
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary">Ativa</Badge>;
      case "removed":
        return <Badge variant="destructive">Removida</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getReportStatusBadge = (status: Review["review_reports"][0]["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="default">Pendente</Badge>;
      case "resolved":
        return <Badge variant="secondary">Resolvida</Badge>;
      case "dismissed":
        return <Badge variant="outline">Descartada</Badge>;
    }
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
              <TableRow key={review.id}>
                <TableCell>{review.service.title}</TableCell>
                <TableCell>{review.profiles.full_name || review.profiles.email}</TableCell>
                <TableCell>
                  {review.rating}/5
                  {review.comment && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {review.comment}
                    </p>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell>
                  {review.review_reports.length > 0 ? (
                    <Badge variant="default" className="cursor-pointer hover:bg-primary/80">
                      {review.review_reports.length} denúncia(s)
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-500">Nenhuma</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(review.created_at).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReview(review)}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
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
            <div className="space-y-6">
              <div>
                <h4 className="font-medium">Serviço</h4>
                <p>{selectedReview.service.title}</p>
              </div>

              <div>
                <h4 className="font-medium">Usuário</h4>
                <p>
                  {selectedReview.profiles.full_name || selectedReview.profiles.email}
                </p>
              </div>

              <div>
                <h4 className="font-medium">Avaliação</h4>
                <p className="font-medium">{selectedReview.rating}/5</p>
                {selectedReview.comment && (
                  <p className="mt-2 text-gray-600">{selectedReview.comment}</p>
                )}
              </div>

              {selectedReview.review_reports.length > 0 && (
                <div>
                  <h4 className="mb-4 font-medium">Denúncias</h4>
                  <div className="space-y-4">
                    {selectedReview.review_reports.map((report) => (
                      <div
                        key={report.id}
                        className="rounded-lg border p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {report.reporter.full_name || report.reporter.email}
                          </span>
                          {getReportStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-gray-600">{report.reason}</p>
                        {report.status === "pending" && (
                          <div className="mt-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateReportStatus(report.id, "dismissed")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Descartar
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateReportStatus(report.id, "resolved")
                              }
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Resolver
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedReview?.status === "active" ? (
              <Button
                variant="destructive"
                onClick={() =>
                  updateReviewStatus(selectedReview.id, "removed")
                }
              >
                <XCircle className="mr-2 h-4 w-4" />
                Remover Avaliação
              </Button>
            ) : (
              <Button
                onClick={() =>
                  updateReviewStatus(selectedReview?.id || "", "active")
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Reativar Avaliação
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}