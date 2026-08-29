import AboutNutrekha from './components/AboutNutrekha';
import BlogHub from './components/BlogHub';
import ClientFeedback from './components/ClientFeedback';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import OurImpact from './components/OurImpact';
import OurPhilosophy from './components/OurPhilosophy';
import PersonalizedPrograms from './components/PersonalizedPrograms';
import VisionMission from './components/VisionMission';
import Home from './pages/Home';

/**
 * App Root Component
 *
 * Assembles the layout shell (Navbar) and page content.
 * Swaps / renders page sections with complete SEO architecture.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <AboutNutrekha />
      <VisionMission />
      <OurPhilosophy />
      <OurImpact />
      <PersonalizedPrograms />
      <ClientFeedback />
      <BlogHub />
      <FAQSection />
      <Footer />
    </>
  );
}
