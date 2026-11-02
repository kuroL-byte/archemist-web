import React, { useLayoutEffect, useRef, useState, useMemo } from 'react';
import {
Building2,
Compass,
HardHat,
Layers,
ExternalLink,
ArrowRight,
ChevronRight,
Sparkles,
FileText,
Send,
Clock,
MapPin,
Search,
X,
CheckCircle2,
Menu
} from 'lucide-react';

export interface JobPosition {
id: string;
title: string;
department: 'Architecture' | 'Engineering' | 'Site Execution' | 'Interiors';
qualification: string;
location: string;
type: 'Full-Time' | 'Turnkey On-Site' | 'Permanent';
experience: string;
summary: string;
responsibilities: string[];
qualifications: string[];
softwareSkills: string[];
roleExpectations: string;
}

const JOBS_DATA: JobPosition[] = [
{
id: 'senior-architect',
title: 'Senior Architect',
department: 'Architecture',
qualification: 'B.Arch.',
location: 'In-Person',
type: 'Full-Time',
experience: '5–8 Years',
summary: 'Lead architectural projects from design development to execution, with a strong focus on residential and redevelopment projects. Manage design coordination, technical documentation, client relationships, and site execution while guiding junior architects and designers.',
responsibilities: [
'Lead and independently manage architectural projects from concept to execution.',
'Handle residential and redevelopment projects, ensuring design quality and timely delivery.',
'Prepare and review SD packages, working drawings, detailed drawings, and GFC/execution drawings.',
'Manage design development, planning, detailing, and technical documentation.',
'Coordinate with clients, structural/MEP consultants, contractors, and site teams.',
'Conduct site visits to monitor execution, workmanship, and adherence to approved drawings.',
'Resolve design, technical, and site-related issues.',
'Guide junior architects and designers, review deliverables, and allocate tasks.',
'Prepare design proposals, 3D views, renderings, and client presentations.',
'Manage project timelines, deliverables, and coordination across multiple stakeholders.'
],
qualifications: [
 'B.Arch. with 5–8 years of relevant architectural experience.',
 'Strong experience in residential and redevelopment projects.',
 'Proven ability to independently manage projects and lead teams.',
 'Excellent knowledge of architectural detailing, construction, and site execution.',
 'Strong proficiency in working drawings, GFC drawings, and technical documentation.',
 'Experience in client handling, consultant coordination, and project presentations.',
 'Good understanding of interior design, 3D modelling, and visualisation.',
 'Strong communication, coordination, and problem-solving skills.',
 'Ability to manage multiple projects and meet deadlines.',
 'Willingness to undertake regular site visits.'
],
softwareSkills: [
 'AutoCAD: Advanced working knowledge.',
 'Photoshop: Presentations and post-production.',
 'Lumion: 3D visualisation and rendering.',
 'Revit Architecture & BIM: Working knowledge.',
 'PowerPoint: Professional presentations.'
],
roleExpectations: 'Take ownership of assigned projects and act as the key coordination point between clients, consultants, and internal teams, ensuring smooth progress from concept and design development through documentation and successful execution.'
},
{
id: 'intermediate-architect',
title: 'Intermediate Architect',
department: 'Architecture',
qualification: 'B.Arch.',
location: 'In-Person',
type: 'Full-Time',
experience: '3–5 Years',
summary: 'Lead architectural projects from design development to execution, with a strong focus on residential and redevelopment projects. Manage design coordination, technical documentation, client relationships, and site execution while guiding junior architects and designers.',
responsibilities: [
'Lead and independently manage architectural projects from concept to execution.',
'Handle residential and redevelopment projects, ensuring design quality and timely delivery.',
'Prepare and review SD packages, working drawings, detailed drawings, and GFC/execution drawings.',
'Manage design development, planning, detailing, and technical documentation.',
'Coordinate with clients, structural/MEP consultants, contractors, and site teams.',
'Conduct site visits to monitor execution, workmanship, and adherence to approved drawings.',
'Resolve design, technical, and site-related issues.',
'Guide junior architects and designers, review deliverables, and allocate tasks.',
'Prepare design proposals, 3D views, renderings, and client presentations.',
'Manage project timelines, deliverables, and coordination across multiple stakeholders.'
],
qualifications: [
'B.Arch. with 3–5 years of relevant architectural experience.',
'Strong experience in residential and redevelopment projects.',
'Proven ability to independently manage projects and lead teams.',
'Excellent knowledge of architectural detailing, construction, and site execution.',
'Strong proficiency in working drawings, GFC drawings, and technical documentation.',
'Experience in client handling, consultant coordination, and project presentations.',
'Good understanding of interior design, 3D modelling, and visualisation.',
'Strong communication, coordination, and problem-solving skills.',
'Ability to manage multiple projects and meet deadlines.',
'Willingness to undertake regular site visits.'
],
softwareSkills: [
'AutoCAD: Advanced working knowledge.',
'Photoshop: Presentations and post-production.',
'Lumion: 3D visualisation and rendering.',
'Revit Architecture & BIM: Working knowledge.',
'PowerPoint: Professional presentations.'
],
roleExpectations: 'Take ownership of assigned projects and act as the key coordination point between clients, consultants, and internal teams, ensuring smooth progress from concept and design development through documentation and successful execution.'
}
];

