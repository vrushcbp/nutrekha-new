import { useState, useEffect } from 'react';

/**
 * Navbar Component
 *
 * Fixed navigation bar with:
 * - Logo (image + text)
 * - Desktop navigation links
 * - Mobile hamburger toggle + full-screen overlay menu
 * - Glassmorphism effect on scroll
 */

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Purpose', href: '#purpose' },
  { label: 'Services', href: '#services' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Blog', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo" id="logo">
          <img src="/nutrekha-logo.png" alt="Nutrekha Logo" width="64" height="64" />
          <span className="navbar-logo-text">Nut<span className="navbar-logo-text2">rekha</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar-links" id="desktop-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          id="mobile-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={closeMobile}
            id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
