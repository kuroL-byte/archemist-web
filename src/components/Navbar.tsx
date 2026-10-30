import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { ArrowRight, X, Phone, Mail, MapPin } from 'lucide-react';
import { ArchemistLogo } from './ArchemistLogo';
import { NAV_ROUTES, CONTACT_DATA, SOCIAL_LINKS } from '../data/navigation';
import type { NavRoute } from '../types/navigation';

interface NavbarProps {
  currentView?: 'home' | 'gallery';
  onNavigateHome?: () => void;
}

export function Navbar({
  currentView = 'home',
  onNavigateHome,
}: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#');
  const prevScrollYRef = useRef<number>(0);

  // Smart scroll effect: auto-hide on scroll down, smoothly reappear on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = prevScrollYRef.current;
      const delta = currentScrollY - prevScrollY;

      // When mobile drawer is open, keep navbar visible
      if (isDrawerOpen) {
        setIsVisible(true);
        prevScrollYRef.current = currentScrollY;
        return;
      }

      // Detect scrolled state for styling
      setIsScrolled(currentScrollY > 30);

      // Auto-hide logic with tolerance threshold
      if (currentScrollY <= 40) {
        // At or near the top
        setIsVisible(true);
      } else if (delta > 8 && currentScrollY > 80) {
        // Scrolling down past threshold -> hide
        setIsVisible(false);
      } else if (delta < -8) {
        // Scrolling up -> show
        setIsVisible(true);
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDrawerOpen]);

  // Track active hash
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || '#');
    };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Lock body scroll and handle Escape key when drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  const handleLinkClick = (route: NavRoute, e: MouseEvent) => {
    setIsDrawerOpen(false);

    if (route.name === 'Projects') {
      // If Projects clicked, either scroll to clients or open gallery
      if (currentView === 'gallery') {
        // Already on gallery, return to overview
        onNavigateHome?.();
      } else {
        const el = document.getElementById('clients');
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', '#clients');
          setActiveHash('#clients');
        }
      }
      return;
    }

    if (route.href.startsWith('#')) {
      if (currentView === 'gallery') {
        e.preventDefault();
        onNavigateHome?.();
        // Give time for home view to render then scroll
        setTimeout(() => {
          const targetId = route.href.replace('#', '');
          if (targetId) {
            const el = document.getElementById(targetId);
            el?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        const targetId = route.href.replace('#', '');
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', route.href);
            setActiveHash(route.href);
          }
        } else {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '#');
          setActiveHash('#');
        }
      }
    }
  };

  const handleLogoClick = (e: MouseEvent) => {
    setIsDrawerOpen(false);
    if (currentView === 'gallery') {
      e.preventDefault();
      onNavigateHome?.();
    } else {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#');
      setActiveHash('#');
    }
  };

  return (
    <>
      {/* Dynamic Floating Navbar Container */}
      <header
        className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl md:rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/90 backdrop-blur-xl border-slate-700/60 shadow-2xl shadow-black/50'
              : 'bg-slate-950/75 backdrop-blur-md border-white/10 shadow-xl'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center group transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-500/50 rounded-lg p-0.5"
            aria-label="ARCHEMIST - Back to top"
          >
            <ArchemistLogo variant="dark" className="h-9 sm:h-11 md:h-12" />
          </a>

          {/* Desktop Dynamic Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ROUTES.map((route) => {
              const isActive = activeHash === route.href;
              return (
                <a
                  key={route.name}
                  href={route.href}
                  onClick={(e) => handleLinkClick(route, e)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {route.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Minimalist 3-Line Hamburger Menu Button (Animates to X when clicked) */}
            <button
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isDrawerOpen}
              className="relative w-10 h-10 rounded-full flex flex-col items-center justify-center text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/60 group"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                {/* Line 1 */}
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                    isDrawerOpen ? 'rotate-45 translate-y-[7px] bg-brand-400' : 'group-hover:bg-brand-400'
                  }`}
                />
                {/* Line 2 */}
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ${
                    isDrawerOpen ? 'opacity-0 scale-x-0' : 'opacity-100 group-hover:bg-brand-400'
                  }`}
                />
                {/* Line 3 */}
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${
                    isDrawerOpen ? '-rotate-45 -translate-y-[7px] bg-brand-400' : 'group-hover:bg-brand-400'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Navigation Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] max-w-full bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Site Navigation Drawer"
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-8 border-b border-slate-800/80 flex items-center justify-between">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <ArchemistLogo variant="dark" className="h-9 sm:h-10" />
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu drawer"
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-brand-500/50 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Navigation Links List */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Navigation
          </div>

          <nav className="space-y-2">
            {NAV_ROUTES.map((route, index) => {
              const isActive = activeHash === route.href;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <a
                  key={route.name}
                  href={route.href}
                  onClick={(e) => handleLinkClick(route, e)}
                  className={`group flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                    isActive
                      ? 'bg-slate-900/90 border-slate-700 text-white shadow-lg'
                      : 'border-transparent hover:bg-slate-900/50 hover:border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                      {formattedIndex}
                    </span>
                    <div>
                      <div className="font-display text-lg sm:text-xl font-bold group-hover:text-white transition-colors">
                        {route.name}
                      </div>
                      {route.description && (
                        <p className="text-xs text-slate-400 font-sans mt-0.5 line-clamp-1">
                          {route.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer with Direct Info & Socials */}
        <div className="p-6 sm:p-8 border-t border-slate-800/80 bg-slate-950/80 space-y-4">
          <div className="space-y-2 text-xs">
            <a
              href={`tel:${CONTACT_DATA.phonePrimary}`}
              className="flex items-center gap-2.5 text-slate-300 hover:text-brand-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span className="font-mono">{CONTACT_DATA.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${CONTACT_DATA.emailPrimary}`}
              className="flex items-center gap-2.5 text-slate-300 hover:text-brand-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>{CONTACT_DATA.emailPrimary}</span>
            </a>
            <div className="flex items-center gap-2.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Hilton Centre, CBD Belapur, Navi Mumbai</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">Connect with us</span>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500/60 hover:text-brand-400 text-slate-400 flex items-center justify-center transition-colors text-xs font-bold"
                >
                  {s.name === 'LinkedIn' && 'in'}
                  {s.name === 'Instagram' && 'ig'}
                  {s.name === 'Facebook' && 'fb'}
                  {s.name === 'X (Twitter)' && '𝕏'}
                  {s.name === 'WhatsApp' && 'wa'}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
