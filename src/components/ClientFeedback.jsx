import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { TESTIMONIALS_DATA, TRUST_METRICS } from '../data/testimonialsData';
import BookingConsultationModal from './BookingConsultationModal';

/**
 * Animated counter hook for Trust Impact Metrics
 */
function useCounter(target, duration = 2400, shouldStart = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const currentVal = Math.round(target * eased);

      setCount(currentVal);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldStart, target, duration]);

  return count;
}

function TrustMetricCard({ target, suffix, label, desc, shouldAnimate, delay = 0 }) {
  const count = useCounter(target, 2400, shouldAnimate);
  const formatted = count.toLocaleString('en-IN');

  return (
    <div
      className="trust-metric-card"
      style={{ animationDelay: `${delay}ms` }}
      data-animate={shouldAnimate ? 'true' : 'false'}
    >
      <div className="trust-metric-number">
        {formatted}
        <span className="trust-metric-suffix">{suffix}</span>
      </div>
      <div className="trust-metric-label">{label}</div>
      <div className="trust-metric-desc">{desc}</div>
      <div className="trust-metric-shimmer" />
    </div>
  );
}

export default function ClientFeedback() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');

  // Touch swipe tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  const totalItems = TESTIMONIALS_DATA.length;

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
      rootMargin: '0px 0px -40px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  // Autoplay carousel every 4.8s
  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 4800);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, totalItems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handleCardClick = (offset, index) => {
    if (offset === 0) return;
    setCurrentIndex(index);
  };

  // Touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const handleOpenBooking = (service = 'Personalized Nutrition') => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  /**
   * Calculates the relative circular offset from activeIndex:
   * 0 -> Active center card
   * -1 -> Left adjacent card
   * 1 -> Right adjacent card
   * <= -2 or >= 2 -> Offscreen
   */
  const getOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > totalItems / 2) {
      diff -= totalItems;
    } else if (diff < -totalItems / 2) {
      diff += totalItems;
    }
    return diff;
  };

  return (
    <section
      className="feedback-section"
      id="feedback"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background glows */}
      <div className="feedback-bg-pattern" />
      <div className="feedback-floating-orb-1" />
      <div className="feedback-floating-orb-2" />

      <div className="feedback-container">
        {/* Section Header */}
        <div className={`feedback-header ${isVisible ? 'feedback-visible' : ''}`}>
          <div className="feedback-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>What Our Clients Say</span>
          </div>

          <h2 className="feedback-title">
            Real Stories. Real Progress.{' '}
            <span className="italic-pink">Real Results.</span>
          </h2>

          <p className="feedback-subtitle">
            Discover how personalized nutrition guidance has helped individuals build healthier habits, improve their wellbeing, and achieve lasting results.
          </p>
        </div>

        {/* 3D Direction-Aware Flow Carousel */}
        <div
          className={`feedback-flow-stage ${isVisible ? 'feedback-visible' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="feedback-nav-btn feedback-nav-prev"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="feedback-nav-btn feedback-nav-next"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Track (3D perspective container) */}
          <div className="feedback-cards-flow">
            {TESTIMONIALS_DATA.map((item, index) => {
              const offset = getOffset(index);
              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isHidden = Math.abs(offset) >= 2;

              let cardClass = 'feedback-card-base';
              if (isActive) cardClass += ' feedback-card-active';
              else if (isPrev) cardClass += ' feedback-card-prev';
              else if (isNext) cardClass += ' feedback-card-next';
              else cardClass += ' feedback-card-hidden';

              return (
                <div
                  key={item.id}
                  className={`feedback-card ${cardClass}`}
                  onClick={() => handleCardClick(offset, index)}
                  data-offset={offset}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                >
                  {/* Subtle active halo */}
                  {isActive && <div className="feedback-active-halo" />}

                  {/* Card Header: Program Tag + Quote Icon */}
                  <div className="feedback-card-header">
                    <span className="feedback-program-tag">{item.program}</span>
                    <div className="feedback-quote-icon">
                      <Quote size={18} className="text-[#D4627A]/70 fill-[#D4627A]/20 rotate-180" />
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="feedback-stars" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        className="fill-[#F5A623] text-[#F5A623] drop-shadow-sm feedback-star-icon"
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="feedback-text">&ldquo;{item.review}&rdquo;</p>

                  {/* Achievement Badge */}
                  <div className="feedback-achievement-badge">
                    <Trophy size={14} className="text-[#D4627A] flex-shrink-0" />
                    <span className="feedback-achievement-title">{item.achievement}</span>
                    {item.achievementDetail && (
                      <span className="feedback-achievement-detail">• {item.achievementDetail}</span>
                    )}
                  </div>

                  {/* Client Info */}
                  <div className="feedback-client-info">
                    <div className="feedback-avatar-frame">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="feedback-avatar-img"
                        loading="lazy"
                        width="52"
                        height="52"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="feedback-avatar-fallback">
                        {item.initials}
                      </div>
                    </div>

                    <div className="feedback-client-details">
                      <h4 className="feedback-client-name">{item.name}</h4>
                      <span className="feedback-client-verified">
                        <CheckCircle2 size={13} className="text-[#3A5A2E]" />
                        <span>Verified Transformation</span>
                      </span>
                    </div>
                  </div>

                  {/* Ambient Glow Bar */}
                  <div className="feedback-card-glow" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="feedback-pagination">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`feedback-dot ${currentIndex === idx ? 'feedback-dot-active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicators Section */}
        <div className={`feedback-trust-section ${isVisible ? 'feedback-visible' : ''}`}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="feedback-trust-eyebrow">Proven Credibility</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              Transforming Lives Through <span className="italic-pink">Better Nutrition</span>
            </h3>
            <p className="text-slate-600 text-sm">
              Thousands of individuals have trusted Nutrekha to achieve their health and wellness goals.
            </p>
          </div>

          <div className="feedback-trust-grid">
            {TRUST_METRICS.map((metric, idx) => (
              <TrustMetricCard
                key={metric.label}
                target={metric.target}
                suffix={metric.suffix}
                label={metric.label}
                desc={metric.desc}
                shouldAnimate={isVisible}
                delay={idx * 120}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className={`feedback-cta-banner ${isVisible ? 'feedback-visible' : ''}`}>
          <div className="feedback-cta-content">
            <div className="feedback-cta-sparkle">
              <Sparkles size={24} className="text-[#D4627A] animate-pulse" />
            </div>

            <h3 className="feedback-cta-title">
              Ready to Begin Your Wellness Journey?
            </h3>

            <p className="feedback-cta-desc">
              Join hundreds of individuals who have transformed their health through personalized nutrition support.
            </p>

            <button
              onClick={() => handleOpenBooking('Personalized Nutrition')}
              className="btn-primary text-base py-3.5 px-8 shadow-xl hover:scale-105 transition-all"
            >
              <Calendar size={18} />
              <span>Book Your Consultation</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingService}
      />
    </section>
  );
}
