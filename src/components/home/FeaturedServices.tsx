import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const featuredServices = [
  {
    title: "Electricista 24/7",
    description: "Serviços eléctricos profissionais com atendimento 24 horas",
    rating: 4.8,
    location: "Luanda",
    hours: "24h",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
    languages: ["Português", "Kimbundu"],
    isVerified: true,
    phoneNumber: "923456789",
    path: "/electricidade"
  },
  {
    title: "Canalizador Express",
    description: "Reparação de canalização e instalação de sistemas de água",
    rating: 4.5,
    location: "Viana",
    hours: "8h-18h",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80",
    languages: ["Português", "Umbundo"],
    isVerified: true,
    phoneNumber: "923456790",
    path: "/agua"
  },
  {
    title: "Limpeza Residencial",
    description: "Serviços de limpeza profissional para sua casa",
    rating: 4.7,
    location: "Kilamba",
    hours: "8h-17h",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80",
    languages: ["Português"],
    isVerified: false,
    phoneNumber: "923456791",
    path: "/casa"
  },
];

export function FeaturedServices() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-secondary">
            Serviços em Destaque
          </h2>
          <Button variant="outline" onClick={() => navigate("/todos-servicos")}>
            Ver Todos
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <div
              key={service.title}
              onClick={() => navigate(service.path)}
              className="cursor-pointer transform transition-all hover:scale-105"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}