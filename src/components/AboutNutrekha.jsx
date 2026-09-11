import { useState, useEffect, useRef, useCallback } from 'react';
import { Leaf } from 'lucide-react';

/**
 * About Nutrekha Section
 *
 * Two-column layout with scroll-triggered slide-in animations.
 * Image slides from left, content slides from right.
 * Uses IntersectionObserver for viewport detection (fires once).
 */
export default function AboutNutrekha() {
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
      rootMargin: '0px 0px -60px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* Left — Image */}
        <div className={`about-image-wrapper ${isVisible ? 'about-visible' : ''}`}>
          <div className="about-image-frame">
            <img
              src="/images/about-nutrekha.jpg"
              alt="Nutrekha — personalized nutrition consultation with fresh, healthy food"
              className="about-image"
              loading="lazy"
              width="600"
              height="450"
            />
          </div>
          {/* Decorative accent behind image */}
          <div className="about-image-accent" />
        </div>

        {/* Right — Content */}
        <div className={`about-content ${isVisible ? 'about-visible' : ''}`}>
          {/* Eyebrow */}
          <span className="about-eyebrow">
            <Leaf size={14} strokeWidth={2.2} />
            About Nutrekha
          </span>

          {/* Heading */}
          <h2 className="about-heading">
            Nourishing Health Through Knowledge, Care, and{' '}
            <span className="about-heading-accent">Connection</span>
          </h2>

          {/* Decorative accent line */}
          <div className="about-accent-line" />

          {/* Body text */}
          <div className="about-body">
            <p>
              Nutrekha was created with one simple belief—every individual deserves
              nutrition guidance that is practical, compassionate, and backed by science.
            </p>
            <p>
              Inspired by the values of care, patience, and nourishment, Nutrekha
              combines evidence-based nutrition with personalized support to help you
              build healthy habits that last.
            </p>
            <p>
              Whether your goal is weight management, improving metabolic health,
              managing a medical condition, or simply feeling your best, every plan is
              thoughtfully designed around you—not around trends or restrictive diets.
            </p>
            <p className="about-closing">
              Because lasting wellness begins with understanding, not deprivation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
