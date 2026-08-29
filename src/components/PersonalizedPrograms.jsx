import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
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
} from 'lucide-react';
import { PROGRAMS_DATA } from '../data/programsData';
import ProgramDetailView from './ProgramDetailView';
import BookingConsultationModal from './BookingConsultationModal';
import RecommendationModal from './RecommendationModal';

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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
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
        {/* Section Header */}
        <div className={`programs-header ${isVisible ? 'programs-visible' : ''}`}>
          <div className="programs-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>Tailored Care For Every Goal</span>
          </div>

          <h2 className="programs-title">
            Personalized <span className="italic-pink">Nutrition Programs</span>
          </h2>

          <p className="programs-subtitle">
            Every nutrition plan is thoughtfully designed to support your unique health goals, lifestyle, and medical needs.
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
                <h3 className="program-card-title">{program.title}</h3>
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

        {/* Bonus UX Section: Not sure which program is right for you? */}
        <div className={`programs-bonus-box ${isVisible ? 'programs-visible' : ''}`}>
          <div className="programs-bonus-content">
            <div className="programs-bonus-icon">
              <HelpCircle size={28} className="text-[#D4627A]" />
            </div>
            <div className="programs-bonus-text">
              <h3 className="text-lg sm:text-xl font-bold text-[#2D4A2D]">
                Not sure which program is right for you?
              </h3>
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
