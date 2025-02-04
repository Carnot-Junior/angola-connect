import { CategorySection } from "@/components/CategorySection";
import { useUserType } from "@/contexts/UserTypeContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ProviderSection } from "@/components/home/ProviderSection";
import { UserMenu } from "@/components/UserMenu";

const Index = () => {
  const { userType } = useUserType();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <UserMenu />
        </div>
      </div>
      <HeroSection />
      
      {userType === "seeker" ? (
        <>
          <section className="container mx-auto py-16">
            <h2 className="mb-8 text-3xl font-bold text-secondary">
              Explore por Categoria
            </h2>
            <CategorySection />
          </section>
          <FeaturedServices />
          <TrustBadges />
        </>
      ) : (
        <ProviderSection />
      )}
    </div>
  );
};

export default Index;