import { ServiceCard } from "@/components/ServiceCard";
import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserType } from "@/contexts/UserTypeContext";
import { UserTypeToggle } from "@/components/UserTypeToggle";

const Index = () => {
  const navigate = useNavigate();
  const { userType } = useUserType();

  const featuredServices = [
    {
      title: "Electricista 24/7",
      description: "Serviços eléctricos profissionais com atendimento 24 horas",
      rating: 4.8,
      location: "Luanda",
      hours: "24h",
      imageUrl: "/placeholder.svg",
      path: "/electricidade"
    },
    {
      title: "Canalizador Express",
      description: "Reparação de canalização e instalação de sistemas de água",
      rating: 4.5,
      location: "Luanda",
      hours: "8h-18h",
      imageUrl: "/placeholder.svg",
      path: "/agua"
    },
    {
      title: "Limpeza Residencial",
      description: "Serviços de limpeza profissional para sua casa",
      rating: 4.7,
      location: "Luanda",
      hours: "8h-17h",
      imageUrl: "/placeholder.svg",
      path: "/casa"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`p-4 ${userType === "seeker" ? "bg-primary" : "bg-secondary"}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Angola Connect
              </h1>
              <p className="mt-2 text-primary-foreground">
                {userType === "seeker" 
                  ? "Encontre os melhores serviços em Angola"
                  : "Ofereça seus serviços em Angola"}
              </p>
            </div>
            <UserTypeToggle />
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className={`py-8 ${userType === "seeker" ? "bg-secondary" : "bg-primary"}`}>
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder={userType === "seeker" ? "Procurar serviços..." : "Procurar oportunidades..."}
              className="w-full rounded-lg border-none px-4 py-3 pr-12 text-lg shadow-lg focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {userType === "seeker" ? (
        <>
          {/* Categories */}
          <section className="container mx-auto py-8">
            <h2 className="mb-6 text-xl font-semibold text-secondary">Categorias</h2>
            <CategorySection />
          </section>

          {/* Featured Services */}
          <section className="container mx-auto py-8">
            <h2 className="mb-6 text-xl font-semibold text-secondary">
              Serviços em Destaque
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <div
                  key={service.title}
                  onClick={() => navigate(service.path)}
                  className="cursor-pointer"
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Provider View */
        <section className="container mx-auto py-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold text-secondary">Meus Serviços</h2>
            <div className="space-y-4">
              <Button className="w-full" onClick={() => navigate("/provider/new-service")}>
                Adicionar Novo Serviço
              </Button>
              <p className="text-center text-gray-600">
                Comece a oferecer seus serviços para milhares de clientes em potencial.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-accent py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-accent-foreground">
            {userType === "seeker" ? "Precisa de um serviço?" : "Quer oferecer seus serviços?"}
          </h2>
          <p className="mt-2 text-accent-foreground">
            {userType === "seeker" 
              ? "Encontre profissionais qualificados na sua região"
              : "Alcance mais clientes e expanda seu negócio"}
          </p>
          <Button className="mt-6 bg-primary text-white hover:bg-primary/90">
            {userType === "seeker" ? "Agendar Agora" : "Começar"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;