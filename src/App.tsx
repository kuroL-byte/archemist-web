import { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { LegalModal, type LegalModalType } from "./components/LegalModal";

const MEDIA = {
  heroVideo: "/archemist_delivery_reel.mp4",
  heroFallback: "/commercial-warehouse.jpeg",
  industrialPlant: "/industrial-complex.jpeg",
  pebStructure: "/peb-structure.jpeg",
  commercialFacility: "/commercial-warehouse.jpeg",
  corporateInterior: "/commercial-interior.jpeg",
};

export interface ProjectItem {
  id: number;
  name: string;
  scope: string;
  type: string;
  sector: "INDUSTRIAL" | "COMMERCIAL" | "INSTITUTIONAL" | "WORKPLACE & RETAIL";
  location?: string;
  size?: string;
  images: string[];
  description?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "Croda Chemicals",
    scope: "Industrial Facility",
    type: "Industrial",
    sector: "INDUSTRIAL",
    location: "Navi Mumbai Industrial Zone",
    size: "Specialist Processing",
    images: [
      "/images/projects/croda-chemicals-01.webp",
      "/images/projects/croda-chemicals-02.webp",
      "/images/projects/croda-chemicals-03.webp",
      "/images/projects/croda-chemicals-04.webp",
      "/images/projects/croda-chemicals-05.webp",
    ],
    description: "Specialized industrial chemical plant architecture and structural execution built for advanced manufacturing standards and safety protocols.",
  },
  {
    id: 2,
    name: "SHELL",
    scope: "Industrial Facility",
    type: "Interior Design",
    sector: "WORKPLACE & RETAIL",
    location: "Corporate Industrial Campus",
    size: "Turnkey Fit-Out",
    images: [
      "/images/projects/shell-01.webp",
      "/images/projects/shell-02.webp",
      "/images/projects/shell-03.webp",
      "/images/projects/shell-04.webp",
      "/images/projects/shell-05.webp",
      "/images/projects/shell-06.webp",
      "/images/projects/shell-07.webp",
      "/images/projects/shell-08.webp",
      "/images/projects/shell-09.webp",
    ],
    description: "World-class corporate interior architecture and operations workspace delivery for SHELL with high-performance MEP coordination.",
  },
  {
    id: 3,
    name: "Mr Keni - Swapnapurti",
    scope: "Residential Architecture",
    type: "Architecture",
    sector: "INSTITUTIONAL",
    location: "Maharashtra",
    size: "Private Residence",
    images: [
      "/images/projects/mr-keni-01.webp",
      "/images/projects/mr-keni-02.webp",
      "/images/projects/mr-keni-03.webp",
      "/images/projects/mr-keni-04.webp",
      "/images/projects/mr-keni-05.webp",
      "/images/projects/mr-keni-06.webp",
    ],
    description: "Bespoke contemporary residential architectural design blending clean geometric lines, natural ventilation, and functional elegance.",
  },
  {
    id: 4,
    name: "Mr Santosh Gondhali - Matru Vatsalya",
    scope: "Residential Architecture",
    type: "Architecture",
    sector: "INSTITUTIONAL",
    location: "Maharashtra",
    size: "Multi-Storey Villa",
    images: [
      "/images/projects/santosh-gondhali-01.webp",
      "/images/projects/santosh-gondhali-02.webp",
      "/images/projects/santosh-gondhali-03.webp",
      "/images/projects/santosh-gondhali-04.webp",
      "/images/projects/santosh-gondhali-05.webp",
      "/images/projects/santosh-gondhali-06.webp",
    ],
    description: "Custom residential architecture engineered for structural durability, optimal spatial flow, and enduring aesthetic harmony.",
  },
  {
    id: 5,
    name: "Mr Sandeep Mahajan",
    scope: "Residential Interior",
    type: "Interior Design",
    sector: "WORKPLACE & RETAIL",
    location: "Navi Mumbai",
    size: "Luxury Residence",
    images: [
      "/images/projects/sandeep-mahajan-01.webp",
    ],
    description: "Premium interior fit-out featuring tailored woodwork, ambient lighting schemes, and bespoke finishes.",
  },
  {
    id: 6,
    name: "Mr Santosh Pokhale",
    scope: "Commercial Interior",
    type: "Commercial Interior Fit-out",
    sector: "COMMERCIAL",
    location: "Navi Mumbai Commercial Hub",
    size: "Office Fit-Out",
    images: [
      "/images/projects/santosh-pokhale-01.webp",
      "/images/projects/santosh-pokhale-02.webp",
      "/images/projects/santosh-pokhale-03.webp",
      "/images/projects/santosh-pokhale-04.webp",
      "/images/projects/santosh-pokhale-05.webp",
    ],
    description: "High-productivity commercial interior workspace designed for operational efficiency, collaboration, and modern ergonomics.",
  },
  {
    id: 7,
    name: "Hilton Centre",
    scope: "Commercial Building",
    type: "Maintenance / Commercial",
    sector: "COMMERCIAL",
    location: "CBD Belapur, Navi Mumbai",
    size: "Commercial Complex",
    images: [
      "/images/projects/hilton-center-01.webp",
      "/images/projects/hilton-center-02.webp",
      "/images/projects/hilton-center-03.webp",
      "/images/projects/hilton-center-04.webp",
      "/images/projects/hilton-center-05.webp",
      "/images/projects/hilton-center-06.webp",
      "/images/projects/hilton-center-07.webp",
    ],
    description: "Comprehensive commercial infrastructure execution and ongoing technical building maintenance ensuring uninterrupted business continuity.",
  },
  {
    id: 8,
    name: "Waterfront - Unit 501",
    scope: "Residential Interior",
    type: "Interior Design",
    sector: "WORKPLACE & RETAIL",
    location: "Waterfront Residences",
    size: "Luxury Apartment",
    images: [
      "/images/projects/Waterfront501-1.webp",
      "/images/projects/Waterfront501-2.webp",
      "/images/projects/Waterfront501-3.webp",
      "/images/projects/Waterfront501-4.webp",
      "/images/projects/Waterfront501-5.webp",
      "/images/projects/Waterfront501-6.webp",
      "/images/projects/Waterfront501-7.webp",
      "/images/projects/Waterfront501-8.webp",
      "/images/projects/Waterfront501-9.webp",
    ],
    description: "Sophisticated interior execution combining warm minimalist aesthetics with smart living integration and premium Italian finishes.",
  },
  {
    id: 9,
    name: "Waterfront - Unit 502",
    scope: "Residential Interior",
    type: "Interior Design",
    sector: "WORKPLACE & RETAIL",
    location: "Waterfront Residences",
    size: "Luxury Apartment",
    images: [
      "/images/projects/Waterfront502-1.webp",
      "/images/projects/Waterfront502-2.webp",
      "/images/projects/Waterfront502-3.webp",
      "/images/projects/Waterfront502-4.webp",
      "/images/projects/Waterfront502-5.webp",
      "/images/projects/Waterfront502-6.webp",
      "/images/projects/Waterfront502-7.webp",
      "/images/projects/Waterfront502-8.webp",
      "/images/projects/Waterfront502-9.webp",
    ],
    description: "Artisan interior styling with curated palettes, custom cabinetry, acoustic isolation, and architectural illumination.",
  },
  {
    id: 10,
    name: "Elevate",
    scope: "Commercial / Residential",
    type: "Interior Design",
    sector: "WORKPLACE & RETAIL",
    location: "Metropolitan Region",
    size: "Mixed-Use Fit-Out",
    images: [
      "/images/projects/elevate-01.webp",
      "/images/projects/elevate-02.webp",
      "/images/projects/elevate-03.webp",
      "/images/projects/elevate-04.webp",
      "/images/projects/elevate-05.webp",
      "/images/projects/elevate-06.webp",
    ],
    description: "Dynamic modern fit-out integrating flexible modular spaces, bold accents, and premium hospitality-grade finishes.",
  },
];

