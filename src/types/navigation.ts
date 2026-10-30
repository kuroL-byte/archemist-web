export interface NavRoute {
  name: string;
  href: string;
  description?: string;
}

export interface ContactInfo {
  officeAddress: string;
  addressLines: string[];
  emailPrimary: string;
  emailSecondary?: string;
  phonePrimary: string;
  phoneDisplay: string;
  phoneSecondary?: string;
  businessHours: string;
  businessDays: string;
  coordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  googleMapsUrl: string;
}

export interface SocialLink {
  name: string;
  href: string;
  platform: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'whatsapp';
  label: string;
}
