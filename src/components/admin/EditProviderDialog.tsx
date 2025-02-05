import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface Provider {
  id: string;
  user_id: string;
  business_name: string | null;
  description: string | null;
  status: "pending" | "approved" | "rejected" | "suspended";
  verified: boolean | null;
  phone: string | null;
  address: string | null;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

interface EditProviderDialogProps {
  provider: Provider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditProviderDialog({
  provider,
  open,
  onOpenChange,
  onSuccess,
}: EditProviderDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    business_name: provider?.business_name || "",
    description: provider?.description || "",
    phone: provider?.phone || "",
    address: provider?.address || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!provider) return;

    const { error } = await supabase
      .from("providers")
      .update({
        business_name: formData.business_name || null,
        description: formData.description || null,
        phone: formData.phone || null,
        address: formData.address || null,
      })
      .eq("id", provider.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar prestador",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Prestador atualizado com sucesso",
      description: "As informações foram atualizadas.",
    });

    onSuccess();
    onOpenChange(false);
  };

  if (!provider) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Prestador</DialogTitle>
          <DialogDescription>
            Atualize as informações do prestador de serviço
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="business_name">Nome da Empresa</Label>
            <Input
              id="business_name"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}