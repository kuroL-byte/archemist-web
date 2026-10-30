import { ArrowUp, MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { ArchemistLogo } from './ArchemistLogo';
import { NAV_ROUTES, CONTACT_DATA, SOCIAL_LINKS } from '../data/navigation';
import type { NavRoute } from '../types/navigation';

interface FooterProps {
  onNavigateHome?: () => void;
  onOpenGallery?: (sector?: string) => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
}

export function Footer({ onNavigateHome, onOpenGallery, onOpenLegal }: FooterProps) {
  const scrollToTop = () => {
    onNavigateHome?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (route: NavRoute, e: React.MouseEvent) => {
    if (route.name === 'Projects') {
      const el = document.getElementById('clients');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#clients');
      }
      return;
    }

    if (route.href.startsWith('#')) {
      const targetId = route.href.replace('#', '');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', route.href);
        }
      } else {
        e.preventDefault();
        scrollToTop();
      }
    }
  };

  // Social icon SVGs rendered with precision
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" role="img">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.4 9.74V9.89H5.06v8.61h2.8z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" role="img">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" role="img">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" role="img">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" role="img">
            <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.201-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.175-.3-.019-.463.131-.613.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.576-.01-.2 0-.526.075-.802.376-.276.3-1.053 1.028-1.053 2.508s1.078 2.908 1.229 3.109c.15.2 2.122 3.241 5.141 4.544.718.31 1.279.495 1.716.634.721.229 1.377.196 1.895.119.578-.086 1.781-.727 2.032-1.429.251-.702.251-1.303.175-1.429-.075-.125-.276-.201-.577-.351zM12.004 21.75c-1.802 0-3.56-.484-5.1-1.401l-.365-.217-3.793.995 1.013-3.698-.238-.379A9.722 9.722 0 0 1 2.25 12c0-5.376 4.374-9.75 9.754-9.75 2.604 0 5.053 1.014 6.895 2.856a9.704 9.704 0 0 1 2.851 6.894c0 5.377-4.373 9.75-9.746 9.75zm0-17.75c-4.411 0-8 3.589-8 8 0 1.41.368 2.784 1.066 3.993l.36.626-.632 2.308 2.36-.619.606.36c1.171.696 2.51 1.065 3.876 1.065 4.411 0 8-3.589 8-8s-3.589-8-8-8z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getHoverColor = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white';
      case 'instagram':
        return 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white';
      case 'facebook':
        return 'hover:bg-[#1877f2] hover:border-[#1877f2] hover:text-white';
      case 'x':
        return 'hover:bg-black hover:border-slate-500 hover:text-white';
      case 'whatsapp':
        return 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white';
      default:
        return 'hover:bg-brand-500 hover:text-white';
    }
  };

  return (
    <footer className="bg-brand-950 text-white relative border-t border-slate-800 selection:bg-brand-500 selection:text-white">
      {/* Decorative top border glow */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-archemist-orange to-brand-500" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Main Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Column 1: Brand & Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="cursor-pointer inline-block" onClick={scrollToTop}>
              <ArchemistLogo variant="dark" className="h-12 md:h-14" />
            </div>

            <div className="font-mono text-xs font-semibold text-brand-400 uppercase tracking-widest">
              Turning Concepts Into Reality Since 2014
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              ARCHEMIST is a comprehensive architecture, structural engineering, EPC, and turnkey project delivery firm. We bridge the critical gap between conceptual foresight and disciplined execution across industrial, commercial, and institutional projects throughout India.
            </p>

            {/* Social Media Row with Clean Hover Transitions */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Connect
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 shadow-md ${getHoverColor(
                      social.platform
                    )} hover:scale-110 active:scale-95`}
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-brand-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ROUTES.map((route) => (
                <li key={route.name}>
                  <a
                    href={route.href}
                    onClick={(e) => handleLinkClick(route, e)}
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-400 transition-colors" />
                    <span>{route.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onOpenGallery?.('ALL')}
                  className="text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-2 group text-left font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-archemist-orange" />
                  <span>Project Gallery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities & Sectors (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-brand-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              Delivery Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li
                onClick={() => onOpenGallery?.('INDUSTRIAL')}
                className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span>Industrial Plants & PEB</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </li>
              <li
                onClick={() => onOpenGallery?.('COMMERCIAL')}
                className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span>Commercial Facilities & Campuses</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </li>
              <li
                onClick={() => onOpenGallery?.('INSTITUTIONAL')}
                className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span>Architecture & Master Planning</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </li>
              <li
                onClick={() => onOpenGallery?.('WORKPLACE & RETAIL')}
                className="hover:text-white transition-colors cursor-pointer flex items-center justify-between group"
              >
                <span>Corporate & Luxury Interiors</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </li>
              <li className="text-slate-400 flex items-center justify-between">
                <span>Turnkey EPC & Project Delivery</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-brand-400 uppercase tracking-widest border-b border-slate-800 pb-2">
              Corporate Desk
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  410, 411, Hilton Centre, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`tel:${CONTACT_DATA.phonePrimary}`}
                  className="font-mono hover:text-brand-400 transition-colors font-semibold"
                >
                  {CONTACT_DATA.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`mailto:${CONTACT_DATA.emailPrimary}`}
                  className="hover:text-brand-400 transition-colors"
                >
                  {CONTACT_DATA.emailPrimary}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2026 ARCHEMIST. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-500">Architecture · Engineering · EPC · PMC · Turnkey</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-brand-400 transition-colors cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-brand-400 transition-colors cursor-pointer text-left"
            >
              Terms & Standards
            </button>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500 hover:text-white text-slate-400 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
