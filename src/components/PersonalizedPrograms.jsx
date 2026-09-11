import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  Check,
  CheckCircle2,
  ShieldCheck,
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
} from 'lucide-react';
import {
  PROGRAMS_DATA,
  DURATION_PROGRAMS,
  DURATION_BENEFITS,
} from '../data/programsData';
import ProgramDetailView from './ProgramDetailView';
import BookingConsultationModal from './BookingConsultationModal';
import RecommendationModal from './RecommendationModal';

/**
 * Official WhatsApp Vector Brand Icon
 */
function WhatsAppIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const OFFICIAL_WHATSAPP_NUMBER = '917676482879';
const WHATSAPP_PREFILLED_MESSAGE =
  "Hi Nutrekha \u{1F44B} I came across your website and I'm interested in a personalised diet consultation. Could you please share more details about your programs and how I can get started? \u{1F60A}";
const WHATSAPP_URL = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE)}`;

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
};

export default function PersonalizedPrograms() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDefaultService, setBookingDefaultService] = useState('');
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

  const sectionRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  const handleOpenBooking = (serviceName = '') => {
    setBookingDefaultService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCardClick = (program) => {
    setSelectedProgram(program);
  };

  return (
    <section className="programs-section" id="services" ref={sectionRef}>
      {/* Background ambient accents */}
      <div className="programs-bg-pattern" />

      <div className="programs-container">
        {/* =========================================================
            1. DURATION-BASED NUTRITION PROGRAMS (HERO OF SECTION)
            ========================================================= */}
        <div className={`programs-header ${isVisible ? 'programs-visible' : ''}`}>
          <div className="programs-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>Choose The Support That Fits Your Journey</span>
          </div>

          <h2 className="programs-title">
            Nutrition <span className="italic-pink">Programs</span>
          </h2>

          <p className="programs-subtitle uppercase tracking-wider font-semibold text-xs sm:text-sm text-[#D4627A] mb-2">
            CHOOSE THE SUPPORT THAT FITS YOUR JOURNEY.
          </p>

          {/* Promotional message banner per reference design */}
          <div className="duration-promo-banner">
            <Sparkles size={18} className="duration-promo-icon animate-pulse" />
            <p className="duration-promo-text">
              INVEST IN YOUR HEALTH TODAY, AND ENJOY MORE WHEN YOU COMMIT FOR LONGER!
            </p>
          </div>
        </div>

        {/* Three Program Cards (Nourish, Transform, Thrive) */}
        <div className={`duration-grid ${isVisible ? 'programs-visible' : ''}`}>
          {DURATION_PROGRAMS.map((prog) => {
            const isPopular = prog.popular;
            return (
              <div
                key={prog.id}
                className={`duration-card ${isPopular ? 'popular' : ''}`}
              >
                {isPopular && (
                  <div className="duration-badge-popular">
                    <Sparkles size={12} />
                    <span>{prog.badge || 'MOST POPULAR'}</span>
                  </div>
                )}

                <div className="duration-card-header">
                  <span className="duration-tag">{prog.duration}</span>
                  <h3 className="duration-card-title">{prog.name}</h3>
                  <div className="duration-card-price-wrap">
                    <span className="duration-card-price">{prog.price}</span>
                  </div>
                  <p className="duration-card-tagline">{prog.tagline}</p>
                </div>

                <ul className="duration-features-list">
                  {prog.features.map((feat, idx) => (
                    <li key={idx} className="duration-feature-item">
                      <span className="duration-feature-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOpenBooking(`${prog.name} (${prog.duration})`)}
                  className="duration-card-cta"
                  aria-label={`Get Started with ${prog.name} ${prog.duration} program for ${prog.price}`}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Benefit Strip */}
        <div className="duration-benefits-strip">
          <div className="duration-benefits-header">
            <h3 className="duration-benefits-title">THE LONGER YOU COMMIT,</h3>
            <span className="duration-benefits-subtitle">the more you gain!</span>
          </div>
          <div className="duration-benefits-grid">
            {DURATION_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="duration-benefit-pill">
                <CheckCircle2 size={16} className="duration-benefit-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="duration-final-cta-wrap">
          <div className="duration-final-cta-text">
            <h3>Better nutrition. Better you.</h3>
            <p>Let’s do it together!</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="duration-dm-btn"
            aria-label="DM us on WhatsApp to get started"
          >
            <WhatsAppIcon size={20} />
            <span>DM US TO GET STARTED!</span>
          </a>
        </div>

        {/* =========================================================
            2. CONDITION-SPECIFIC CLINICAL NUTRITION PROTOCOLS
            Preserves existing 12 clinical programs, details & quiz
            ========================================================= */}
        <div className="clinical-divider-wrap">
          <div className="clinical-divider-badge">
            <ShieldCheck size={14} className="text-[#3A5A2E]" />
            <span>Specialized Clinical Support</span>
          </div>
          <h3 className="clinical-divider-title">
            Condition-Specific <span className="italic-pink">Clinical Protocols</span>
          </h3>
          <p className="clinical-divider-subtitle">
            Looking for specialized care? Explore our targeted nutritional therapy frameworks for PMOS, Diabetes, Thyroid, Gut Health &amp; more.
          </p>
        </div>

        {/* 12 Service Cards Grid */}
        <div className={`programs-grid ${isVisible ? 'programs-visible' : ''}`}>
          {PROGRAMS_DATA.map((program, index) => {
            const IconComponent = ICON_MAP[program.iconName] || Sparkles;
            const staggerDelay = (index % 6) * 100;

            return (
              <div
                key={program.id}
                className="program-card"
                style={{ animationDelay: `${staggerDelay}ms` }}
                data-animate={isVisible ? 'true' : 'false'}
                onClick={() => handleCardClick(program)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(program);
                  }
                }}
              >
                {/* Card Top: Icon & Tag */}
                <div className="program-card-header">
                  <div className="program-card-icon-wrap">
                    <IconComponent size={24} strokeWidth={1.8} />
                  </div>
                  <span className="program-card-tag">{program.tag}</span>
                </div>

                {/* Card Content */}
                <h4 className="program-card-title">{program.title}</h4>
                <p className="program-card-desc">{program.shortDesc}</p>

                {/* Card Action */}
                <div className="program-card-footer">
                  <span className="program-card-cta">Learn More</span>
                  <div className="program-card-arrow">
                    <ArrowRight size={15} />
                  </div>
                </div>

                {/* Decorative border highlight */}
                <div className="program-card-glow-bar" />
              </div>
            );
          })}
        </div>

        {/* Recommendation Quiz Box */}
        <div className={`programs-bonus-box ${isVisible ? 'programs-visible' : ''}`}>
          <div className="programs-bonus-content">
            <div className="programs-bonus-icon">
              <HelpCircle size={28} className="text-[#D4627A]" />
            </div>
            <div className="programs-bonus-text">
              <h4 className="text-lg sm:text-xl font-bold text-[#2D4A2D]">
                Not sure which program is right for you?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Answer 3 quick questions to discover your personalized nutrition roadmap in under a minute.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRecommendationOpen(true)}
            className="btn-secondary text-xs sm:text-sm py-3 px-6 shadow-sm break-words sm:whitespace-nowrap text-center max-w-full"
          >
            <Sparkles size={16} className="text-[#D4627A] flex-shrink-0" />
            <span className="break-words">Get a Personalized Recommendation</span>
          </button>
        </div>
      </div>

      {/* Detail View Modal / Overlay */}
      {selectedProgram && (
        <ProgramDetailView
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* Recommendation Quiz Modal */}
      <RecommendationModal
        isOpen={isRecommendationOpen}
        onClose={() => setIsRecommendationOpen(false)}
        onSelectProgram={(program) => setSelectedProgram(program)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Booking Consultation Modal */}
      <BookingConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingDefaultService}
      />
    </section>
  );
}
