import type { NavRoute, ContactInfo, SocialLink } from '../types/navigation';

export const NAV_ROUTES: NavRoute[] = [
  {
    name: 'Home',
    href: '#',
    description: 'Overview, core vision and delivery promise',
  },
  {
    name: 'Projects',
    href: '#clients',
    description: 'Client references and delivered project portfolio',
  },
  {
    name: 'About',
    href: '#about',
    description: 'At a glance, leadership and key metrics',
  },
  {
    name: 'Services',
    href: '#sectors',
    description: 'Industrial, commercial and turnkey capabilities',
  },
  {
    name: 'Contact Us',
    href: '#contact',
    description: 'Direct inquiry, office location and consultation',
  },
];

export const CONTACT_DATA: ContactInfo = {
  officeAddress: '410, 411, Hilton Centre, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra 400614',
  addressLines: [
    '410, 411, Hilton Centre',
    'Sector 11, CBD Belapur',
    'Navi Mumbai, Maharashtra 400614',
  ],
  emailPrimary: 'admin@archemist.co.in',
  emailSecondary: 'projects@archemist.co.in',
  phonePrimary: '+919167240535',
  phoneDisplay: '+91 91672 40535',
  phoneSecondary: '+91 (022) 2756 1234',
  businessHours: '9:30 AM – 7:00 PM (IST)',
  businessDays: 'Monday to Saturday (Sunday Closed)',
  coordinates: {
    lat: 19.0178,
    lng: 73.04,
    display: '19.0178° N, 73.0400° E',
  },
  googleMapsUrl: 'https://maps.google.com/?q=Hilton+Centre,+CBD+Belapur,+Navi+Mumbai,+Maharashtra+400614',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/archemist-solutions',
    platform: 'linkedin',
    label: 'Connect with Archemist on LinkedIn',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/archemist.build',
    platform: 'instagram',
    label: 'Follow our architectural projects on Instagram',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/archemistsolutions',
    platform: 'facebook',
    label: 'Like Archemist on Facebook',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/archemist_build',
    platform: 'x',
    label: 'Follow updates on X',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919167240535?text=Hello%20Archemist%20Team,%20I%20would%20like%20to%20inquire%20about%20a%20project.',
    platform: 'whatsapp',
    label: 'Chat with our project desk on WhatsApp',
  },
];
