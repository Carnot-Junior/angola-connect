import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

interface ServiceGalleryProps {
  images: string[];
  onAddImage?: (image: string) => void;
  onRemoveImage?: (index: number) => void;
  editable?: boolean;
}

export function ServiceGallery({ 
  images = [], 
  onAddImage, 
  onRemoveImage, 
  editable = false 
}: ServiceGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const displayImages = showAll ? images : images.slice(0, 6);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onAddImage) {
      // Na implementação real, isso enviaria a imagem para um servidor
      const imageUrl = URL.createObjectURL(file);
      onAddImage(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {displayImages.map((image, index) => (
          <Card key={index} className="group relative overflow-hidden">
            <img
              src={image}
              alt={`Trabalho ${index + 1}`}
              className="aspect-square h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {editable && onRemoveImage && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}
        {editable && onAddImage && (
          <label className="cursor-pointer">
            <Card className="flex aspect-square items-center justify-center border-2 border-dashed">
              <PlusCircle className="h-8 w-8 text-muted-foreground" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Card>
          </label>
        )}
      </div>
      {images.length > 6 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Mostrar Menos" : `Ver Mais ${images.length - 6} Fotos`}
        </Button>
      )}
    </div>
  );
}