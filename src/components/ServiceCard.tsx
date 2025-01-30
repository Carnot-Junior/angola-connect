import { Card } from "@/components/ui/card";
import { Star, Clock, MapPin } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  rating: number;
  location: string;
  hours: string;
  imageUrl: string;
  path?: string;
}

export const ServiceCard = ({
  title,
  description,
  rating,
  location,
  hours,
  imageUrl,
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-secondary">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-sm">{hours}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};