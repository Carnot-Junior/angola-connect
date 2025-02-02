import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProviderRegistrationButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

export function ProviderRegistrationButton({ 
  className,
  variant = "default" 
}: ProviderRegistrationButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      className={className}
      variant={variant}
      onClick={() => navigate("/provider-verification")}
    >
      Registrar como Prestador
    </Button>
  );
}