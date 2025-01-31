import { Coffee } from "lucide-react";

interface AngolanRatingProps {
  rating: number;
  maxRating?: number;
}

export const AngolanRating = ({ rating, maxRating = 5 }: AngolanRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Coffee
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "text-primary fill-primary"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating} de {maxRating}
      </span>
    </div>
  );
};