import { Card } from "@/components/ui/card";
import { Wrench, Droplet, Plug, Home, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Wrench, name: "Reparos", color: "text-primary", path: "/reparos" },
  { icon: Droplet, name: "Água", color: "text-blue-500", path: "/agua" },
  { icon: Plug, name: "Electricidade", color: "text-yellow-500", path: "/electricidade" },
  { icon: Home, name: "Casa", color: "text-secondary", path: "/casa" },
  { icon: ShoppingCart, name: "Compras", color: "text-accent", path: "/compras" },
  { icon: Heart, name: "Saúde", color: "text-red-500", path: "/saude" },
];

export const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {categories.map((category) => (
        <Card
          key={category.name}
          className="flex cursor-pointer flex-col items-center p-4 transition-all hover:shadow-md"
          onClick={() => navigate(category.path)}
        >
          <category.icon className={`h-8 w-8 ${category.color}`} />
          <span className="mt-2 text-sm font-medium">{category.name}</span>
        </Card>
      ))}
    </div>
  );
};