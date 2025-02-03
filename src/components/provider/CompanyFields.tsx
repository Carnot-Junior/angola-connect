import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CompanyFieldsProps {
  control: Control<any>;
  visible: boolean;
}

export function CompanyFields({ control, visible }: CompanyFieldsProps) {
  if (!visible) return null;

  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
  );
}