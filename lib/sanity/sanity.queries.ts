import { groq } from "next-sanity";

// ── COLLECTIONS QUERIES ──────────────────────────────────────────────
export const programsQuery = groq`
  *[_type == "program"] | order(order asc, _createdAt desc) {
    title, duration, age, price, description, features, popular, level, schedule
  }
`;

export const foundersQuery = groq`
  *[_type == "founder"] | order(order asc, _createdAt desc) {
    name, role, image, bio, specialties, experience, education, achievements, email, github, linkedin
  }
`;

export const gallerySessionsQuery = groq`
  *[_type == "gallerySession"] | order(session desc) {
    session, title, "images": images[].asset->url
  }
`;

export const awardEventsQuery = groq`
  *[_type == "awardEvent"] | order(order asc, sessionNumber asc) {
    sessionNumber, title, date, location, caption, nominees, winners
  }
`;

export const sponsorsQuery = groq`
  *[_type == "sponsor" && active == true] | order(order asc, _createdAt asc) {
    name, logo, url, tier
  }
`;

// ── PAGE-SPECIFIC QUERIES ────────────────────────────────────────────
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroBadge,
    heroTitleEn, heroTitleAm,
    heroSubtitleEn, heroSubtitleAm,
    heroCtaTextEn, heroCtaTextAm,
    heroLearnMoreEn, heroLearnMoreAm,
    heroStats,
    filmReelTitleEn, filmReelTitleAm,
    filmReelSubtitleEn, filmReelSubtitleAm,
    filmReelCurrentSession, filmReelPreviousSession,
    aboutLabelEn, aboutLabelAm,
    aboutTitleEn, aboutTitleAm,
    aboutDescriptionEn, aboutDescriptionAm,
    aboutMissionEn, aboutMissionAm,
    aboutVisionEn, aboutVisionAm,
    aboutPhilosophyEn, aboutPhilosophyAm,
    aboutStats,
    aboutCtaTextEn, aboutCtaTextAm,
    programsHighlightLabelEn, programsHighlightLabelAm,
    programsHighlightTitleEn, programsHighlightTitleAm,
    programsHighlightSubtitleEn, programsHighlightSubtitleAm,
    programsCtaTitleEn, programsCtaTitleAm,
    programsCtaSubtitleEn, programsCtaSubtitleAm,
    programsCtaButtonEn, programsCtaButtonAm,
    foundersHighlightLabelEn, foundersHighlightLabelAm,
    foundersHighlightTitleEn, foundersHighlightTitleAm,
    foundersHighlightSubtitleEn, foundersHighlightSubtitleAm,
    foundersStats,
    foundersCtaTitleEn, foundersCtaTitleAm,
    foundersCtaSubtitleEn, foundersCtaSubtitleAm,
    foundersCtaButtonEn, foundersCtaButtonAm,
    galleryHighlightLabelEn, galleryHighlightLabelAm,
    galleryHighlightTitleEn, galleryHighlightTitleAm,
    galleryHighlightSubtitleEn, galleryHighlightSubtitleAm,
    galleryStats,
    galleryCtaTitleEn, galleryCtaTitleAm,
    galleryCtaSubtitleEn, galleryCtaSubtitleAm,
    galleryCtaButtonEn, galleryCtaButtonAm,
    contactHighlightLabelEn, contactHighlightLabelAm,
    contactHighlightTitleEn, contactHighlightTitleAm,
    contactHighlightSubtitleEn, contactHighlightSubtitleAm
  }
`;

export const programsPageQuery = groq`
  *[_type == "programsPage"][0] {
    labelEn, labelAm,
    titleEn, titleAm,
    subtitleEn, subtitleAm,
    ctaTitleEn, ctaTitleAm,
    ctaDescriptionEn, ctaDescriptionAm,
    ctaButtonTextEn, ctaButtonTextAm
  }
`;

export const foundersPageQuery = groq`
  *[_type == "foundersPage"][0] {
    labelEn, labelAm,
    titleEn, titleAm,
    subtitleEn, subtitleAm
  }
`;

export const galleryPageQuery = groq`
  *[_type == "galleryPage"][0] {
    badgeEn, badgeAm,
    titleEn, titleAm,
    subtitleEn, subtitleAm
  }
`;

export const bootcampPageQuery = groq`
  *[_type == "bootcampPage"][0] {
    badgeEn, badgeAm,
    titleEn, titleAm,
    subtitleEn, subtitleAm,
    description1En, description1Am,
    description2En, description2Am,
    durationEn, durationAm,
    formatEn, formatAm,
    ctaTextEn, ctaTextAm,
    curriculumTitleEn, curriculumTitleAm,
    featuresEn, featuresAm
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    badgeEn, badgeAm,
    titleEn, titleAm,
    subtitleEn, subtitleAm,
    phone, email, address,
    mapEmbedUrl
  }
`;

// ── GLOBAL SITE SETTINGS QUERY ───────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    email, phone, address,
    heroTitleEn, heroTitleAm, heroSubtitleEn, heroSubtitleAm,
    aboutTitleEn, aboutTitleAm, aboutDescriptionEn, aboutDescriptionAm,
    aboutGraduatesWorkedEn, aboutGraduatesWorkedAm,
    bootcampTitleEn, bootcampTitleAm, bootcampSubtitleEn, bootcampSubtitleAm,
    bootcampDescription1En, bootcampDescription1Am, bootcampDescription2En, bootcampDescription2Am,
    heroStats,
    aboutMissionEn, aboutMissionAm, aboutVisionEn, aboutVisionAm,
    aboutPhilosophyEn, aboutPhilosophyAm, aboutStats,
    programsSectionLabelEn, programsSectionLabelAm,
    programsSectionTitleEn, programsSectionTitleAm,
    programsSectionSubtitleEn, programsSectionSubtitleAm,
    foundersSectionLabelEn, foundersSectionLabelAm,
    foundersSectionTitleEn, foundersSectionTitleAm,
    foundersSectionSubtitleEn, foundersSectionSubtitleAm,
    gallerySectionLabelEn, gallerySectionLabelAm,
    gallerySectionTitleEn, gallerySectionTitleAm,
    gallerySectionSubtitleEn, gallerySectionSubtitleAm,
    contactSectionLabelEn, contactSectionLabelAm,
    contactSectionTitleEn, contactSectionTitleAm,
    contactSectionSubtitleEn, contactSectionSubtitleAm,
    filmReelTitleEn, filmReelTitleAm,
    filmReelSubtitleEn, filmReelSubtitleAm,
    filmReelCurrentSession, filmReelPreviousSession,
    footerDescriptionEn, footerDescriptionAm,
    footerTaglineEn, footerTaglineAm,
    facebookUrl, youtubeUrl, instagramUrl, linkedinUrl, twitterUrl, tiktokUrl,
    bootcampFeaturesEn, bootcampFeaturesAm,
    bootcampDurationEn, bootcampDurationAm,
    bootcampFormatEn, bootcampFormatAm,
    bootcampCurriculumTitleEn, bootcampCurriculumTitleAm,
  }
`;
