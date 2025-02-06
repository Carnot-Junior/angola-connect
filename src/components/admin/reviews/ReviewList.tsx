import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Review } from "@/types/reviews";

interface ReviewListProps {
  review: Review;
  onViewDetails: (review: Review) => void;
}

export function ReviewList({ review, onViewDetails }: ReviewListProps) {
  return (
    <TableRow key={review.id}>
      <TableCell>{review.service.title}</TableCell>
      <TableCell>
        {review.profiles.full_name || review.profiles.email}
      </TableCell>
      <TableCell>
        {review.rating}/5
        {review.comment && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {review.comment}
          </p>
        )}
      </TableCell>
      <TableCell>
        {review.status === "active" ? (
          <Badge variant="secondary">Ativa</Badge>
        ) : review.status === "removed" ? (
          <Badge variant="destructive">Removida</Badge>
        ) : (
          <Badge variant="outline">{review.status}</Badge>
        )}
      </TableCell>
      <TableCell>
        {review.review_reports.length > 0 ? (
          <Badge
            variant="default"
            className="cursor-pointer hover:bg-primary/80"
          >
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
          onClick={() => onViewDetails(review)}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Detalhes
        </Button>
      </TableCell>
    </TableRow>
  );
}