import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface AngolanRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const AngolanRating = ({ rating, maxRating = 5, className }: AngolanRatingProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Coffee
          key={index}
          className={`h-4 w-4 transition-colors ${
            index < rating
              ? "text-primary fill-primary"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">
        {rating.toFixed(1)} de {maxRating}
      </span>
    </div>
  );
};