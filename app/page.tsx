import Pricing from "@/components/pricing";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <Pricing />
      <ContactSection /> {/* 👈 THIS IS THE FIX */}
      <Footer/>
    </>
  );
}
