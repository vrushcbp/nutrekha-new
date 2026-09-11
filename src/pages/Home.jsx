import { useState } from 'react';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Star,
  Users,
  CheckCircle2,
  HeartPulse,
  Phone,
} from 'lucide-react';
import {
  BotanicalTopLeft,
  BotanicalBottomRight,
  DotAccents,
} from '../components/BotanicalDecorations';
import NutrekhaPlate3D from '../components/NutrekhaPlate3D';
import BookingConsultationModal from '../components/BookingConsultationModal';

const FEATURE_PILLS = [
  { icon: ShieldCheck, label: 'Evidence-Based Nutrition' },
  { icon: Leaf, label: 'Zero Starvation Approach' },
  { icon: HeartPulse, label: 'Kitchen-Friendly Plans' },
];

const TRUST_BADGES = [
  { value: '1800+', label: 'Happy Clients' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '4+', label: 'Years of Expertise' },
];

/**
 * Home Page – Live Hero Section
 * Full-featured, production-ready landing hero for Nutrekha
 */
export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="hero" id="hero">
        {/* Botanical Decorations */}
        <BotanicalTopLeft />
        <BotanicalBottomRight />
        <DotAccents />

        <div className="hero-container">
          {/* ── Text Content Column ── */}
          <div className="hero-content">

            {/* Eyebrow Badge */}
            <div className="hero-eyebrow-badge">
              <Sparkles className="hero-eyebrow-icon" />
              <span>Personalised Nutrition &amp; Diet Consultation</span>
            </div>

            {/* H1 — Main Headline */}
            <h1 className="hero-title">
              Where Nutrition Meets{' '}
              <span className="italic-pink">Care.</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subtitle-live">
              Transform your health with a diet plan built around <em>your</em> body, lifestyle &amp; kitchen — not a one-size-fits-all formula.
            </p>

            {/* Description */}
            <p className="hero-description">
              At Nutrekha, we go beyond calories and meal charts. Dt. Gouri Masurkar designs evidence-based, sustainable plans that fit seamlessly into your daily routine — so you lose weight, manage conditions &amp; feel energised without restriction.
            </p>

            {/* Feature Pills */}
            <div className="hero-feature-pills">
              {FEATURE_PILLS.map(({ icon: Icon, label }) => (
                <div key={label} className="hero-feature-pill">
                  <Icon size={14} className="hero-pill-icon" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button
                className="btn-primary hero-btn-primary"
                onClick={() => setIsBookingOpen(true)}
                id="hero-book-cta"
              >
                <Calendar size={18} />
                <span>Book Free Consultation</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="tel:+917676482879"
                className="btn-secondary hero-btn-secondary"
                id="hero-call-cta"
                aria-label="Call Nutrekha at +91 7676482879"
              >
                <Phone size={17} />
                <span>Call Us Now</span>
              </a>
            </div>

            {/* Trust / Stats Row */}
            <div className="hero-trust-row">
              <div className="hero-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#F5A623] text-[#F5A623]" />
                ))}
                <span className="hero-stars-label">Trusted by 1800+ clients</span>
              </div>

              <div className="hero-trust-divider" />

              <div className="hero-trust-badges">
                {TRUST_BADGES.map(({ value, label }) => (
                  <div key={label} className="hero-trust-stat">
                    <span className="hero-trust-value">{value}</span>
                    <span className="hero-trust-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified badge */}
            <div className="hero-verified-row">
              <CheckCircle2 size={14} className="text-[#3A5A2E]" />
              <span>Verified dietitian · Online &amp; in-person · Pune &amp; PAN India</span>
            </div>
          </div>

          {/* ── Visual Column ── */}
          <div className="hero-visual">
            <div className="hero-visual-card">
              <NutrekhaPlate3D />
            </div>

            {/* Floating social proof card */}
            <div className="hero-float-card hero-float-card-top">
              <Users size={16} className="text-[#D4627A] flex-shrink-0" />
              <div>
                <p className="hero-float-title">1800+ Transformations</p>
                <p className="hero-float-sub">Real results, real people</p>
              </div>
            </div>

            {/* Floating achievement card */}
            <div className="hero-float-card hero-float-card-bottom">
              <ShieldCheck size={16} className="text-[#3A5A2E] flex-shrink-0" />
              <div>
                <p className="hero-float-title">Zero Starvation Diet</p>
                <p className="hero-float-sub">Kitchen-friendly &amp; practical</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService="Personalized Nutrition"
      />
    </>
  );
}