const CURRENT_YEAR = new Date().getFullYear();

interface CareersPageProps {
onNavigateHome: () => void;
}

export function CareersPage({ onNavigateHome }: CareersPageProps) {
const [searchQuery, setSearchQuery] = useState('');
const [activeJobModal, setActiveJobModal] = useState<JobPosition | null>(null);
const [applyModalJob, setApplyModalJob] = useState<JobPosition | null>(null);
const [formSubmitted, setFormSubmitted] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Form inputs
const [applicantName, setApplicantName] = useState('');
const [applicantEmail, setApplicantEmail] = useState('');
const [applicantPhone, setApplicantPhone] = useState('');
const [applicantRole, setApplicantRole] = useState('');
const [applicantResume, setApplicantResume] = useState('');
const [applicantResumeFile, setApplicantResumeFile] = useState<File | null>(null);
const [applicantNotes, setApplicantNotes] = useState('');
const resumeFileInputRef = useRef<HTMLInputElement>(null);

useLayoutEffect(() => {
window.scrollTo(0, 0);
}, []);

const applicationEmailHref = `mailto:hr.gauri.sarvatva@gmail.com?subject=${encodeURIComponent(`Job Application: ${applicantRole} - ${applicantName}`)}&body=${encodeURIComponent([
  `Name: ${applicantName}`,
  `Email: ${applicantEmail}`,
  `Phone: ${applicantPhone}`,
  `Position: ${applicantRole}`,
  `Resume link: ${applicantResume || 'Please see the attached resume.'}`,
  `Resume file to attach: ${applicantResumeFile?.name || 'None selected'}`,
  '',
  `Cover note: ${applicantNotes || 'Not provided'}`,
].join('\n'))}`;

const filteredJobs = useMemo(() => {
return JOBS_DATA.filter((job) => {
return (
job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
job.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
job.location.toLowerCase().includes(searchQuery.toLowerCase())
);
});
}, [searchQuery]);

const handleOpenApply = (job?: JobPosition) => {
setApplyModalJob(job || null);
setApplicantRole(job ? job.title : 'General Expression of Interest');
setApplicantResumeFile(null);
if (resumeFileInputRef.current) resumeFileInputRef.current.value = '';
setFormSubmitted(false);
};

const scrollToSection = (e: React.MouseEvent, id: string) => {
e.preventDefault();
setMobileMenuOpen(false);
const elem = document.getElementById(id);
if (elem) {
elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
};

const handleSubmitApplication = (e: React.FormEvent) => {
e.preventDefault();
window.location.href = applicationEmailHref;
setFormSubmitted(true);
};

return (
<>
<div className="min-h-screen bg-[#FAF9F6]">
{/* Blueprint Grid Ambient Background */}


  {/* Glow Orbs */}
  <div className="fixed top-12 left-1/4 w-[480px] h-[480px] bg-sky-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
  <div className="fixed bottom-10 right-1/4 w-[520px] h-[520px] bg-[#FAF9F6]/50 rounded-full blur-[160px] pointer-events-none -z-10" />

  {/* Navigation Bar */}
  <nav className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
    <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      {/* Logo & Brand Identity */}
      <div 
        onClick={onNavigateHome}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center font-display text-base shadow-sm shadow-sky-600/30 group-hover:bg-sky-700 transition-colors">
          A
        </div>
        <div>
          <span className="font-display font-extrabold tracking-tight text-slate-900 text-lg uppercase block leading-none">
            ARCHEMIST
          </span>
          <span className="font-mono text-[10px] tracking-widest text-sky-600 uppercase font-semibold">
            Careers & Talent
          </span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-mono text-xs uppercase tracking-wider font-semibold text-slate-600">
        <button
          onClick={onNavigateHome}
          className="text-sky-600 hover:text-sky-700 font-bold transition-colors uppercase flex items-center gap-1.5"
        >
          <span>← Back to Website</span>
        </button>
        <a 
          href="#about-section" 
          onClick={(e) => scrollToSection(e, 'about-section')}
          className="hover:text-sky-600 transition-colors"
        >
          Who We Are
        </a>
        <a 
          href="#why-section" 
          onClick={(e) => scrollToSection(e, 'why-section')}
          className="hover:text-sky-600 transition-colors"
        >
          Why Archemist
        </a>
        <a 
          href="#openings-section" 
          onClick={(e) => scrollToSection(e, 'openings-section')}
          className="hover:text-sky-600 transition-colors"
        >
          Positions
        </a>
      </div>

      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>

    {/* Mobile Dropdown Panel */}
    {mobileMenuOpen && (
      <div className="md:hidden border-b border-slate-200 bg-white/95 px-6 py-4 space-y-3 font-mono text-xs uppercase tracking-wider font-semibold shadow-lg">
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="block w-full text-left py-2 text-sky-600 font-bold"
        >
          ← Back to Website
        </button>
        <a 
          href="#about-section" 
          onClick={(e) => scrollToSection(e, 'about-section')}
          className="block py-2 text-slate-700 hover:text-sky-600"
        >
          Who We Are
        </a>
        <a 
          href="#why-section" 
          onClick={(e) => scrollToSection(e, 'why-section')}
          className="block py-2 text-slate-700 hover:text-sky-600"
        >
          Why Archemist
        </a>
        <a 
          href="#openings-section" 
          onClick={(e) => scrollToSection(e, 'openings-section')}
          className="block py-2 text-slate-700 hover:text-sky-600"
        >
          Positions
        </a>
      </div>
    )}
  </nav>

  {/* Hero Section */}
  <section className="relative z-10 pt-28 sm:pt-36 pb-16 px-6 border-b border-slate-200 bg-[#FAF9F6]">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 font-mono text-xs mb-6 uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Shape Built Environments With Us</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 uppercase leading-[1.08] mb-6">
          Foresight In Concept.<br />
          <span className="text-sky-600">Precision In Execution.</span>
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8 font-normal">
          At ARCHEMIST, we bridge the long-standing divide between visionary design and on-site EPC execution. Join an interdisciplinary collective of architects, structural planners, building services engineers, and turnkey builders transforming India’s industrial and commercial horizon.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#openings-section"
            onClick={(e) => scrollToSection(e, 'openings-section')}
            className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-600/25 flex items-center gap-2 cursor-pointer"
          >
            <span>View Open Positions</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50/70 rounded-2xl border border-slate-200 backdrop-blur-md shadow-sm">
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-display text-sky-600">12+</div>
          <div className="text-xs font-mono uppercase text-slate-500 mt-1">Years of Experience</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-display text-sky-600">50+</div>
          <div className="text-xs font-mono uppercase text-slate-500 mt-1">Projects Delivered</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-display text-sky-600">25+</div>
          <div className="text-xs font-mono uppercase text-slate-500 mt-1">Architects & Engineers</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-display text-slate-900">100%</div>
          <div className="text-xs font-mono uppercase text-slate-500 mt-1">Turnkey Delivery</div>
        </div>
      </div>
    </div>
  </section>

  {/* About Us & Join Our Team */}
  <section id="about-section" className="py-20 px-6 border-b border-slate-200 bg-[#FAF9F6] scroll-mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Who We Are */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 uppercase leading-tight">
            Where Architectural Imagination Meets Engineering Rigor
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Welcome to the careers portal at <strong className="text-slate-900">ARCHEMIST</strong>—a multidisciplinary firm where design foresight directly governs project certainty. Unlike traditional studios that finish at design submissions, our rapid evolution across heavy industrial plants, PEB warehousing, and enterprise workspaces has forged a truly integrated workforce.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Our studios unite Architects, Structural Consultants, Planning Engineers, Site Project Managers, and QA/QC personal under one unified umbrella. Together, we take accountability for the full continuum: from first conceptual sketch and parametric BIM coordination to commissioning and turnkey delivery.
          </p>
        </div>

        {/* Right Column: Join Our Team */}
        <div className="lg:col-span-6 space-y-6 bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold">
            Join Our Team
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 uppercase">
            Build Spaces That Endure and Empower
          </h3>
          <p className="text-slate-600 text-base leading-relaxed">
            Joining ARCHEMIST means playing an active role in projects that directly accelerate industrial manufacturing and enterprise productivity. Here, every member is given direct project exposure, voice, and autonomy.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            We invite enthusiastic professionals who are curious about modern construction techniques, keen to navigate real-world engineering constraints, and committed to leaving a legacy of durable excellence.
          </p>
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Immediate site & studio exposure with zero siloed bureaucracy.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* Why ARCHEMIST Section */}
  <section id="why-section" className="pt-20 pb-10 px-6 border-b border-slate-200 bg-[#FAF9F6] scroll-mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-3xl mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold">
          The Archemist Advantage
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 uppercase mt-2">
          Why Build Your Career With Us
        </h2>
        <p className="text-slate-500 text-sm mt-3">
          We provide the ideal platform for professionals who refuse to choose between drawing on screen and seeing real structures rise from the foundation up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900 uppercase mb-2">High-Impact Scale</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Work on transformative industrial facilities, chemical process hubs, PEB megastructures, and high-spec corporate workspaces across India.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900 uppercase mb-2">True Interdisciplinary</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Sit alongside structural engineers, planning coordinators, and site project heads. Learn how real budgets, codes, and assemblies operate in unison.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <HardHat className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900 uppercase mb-2">Accountability & Ownership</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            We empower talent early. You are entrusted with vendor coordination, client interactions, site reviews, and strategic decision-making.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900 uppercase mb-2">Modern AEC Technology</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Harness BIM coordination, parametric 3D tools, clash detection, and digital QA reporting workflows that keep our delivery ahead of schedule.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Opportunities / Job Listings Section */}
  <section id="openings-section" className="pt-10 pb-20 px-6 border-b border-slate-200 bg-[#FAF9F6] scroll-mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold">
            Current Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 uppercase mt-2">
            Explore Open Roles
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Take the next decisive step in your career. Find your place within our multidisciplinary practice.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, keyword, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No current openings in this criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            We are always seeking exceptional architects and site engineers. Feel free to submit an open application directly.
          </p>
          <button
            onClick={() => handleOpenApply()}
            className="mt-5 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-sky-700 transition-colors shadow-sm"
          >
            Apply Directly
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[10px] font-semibold uppercase">
                    {job.department}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {job.experience}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-2">
                  {job.title}
                </h3>

                <p className="text-xs font-mono text-slate-500 mb-3">
                  {job.type} · {job.qualification}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {job.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveJobModal(job)}
                  className="text-xs font-mono text-slate-600 hover:text-sky-600 flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Role Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenApply(job)}
                  className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* Mission / Closing Statement Banner */}
  <section className="py-24 px-6 relative bg-[#FAF9F6] text-center border-t border-slate-200">
    <div className="max-w-4xl mx-auto">
      <div className="w-12 h-1 bg-sky-600 mx-auto mb-8 rounded-full" />
      <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase leading-snug tracking-tight mb-6">
        "Join us on our journey to redefine excellence—where every project is a canvas for technical innovation, and every team member plays a crucial role in shaping the world we build."
      </h2>
      <p className="font-mono text-xs text-sky-700 tracking-widest uppercase mb-6 font-semibold">
        ARCHEMIST · Built With Foresight · Delivered With Certainty
      </p>
    </div>
  </section>

  {/* Footer */}
  <footer className="border-t border-slate-200 bg-[#FAF9F6] py-12 px-6 text-slate-500 text-xs font-mono">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
          A
        </div>
        <span className="text-slate-900 font-semibold tracking-wider">ARCHEMIST</span>
        <span className="text-slate-300">|</span>
        <span>Turnkey Architecture & Engineering Solutions</span>
      </div>

      <div className="flex items-center gap-6 text-slate-500">
        <span>Corporate Desk: admin@archemist.com</span>
        <span>Navi Mumbai, India</span>
      </div>

      <div className="text-slate-400">
        © {CURRENT_YEAR} ARCHEMIST. All rights reserved.
      </div>
    </div>
  </footer>

  {/* Job Details Modal */}
  {activeJobModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
          <div>
            <span className="px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[10px] uppercase font-semibold">
              {activeJobModal.department}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-2">
              {activeJobModal.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                {activeJobModal.location}
              </span>
              <span>·</span>
              <span>{activeJobModal.type}</span>
              <span>·</span>
              <span>Exp: {activeJobModal.experience}</span>
              <span>·</span>
              <span>{activeJobModal.qualification}</span>
            </div>
          </div>
          <button
            onClick={() => setActiveJobModal(null)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-600">
          <div>
            <h4 className="text-xs font-mono uppercase text-sky-700 font-bold mb-2">Role Overview</h4>
            <p className="leading-relaxed text-slate-700">{activeJobModal.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-sky-700 font-bold mb-3">Key Responsibilities</h4>
            <ul className="space-y-2">
              {activeJobModal.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                  <span className="text-slate-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-sky-700 font-bold mb-3">Candidate Qualifications</h4>
            <ul className="space-y-2">
              {activeJobModal.qualifications.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                  <span className="text-slate-700">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-sky-700 font-bold mb-3">Mandatory Software Skills</h4>
            <ul className="space-y-2">
              {activeJobModal.softwareSkills.map((skill, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                  <span className="text-slate-700">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-sky-700 font-bold mb-2">Role Expectations</h4>
            <p className="leading-relaxed text-slate-700">{activeJobModal.roleExpectations}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveJobModal(null)}
              className="px-4 py-2 text-xs font-mono text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
            <button
              onClick={() => {
                const j = activeJobModal;
                setActiveJobModal(null);
                handleOpenApply(j);
              }}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-colors"
            >
              Apply For This Position
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Quick Application Modal */}
  {applyModalJob !== null && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
          <div>
            <span className="text-[10px] font-mono text-sky-700 uppercase tracking-widest font-semibold">
              Direct Submission
            </span>
            <h3 className="text-xl font-display font-bold text-slate-900 mt-1">
              Apply to ARCHEMIST
            </h3>
            <p className="text-xs font-mono text-slate-500 mt-1">
              Position: <strong className="text-sky-700">{applicantRole}</strong>
            </p>
          </div>
          <button
            onClick={() => setApplyModalJob(null)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {formSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900">Email Draft Prepared</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your application draft for <strong className="text-sky-700">{applicantRole}</strong> is addressed to <strong className="text-slate-900">hr.gauri.sarvatva@gmail.com</strong>. Send it from your email app, and attach your selected resume{applicantResumeFile ? ` (${applicantResumeFile.name})` : ''} before sending.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={applicationEmailHref}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Email Draft</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setApplyModalJob(null)}
                  className="px-4 py-2 text-xs font-mono text-slate-500 hover:text-slate-800"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 mb-1.5 uppercase font-semibold">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ar. Rohit Kadam"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1.5 uppercase font-semibold">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="rohit@gmail.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1.5 uppercase font-semibold">Contact Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="1234567890"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 uppercase font-semibold">Add Resume *</label>
                <input
                  type="text"
                  required={!applicantResumeFile}
                  placeholder="Paste a Google Drive / OneDrive link"
                  value={applicantResume}
                  onChange={(e) => setApplicantResume(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-sans"
                />
                <label htmlFor="career-resume-upload" className="mt-2 block text-slate-600">
                  Or upload a resume from your device (PDF or Word)
                </label>
                <div className="mt-1">
                  <input
                    ref={resumeFileInputRef}
                    id="career-resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required={!applicantResume}
                    onChange={(e) => setApplicantResumeFile(e.target.files?.[0] ?? null)}
                    className="block w-full text-slate-700 file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:font-semibold file:text-slate-700 hover:file:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1.5 uppercase font-semibold">Brief Cover Note / Experience Summary</label>
                <textarea
                  rows={3}
                  placeholder="Outline relevant experience across industrial, PEB, or commercial turnkey delivery..."
                  value={applicantNotes}
                  onChange={(e) => setApplicantNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white font-sans"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold uppercase tracking-wider font-mono transition-colors shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application Details</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Applications are processed in confidence by ARCHEMIST Talent Operations.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )}
</div>
</>
);
}