import { useState, useEffect, useRef, useCallback } from 'react';
import { Users, Salad, Star, CalendarDays } from 'lucide-react';

/**
 * Animated counter hook - counts from 0 to target with easing
 */
function useCounter(target, duration = 2500, shouldStart = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    const startValue = 0;

    // Ease-out cubic for smooth deceleration
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(startValue + (target - startValue) * easedProgress);

      setCount(currentValue);

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

/**
 * Single stat card with animated counter
 */
function StatCard({ icon: Icon, target, label, suffix = '+', delay = 0, shouldAnimate }) {
  const count = useCounter(target, 2500, shouldAnimate);

  // Format number with commas
  const formatted = count.toLocaleString('en-IN');

  return (
    <div
      className="impact-card"
      style={{ animationDelay: `${delay}ms` }}
      data-animate={shouldAnimate ? 'true' : 'false'}
    >
      <div className="impact-card-icon">
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <div className="impact-card-number">
        {formatted}
        <span className="impact-card-suffix">{suffix}</span>
      </div>
      <div className="impact-card-label">{label}</div>
      {/* Decorative shimmer */}
      <div className="impact-card-shimmer" />
    </div>
  );
}

const STATS = [
  {
    icon: Users,
    target: 1800,
    label: 'Clients Consulted',
    suffix: '+',
    delay: 0,
  },
  {
    icon: Salad,
    target: 7000,
    label: 'Personalized Diet Plans',
    suffix: '+',
    delay: 120,
  },
  {
    icon: Star,
    target: 95,
    label: 'Client Satisfaction',
    suffix: '%',
    delay: 240,
  },
  {
    icon: CalendarDays,
    target: 4,
    label: 'Years of Experience',
    suffix: '+',
    delay: 360,
  },
];

/**
 * Our Impact Section
 * Displays animated statistics that count up when scrolled into view.
 */
export default function OurImpact() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const triggerAnimation = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(triggerAnimation, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [triggerAnimation]);

  return (
    <section className="impact-section" id="our-impact" ref={sectionRef}>
      {/* Background decoration */}
      <div className="impact-bg-pattern" />

      <div className="impact-container">
        {/* Section Header */}
        <div className={`impact-header ${hasAnimated ? 'impact-visible' : ''}`}>
          <span className="impact-eyebrow">Our Impact</span>
          <h2 className="impact-title">
            Transforming Lives Through{' '}
            <span className="impact-title-accent">Better Nutrition</span>
          </h2>
          <p className="impact-subtitle">
            Thousands of individuals have trusted Nutrekha to achieve their health and wellness goals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`impact-grid ${hasAnimated ? 'impact-visible' : ''}`}>
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              target={stat.target}
              label={stat.label}
              suffix={stat.suffix}
              delay={stat.delay}
              shouldAnimate={hasAnimated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
