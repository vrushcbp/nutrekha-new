import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  HeartHandshake,
  Sparkles,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Target,
} from 'lucide-react';

export default function VisionMission() {
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
    <section className="purpose-section" id="purpose" ref={sectionRef}>
      {/* Background ambient accents */}
      <div className="purpose-bg-pattern" />
      <div className="purpose-ambient-orb-1" />
      <div className="purpose-ambient-orb-2" />

      <div className="purpose-container">
        {/* Section Header */}
        <div className={`purpose-header ${isVisible ? 'purpose-visible' : ''}`}>
          <div className="purpose-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4627A]" />
            <span>Our Purpose</span>
          </div>

          <h2 className="purpose-title">
            Guided by Purpose,{' '}
            <span className="italic-pink">Driven by Care</span>
          </h2>

          <p className="purpose-subtitle">
            Everything at Nutrekha begins with a commitment to making nutrition simple, practical, and sustainable for every individual.
          </p>
        </div>

        {/* Two Main Cards Grid (Vision & Mission) */}
        <div className="purpose-grid">
          {/* Vision Card (Slides from Left) */}
          <div
            className={`purpose-card purpose-card-vision ${isVisible ? 'purpose-visible-left' : ''}`}
          >
            <div className="purpose-card-glow-bar purpose-glow-vision" />

            {/* Card Header & Icon */}
            <div className="purpose-icon-wrap purpose-icon-vision">
              <Compass size={32} strokeWidth={1.8} className="purpose-icon-svg" />
            </div>

            <div className="purpose-card-eyebrow">The Future We Envision</div>
            <h3 className="purpose-card-title">Our Vision</h3>

            <p className="purpose-card-desc">
              To make personalized nutrition simple, practical, and accessible while empowering people to build healthier lifestyles that last for a lifetime.
            </p>

            {/* Vision Pillars */}
            <div className="purpose-card-pillars">
              <div className="purpose-pillar-tag">
                <Target size={14} className="text-[#3A5A2E]" />
                <span>Simple &amp; Accessible</span>
              </div>
              <div className="purpose-pillar-tag">
                <CheckCircle2 size={14} className="text-[#3A5A2E]" />
                <span>Empowering Habits</span>
              </div>
              <div className="purpose-pillar-tag">
                <Leaf size={14} className="text-[#3A5A2E]" />
                <span>Lifelong Wellness</span>
              </div>
            </div>

            {/* Decorative Background Watermark */}
            <div className="purpose-watermark-icon" aria-hidden="true">
              <Compass size={160} strokeWidth={0.8} />
            </div>
          </div>

          {/* Mission Card (Slides from Right) */}
          <div
            className={`purpose-card purpose-card-mission ${isVisible ? 'purpose-visible-right' : ''}`}
          >
            <div className="purpose-card-glow-bar purpose-glow-mission" />

            {/* Card Header & Icon */}
            <div className="purpose-icon-wrap purpose-icon-mission">
              <HeartHandshake size={32} strokeWidth={1.8} className="purpose-icon-svg" />
            </div>

            <div className="purpose-card-eyebrow">How We Serve Daily</div>
            <h3 className="purpose-card-title">Our Mission</h3>

            <p className="purpose-card-desc">
              To provide evidence-based nutrition care with compassion, helping every individual make informed food choices without fear, confusion, or unnecessary restrictions.
            </p>

            {/* Mission Pillars */}
            <div className="purpose-card-pillars">
              <div className="purpose-pillar-tag">
                <ShieldCheck size={14} className="text-[#D4627A]" />
                <span>Evidence-Based Science</span>
              </div>
              <div className="purpose-pillar-tag">
                <CheckCircle2 size={14} className="text-[#D4627A]" />
                <span>Compassionate Support</span>
              </div>
              <div className="purpose-pillar-tag">
                <Sparkles size={14} className="text-[#D4627A]" />
                <span>Zero Food Guilt</span>
              </div>
            </div>

            {/* Decorative Background Watermark */}
            <div className="purpose-watermark-icon" aria-hidden="true">
              <HeartHandshake size={160} strokeWidth={0.8} />
            </div>
          </div>
        </div>

        {/* Center Connecting Bridge / Nutrekha Promise Banner */}
        <div className={`purpose-promise-box ${isVisible ? 'purpose-visible-up' : ''}`}>
          <div className="purpose-promise-connector-line" />

          <div className="purpose-promise-card">
            <div className="purpose-promise-badge">
              <Leaf size={16} className="text-[#3A5A2E] animate-bounce" />
              <span>The Nutrekha Promise</span>
            </div>

            <p className="purpose-promise-quote">
              &ldquo;Helping you build a healthier relationship with food through knowledge, balance, and sustainable habits.&rdquo;
            </p>

            <div className="purpose-promise-footer">
              <span className="purpose-promise-dot" />
              <span className="purpose-promise-tagline">Compassion • Science • Lifelong Vitality</span>
              <span className="purpose-promise-dot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
