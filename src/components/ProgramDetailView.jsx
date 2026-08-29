import { useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Scale,
  Flame,
  Stethoscope,
  Flower2,
  ActivitySquare,
  Zap,
  Trophy,
  Leaf,
  Building2,
  Users,
  UtensilsCrossed,
  Activity,
  TrendingUp,
  Compass,
  MessageCircleHeart,
} from 'lucide-react';

const ICON_MAP = {
  Scale,
  Flame,
  Stethoscope,
  Flower2,
  ActivitySquare,
  Zap,
  Heart,
  Trophy,
  Leaf,
  Building2,
  Users,
  ShieldCheck,
  UtensilsCrossed,
  Activity,
  TrendingUp,
  Compass,
  MessageCircleHeart,
  Sparkles,
};

export default function ProgramDetailView({ program, onClose, onOpenBooking }) {
  useEffect(() => {
    // Scroll to top when view opens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!program) return null;

  const MainIcon = ICON_MAP[program.iconName] || Sparkles;

  return (
    <div className="program-detail-overlay">
      <div className="program-detail-wrapper">
        {/* Top Sticky Navigation Bar */}
        <div className="program-detail-navbar">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D4A2D] hover:text-[#D4627A] transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to all programs</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBooking(program.title)}
              className="btn-primary text-xs sm:text-sm py-2 px-4 shadow-sm"
            >
              <Calendar size={15} />
              <span>Book Consultation</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 border border-[#E8D5C8] flex items-center justify-center text-slate-500 hover:text-[#D4627A] transition-colors"
              aria-label="Close detail view"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="program-detail-hero">
          <div className="program-detail-hero-content">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#F5C6D0]">
              <Sparkles size={14} className="animate-pulse" />
              <span>{program.tag} Program</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2D4A2D] mb-4 tracking-tight leading-tight">
              {program.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {program.intro}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking(program.title)}
                className="btn-primary text-sm sm:text-base py-3.5 px-7 shadow-lg"
              >
                <Calendar size={18} />
                <span>Book Consultation for this Program</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A6B5A]">
                <ShieldCheck size={16} className="text-[#3A5A2E]" />
                <span>100% Tailored &amp; Evidence-Based</span>
              </div>
            </div>
          </div>

          <div className="program-detail-hero-visual">
            <div className="program-detail-icon-badge">
              <MainIcon size={72} strokeWidth={1.5} className="text-[#D4627A]" />
            </div>
          </div>
        </section>

        {/* Section: Who Is This For? */}
        <section className="program-detail-section">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="program-detail-eyebrow">Target Candidates</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              Who Is This Program For?
            </h2>
            <p className="text-slate-600 text-sm">
              Designed for individuals looking for customized, compassionate, and realistic nutritional care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {program.whoIsThisFor.map((item, idx) => (
              <div key={idx} className="program-who-card">
                <div className="program-who-icon">
                  <CheckCircle2 size={18} strokeWidth={2.4} />
                </div>
                <p className="text-sm font-medium text-[#2D4A2D] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: What You'll Get */}
        <section className="program-detail-section bg-white/50 border-y border-[#E8D5C8]/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="program-detail-eyebrow">Deliverables</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              What You&apos;ll Receive
            </h2>
            <p className="text-slate-600 text-sm">
              Comprehensive guidance and continuous support throughout your wellness transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {program.whatYouGet.map((item, idx) => {
              const ItemIcon = ICON_MAP[item.icon] || Sparkles;
              return (
                <div key={idx} className="program-deliverable-card">
                  <div className="program-deliverable-icon">
                    <ItemIcon size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-[#2D4A2D] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Expected Benefits */}
        <section className="program-detail-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="program-detail-eyebrow">Proven Outcomes</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              Expected Benefits
            </h2>
            <p className="text-slate-600 text-sm">
              Measurable physical, metabolic, and mental enhancements you can look forward to.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {program.expectedBenefits.map((b, idx) => (
              <div key={idx} className="program-benefit-stat-card">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#D4627A] mb-1 tracking-tight">
                  {b.metric}
                </div>
                <h4 className="text-sm font-bold text-[#2D4A2D] mb-1">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Consultation Process */}
        <section className="program-detail-section bg-[#FAF0E4]/40 border-t border-[#E8D5C8]/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="program-detail-eyebrow">How It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              Your 4-Step Consultation Journey
            </h2>
            <p className="text-slate-600 text-sm">
              A structured, stress-free path from discovery to lifelong habit mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {program.consultationSteps.map((stepItem, idx) => (
              <div key={idx} className="program-step-card">
                <div className="program-step-number">{stepItem.step}</div>
                <h4 className="text-base font-bold text-[#2D4A2D] mb-2">
                  {stepItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="program-detail-cta-banner">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              Schedule your personalized 1-on-1 consultation and take the first step towards sustainable nourishment.
            </p>
            <button
              onClick={() => onOpenBooking(program.title)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#2D4A2D] hover:bg-[#FDF6EE] font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105"
            >
              <Calendar size={18} className="text-[#D4627A]" />
              <span>Schedule Your Consultation</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
