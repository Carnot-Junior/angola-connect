import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
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

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  idNumber: z.string().min(5, {
    message: "Número de identificação inválido.",
  }),
  phoneNumber: z.string().min(9, {
    message: "Número de telefone inválido.",
  }),
  address: z.string().min(10, {
    message: "Endereço muito curto.",
  }),
  experience: z.string().min(50, {
    message: "Por favor, forneça mais detalhes sobre sua experiência.",
  }),
});

export default function ProviderVerification() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      idNumber: "",
      phoneNumber: "",
      address: "",
      experience: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Dados do formulário:", values);
    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Sua solicitação será analisada em breve.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Verificação de Provedor</h1>
          <p className="text-muted-foreground">
            Preencha os dados abaixo para se tornar um provedor verificado
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormLabel>Número de Identificação</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu BI ou Passaporte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                onClick={() => navigate("/")}
              >
                Voltar
              </Button>
              <Button type="submit">Enviar Solicitação</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}