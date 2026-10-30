import { useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#090E1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="legal-modal-title" className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Engagement & Standards'}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                ARCHEMIST Architecture & Engineering Solutions · Effective 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-850 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-colors border border-slate-750"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          {isPrivacy ? (
            <>
              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">1. Proprietary Project Information & NDA Protection</h4>
                <p>
                  At ARCHEMIST, we design and engineer mission-critical manufacturing facilities, PEB complexes, and corporate workplaces. All technical drawings, site layouts, CAD models, structural calculations, and commercial feasibility reports shared with us are treated with the highest degree of confidentiality under strict non-disclosure obligations.
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">2. Collection of Business Inquiries</h4>
                <p>
                  When you submit a project brief or consultation request through our website, we collect your name, corporate email address, contact telephone, and facility specifications. This information is utilized solely to prepare technical proposals, feasibility assessments, and direct business communications.
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">3. Information Security & Zero Third-Party Sale</h4>
                <p>
                  We never sell, lease, or monetize client data. Your technical specifications and contact details remain restricted to authorized project architects, structural engineers, and delivery managers directly assigned to your project scope.
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">4. Compliance & Contact</h4>
                <p>
                  For confidentiality agreements, data protection questions, or custom NDA protocols before sharing tender drawings, contact our corporate legal desk at{' '}
                  <a href="mailto:admin@archemist.co.in" className="text-brand-400 underline hover:text-brand-300">
                    admin@archemist.co.in
                  </a>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">1. Architectural & Engineering Standards</h4>
                <p>
                  All structural design, civil engineering, MEP coordination, and pre-engineered building (PEB) solutions produced by ARCHEMIST comply with the National Building Code of India (NBC), Bureau of Indian Standards (BIS), and regional industrial development regulations (MIDC, CIDCO, PMC).
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">2. Single-Window EPC & Turnkey Delivery</h4>
                <p>
                  Turnkey and EPC projects are governed by customized engineering contracts that define milestone schedules, material specifications, bill of quantities (BOQ), and safety compliance frameworks. All onsite construction activity adheres to ISO safety benchmarks and zero-tolerance hazard protocols.
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">3. Intellectual Property of Architectural Designs</h4>
                <p>
                  Architectural concepts, renders, parametric models, and structural schematics developed by ARCHEMIST remain the intellectual property of the firm until final contractual handover and full realization as stipulated in project engagement agreements.
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-bold text-white mb-2 uppercase">4. Statutory Approvals & Environmental Consents</h4>
                <p>
                  Statutory liaisoning, factory inspector approvals, fire department NOCs, and environmental compliance support are executed in accordance with municipal and state industrial regulatory frameworks.
                </p>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certified Delivery Framework · ARCHEMIST Solutions</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalModal;
