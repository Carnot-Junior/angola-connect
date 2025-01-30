import React, { createContext, useContext, useState } from "react";

type UserType = "seeker" | "provider";

interface UserTypeContextType {
  userType: UserType;
  toggleUserType: () => void;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>("seeker");

  const toggleUserType = () => {
    setUserType((current) => (current === "seeker" ? "provider" : "seeker"));
  };

  return (
    <UserTypeContext.Provider value={{ userType, toggleUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
}