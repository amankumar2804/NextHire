import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCompanies from "../components/FeaturedCompanies";
import TrendingSearches from "@/components/TrendingSearches";
import DirectHiring from "@/components/DirectHiring";
import CareerResources from "@/components/CareerResources";
import Categories from "../components/Categories";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import CTA from "@/components/CTA";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCompanies />
      <TrendingSearches />
      <DirectHiring />
      <CareerResources />
      <Categories />
      <HowItWorks />
      <WhyChoose />
      <CTA />
      <Testimonials />
      <Footer />
      
    </>
  );
}