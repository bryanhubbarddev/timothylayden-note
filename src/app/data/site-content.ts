export interface SiteStat {
  value: string;
  label: string;
}

export interface SiteExperience {
  icon: string;
  title: string;
  detail: string;
}

export interface SiteRepertoireItem {
  icon: string;
  name: string;
}

export interface SiteGalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface SiteData {
  stageName: string;
  subheadline: string;
  bookingEmail: string;
  bookingContact: string;
  location: string;
  stats: SiteStat[];
  focus: { icon: string; label: string }[];
  highlights: string[];
  experience: SiteExperience[];
  repertoire: SiteRepertoireItem[];
  gallery: SiteGalleryItem[];
}

export const siteContent: SiteData = {
  stageName: 'Timothy Layden',
  subheadline:
    'With more than 36 years at the piano, Timothy Layden brings elegance, versatility, and warmth to restaurants, weddings, churches, cocktail hours, receptions, and special events.',
  bookingEmail: 'booking@timothylayden.com',
  bookingContact: 'Timothy Layden',
  location: 'Based in Florida • Available Statewide & Beyond',
  stats: [
    { value: '36+', label: 'Years at the Piano' },
    { value: '8', label: 'Age of First Perf.' },
    { value: '5', label: 'Year Residency' },
    { value: '∞', label: 'Requests Welcome' }
  ],
  focus: [
    { icon: '🥂', label: 'Upscale restaurants & lounges' },
    { icon: '💍', label: 'Wedding receptions & cocktail hour' },
    { icon: '🍷', label: 'Wine tastings & special events' },
    { icon: '🎉', label: 'Private parties & community events' },
    { icon: '⛪', label: 'Church services & ceremonies' }
  ],
  highlights: [
    '36+ years at the piano',
    'First public performance at age 8',
    "Five-year Saturday residency at Carmella's Italian Restaurant",
    'Performed at House of Rock & Omni Hotel ballrooms'
  ],
  experience: [
    {
      icon: '🍝',
      title: 'Restaurant Residency',
      detail:
        "Five-year Saturday residency at Carmella's Italian Restaurant in Dripping Springs, Texas — setting the tone for memorable evenings week after week."
    },
    {
      icon: '🎤',
      title: 'Major Venue Performances',
      detail:
        'Featured performances at House of Rock in Corpus Christi and Omni Hotel ballroom events — comfortably playing to rooms of hundreds.'
    },
    {
      icon: '🎹',
      title: 'Flexible Setup',
      detail:
        'Able to provide keyboard and sound when needed. A small, refined footprint that blends in so the focus stays on the music.'
    }
  ],
  repertoire: [
    { icon: '🎶', name: 'Easy Listening' },
    { icon: '🎷', name: 'Jazz' },
    { icon: '🎵', name: 'Pop' },
    { icon: '🎼', name: 'Classical' },
    { icon: '🎹', name: 'Request-Friendly' }
  ],
  gallery: [
    {
      src: 'assets/timmy-piano-stage-1.jpg',
      alt: 'Timothy Layden performing on stage',
      caption: 'Stage Performance'
    },
    {
      src: 'assets/timmy-piano-red-shirt.jpg',
      alt: 'Timothy Layden at a private event',
      caption: 'Private Event'
    },
    {
      src: 'assets/timmy-shirt-detail.jpg',
      alt: 'Piano-themed performance attire',
      caption: 'Brand Aesthetic'
    }
  ]
};

