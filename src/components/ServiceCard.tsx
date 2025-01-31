import { Card } from "@/components/ui/card";
import { Clock, MapPin, Check, MessageCircle, Star } from "lucide-react";
import { AngolanRating } from "./AngolanRating";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ServiceCardProps {
  title: string;
  description: string;
  rating: number;
  location: string;
  hours: string;
  imageUrl: string;
  languages?: string[];
  isVerified?: boolean;
  phoneNumber?: string;
  path?: string;
}

export const ServiceCard = ({
  title,
  description,
  rating,
  location,
  hours,
  imageUrl,
  languages = [],
  isVerified = false,
  phoneNumber,
}: ServiceCardProps) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phoneNumber) {
      const message = encodeURIComponent(`Olá! Vi seu serviço "${title}" no Angola Connect.`);
      window.open(`https://wa.me/244${phoneNumber}?text=${message}`, "_blank");
    }
  };

  return (
    <Card className="group overflow-hidden bg-white transition-all hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
        {isVerified && (
          <Badge className="absolute right-2 top-2 bg-primary/90 text-white">
            <Check className="mr-1 h-3 w-3" /> Verificado
          </Badge>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-secondary">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        
        {languages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-4 space-y-3">
          <AngolanRating rating={rating} />
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-sm">{hours}</span>
          </div>
        </div>

        {phoneNumber && (
          <Button
            onClick={handleWhatsAppClick}
            className="mt-4 w-full bg-green-500 hover:bg-green-600"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Falar por WhatsApp
          </Button>
        )}
      </div>
    </Card>
  );
};