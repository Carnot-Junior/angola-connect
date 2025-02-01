import { ServiceGallery } from "@/components/provider/ServiceGallery";
import { ServiceHours } from "@/components/provider/ServiceHours";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AngolanRating } from "@/components/AngolanRating";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Share2,
  Check,
} from "lucide-react";

const mockProvider = {
  name: "Técnico João",
  company: "Reparos Express",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  verified: true,
  rating: 4.8,
  totalReviews: 156,
  description: "Especialista em reparos elétricos e manutenção geral com mais de 10 anos de experiência. Atendimento rápido e profissional em toda Luanda.",
  services: [
    "Instalações Elétricas",
    "Reparos Gerais",
    "Manutenção Preventiva",
    "Emergências 24h",
  ],
  location: "Luanda, Angola",
  phone: "+244 923 456 789",
  email: "joao@reparosexpress.ao",
  website: "www.reparosexpress.ao",
  languages: ["Português", "Umbundo"],
  hours: [
    { day: "Segunda", open: "08:00", close: "18:00" },
    { day: "Terça", open: "08:00", close: "18:00" },
    { day: "Quarta", open: "08:00", close: "18:00" },
    { day: "Quinta", open: "08:00", close: "18:00" },
    { day: "Sexta", open: "08:00", close: "18:00" },
    { day: "Sábado", open: "09:00", close: "13:00" },
    { day: "Domingo", open: "Fechado", close: "Fechado" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80",
    "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=500&q=80",
    "https://images.unsplash.com/photo-1587843606517-c2894b8b7e52?w=500&q=80",
  ],
};

export default function ProviderProfile() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi seu perfil no Angola Connect e gostaria de saber mais sobre seus serviços.`
    );
    window.open(
      `https://wa.me/244${mockProvider.phone.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockProvider.name,
          text: `Conheça os serviços de ${mockProvider.name} no Angola Connect`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-8">
      <div className="container mx-auto space-y-8">
        {/* Cabeçalho do Perfil */}
        <Card className="overflow-hidden">
          <div className="relative h-48 bg-primary/10">
            <div className="absolute -bottom-16 left-8">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage src={mockProvider.avatar} alt={mockProvider.name} />
                <AvatarFallback>
                  {mockProvider.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="mt-20 space-y-4 p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{mockProvider.name}</h1>
                  {mockProvider.verified && (
                    <Badge variant="default">
                      <Check className="mr-1 h-3 w-3" /> Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground">
                  {mockProvider.company}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
                <Button onClick={handleWhatsAppClick}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <AngolanRating rating={mockProvider.rating} />
              <span className="text-sm text-muted-foreground">
                {mockProvider.totalReviews} avaliações
              </span>
            </div>

            <p className="text-lg">{mockProvider.description}</p>

            <div className="flex flex-wrap gap-2">
              {mockProvider.services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Informações de Contato */}
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="col-span-2 p-6">
            <h2 className="mb-6 text-2xl font-semibold">Galeria de Trabalhos</h2>
            <ServiceGallery images={mockProvider.gallery} />
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{mockProvider.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{mockProvider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{mockProvider.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>{mockProvider.website}</span>
                </div>
              </div>
            </Card>

            <ServiceHours hours={mockProvider.hours} />

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Idiomas</h3>
              <div className="flex flex-wrap gap-2">
                {mockProvider.languages.map((language) => (
                  <Badge key={language} variant="outline">
                    {language}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}