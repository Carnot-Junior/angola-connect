import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { SelectedPlanCard } from "@/components/provider/SelectedPlanCard";
import { ProviderTypeField } from "@/components/provider/ProviderTypeField";
import { CompanyFields } from "@/components/provider/CompanyFields";
import { PersonalInfoFields } from "@/components/provider/PersonalInfoFields";

const formSchema = z.object({
  providerType: z.enum(["individual", "company"], {
    required_error: "Por favor selecione o tipo de provedor",
  }),
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  idNumber: z.string().min(5, {
    message: "Número de identificação inválido.",
  }),
  companyName: z.string().optional(),
  nif: z.string().optional(),
  phoneNumber: z.string().min(9, {
    message: "Número de telefone inválido.",
  }),
  address: z.string().min(10, {
    message: "Endereço muito curto.",
  }),
  experience: z.string().min(50, {
    message: "Por favor, forneça mais detalhes sobre sua experiência.",
  }),
}).refine((data) => {
  if (data.providerType === "company") {
    return data.companyName && data.nif;
  }
  return true;
}, {
  message: "Nome da empresa e NIF são obrigatórios para cadastro como empresa",
  path: ["companyName"],
});

export default function ProviderVerification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.plan;

  if (!selectedPlan) {
    navigate("/provider-plans");
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerType: "individual",
      fullName: "",
      idNumber: "",
      companyName: "",
      nif: "",
      phoneNumber: "",
      address: "",
      experience: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Agora você será redirecionado para o pagamento.",
    });
    navigate("/checkout", { 
      state: { 
        plan: selectedPlan,
        providerData: values 
      } 
    });
  };

  const providerType = form.watch("providerType");

  return (
    <div className="container mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/provider-plans")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Planos
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Verificação de Provedor</h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para se tornar um provedor verificado
          </p>
        </div>

        <SelectedPlanCard 
          name={selectedPlan.name}
          description={selectedPlan.description}
          price={selectedPlan.price}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProviderTypeField control={form.control} />
            <CompanyFields control={form.control} visible={providerType === "company"} />
            <PersonalInfoFields control={form.control} />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/provider-plans")}
              >
                Voltar
              </Button>
              <Button type="submit">Continuar para Pagamento</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}