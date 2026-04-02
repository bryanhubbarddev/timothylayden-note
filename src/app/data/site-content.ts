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

/** YouTube/Vimeo embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID */
export interface SiteVideo {
  title: string;
  embedSrc: string;
}

export interface SiteData {
  stageName: string;
  subheadline: string;
  /** Front-page hero photo path under assets/, e.g. assets/TimFront.png */
  heroImage: string;
  heroImageAlt: string;
  bookingEmail: string;
  bookingContact: string;
  location: string;
  stats: SiteStat[];
  focus: { icon: string; label: string; url?: string }[];
  highlights: string[];
  experience: SiteExperience[];
  repertoire: SiteRepertoireItem[];
  gallery: SiteGalleryItem[];
  videos: SiteVideo[];
}

export const siteContent: SiteData = {
  stageName: "Timothy Layden",
  subheadline:
    "With more than 36 years at the piano, Timothy Layden brings elegance, versatility, and warmth to restaurants, weddings, churches, cocktail hours, receptions, and special events.",
  heroImage: "assets/TimFront.png",
  heroImageAlt: "Timothy Layden — live piano performer",
  bookingEmail: "Timothy.Layden@yahoo.com",
  bookingContact: "Timothy Layden",
  location: "Based in Florida • Available Statewide & Beyond",
  stats: [
    { value: "36+", label: "Years at the Piano" },
    { value: "8", label: "Age of First Perf." },
    { value: "5", label: "Year Residency" },
    { value: "∞", label: "Requests Welcome" },
  ],
  focus: [
    { icon: "♪", label: "Upscale restaurants & lounges" },
    { icon: "♫", label: "Wedding receptions & cocktail hour" },
    { icon: "♩", label: "Wine tastings & special events" },
    { icon: "♬", label: "Private parties & community events" },
    { icon: "𝄞", label: "Church services & ceremonies" },
    { icon: "𝄢", label: "Private cruises & yacht events" },
  ],
  highlights: [
    "36+ years at the piano",
    "First public performance at age 8",
    "Five-year Saturday residency at Carmella's Italian Restaurant",
    "Performed at House of Rock & Omni Hotel ballrooms",
  ],
  experience: [
    {
      icon: "♪",
      title: "Restaurant Residency",
      detail:
        "Five-year Saturday residency at Carmella's Italian Restaurant in Dripping Springs, Texas — setting the tone for memorable evenings week after week.",
    },
    {
      icon: "♫",
      title: "Major Venue Performances",
      detail:
        "Featured performances at House of Rock in Corpus Christi and Omni Hotel ballroom events — comfortably playing to rooms of hundreds.",
    },
    {
      icon: "𝄞",
      title: "Flexible Setup",
      detail:
        "Able to provide keyboard and sound when needed. A small, refined footprint that blends in so the focus stays on the music.",
    },
    {
      icon: "𝄢",
      title: "Private Cruises & Yacht Events",
      detail:
        "Elegant piano for private cruises, yacht parties, and waterfront events — bringing a refined atmosphere to any setting.",
    },
  ],
  repertoire: [
    { icon: "♪", name: "Easy Listening" },
    { icon: "♫", name: "Jazz" },
    { icon: "♩", name: "Pop" },
    { icon: "♬", name: "Classical" },
    { icon: "𝄞", name: "Request-Friendly" },
  ],
  gallery: [
    {
      src: "assets/TimPiano.png",
      alt: "Timothy Layden at the piano",
      caption: "At the piano",
    },
    {
      src: "assets/TimSmile.png",
      alt: "Timothy Layden smiling",
      caption: "Live performance",
    },
    {
      src: "assets/TimNavarre.png",
      alt: "Timothy Layden in Navarre",
      caption: "Navarre",
    },
    {
      src: "assets/TimBryan.png",
      alt: "Timothy Layden performing",
      caption: "On stage",
    },
    {
      src: "assets/TimArms.png",
      alt: "Timothy Layden at the keyboard",
      caption: "Performance moment",
    },
    {
      src: "assets/TimGlass.png",
      alt: "Timothy Layden",
      caption: "Portrait",
    },
    {
      src: "assets/TimStar.png",
      alt: "Timothy Layden in the spotlight",
      caption: "In the spotlight",
    },
  ],
  /** Add { title, embedSrc } entries; embedSrc = YouTube embed URL. Empty = videos block hidden. */
  videos: [],
};
