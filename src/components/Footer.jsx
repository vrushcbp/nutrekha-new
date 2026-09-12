import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ChevronUp,
  Heart,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/**
 * Official WhatsApp vector brand icon
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
  "Hi Nutrekha, I came across your website and I'm interested in a personalised diet consultation. Could you please share more details about your programs and how I can get started?";
const WHATSAPP_URL = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE)}`;

/**
 * Footer component – Nutrekha Responsive & Attractive Footer
 * Includes complete contact details, exact clinic address, quick links,
 * program shortcuts, and animated social media handles.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-main" id="footer">
      {/* Top Gradient Accent Line */}
      <div className="footer-top-divider" />

      {/* Main Content Area */}
      <div className="footer-content-container">
        <div className="footer-grid">
          {/* Column 1: Brand Info & Social Media Handles */}
          <div className="footer-col footer-col-brand">
            <a href="/" className="footer-logo-link" aria-label="Nutrekha Home">
              <img
                src="/nutrekha-logo.png"
                alt="Nutrekha Logo"
                className="footer-logo-img"
                width="48"
                height="48"
              />
              <span className="footer-logo-text">
                Nut<span className="footer-logo-highlight">rekha</span>
              </span>
            </a>

            <p className="footer-brand-desc">
              Evidence-based, personalized nutrition &amp; lifestyle guidance for long-term health and sustainable results without restrictive dieting.
            </p>

            {/* Social Media Handles */}
            <div className="footer-social-wrapper">
              <span className="footer-social-title">Connect With Us:</span>
              <div className="footer-social-links">
                <a
                  href="https://www.instagram.com/nutrekha_?stkn=c2J5cGZ0ejJra252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn instagram"
                  aria-label="Nutrekha Instagram"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <span
                  className="footer-social-btn footer-social-btn-inactive facebook"
                  aria-hidden="true"
                >
                  <Facebook size={18} />
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn whatsapp"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={18} />
                </a>
                <span
                  className="footer-social-btn footer-social-btn-inactive youtube"
                  aria-hidden="true"
                >
                  <Youtube size={18} />
                </span>
                <span
                  className="footer-social-btn footer-social-btn-inactive linkedin"
                  aria-hidden="true"
                >
                  <Linkedin size={18} />
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">
              <span>Quick Navigation</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#about" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>About Nutrekha</span>
                </a>
              </li>
              <li>
                <a href="#philosophy" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Our Philosophy</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Services &amp; Programs</span>
                </a>
              </li>
              <li>
                <a href="#feedback" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Client Feedback</span>
                </a>
              </li>
              <li>
                <a href="#blog" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Wellness Blog</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Programs */}
          <div className="footer-col">
            <h4 className="footer-col-heading">
              <span>Personalized Programs</span>
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Clinical Weight Management</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Personalized Diet Plans</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>PMOS &amp; Hormonal Health</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Diabetes Management</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Gut Health &amp; Digestion</span>
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  <ArrowRight size={13} className="footer-link-icon" />
                  <span>Lifestyle Disease Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Direct Contact */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-heading">
              <span>Get In Touch</span>
            </h4>

            <div className="footer-contact-items">
              {/* Address */}
              <div className="footer-contact-card">
                <MapPin size={20} className="footer-contact-icon flex-shrink-0 text-[#D4627A]" />
                <div className="footer-contact-details">
                  <span className="footer-contact-label">Consultation Clinic / Address</span>
                  <address className="footer-contact-text not-italic">
                    Flat no B29, Suryapuram B wing, Suncity Road, Anandnagar, Pune 411051
                  </address>
                </div>
              </div>

              {/* Official Phone */}
              <div className="footer-contact-card">
                <Phone size={18} className="footer-contact-icon flex-shrink-0 text-[#D4627A]" />
                <div className="footer-contact-details">
                  <span className="footer-contact-label">Official Number</span>
                  <a
                    href="tel:+917676482879"
                    className="footer-contact-link"
                    aria-label="Call Nutrekha at +91 7676482879"
                  >
                    +91 7676482879
                  </a>
                </div>
              </div>

              {/* Instant WhatsApp */}
              <div className="footer-contact-card">
                <WhatsAppIcon size={18} className="footer-contact-icon flex-shrink-0 text-[#25D366]" />
                <div className="footer-contact-details">
                  <span className="footer-contact-label">Instant Consultation</span>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-whatsapp-badge"
                    aria-label="Chat with Nutrekha on WhatsApp"
                  >
                    <span>Chat on WhatsApp</span>
                    <Sparkles size={12} className="animate-pulse" />
                  </a>
                </div>
              </div>

              {/* Consultation Hours */}
              <div className="footer-contact-card">
                <Clock size={18} className="footer-contact-icon flex-shrink-0 text-[#D4627A]" />
                <div className="footer-contact-details">
                  <span className="footer-contact-label">Consultation Hours</span>
                  <span className="footer-contact-text">Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong className="font-semibold text-white">Nutrekha</strong>. All rights reserved. Built with <Heart size={14} className="inline text-[#D4627A] fill-[#D4627A] mx-1" /> for sustainable wellness.
          </p>

          <button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