const CLIENTS = [
  "Atlas Copco", "Magna", "JCB Siddharth Auto Engineers", "Inox Air Products",
  "Pricol", "Knorr-Bremse", "Praj", "DSV", "Stanley Black & Decker", "Shell",
  "Shell Energy", "Croda", "MAN", "Iberchem", "Aquapharm", "IAC", "TSI", "Femco", "Emdep", "Weiss"
];


// Interactive Project Card with in-card photo slider and click-to-expand
function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const images = project.images && project.images.length > 0 ? project.images : ["/images/projects/croda-chemicals-01.webp"];
  const total = images.length;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % total);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="group h-full rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-500/50 transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="h-60 overflow-hidden relative bg-[#0F172A] flex items-center justify-center select-none">
        <img
          key={images[photoIndex]}
          src={images[photoIndex]}
          alt={`${project.name} - Photo ${photoIndex + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // graceful fallback
            (e.target as HTMLImageElement).src = "/commercial-interior.jpeg";
          }}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity"></div>

        {/* Category Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/85 backdrop-blur-md text-white font-mono text-[10px] font-semibold rounded border border-white/10 shadow-sm z-10">
          {project.type}
        </span>

        {/* In-Card Slide Controls if multiple images */}
        {total > 1 && (
          <>
            <button
              onClick={prevPhoto}
              title="Previous photo"
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-brand-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              title="Next photo"
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-brand-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-slate-900/60 px-2 py-1 rounded-full backdrop-blur-sm">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === photoIndex ? "w-4 bg-brand-400" : "w-1.5 bg-white/50"
                    }`}
                />
              ))}
            </div>
          </>
        )}

        {/* View Full Photos Hover Cue */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-500 text-white font-mono text-[10px] font-bold rounded shadow-lg uppercase tracking-wider">
            View All ({total})
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-display font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors leading-snug mb-1">
            {project.name}
          </div>
          <div className="text-xs font-mono text-slate-500 mb-3">
            {project.location || "ARCHEMIST Portfolio Project"}
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700 mb-4">
            <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/60">{project.scope}</span>
            {project.size && (
              <span className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200/60">{project.size}</span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Click to view photo gallery</span>
          <span className="font-mono text-[11px] text-slate-400">+{total} photos</span>
        </div>
      </div>
    </div>
  );
}

// Lightbox Modal to show all photos of a project
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActivePhoto((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
      if (e.key === "ArrowRight") {
        setActivePhoto((prev) => (prev + 1) % project.images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = project.images;
  const currentImage = images[activePhoto] || images[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in p-4 sm:p-6">
      <div
        className="relative w-full max-w-5xl bg-[#090E1A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-brand-500/20 border border-brand-500/40 text-brand-400 font-mono text-[11px] font-semibold uppercase">
              {project.type}
            </span>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                {project.name}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                {project.scope} {project.location ? `· ${project.location}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-slate-400 hidden sm:block">
              Photo {activePhoto + 1} of {images.length}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 flex items-center justify-center transition-colors border border-slate-700"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative flex-1 bg-black/60 min-h-[360px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
          <img
            key={currentImage}
            src={currentImage}
            alt={`${project.name} photo ${activePhoto + 1}`}
            decoding="async"
            className="max-h-[60vh] w-auto max-w-full object-contain select-none transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/commercial-interior.jpeg";
            }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={() => setActivePhoto((prev) => (prev - 1 + images.length) % images.length)}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-brand-600 text-white flex items-center justify-center transition-all border border-slate-700 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={() => setActivePhoto((prev) => (prev + 1) % images.length)}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-brand-600 text-white flex items-center justify-center transition-all border border-slate-700 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-3 left-4 px-3 py-1 bg-slate-950/70 backdrop-blur-md rounded-md border border-slate-800 text-white font-mono text-xs">
            {project.name} · {project.scope}
          </div>
        </div>

        {/* Thumbnails Strip & Project Description */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === activePhoto ? "border-brand-500 scale-105 shadow-md shadow-brand-500/20" : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
              >
                <img src={img} alt={`Thumb ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="text-right sm:max-w-md">
            <p className="text-xs text-slate-400 line-clamp-2">
              {project.description || `${project.name} - Turnkey execution and delivery by ARCHEMIST.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slideshow component for the homepage
function ProjectSlideshow({
  projects,
  onSelectProject,
  intervalMs = 4500,
}: {
  projects: ProjectItem[];
  onSelectProject: (p: ProjectItem) => void;
  intervalMs?: number;
}) {
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(projects.length - visible, 0);
  const activeIndex = index > maxIndex ? 0 : index;

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const t = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, intervalMs);
    return () => clearInterval(t);
  }, [paused, maxIndex, intervalMs]);

  const prev = () => setIndex(activeIndex <= 0 ? maxIndex : activeIndex - 1);
  const next = () => setIndex(activeIndex >= maxIndex ? 0 : activeIndex + 1);
  const slideWidth = 100 / visible;
  const progress = maxIndex === 0 ? 100 : ((activeIndex + 1) / (maxIndex + 1)) * 100;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden -mx-3">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * slideWidth}%)` }}
        >
          {projects.map((p) => (
            <div key={p.id} className="shrink-0 px-3" style={{ width: `${slideWidth}%` }}>
              <ProjectCard project={p} onSelect={onSelectProject} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 mt-10">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous projects"
            className="w-11 h-11 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:border-brand-500 hover:text-brand-500 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next projects"
            className="w-11 h-11 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center hover:border-brand-500 hover:text-brand-500 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex-1 max-w-md">
          <div className="h-[3px] w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="font-mono text-xs text-slate-500 whitespace-nowrap">
          <span className="text-slate-900 font-semibold">{String(activeIndex + 1).padStart(2, "0")}</span>
          {" / "}
          {String(projects.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

// Dedicated Project Gallery View Page
function ProjectGalleryPage({
  initialSector,
  onBackToHome,
  onSelectProject,
  onOpenLegal,
}: {
  initialSector?: string;
  onBackToHome: () => void;
  onSelectProject: (p: ProjectItem) => void;
  onOpenLegal?: (type: LegalModalType) => void;
}) {
  const [selectedSector, setSelectedSector] = useState<string>(initialSector || "ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const sectorsList = [
    { id: "ALL", label: "All Projects", count: PROJECTS.length },
    { id: "INDUSTRIAL", label: "Industrial", count: PROJECTS.filter((p) => p.sector === "INDUSTRIAL").length },
    { id: "COMMERCIAL", label: "Commercial", count: PROJECTS.filter((p) => p.sector === "COMMERCIAL").length },
    { id: "INSTITUTIONAL", label: "Architecture", count: PROJECTS.filter((p) => p.sector === "INSTITUTIONAL").length },
    { id: "WORKPLACE & RETAIL", label: "Interiors & Workplace", count: PROJECTS.filter((p) => p.sector === "WORKPLACE & RETAIL").length },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSector = selectedSector === "ALL" || p.sector === selectedSector;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white pt-28">
      {/* Hero Header for Gallery */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            Project Portfolio & Gallery
          </div>
          <button
            onClick={onBackToHome}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-brand-500 text-xs font-semibold text-white hover:text-brand-400 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Overview
          </button>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 uppercase">
            DELIVERED PROJECTS & REFERENCES
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Browse our complete project portfolio across industrial manufacturing complexes, PEB structures, corporate offices, and bespoke interiors. Click on any project to explore its full high-resolution photographic gallery.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          {/* Sector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {sectorsList.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all border ${selectedSector === sec.id
                  ? "bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/25"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
              >
                {sec.label} <span className="opacity-70 ml-1">({sec.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-12">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <svg className="w-12 h-12 mx-auto text-slate-600 mb-4 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3 className="font-display text-lg font-bold text-white mb-1">No matching projects found</h3>
              <p className="text-xs text-slate-400">Try adjusting your filter or search query.</p>
              <button
                onClick={() => { setSelectedSector("ALL"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-lg text-xs font-semibold hover:bg-brand-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p) => (
                <div key={p.id} className="h-full">
                  <ProjectCard project={p} onSelect={onSelectProject} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer
        onNavigateHome={onBackToHome}
        onOpenGallery={(sector) => setSelectedSector(sector || 'ALL')}
        onOpenLegal={onOpenLegal}
      />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "gallery">("home");
  const [selectedGallerySector, setSelectedGallerySector] = useState<string>("ALL");
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#gallery") || hash.startsWith("#projects")) {
        setCurrentView("gallery");
        const params = new URLSearchParams(hash.split("?")[1] || "");
        const sectorParam = params.get("sector");
        if (sectorParam) setSelectedGallerySector(sectorParam);
      } else {
        setCurrentView("home");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openGalleryWithSector = (sector: string = "ALL") => {
    setSelectedGallerySector(sector);
    setCurrentView("gallery");
    window.location.hash = `#gallery?sector=${encodeURIComponent(sector)}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const returnToHome = () => {
    setCurrentView("home");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch(() => { });
    }
  }, []);

  const stats = [
    { value: "12+", label: "Years of Industry Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "25+", label: "Architects & Engineers" },
  ];

  const capabilities = [
    { no: "01", title: "Architecture", desc: "Concept design, space planning and construction documentation, led by our in-house architects." },
    { no: "02", title: "Engineering", desc: "Structural, MEP and technical engineering, delivered by our dedicated team of engineers." },
    { no: "03", title: "EPC", desc: "Engineering, procurement and construction executed end-to-end by one accountable team." },
    { no: "04", title: "Turnkey", desc: "Single-window delivery from first drawing to handover, with ongoing maintenance support." },
  ];

  const sectors = [
    {
      sectorKey: "INDUSTRIAL",
      title: "INDUSTRIAL",
      desc: "Factories, manufacturing facilities, warehouses, logistics, PEB structures, industrial infrastructure.",
      image: MEDIA.pebStructure,
      tag: "HEAVY INFRA",
      icon: (
        <svg className="w-6 h-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M2 20h20M6 20V10l6 4V10l6 4V4h4v16" />
        </svg>
      ),
    },
    {
      sectorKey: "COMMERCIAL",
      title: "COMMERCIAL",
      desc: "Corporate offices, commercial developments, logistics hubs, tech parks, and commercial workplaces.",
      image: MEDIA.commercialFacility,
      tag: "CAMPUSES",
      icon: (
        <svg className="w-6 h-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      ),
    },
    {
      sectorKey: "INSTITUTIONAL",
      title: "INSTITUTIONAL & RESIDENTIAL",
      desc: "Healthcare, education, residential architecture, laboratories, data centres, and dedicated institutions.",
      image: MEDIA.industrialPlant,
      tag: "ARCHITECTURE",
      icon: (
        <svg className="w-6 h-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 6v12M6 12h12" />
        </svg>
      ),
    },
    {
      sectorKey: "WORKPLACE & RETAIL",
      title: "WORKPLACE & INTERIORS",
      desc: "Corporate interiors, collaborative workplaces, luxury residential fit-outs, and turnkey interior design.",
      image: MEDIA.corporateInterior,
      tag: "INTERIORS",
      icon: (
        <svg className="w-6 h-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M2 7h20" />
        </svg>
      ),
    },
  ];

  const controls = ["SAFETY", "QUALITY", "PROGRAMME", "COST", "COORDINATION", "COMMUNICATION"];

  return (
    <>
      {/* Lightbox Modal active in both views */}
      <ProjectModal
        key={selectedModalProject?.id ?? 'none'}
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />

      {/* Legal Modal (Privacy Policy / Terms of Engagement) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Dynamic Floating Navbar with smart scroll, 3-line hamburger, and overlay drawer */}
      <Navbar
        currentView={currentView}
        onNavigateHome={returnToHome}
      />

      {/* Render dedicated gallery page if route is gallery */}
      {currentView === "gallery" ? (
        <ProjectGalleryPage
          initialSector={selectedGallerySector}
          onBackToHome={returnToHome}
          onSelectProject={(p) => setSelectedModalProject(p)}
          onOpenLegal={(type) => setLegalModalType(type)}
        />
      ) : (
        /* Full Main Landing Page */
        <div className="min-h-screen bg-slate-950 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
          <main>
            {/* Hero Section */}
            <section className="relative min-h-[94vh] flex items-center pt-36 pb-24 text-white overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 z-0 overflow-hidden bg-brand-950">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={MEDIA.heroFallback}
                  className="w-full h-full object-cover scale-105 filter brightness-[0.85] contrast-[1.05]"
                >
                  <source src={MEDIA.heroVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/65 to-brand-950/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/60"></div>
                <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none"></div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="max-w-3xl">
                  <div className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-6">
                    Architecture · Engineering · Project Delivery
                  </div>
                  <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-white mb-6 uppercase">
                    Foresight in Planning.<br />
                    <span className="text-brand-500 drop-shadow-md">Certainty in Delivery.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-200 font-normal leading-relaxed mb-10 max-w-2xl">
                    Founded in 2014, ARCHEMIST is a turnkey architecture and engineering solutions provider, focused primarily on industrial and infrastructure projects across India.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-10">
                    <button
                      onClick={() => openGalleryWithSector("ALL")}
                      className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-xl shadow-brand-500/30 flex items-center gap-2"
                    >
                      <span>Explore Project Gallery</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                    <a
                      href="#contact"
                      className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all backdrop-blur-md"
                    >
                      Contact Team
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 backdrop-blur-sm bg-brand-950/30 p-4 rounded-xl">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-brand-400 uppercase font-semibold">01 Understand</span>
                      <span className="font-display text-sm font-semibold text-white mt-1">The Opportunity</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-brand-400 uppercase font-semibold">02 Identify</span>
                      <span className="font-display text-sm font-semibold text-white mt-1">Constraints</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-brand-400 uppercase font-semibold">03 Coordinate</span>
                      <span className="font-display text-sm font-semibold text-white mt-1">The Solution</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-brand-400 uppercase font-semibold">04 Deliver</span>
                      <span className="font-display text-sm font-semibold text-white mt-1">The Outcome</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About / At A Glance */}
            <section id="about" className="py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
                  <div className="lg:col-span-7">
                    <span className="font-mono text-xs font-semibold text-brand-500 uppercase tracking-widest">ABOUT ARCHEMIST</span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mt-2 leading-tight">
                      A SINGLE POINT OF ACCOUNTABILITY FOR YOUR CAPITAL PROJECTS
                    </h2>
                  </div>
                  <div className="lg:col-span-5 text-slate-600 text-base leading-relaxed">
                    ARCHEMIST brings architectural vision and engineering rigor together under one roof. We eliminate gaps between design and execution, delivering industrial facilities and commercial campuses on time and within budget.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-slate-200 mb-16">
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="font-display text-4xl sm:text-5xl font-bold text-brand-500 mb-2">{s.value}</div>
                      <div className="font-mono text-xs text-slate-600 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-widest">One integrated team, four capabilities</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {capabilities.map((cap) => (
                    <div key={cap.no} className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-7 hover:bg-white hover:border-brand-500/60 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-10">
                        <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500">
                          <span className="font-mono font-bold text-sm">{cap.no}</span>
                        </div>
                        <span className="font-mono text-xs text-slate-400">{cap.no}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 uppercase tracking-wide mb-3">{cap.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sectors We Serve with Direct Links to Gallery Filter */}
            <section id="sectors" className="py-24 bg-slate-900 text-white border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="font-mono text-xs font-semibold text-brand-500 uppercase tracking-widest">Built Around Your Operations</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">SECTORS WE SERVE</h2>
                  </div>
                  <button
                    onClick={() => openGalleryWithSector("ALL")}
                    className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-semibold"
                  >
                    <span>View all project sectors in gallery</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sectors.map((sec, i) => (
                    <div
                      key={i}
                      onClick={() => openGalleryWithSector(sec.sectorKey)}
                      className="group relative h-[440px] rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-end p-6 hover:border-brand-500/70 transition-all shadow-xl cursor-pointer"
                    >
                      <img src={sec.image} alt={sec.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-3">
                          <div>{sec.icon}</div>
                          <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white border border-white/15 backdrop-blur-md">{sec.tag}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-white mb-2">{sec.title}</h3>
                        <p className="text-slate-300 text-xs leading-relaxed mb-4">{sec.desc}</p>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 group-hover:text-brand-300 group-hover:translate-x-1 transition-all">
                          <span>Explore {sec.title} Projects</span>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Selected Projects Section */}
            <section id="clients" className="py-24 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="font-mono text-xs font-semibold text-brand-500 uppercase tracking-widest">Experience Across Leading Organisations</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-2">CLIENTS & PROJECT REFERENCES</h2>
                  </div>
                  <button
                    onClick={() => openGalleryWithSector("ALL")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-500/25 transition-all self-start md:self-auto"
                  >
                    <span>Open Full Project Gallery (10 Projects)</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="mb-20">
                  <div className="flex items-end justify-between mb-8">
                    <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Selected Projects (Click any card to view photos)
                    </h3>
                  </div>
                  <ProjectSlideshow
                    projects={PROJECTS}
                    onSelectProject={(p) => setSelectedModalProject(p)}
                  />
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Select Client Organisations</h3>
                  <div className="flex flex-wrap gap-2">
                    {CLIENTS.map((c, i) => (
                      <span key={i} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 italic mt-4">
                    *Client names and references published following standard engagement confirmation protocols.
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery Discipline */}
            <section id="discipline" className="py-24 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <span className="font-mono text-xs font-semibold text-brand-500 uppercase tracking-widest">Six Controls. One Delivery Discipline.</span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">DELIVERY DISCIPLINE</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                      {controls.map((ctrl, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold tracking-wider text-center shadow">
                          {ctrl}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
                    <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                      "ARCHEMIST was founded with the objective of bringing design, technical expertise and project execution closer together. Better foresight creates better projects."
                    </blockquote>
                    <div>
                      <div className="font-display font-bold text-slate-900 text-lg">AR. JAYESH KULKARNI</div>
                      <div className="font-mono text-xs text-brand-500 font-semibold uppercase">Founder & Managing Director</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Modern Contact Us Page & Section */}
          <ContactSection />

          {/* Multi-Column Footer with Socials */}
          <Footer
            onNavigateHome={returnToHome}
            onOpenGallery={openGalleryWithSector}
            onOpenLegal={(type) => setLegalModalType(type)}
          />
        </div>
      )}
    </>
  );
}