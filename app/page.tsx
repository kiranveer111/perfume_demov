import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellers } from "@/components/home/BestSellers";
import { LuxuryBanner } from "@/components/home/LuxuryBanner";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center text-center py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl" data-testid="hero-title">
          ThePerfumeShop
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600" data-testid="hero-subtitle">
          A premium e-commerce site for automation testing.
          Experiment with selectors, user flows, and assertions in a stable environment.
        </p>
      </div>
      <FeaturedCategories />
      <BestSellers />
      <LuxuryBanner />
      <Testimonials />
    </div>
  );
}
