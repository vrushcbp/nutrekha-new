import { useState, useRef, useEffect, useCallback } from 'react';
import {
  HelpCircle,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Star,
  Users,
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import BookingConsultationModal from './BookingConsultationModal';

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openId, setOpenId] = useState('consultation-frequency');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      {/* Ambient background glows */}
      <div className="faq-bg-pattern" />
      <div className="faq-ambient-orb-1" />
      <div className="faq-ambient-orb-2" />

      <div className="faq-container">
        {/* Section Header */}
        <div className={`faq-header ${isVisible ? 'faq-visible' : ''}`}>
          <div className="faq-badge">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4627A]" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="faq-title">
            Answers to Common{' '}
            <span className="italic-pink">Nutrition Questions</span>
          </h2>

          <p className="faq-subtitle">
            Find clarity on consultations, personalized nutrition plans, weight management, PCOS, diabetes care, and sustainable healthy living.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="faq-two-col-grid">
          {/* Left Column: Premium Illustration + Trust Badges */}
          <div className={`faq-left-col ${isVisible ? 'faq-visible-left' : ''}`}>
            <div className="faq-illustration-card">
              <div className="faq-illustration-frame">
                <img
                  src="/images/faq-illustration.jpg"
                  alt="Nutrekha Personalized Nutritionist Consultation"
                  className="faq-illustration-img"
                  loading="lazy"
                />
                <div className="faq-illustration-overlay" />
              </div>

              {/* Floating Glass Trust Indicator Cards */}
              <div className="faq-trust-badge faq-trust-badge-1">
                <div className="faq-trust-icon-wrap">
                  <ShieldCheck size={18} className="text-[#3A5A2E]" />
                </div>
                <div>
                  <div className="faq-trust-title">100% Evidence-Based</div>
                  <div className="faq-trust-subtitle">Science-Backed Care</div>
                </div>
              </div>

              <div className="faq-trust-badge faq-trust-badge-2">
                <div className="faq-trust-icon-wrap bg-[#FDE8E0]">
                  <Star size={18} className="fill-[#D4627A] text-[#D4627A]" />
                </div>
                <div>
                  <div className="faq-trust-title">4.9 / 5.0 Rating</div>
                  <div className="faq-trust-subtitle">5,000+ Transformations</div>
                </div>
              </div>

              <div className="faq-trust-badge faq-trust-badge-3">
                <div className="faq-trust-icon-wrap bg-[#EAF2EB]">
                  <Users size={18} className="text-[#2D4A2D]" />
                </div>
                <div>
                  <div className="faq-trust-title">1-on-1 Support</div>
                  <div className="faq-trust-subtitle">Daily WhatsApp Guidance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className={`faq-right-col ${isVisible ? 'faq-visible-right' : ''}`}>
            <div className="faq-accordion-container" role="region" aria-label="FAQ Accordion">
              {FAQ_DATA.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-card ${isOpen ? 'faq-card-active' : ''}`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="faq-card-btn"
                      aria-expanded={isOpen}
                      aria-controls={`faq-body-${faq.id}`}
                    >
                      <span className="faq-card-question">{faq.question}</span>
                      <div className="faq-card-icon-wrap">
                        {isOpen ? (
                          <Minus size={18} className="faq-icon-svg text-[#D4627A]" />
                        ) : (
                          <Plus size={18} className="faq-icon-svg text-[#2D4A2D]" />
                        )}
                      </div>
                    </button>

                    <div
                      id={`faq-body-${faq.id}`}
                      className={`faq-card-body ${isOpen ? 'faq-card-body-open' : ''}`}
                    >
                      <div className="faq-card-content">
                        <p className="faq-card-answer">{faq.answer}</p>
                        <div className="faq-card-meta-bar">
                          <span className="faq-verified-pill">
                            <CheckCircle2 size={13} className="text-[#3A5A2E]" />
                            <span>Clinical Nutritionist Verified</span>
                          </span>
                          <span className="faq-category-tag">{faq.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Direct Help Banner */}
        <div className={`faq-bottom-help-card ${isVisible ? 'faq-visible-up' : ''}`}>
          <div className="faq-help-left">
            <div className="faq-help-icon">
              <MessageCircle size={26} className="text-[#D4627A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D4A2D]">Still have a specific health question?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Book a 1-on-1 discovery consultation to discuss your health goals and lab reports with our nutritionist.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn-primary text-xs sm:text-sm py-3 px-6 shadow-md whitespace-nowrap"
          >
            <Calendar size={16} />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>

      <BookingConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService="Personalized Consultation"
      />
    </section>
  );
}
