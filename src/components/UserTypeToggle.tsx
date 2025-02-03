import { Switch } from "@/components/ui/switch";
import { useUserType } from "@/contexts/UserTypeContext";
import { Label } from "@/components/ui/label";

export function UserTypeToggle() {
  const { userType, toggleUserType } = useUserType();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="user-type"
        checked={userType === "provider"}
        onCheckedChange={toggleUserType}
      />
      <Label htmlFor="user-type" className="text-sm font-medium">
        {userType === "seeker" ? "Procuro Serviços" : "Presto Serviços"}
      </Label>
    </div>
  );
}