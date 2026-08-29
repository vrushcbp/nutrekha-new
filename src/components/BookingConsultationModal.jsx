import { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, Sparkles, Send } from 'lucide-react';

export default function BookingConsultationModal({ isOpen, onClose, defaultService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || 'Weight Management',
    preferredTime: 'Morning (9 AM - 12 PM)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setLoading(false);
    onClose();
  };

  return (
    <div className="nutrekha-modal-overlay" onClick={handleResetAndClose}>
      <div
        className="nutrekha-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="nutrekha-modal-close"
          onClick={handleResetAndClose}
          aria-label="Close modal"
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
              <h3 className="text-2xl sm:text-3xl font-bold text-[#2D4A2D]">
                Schedule Your <span className="italic-pink">Consultation</span>
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Take the first step toward lifelong vibrant health with personalized, science-backed guidance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="nutrekha-form-input pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="nutrekha-form-input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="nutrekha-form-input pl-10"
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
                    <option value="PCOS Nutrition">PCOS Nutrition</option>
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

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A2D] mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="nutrekha-form-input pl-10"
                    >
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                      <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      <option value="Weekend Slot">Weekend Slot</option>
                    </select>
                  </div>
                </div>
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

              <button
                type="submit"
                disabled={loading}
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
