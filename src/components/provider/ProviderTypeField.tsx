import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Control } from "react-hook-form";

interface ProviderTypeFieldProps {
  control: Control<any>;
}

export function ProviderTypeField({ control }: ProviderTypeFieldProps) {
  return (
    <FormField
      control={control}
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
  );
}