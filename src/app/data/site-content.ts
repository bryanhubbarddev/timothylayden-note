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

/** Link from repertoire footnote (e.g. #listen on this page, or a streaming URL when ready). */
export interface SiteRepertoireMusicLink {
  href: string;
  label: string;
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
  /** Optional secondary booking email (e.g. alternate inbox). */
  bookingEmailAlt?: string;
  bookingContact: string;
  location: string;
  stats: SiteStat[];
  focus: { icon: string; label: string; url?: string }[];
  highlights: string[];
  experience: SiteExperience[];
  repertoire: SiteRepertoireItem[];
  /** Short note under repertoire pills; plain language for clarity. */
  repertoireFootnote: string;
  /** Optional link (e.g. #listen or Spotify when available). */
  repertoireMusicLink?: SiteRepertoireMusicLink;
  /** Shown at in-page #anchor when repertoireMusicLink uses a same-page hash. */
  repertoireListenBlurb?: string;
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
  bookingEmail: "timothy.layden@yahoo.com",
  bookingContact: "Timothy Layden",
  location: "Based in Florida • Available Statewide & Beyond",
  stats: [
    { value: "36+", label: "Years at the Piano" },
    { value: "8", label: "Age of First Perf." },
    { value: "∞", label: "Requests Welcome" },
  ],
  focus: [
    {
      icon: "🍝",
      label:
        "Carmella's Lakeway — Past venue; Italian in the heart of Lakeway",
      url: "https://carmellaslakeway.com",
    },
    {
      icon: "🍝",
      label:
        "Carmella's Dripping Springs — Past venue; Italian-American favorites & homemade pasta",
      url: "https://carmelasdrippingsprings.com",
    },
    {
      icon: "🏕️",
      label:
        "Open Air Spicewood (Texas) — Four-year Texas Hill Country residency (past)",
      url: "https://openairrv.com/communities/spicewood",
    },
    {
      icon: "🏖️",
      label:
        "Navarre Beach Camping Resort — Upcoming live piano: see the resort activities calendar",
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
        "Live piano on the Florida Gulf Coast. Dates and details are published on the resort’s activities calendar.",
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
  repertoireFootnote:
    "Timothy takes song requests when it fits the event. He pays attention to the room and adjusts the music so guests feel comfortable and the mood stays relaxed.",
  repertoireMusicLink: {
    href: "#listen",
    label: "Listen-at-home music — coming soon",
  },
  repertoireListenBlurb:
    "Recorded music you can enjoy at home is not on the site yet. It will be added here when it is ready.",
  gallery: [
    {
      src: "assets/TimPiano.png",
      alt: "Timothy Layden at the piano",
      caption: "At the piano",
    },
    {
      src: "assets/TimSmile.png",
      alt: "Timothy Layden plays a live performance",
      caption: "Timothy Plays Live Performance",
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
