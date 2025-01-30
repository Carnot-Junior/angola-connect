import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SaudePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-6 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold text-red-500">Serviços de Saúde</h1>
      </div>
      <p className="text-lg text-gray-600">
        Encontre profissionais e serviços de saúde próximos a você.
      </p>
      {/* TODO: Adicionar lista de serviços de saúde */}
    </div>
  );
};

export default SaudePage;