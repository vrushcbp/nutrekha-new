import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  ChevronUp,
  Heart,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

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
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn facebook"
                  aria-label="Nutrekha Facebook"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://wa.me/917676482879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn whatsapp"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn youtube"
                  aria-label="Nutrekha YouTube Channel"
                  title="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn linkedin"
                  aria-label="Nutrekha LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
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
                <a href="#purpose" className="footer-link">
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
                  <a href="tel:+917676482879" className="footer-contact-link">
                    +91 7676482879
                  </a>
                </div>
              </div>

              {/* Instant WhatsApp */}
              <div className="footer-contact-card">
                <MessageCircle size={18} className="footer-contact-icon flex-shrink-0 text-[#25D366]" />
                <div className="footer-contact-details">
                  <span className="footer-contact-label">Instant Consultation</span>
                  <a
                    href="https://wa.me/917676482879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-whatsapp-badge"
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
