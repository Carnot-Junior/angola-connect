import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Shield, User } from "lucide-react";
import { Link } from "react-router-dom";

export function UserMenu() {
  const { user, isAdmin, signOut } = useAuth();

  if (!user) {
    return (
      <Button asChild>
        <Link to="/auth">
          <User className="mr-2 h-4 w-4" />
          Entrar
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {isAdmin && (
        <Button variant="outline" asChild>
          <Link to="/admin">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      )}
      <Button variant="outline" onClick={signOut}>
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
}