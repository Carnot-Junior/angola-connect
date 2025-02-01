import { Button } from "@/components/ui/button";
import { useUserType } from "@/contexts/UserTypeContext";

export function CTASection() {
  const { userType } = useUserType();

  return (
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
  );
}