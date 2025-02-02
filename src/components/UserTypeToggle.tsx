import { Switch } from "@/components/ui/switch";
import { useUserType } from "@/contexts/UserTypeContext";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export function UserTypeToggle() {
  const { userType, toggleUserType } = useUserType();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (userType === "provider") {
      return; // Não muda se já for provider
    }
    toggleUserType();
    navigate("/provider-plans");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="user-type"
        checked={userType === "provider"}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="user-type" className="text-sm font-medium">
        {userType === "seeker" ? "Procuro Serviços" : "Presto Serviços"}
      </Label>
    </div>
  );
}