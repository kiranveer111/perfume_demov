import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellers } from "@/components/home/BestSellers";
import { LuxuryBanner } from "@/components/home/LuxuryBanner";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <LuxuryBanner />
      <Testimonials />
    </div>
  );
}
