"use client";

import HeroSection from "../components/landingPage/HeroSection";
import CategorySection from "../components/landingPage/CategorySection";
import ProductSection from "../components/landingPage/ProductSection";
import TestimonialsSection from "../components/landingPage/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <HeroSection />
      <CategorySection />
      <ProductSection />
      <ProductSection title="POPULAR PRODUCTS" mode="popular" />
      <TestimonialsSection />
    </main>
  );
}