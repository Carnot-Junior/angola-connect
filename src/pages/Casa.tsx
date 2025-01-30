import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CasaPage = () => {
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
        <h1 className="text-3xl font-bold text-secondary">Serviços para Casa</h1>
      </div>
      <p className="text-lg text-gray-600">
        Encontre diversos serviços para manutenção e melhorias em sua casa.
      </p>
      {/* TODO: Adicionar lista de serviços para casa */}
    </div>
  );
};

export default CasaPage;