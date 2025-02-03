import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";

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

  const providerType = form.watch("providerType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Dados do formulário:", values);
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

        <div className="bg-accent/10 p-4 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Plano Selecionado: {selectedPlan.name}</h2>
          <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
          <p className="text-sm font-medium mt-2">{selectedPlan.price} KZ/mês</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="providerType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Provedor</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual">Pessoa Física</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="company" id="company" />
                        <Label htmlFor="company">Empresa</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {providerType === "individual" ? "Número do BI" : "Número do Documento de Identificação"}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Seu BI ou Passaporte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {providerType === "company" && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da sua empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nif"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIF</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de Identificação Fiscal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="+244 923 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua morada completa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência Profissional</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua experiência e qualificações..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Inclua informações sobre sua experiência, certificações e áreas de especialização.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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