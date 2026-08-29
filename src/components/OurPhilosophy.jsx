import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Sliders,
  Sprout,
  HeartPulse,
  HeartHandshake,
  Check,
  Heart,
} from 'lucide-react';

const PILLARS = [
  {
    id: 'personalized-nutrition',
    icon: Sliders,
    title: 'Personalized Nutrition',
    description:
      'Tailored to your body, lifestyle, health conditions, and personal goals.',
    delay: 150,
  },
  {
    id: 'sustainable-results',
    icon: Sprout,
    title: 'Sustainable Results',
    description:
      'Real progress built through consistent habits that last a lifetime.',
    delay: 300,
  },
  {
    id: 'healthy-habits',
    icon: HeartPulse,
    title: 'Healthy Habits',
    description:
      'Small daily improvements that create meaningful long-term transformations.',
    delay: 450,
  },
  {
    id: 'you-always-first',
    icon: HeartHandshake,
    title: 'You, Always First',
    description:
      'Every recommendation is designed around your unique wellbeing and success.',
    delay: 600,
  },
];

const HIGHLIGHTS = [
  'No Crash Diets',
  'No Unrealistic Restrictions',
  'No Temporary Fixes',
];

/**
 * Our Philosophy Section
 *
 * Core philosophy pillars with sequential stagger animation,
 * centered aesthetic typography, heart accents, and bottom highlight badge.
 */
export default function OurPhilosophy() {
  const [isVisible, setIsVisible] = useState(false);
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
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  return (
    <section className="philosophy-section" id="philosophy" ref={sectionRef}>
      {/* Background ambient accents */}
      <div className="philosophy-bg-pattern" />

      <div className="philosophy-container">
        {/* Top Header */}
        <div className={`philosophy-header ${isVisible ? 'philosophy-visible' : ''}`}>
          <div className="philosophy-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>At Nutrekha, it&apos;s all about:</span>
          </div>

          <h2 className="philosophy-title">
            Nutrition That Fits <span className="italic-pink">Your Life</span>
          </h2>

          <div className="philosophy-description-box">
            <p className="philosophy-lead">
              There is no single diet that works for everyone.
            </p>
            <p className="philosophy-subtext">
              Your lifestyle, medical history, preferences, work schedule, culture, and goals all matter.
              That&apos;s why every consultation focuses on understanding you before creating a
              personalized nutrition strategy tailored specifically to your needs.
            </p>
          </div>
        </div>

        {/* Philosophy Pillars Grid */}
        <div className={`philosophy-grid ${isVisible ? 'philosophy-visible' : ''}`}>
          {PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.id} className="philosophy-pillar-wrapper">
                <div
                  className="philosophy-card"
                  style={{ animationDelay: `${pillar.delay}ms` }}
                  data-animate={isVisible ? 'true' : 'false'}
                >
                  <div className="philosophy-icon-circle">
                    <IconComponent size={26} strokeWidth={1.9} />
                  </div>
                  <h3 className="philosophy-card-title">{pillar.title}</h3>
                  <p className="philosophy-card-text">{pillar.description}</p>
                  <div className="philosophy-card-glow" />
                </div>

                {/* Decorative heart connector between pillars (desktop) */}
                {index < PILLARS.length - 1 && (
                  <div className="philosophy-divider-connector" aria-hidden="true">
                    <Heart size={14} className="text-[#D4627A]/40 fill-[#D4627A]/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight Quote Section */}
        <div className={`philosophy-bottom ${isVisible ? 'philosophy-visible' : ''}`}>
          <div className="philosophy-bottom-card">
            {/* Checklist items */}
            <div className="philosophy-checks">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="philosophy-check-pill">
                  <span className="philosophy-check-icon">
                    <Check size={14} strokeWidth={2.8} />
                  </span>
                  <span className="philosophy-check-text">{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Statement */}
            <div className="philosophy-quote-statement">
              <span className="philosophy-quote-mark">&ldquo;</span>
              <p className="philosophy-quote-text">
                Just practical nutrition that becomes part of everyday life.
              </p>
              <span className="philosophy-quote-mark">&rdquo;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
