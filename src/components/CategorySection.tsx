import { Card } from "@/components/ui/card";
import { Wrench, Droplet, Plug, Home, ShoppingCart, FirstAid } from "lucide-react";

const categories = [
  { icon: Wrench, name: "Reparos", color: "text-primary" },
  { icon: Droplet, name: "Água", color: "text-blue-500" },
  { icon: Plug, name: "Electricidade", color: "text-yellow-500" },
  { icon: Home, name: "Casa", color: "text-secondary" },
  { icon: ShoppingCart, name: "Compras", color: "text-accent" },
  { icon: FirstAid, name: "Saúde", color: "text-red-500" },
];

export const CategorySection = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {categories.map((category) => (
        <Card
          key={category.name}
          className="flex cursor-pointer flex-col items-center p-4 transition-all hover:shadow-md"
        >
          <category.icon className={`h-8 w-8 ${category.color}`} />
          <span className="mt-2 text-sm font-medium">{category.name}</span>
        </Card>
      ))}
    </div>
  );
};