import { useState, type FormEvent } from 'react';
import {
  MapPin,
  Mail,
  PhoneCall,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { CONTACT_DATA } from '../data/navigation';

const PROJECT_TYPES = [
  'Industrial Facility & PEB Manufacturing',
  'Commercial Campus / Workplace',
  'Architecture & Master Planning',
  'Interior Architecture & Turnkey Fit-Out',
  'EPC & Construction Management (PMC)',
  'Structural & MEP Technical Engineering',
  'General Inquiry / Partnership',
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    projectType: PROJECT_TYPES[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact number';
    } else if (!/^[0-9+\s()-]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project sector';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project or inquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const getWhatsAppUrl = (data: FormState) => {
    const text = encodeURIComponent(
      `*New Project Inquiry - ARCHEMIST*\n\n*Name:* ${data.fullName || 'Prospective Client'}\n*Email:* ${data.email || 'N/A'}\n*Phone:* ${data.phone || 'N/A'}\n*Sector:* ${data.projectType}\n\n*Scope & Requirements:*\n${data.message || 'Consultation request'}`
    );
    return `https://wa.me/919167240535?text=${text}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const formEndpoint =
      import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
      (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ? 'https://api.web3forms.com/submit' : '');

    try {
      if (formEndpoint) {
        const payload: Record<string, string> = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          subject: `[ARCHEMIST Inquiry] ${formData.projectType} - ${formData.fullName}`,
        };

        if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
          payload.access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        }

        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error('Server returned an error status.');
        }
      } else {
        // Fallback simulation for dev/preview environments without endpoint configured
        await new Promise((r) => setTimeout(r, 650));
      }

      setSubmittedData({ ...formData });
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        projectType: PROJECT_TYPES[0],
        message: '',
      });
      setErrors({});
    } catch {
      // If network or endpoint fails, allow the user to immediately send via WhatsApp or mailto
      setSubmitError(
        'Direct server dispatch unavailable. You can send your brief directly to our team via WhatsApp or Email below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-brand-500 mb-3">
            Contact & Consultation
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 uppercase">
            LET'S BUILD WITH <span className="text-brand-500">CERTAINTY.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Partner with ARCHEMIST for comprehensive architecture, structural engineering, EPC, and turnkey project delivery across industrial, commercial, and institutional sectors.
          </p>
        </div>

        {/* 4 Clean Direct Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Office Address */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-400 mb-4">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Headquarters
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Office Address</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                410, 411, Hilton Centre, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleCopy(CONTACT_DATA.officeAddress, 'address')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                {copiedField === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
              <a
                href={CONTACT_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors ml-auto"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Email Desk */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-400 mb-4">
                <Mail className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Desk
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Inquiries</h3>
              <div className="space-y-1 mb-4">
                <a
                  href={`mailto:${CONTACT_DATA.emailPrimary}`}
                  className="text-slate-200 text-xs sm:text-sm font-medium hover:text-brand-400 transition-colors block truncate"
                >
                  {CONTACT_DATA.emailPrimary}
                </a>
                {CONTACT_DATA.emailSecondary && (
                  <a
                    href={`mailto:${CONTACT_DATA.emailSecondary}`}
                    className="text-slate-400 text-xs hover:text-brand-400 transition-colors block truncate"
                  >
                    {CONTACT_DATA.emailSecondary}
                  </a>
                )}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <a
                href={`mailto:${CONTACT_DATA.emailPrimary}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Write to Desk</span>
              </a>
            </div>
          </div>

          {/* Card 3: Direct Phone Line */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-400 mb-4">
                <PhoneCall className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Telephone
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Direct Line</h3>
              <div className="space-y-1 mb-4 font-mono">
                <a
                  href={`tel:${CONTACT_DATA.phonePrimary}`}
                  className="text-slate-200 text-xs sm:text-sm font-medium hover:text-brand-400 transition-colors block"
                >
                  {CONTACT_DATA.phoneDisplay}
                </a>
                {CONTACT_DATA.phoneSecondary && (
                  <span className="text-slate-400 text-xs block">
                    {CONTACT_DATA.phoneSecondary}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <a
                href={`tel:${CONTACT_DATA.phonePrimary}`}
                className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Call
              </a>
              <a
                href={`https://wa.me/919167240535?text=Hello%20Archemist%20Team,%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Card 4: Business Hours */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-slate-400 mb-4">
                <Clock className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Working Hours
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">Office Schedule</h3>
              <div className="space-y-1 mb-4 text-xs sm:text-sm">
                <div className="text-slate-200 font-medium">Monday – Saturday</div>
                <div className="text-slate-400 text-xs">9:30 AM – 7:00 PM IST</div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              Sunday: Closed
            </div>
          </div>
        </div>

        {/* Interactive Form & Embedded Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="mb-6 pb-4 border-b border-slate-800">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Project Inquiry Form
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Share your facility requirements, location, or project scope with our engineering team.
              </p>
            </div>

            {isSubmitted && submittedData ? (
              /* Success State Screen */
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white mb-2">
                  Inquiry Submitted
                </h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, <strong className="text-white">{submittedData.fullName}</strong>. We have received your project details for{' '}
                  <strong className="text-brand-400">{submittedData.projectType}</strong>. Our team will review the scope and contact you shortly.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left max-w-md mx-auto text-xs space-y-1.5 mb-6 text-slate-300">
                  <div>
                    <span className="text-slate-500">Email:</span> {submittedData.email}
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span> {submittedData.phone}
                  </div>
                  <div>
                    <span className="text-slate-500">Sector:</span> {submittedData.projectType}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <span>Connect on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Clean Contact Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your name"
                      className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-brand-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-brand-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-brand-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Project Type <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 pr-8 py-2.5 bg-slate-950 border rounded-xl text-sm text-white appearance-none focus:outline-none transition-colors cursor-pointer ${
                          errors.projectType
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-brand-500'
                        }`}
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-slate-900 text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
                        ▼
                      </div>
                    </div>
                    {errors.projectType && (
                      <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.projectType}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Project Requirements / Scope <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline facility type, area (sq. ft.), location, or timelines..."
                    className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-800 focus:border-brand-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-rose-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Error Banner with WhatsApp fallback */}
                {submitError && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                    <a
                      href={getWhatsAppUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <span>Send on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {/* Submit Action & Instant WhatsApp Connect */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <a
                    href="https://wa.me/919167240535?text=Hello%20Archemist%20Team,%20I%20would%20like%20to%20discuss%20a%20turnkey%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-2"
                  >
                    <span>Instant Desk: Chat on WhatsApp (+91 91672 40535)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Embedded Google Map Container (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  CBD Belapur Office
                </span>
              </div>
              <span className="text-xs text-slate-400">Navi Mumbai</span>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                title="ARCHEMIST Office Location - Hilton Centre, CBD Belapur"
                src="https://maps.google.com/maps?q=Hilton%20Centre,%20Sector%2011,%20CBD%20Belapur,%20Navi%20Mumbai,%20Maharashtra%20400614&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-[1.05]"
              />
            </div>

            {/* Strategic Connectivity */}
            <div className="mt-5 space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Location & Connectivity
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  CBD Belapur Station: 5 mins
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  Navi Mumbai Airport: 20 mins
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 sm:col-span-2">
                  Direct access from Sion-Panvel Expressway
                </div>
              </div>

              <a
                href={CONTACT_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
