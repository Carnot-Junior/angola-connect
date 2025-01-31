import { ServiceCard } from "@/components/ServiceCard";
import { CategorySection } from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserType } from "@/contexts/UserTypeContext";
import { UserTypeToggle } from "@/components/UserTypeToggle";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className={`relative h-[500px] overflow-hidden ${userType === "seeker" ? "bg-primary" : "bg-secondary"}`}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
            alt="Angola"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Angola Connect
          </h1>
          <p className="mb-8 text-xl text-primary-foreground md:text-2xl">
            {userType === "seeker" 
              ? "Encontre os melhores serviços em Angola"
              : "Ofereça seus serviços em Angola"}
          </p>
          <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="O que você procura?"
                className="w-full pl-10"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Onde?"
                className="w-full pl-10"
              />
            </div>
            <Button className="h-10 px-8 bg-accent text-accent-foreground hover:bg-accent/90">
              Procurar
            </Button>
          </div>
          <div className="mt-6">
            <UserTypeToggle />
          </div>
        </div>
      </section>

      {userType === "seeker" ? (
        <>
          {/* Categories */}
          <section className="container mx-auto py-16">
            <h2 className="mb-8 text-3xl font-bold text-secondary">
              Explore por Categoria
            </h2>
            <CategorySection />
          </section>

          {/* Featured Services */}
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

          {/* Trust Badges */}
          <section className="container mx-auto py-16">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Profissionais Verificados</h3>
                <p className="text-gray-600">Todos os prestadores são verificados e avaliados</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Pagamento Seguro</h3>
                <p className="text-gray-600">Multicaixa Express, MPesa e outros métodos locais</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Suporte Local</h3>
                <p className="text-gray-600">Atendimento em Português e línguas locais</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Provider View */
        <section className="container mx-auto py-16">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-secondary">Comece a Oferecer Seus Serviços</h2>
              <div className="space-y-6">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={() => navigate("/provider-verification")}
                >
                  Tornar-se um Provedor Verificado
                </Button>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/provider/new-service")}
                  variant="outline"
                >
                  Adicionar Novo Serviço
                </Button>
                <div className="rounded-lg bg-accent/10 p-4">
                  <h3 className="mb-2 font-semibold text-accent-foreground">Benefícios de ser verificado:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Apareça primeiro nas buscas
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Receba pagamentos online
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Selo de verificação
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-accent-foreground">
            {userType === "seeker" ? "Precisa de um serviço?" : "Quer oferecer seus serviços?"}
          </h2>
          <p className="mb-8 text-xl text-accent-foreground">
            {userType === "seeker" 
              ? "Encontre profissionais qualificados na sua região"
              : "Alcance mais clientes e expanda seu negócio"}
          </p>
          <Button 
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            {userType === "seeker" ? "Encontrar Agora" : "Começar"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;