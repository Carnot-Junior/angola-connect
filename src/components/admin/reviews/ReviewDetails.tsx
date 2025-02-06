import { Review } from "@/types/reviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface ReviewDetailsProps {
  review: Review;
  onUpdateStatus: (reviewId: string, status: string) => Promise<void>;
  onUpdateReportStatus: (reportId: string, status: "resolved" | "dismissed") => Promise<void>;
}

export function ReviewDetails({ review, onUpdateStatus, onUpdateReportStatus }: ReviewDetailsProps) {
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
    <div className="space-y-6">
      <div>
        <h4 className="font-medium">Serviço</h4>
        <p>{review.service.title}</p>
      </div>

      <div>
        <h4 className="font-medium">Usuário</h4>
        <p>
          {review.profiles.full_name || review.profiles.email}
        </p>
      </div>

      <div>
        <h4 className="font-medium">Avaliação</h4>
        <p className="font-medium">{review.rating}/5</p>
        {review.comment && (
          <p className="mt-2 text-gray-600">{review.comment}</p>
        )}
      </div>

      {review.review_reports.length > 0 && (
        <div>
          <h4 className="mb-4 font-medium">Denúncias</h4>
          <div className="space-y-4">
            {review.review_reports.map((report) => (
              <div key={report.id} className="rounded-lg border p-4">
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
                      onClick={() => onUpdateReportStatus(report.id, "dismissed")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Descartar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onUpdateReportStatus(report.id, "resolved")}
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

      <div className="flex justify-end gap-2">
        {review.status === "active" ? (
          <Button
            variant="destructive"
            onClick={() => onUpdateStatus(review.id, "removed")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Remover Avaliação
          </Button>
        ) : (
          <Button onClick={() => onUpdateStatus(review.id, "active")}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Reativar Avaliação
          </Button>
        )}
      </div>
    </div>
  );
}