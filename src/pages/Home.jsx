import { Sparkles } from 'lucide-react';
import {
  BotanicalTopLeft,
  BotanicalBottomRight,
  DotAccents,
} from '../components/BotanicalDecorations';
import NutrekhaPlate3D from '../components/NutrekhaPlate3D';

/**
 * Home Page - Unique Coming Soon Experience
 */
export default function Home() {

  return (
    <section className="hero" id="hero">
      {/* Botanical Decorations */}
      <BotanicalTopLeft />
      <BotanicalBottomRight />
      <DotAccents />

      <div className="hero-container">
        {/* Text Content */}
        <div className="hero-content">
          {/* VIP Badge */}
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold tracking-wider uppercase mb-5 border border-[#F5C6D0]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>Launching Soon</span>
          </div> */}

          {/* Main Title (Semantic H1 for SEO) */}
          <h1 className="hero-title text-2xl sm:text-5xl font-extrabold tracking-tight text-[#2D4A2D] mb-2">
            Where Nutrition Meets <span className="italic-pink">Care.</span>
          </h1>

          {/* Coming Soon Highlight */}
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D4627A] mb-5 tracking-tight flex items-center gap-2">
            <span>Coming</span>
            <span className="nutrekha-pink  decoration-[#D4627A]/40">Soon...!</span>
          </div>
          <p className="hero-description text-slate-600 mb-6 leading-relaxed">
            At Nutrekha, nutrition is more than calories and meal plans. It’s about understanding your body, your lifestyle, and your relationship with food to create sustainable habits that support lifelong health.
          </p>

          {/* Feature Pills */}

          {/* Tagline */}
          {/* <div className="hero-tagline flex items-center gap-2 text-xs font-semibold tracking-wider text-[#5A6B5A]">
            <Leaf size={14} className="text-[#3A5A2E]" />
            <span>Small Habits, Big Transformation</span>
          </div> */}
          <div className="inline-flex mt-5 items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold tracking-wider uppercase mb-5 border border-[#F5C6D0]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>Start Your Wellness Journey With Us</span>
          </div>
        </div>

        {/* Hero Visual Column */}
        <div className="hero-visual">
          <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-[#E8D5C8]/50 transition-all duration-500 mx-auto">
            <NutrekhaPlate3D />
          </div>
        </div>
      </div>
    </section>
  );
}
