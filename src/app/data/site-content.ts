export interface SiteStat {
  value: string;
  label: string;
}

export interface SiteExperience {
  icon: string;
  title: string;
  detail: string;
  /** Optional outbound link (e.g. venue activities page). */
  linkUrl?: string;
  linkLabel?: string;
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

/**
 * In-page video: use **fileSrc** (MP4/WebM under `assets/`) or **embedSrc** (YouTube/Vimeo iframe URL).
 * Provide exactly one of `fileSrc` or `embedSrc` per item.
 */
export interface SiteVideo {
  title: string;
  /** YouTube/Vimeo embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID */
  embedSrc?: string;
  /** Self-hosted file, e.g. assets/clip.mp4 — export from Google Photos/phone as MP4 for best browser support */
  fileSrc?: string;
}

/** Outbound link to a full album (e.g. Google Photos) — opens in a new tab; not embedded. */
export interface SiteExternalPhotoAlbum {
  url: string;
  label: string;
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
  /** Google Photos (or similar) albums — links below the grid. Empty [] = hidden. */
  photoAlbumLinks: SiteExternalPhotoAlbum[];
}

export const siteContent: SiteData = {
  stageName: "Timothy Layden",
  subheadline:
    "Timothy Layden brings elegance, versatility, and a polished presence to restaurants, weddings, churches, cocktail hours, receptions, and special events — adjusting to the audience and shaping the atmosphere with care.",
  heroImage: "assets/TimFront.png",
  heroImageAlt: "Timothy Layden — live piano performer",
  bookingEmail: "timothylayden.piano@gmail.com",
  bookingContact: "Timothy Layden",
  location: "Based in Florida • Available Statewide & Beyond",
  stats: [
    { value: "36+", label: "Years at the Piano" },
    { value: "8", label: "Age of First Perf." },
    { value: "5", label: "Year Residency" },
    { value: "∞", label: "Requests Welcome" },
  ],
  focus: [
    {
      icon: "🍝",
      label:
        "Carmella's Lakeway — Italian in the heart of Lakeway (home to your favorite dishes)",
      url: "https://carmellaslakeway.com",
    },
    {
      icon: "🍝",
      label:
        "Carmella's Dripping Springs — Authentic Italian-American favorites & homemade pasta",
      url: "https://carmelasdrippingsprings.com",
    },
    {
      icon: "🏕️",
      label:
        "Open Air Spicewood (Texas) — Four years in the Texas Hill Country",
      url: "https://openairrv.com/communities/spicewood",
    },
    {
      icon: "🏖️",
      label:
        "Navarre Beach Camping Resort — Wednesday Live Piano in April listed on the resort activities page",
      url: "https://navbeach.com/activities/",
    },
    { icon: "♪", label: "Upscale restaurants & lounges" },
    { icon: "♫", label: "Wedding receptions & cocktail hour" },
    { icon: "♩", label: "Wine tastings & special events" },
    { icon: "♬", label: "Private parties & community events" },
    { icon: "𝄞", label: "Church services & ceremonies" },
    { icon: "𝄢", label: "Private cruises & yacht events" },
    {
      icon: "♩",
      label: "Wesley Community Center — Corpus Christi Stars",
      url: "https://www.wesleycommunitycenter.org",
    },
  ],
  highlights: [
    "36+ years at the piano",
    "First public performance at age 8",
    "Five-year Saturday residency at Carmella's Italian Restaurant",
    "Performed at House of Rock & Omni Hotel ballrooms",
    "Pianist for Dancing with the Corpus Christi Stars — Wesley Community Center gala benefiting Nueces County families",
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
      icon: "♩",
      title: "Gala & Community Fundraisers",
      detail:
        "Performed for Dancing with the Corpus Christi Stars — a premier gala for the Wesley Community Center that pairs local leaders with professional dancers. The evening includes dinner, live performances, and voting for the Corpus Christi Stars Dancing winner, with proceeds supporting Nueces County programs for low-income families and homeless mothers.",
    },
    {
      icon: "𝄞",
      title: "Flexible Setup",
      detail:
        "Able to provide keyboard and sound when needed. A small, refined footprint that blends in so the focus stays on the music.",
    },
    {
      icon: "🏖️",
      title: "Navarre Beach Camping Resort",
      detail:
        "Wednesday live piano on the Florida Gulf Coast. Dates and details are published on the resort’s activities calendar.",
      linkUrl: "https://navbeach.com/activities/",
      linkLabel: "Resort activities calendar",
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
  /**
   * In-page: embedSrc (YouTube/Vimeo) and/or fileSrc (MP4 in src/assets/).
   * Optional outbound albums: photoAlbumLinks (empty [] = hidden).
   */
  videos: [
    {
      title: "Dancing with the Corpus Christi Stars — live piano",
      embedSrc: "https://www.youtube.com/embed/GZ-1Pp3OD9k",
    },
  ],
  photoAlbumLinks: [],
};
