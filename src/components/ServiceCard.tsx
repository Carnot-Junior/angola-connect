import { Card } from "@/components/ui/card";
import { Clock, MapPin, Check, MessageCircle } from "lucide-react";
import { AngolanRating } from "./AngolanRating";
import { Button } from "./ui/button";

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
  const handleWhatsAppClick = () => {
    if (phoneNumber) {
      const message = encodeURIComponent(`Olá! Vi seu serviço "${title}" no Angola Connect.`);
      window.open(`https://wa.me/244${phoneNumber}?text=${message}`, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-secondary">{title}</h3>
          {isVerified && (
            <div className="flex items-center text-primary">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-sm">Verificado</span>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        
        {languages.length > 0 && (
          <div className="mt-2">
            <span className="text-sm font-medium">Fala: </span>
            {languages.map((lang, index) => (
              <span key={lang} className="text-sm text-gray-600">
                {lang}{index < languages.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 space-y-2">
          <AngolanRating rating={rating} />
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-1">
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