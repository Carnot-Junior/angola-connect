import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTypeToggle } from "@/components/UserTypeToggle";

export function HeroSection() {
  return (
    <section className={`relative h-[500px] overflow-hidden bg-primary`}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
          alt="Angola"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Angola Connect
        </h1>
        <p className="mb-8 text-xl text-primary-foreground md:text-2xl">
          Encontre os melhores serviços em Angola
        </p>
        <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="O que você procura?"
              className="w-full pl-10"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Onde?"
              className="w-full pl-10"
            />
          </div>
          <Button className="h-10 px-8 bg-accent text-accent-foreground hover:bg-accent/90">
            Procurar
          </Button>
        </div>
        <div className="mt-6">
          <UserTypeToggle />
        </div>
      </div>
    </section>
  );
}