import { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, Sparkles, Send, AlertCircle } from 'lucide-react';
import { submitConsultationLead } from '../services/consultationService';

export default function BookingConsultationModal({ isOpen, onClose, defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || 'Weight Management',
    preferredTime: 'Morning (9 AM - 12 PM)',
    message: '',
    botcheck: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    const trimmedPhone = formData.phone.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone || digitsOnly.length < 7 || digitsOnly.length > 16) {
      setError('Please enter a valid contact phone number (at least 7 digits).');
      return;
    }

    const trimmedEmail = formData.email.trim();
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setError('Please enter a valid email address.');
        return;
      }
    }

    setLoading(true);
    try {
      const result = await submitConsultationLead(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Unable to submit your consultation request. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    if (submitted) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: defaultService || 'Weight Management',
        preferredTime: 'Morning (9 AM - 12 PM)',
        message: '',
        botcheck: false,
      });
    }
    setSubmitted(false);
    setLoading(false);
    setError('');
    onClose();
  };

  return (
    <div className="nutrekha-modal-overlay" onClick={handleResetAndClose}>
      <div
        className="nutrekha-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-desc"
      >
        <button
          className="nutrekha-modal-close"
          onClick={handleResetAndClose}
          aria-label="Close consultation modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="nutrekha-modal-success text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#FDE8E0] text-[#D4627A] flex items-center justify-center mx-auto mb-4 border border-[#F5C6D0]">
              <CheckCircle2 size={36} strokeWidth={2.2} />
            </div>
            <h3 className="text-2xl font-bold text-[#2D4A2D] mb-2">
              Consultation Scheduled!
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#2D4A2D]">{formData.name}</strong>. Our senior nutritionist will reach out to you shortly on <strong className="text-[#2D4A2D]">{formData.phone}</strong> to confirm your slot for <span className="text-[#D4627A] font-semibold">{formData.service}</span>.
            </p>
            <button
              onClick={handleResetAndClose}
              className="btn-primary mx-auto"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#F5C6D0]">
                <Sparkles size={13} className="animate-pulse" />
                <span>Start Your Wellness Journey</span>
              </div>
              <h3 id="booking-modal-title" className="text-2xl sm:text-3xl font-bold text-[#2D4A2D]">
                Schedule Your <span className="italic-pink">Consultation</span>
              </h3>
              <p id="booking-modal-desc" className="text-slate-600 text-sm mt-1">
                Take the first step toward lifelong vibrant health with personalized, science-backed guidance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="nutrekha-form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="nutrekha-form-input"
                      style={{ paddingLeft: '44px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="nutrekha-form-input"
                      style={{ paddingLeft: '44px' }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Selected Program
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="nutrekha-form-input"
                  >
                    <option value="Weight Management">Weight Management</option>
                    <option value="Fat Loss Programs">Fat Loss Programs</option>
                    <option value="Clinical Nutrition">Clinical Nutrition</option>
                    <option value="PMOS Nutrition">PMOS Nutrition</option>
                    <option value="Diabetes Management">Diabetes Management</option>
                    <option value="Thyroid Nutrition">Thyroid Nutrition</option>
                    <option value="Women's Health">Women&apos;s Health</option>
                    <option value="Sports & Fitness Nutrition">Sports &amp; Fitness Nutrition</option>
                    <option value="Gut Health & Digestion">Gut Health &amp; Digestion</option>
                    <option value="Corporate Wellness">Corporate Wellness</option>
                    <option value="Family & Child Nutrition">Family &amp; Child Nutrition</option>
                    <option value="Lifestyle Disease Management">Lifestyle Disease Management</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="nutrekha-form-input"
                      style={{ paddingLeft: '44px' }}
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Weekend Slot">Weekend Slot</option>
                    </select>
                  </div>
                </div> */}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                  Any Health Goals or Questions? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any health conditions, dietary preferences, or specific goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="nutrekha-form-input resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium" role="alert">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Honeypot for spam bot detection (hidden from genuine users and screen readers) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={formData.botcheck}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="btn-primary w-full justify-center text-base py-3.5 shadow-lg"
              >
                {loading ? (
                  <span>Booking Your Slot...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Confirm Consultation Request</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-1">
                🔒 100% Confidential. No spam, ever.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
