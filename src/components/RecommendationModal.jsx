import { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/programsData';

const QUESTIONS = [
  {
    id: 'primaryGoal',
    title: 'What is your primary health goal right now?',
    options: [
      { label: 'Weight Loss & Body Fat Reduction', value: 'weight-loss', targetSlug: 'fat-loss-programs' },
      { label: 'Manage a Medical Condition (PMOS, Thyroid, Diabetes, etc.)', value: 'clinical', targetSlug: 'PMOS-nutrition' },
      { label: 'Fix Bloating, Acidity & Digestive Issues', value: 'gut', targetSlug: 'gut-health' },
      { label: 'Enhance Sports Stamina & Muscle Tone', value: 'fitness', targetSlug: 'sports-fitness-nutrition' },
      { label: 'Women’s Health (Pregnancy, Postpartum, Menopause)', value: 'women', targetSlug: 'womens-health' },
      { label: 'General Family & Child Wellness', value: 'family', targetSlug: 'family-nutrition' },
    ],
  },
  {
    id: 'challenge',
    title: 'What is your biggest daily nutrition hurdle?',
    options: [
      { label: 'Busy schedule / no time to cook elaborate meals', value: 'time' },
      { label: 'Intense sugar cravings & late-night snacking', value: 'cravings' },
      { label: 'Confused by conflicting diet trends & calorie counting', value: 'confusion' },
      { label: 'Rebound weight gain after past crash diets', value: 'rebound' },
    ],
  },
  {
    id: 'preference',
    title: 'What is your dietary preference?',
    options: [
      { label: 'Vegetarian', value: 'veg' },
      { label: 'Eggetarian', value: 'egg' },
      { label: 'Non-Vegetarian', value: 'non-veg' },
      { label: 'Jain / Vegan', value: 'special' },
    ],
  },
];

export default function RecommendationModal({ isOpen, onClose, onSelectProgram, onOpenBooking }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedProgram, setRecommendedProgram] = useState(null);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (option) => {
    const updated = { ...answers, [QUESTIONS[currentStep].id]: option };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate recommendation based on primary goal
      const primary = updated.primaryGoal;
      let match = PROGRAMS_DATA.find((p) => p.slug === primary?.targetSlug);
      if (!match) {
        match = PROGRAMS_DATA[0]; // fallback to Weight Management
      }
      setRecommendedProgram(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedProgram(null);
  };

  return (
    <div className="nutrekha-modal-overlay" onClick={onClose}>
      <div
        className="nutrekha-modal-card max-w-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        <button
          className="nutrekha-modal-close"
          onClick={onClose}
          aria-label="Close recommendation quiz"
        >
          <X size={20} />
        </button>

        {recommendedProgram ? (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#F5C6D0]">
              <Sparkles size={14} className="animate-pulse" />
              <span>Your Ideal Match</span>
            </div>

            <h3 id="quiz-modal-title" className="text-2xl sm:text-3xl font-bold text-[#2D4A2D] mb-2">
              We Recommend:{' '}
              <span className="italic-pink">{recommendedProgram.title}</span>
            </h3>

            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Based on your answers, this evidence-based program aligns directly with your goals and daily lifestyle.
            </p>

            <div className="bg-[#FAF0E4]/60 border border-[#E8D5C8] rounded-2xl p-5 text-left mb-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4627A] mb-1">
                <CheckCircle2 size={16} />
                <span>Program Highlights</span>
              </div>
              <p className="text-[#2D4A2D] font-medium text-sm leading-relaxed mb-3">
                {recommendedProgram.shortDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {recommendedProgram.expectedBenefits.slice(0, 3).map((b) => (
                  <span
                    key={b.title}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/80 border border-[#E8D5C8] text-[#2D4A2D] font-semibold"
                  >
                    ✓ {b.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  onSelectProgram(recommendedProgram);
                }}
                className="btn-secondary justify-center text-sm py-3"
              >
                <span>View Full Program Details</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(recommendedProgram.title);
                }}
                className="btn-primary justify-center text-sm py-3"
              >
                <span>Book Consultation for this Program</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <button
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#D4627A] transition-colors"
            >
              <RotateCcw size={13} />
              <span>Retake Quick Quiz</span>
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8E0] text-[#D4627A] text-xs font-semibold uppercase tracking-wider border border-[#F5C6D0]">
                  <Sparkles size={13} />
                  <span>30-Second Matcher</span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  Step {currentStep + 1} of {QUESTIONS.length}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-[#D4627A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 id="quiz-modal-title" className="text-xl sm:text-2xl font-bold text-[#2D4A2D]">
                {QUESTIONS[currentStep].title}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {QUESTIONS[currentStep].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left p-4 rounded-xl border border-[#E8D5C8] bg-white/70 hover:bg-[#FDE8E0]/40 hover:border-[#D4627A] transition-all flex items-center justify-between group shadow-sm"
                >
                  <span className="text-sm font-medium text-[#2D4A2D] group-hover:text-[#D4627A] transition-colors">
                    {option.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-slate-400 group-hover:text-[#D4627A] group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
