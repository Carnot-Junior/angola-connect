import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ModerationServiceList } from "@/components/admin/moderation/ModerationServiceList";
import { ModerationImageList } from "@/components/admin/moderation/ModerationImageList";
import { ModerationReviewList } from "@/components/admin/moderation/ModerationReviewList";

export default function AdminModeration() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Início
        </Button>
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Moderação de Conteúdo</h1>
        </div>
        <p className="text-muted-foreground">
          Gerencie e modere o conteúdo da plataforma
        </p>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <ModerationServiceList />
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <ModerationImageList />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <ModerationReviewList />
        </TabsContent>
      </Tabs>
    </div>
  );
}