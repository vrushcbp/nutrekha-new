import React from 'react';

/**
 * Footer component – themed to match Nutrekha design system.
 * Displays a gold top border, cream background, and centered content.
 */
export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <p className="footer-text">
          <span>Official Number: <a href="tel:+917676482879" className="hover:underline font-semibold text-[#2D4A2D]">+91 7676482879</a></span>
          <span className="mx-2">•</span>
          <span>© 2026 Nutrekha. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
