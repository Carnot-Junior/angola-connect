import { Check, Shield, MessageCircle } from "lucide-react";

export function TrustBadges() {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-8 text-center md:grid-cols-3">
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Profissionais Verificados</h3>
          <p className="text-gray-600">Todos os prestadores são verificados e avaliados</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Pagamento Seguro</h3>
          <p className="text-gray-600">Multicaixa Express, MPesa e outros métodos locais</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Suporte Local</h3>
          <p className="text-gray-600">Atendimento em Português e línguas locais</p>
        </div>
      </div>
    </section>
  );
}