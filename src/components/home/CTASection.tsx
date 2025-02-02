import { Button } from "@/components/ui/button";
import { useUserType } from "@/contexts/UserTypeContext";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const { userType } = useUserType();
  const navigate = useNavigate();

  const handleClick = () => {
    if (userType === "provider") {
      navigate("/provider-verification");
    } else {
      navigate("/todos-servicos");
    }
  };

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
          onClick={handleClick}
        >
          {userType === "seeker" ? "Encontrar Agora" : "Começar"}
        </Button>
      </div>
    </section>
  );
}