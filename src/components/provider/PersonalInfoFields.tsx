import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface PersonalInfoFieldsProps {
  control: Control<any>;
}

export function PersonalInfoFields({ control }: PersonalInfoFieldsProps) {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
        name="idNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número do BI</FormLabel>
            <FormControl>
              <Input placeholder="Seu BI ou Passaporte" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
}