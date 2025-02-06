import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

export function ModerationImageList() {
  const { toast } = useToast();

  const { data: images, refetch } = useQuery({
    queryKey: ["moderation-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_images")
        .select(`
          *,
          service:services(title)
        `)
        .eq("moderation_status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateImageStatus = async (id: string, status: string, notes: string = "") => {
    const { error } = await supabase
      .from("service_images")
      .update({ moderation_status: status, moderation_notes: notes })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Status atualizado com sucesso",
      description: `A imagem foi ${status === "approved" ? "aprovada" : "rejeitada"}.`,
    });

    refetch();
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images?.map((image) => (
        <Card key={image.id}>
          <CardHeader>
            <CardTitle className="text-sm">{image.service?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <img
                src={image.url}
                alt={`Imagem do serviço ${image.service?.title}`}
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => updateImageStatus(image.id, "approved")}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aprovar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => updateImageStatus(image.id, "rejected")}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Rejeitar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}