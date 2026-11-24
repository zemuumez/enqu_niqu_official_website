import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Content",
  type: "document",
  groups: [
    { name: "contact", title: "Contact Info" },
    { name: "hero", title: "Hero Section" },
    { name: "about", title: "About Section" },
    { name: "sectionHeaders", title: "Section Headers" },
    { name: "footerSocial", title: "Footer & Social" },
    { name: "bootcamp", title: "Bootcamp" },
  ],
  fields: [
    // ─── Internal Label ───────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Settings Label",
      type: "string",
      initialValue: "Global Site Settings & Translations",
      readOnly: true,
      description: "Internal name for this document",
    }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: Contact Information
    // ═══════════════════════════════════════════════════════════════════
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
      description: "Primary contact email address (e.g., hello@enqusetniquset.com)",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
      description: "Primary contact phone number (e.g., +251 913 528 574)",
    }),
    defineField({
      name: "address",
      title: "Contact Address",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
      description: "Office / organization location address",
    }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: Hero Section
    // ═══════════════════════════════════════════════════════════════════
    defineField({
      name: "heroTitleEn",
      title: "Hero Title (English)",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleAm",
      title: "Hero Title (Amharic)",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitleEn",
      title: "Hero Subtitle (English)",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitleAm",
      title: "Hero Subtitle (Amharic)",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      group: "hero",
      description: "Statistics displayed on the hero section (e.g., '7+' / 'Events' / 'ክስተቶች')",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "labelAm",
              title: "Label (Amharic)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }) {
              return { title: `${value} — ${label}` };
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: About Section
    // ═══════════════════════════════════════════════════════════════════
    defineField({
      name: "aboutTitleEn",
      title: "About Title (English)",
      type: "string",
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutTitleAm",
      title: "About Title (Amharic)",
      type: "string",
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutDescriptionEn",
      title: "About Description (English)",
      type: "text",
      rows: 4,
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutDescriptionAm",
      title: "About Description (Amharic)",
      type: "text",
      rows: 4,
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutGraduatesWorkedEn",
      title: "About Founders Summary (English)",
      type: "text",
      rows: 3,
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutGraduatesWorkedAm",
      title: "About Founders Summary (Amharic)",
      type: "text",
      rows: 3,
      group: "about",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutMissionEn",
      title: "Mission Statement (English)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutMissionAm",
      title: "Mission Statement (Amharic)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutVisionEn",
      title: "Vision Statement (English)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutVisionAm",
      title: "Vision Statement (Amharic)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutPhilosophyEn",
      title: "Philosophy (English)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutPhilosophyAm",
      title: "Philosophy (Amharic)",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutStats",
      title: "About Stats",
      type: "array",
      group: "about",
      description: "Numerical stats for the About section (e.g., 300+ graduates)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "e.g., '+', '%', 'K'",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare({ value, suffix, label }) {
              return { title: `${value}${suffix || ""} — ${label}` };
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: Section Headers
    // ═══════════════════════════════════════════════════════════════════

    // Programs
    defineField({ name: "programsSectionLabelEn", title: "Programs Label (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "programsSectionLabelAm", title: "Programs Label (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "programsSectionTitleEn", title: "Programs Title (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "programsSectionTitleAm", title: "Programs Title (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "programsSectionSubtitleEn", title: "Programs Subtitle (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "programsSectionSubtitleAm", title: "Programs Subtitle (AM)", type: "string", group: "sectionHeaders" }),

    // Founders
    defineField({ name: "foundersSectionLabelEn", title: "Founders Label (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "foundersSectionLabelAm", title: "Founders Label (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "foundersSectionTitleEn", title: "Founders Title (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "foundersSectionTitleAm", title: "Founders Title (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "foundersSectionSubtitleEn", title: "Founders Subtitle (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "foundersSectionSubtitleAm", title: "Founders Subtitle (AM)", type: "string", group: "sectionHeaders" }),

    // Gallery
    defineField({ name: "gallerySectionLabelEn", title: "Gallery Label (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "gallerySectionLabelAm", title: "Gallery Label (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "gallerySectionTitleEn", title: "Gallery Title (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "gallerySectionTitleAm", title: "Gallery Title (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "gallerySectionSubtitleEn", title: "Gallery Subtitle (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "gallerySectionSubtitleAm", title: "Gallery Subtitle (AM)", type: "string", group: "sectionHeaders" }),

    // Contact
    defineField({ name: "contactSectionLabelEn", title: "Contact Label (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "contactSectionLabelAm", title: "Contact Label (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "contactSectionTitleEn", title: "Contact Title (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "contactSectionTitleAm", title: "Contact Title (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "contactSectionSubtitleEn", title: "Contact Subtitle (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "contactSectionSubtitleAm", title: "Contact Subtitle (AM)", type: "string", group: "sectionHeaders" }),

    // Film Reel
    defineField({ name: "filmReelTitleEn", title: "Film Reel Title (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "filmReelTitleAm", title: "Film Reel Title (AM)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "filmReelSubtitleEn", title: "Film Reel Subtitle (EN)", type: "string", group: "sectionHeaders" }),
    defineField({ name: "filmReelSubtitleAm", title: "Film Reel Subtitle (AM)", type: "string", group: "sectionHeaders" }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: Footer & Social
    // ═══════════════════════════════════════════════════════════════════
    defineField({
      name: "footerDescriptionEn",
      title: "Footer Description (English)",
      type: "text",
      rows: 3,
      group: "footerSocial",
    }),
    defineField({
      name: "footerDescriptionAm",
      title: "Footer Description (Amharic)",
      type: "text",
      rows: 3,
      group: "footerSocial",
    }),
    defineField({
      name: "footerTaglineEn",
      title: "Footer Tagline (English)",
      type: "string",
      group: "footerSocial",
    }),
    defineField({
      name: "footerTaglineAm",
      title: "Footer Tagline (Amharic)",
      type: "string",
      group: "footerSocial",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "footerSocial",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "footerSocial",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "footerSocial",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "footerSocial",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter / X URL",
      type: "url",
      group: "footerSocial",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      group: "footerSocial",
    }),

    // ═══════════════════════════════════════════════════════════════════
    //  GROUP: Bootcamp
    // ═══════════════════════════════════════════════════════════════════
    defineField({
      name: "bootcampTitleEn",
      title: "Bootcamp Page Title (English)",
      type: "string",
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampTitleAm",
      title: "Bootcamp Page Title (Amharic)",
      type: "string",
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampSubtitleEn",
      title: "Bootcamp Page Subtitle (English)",
      type: "text",
      rows: 2,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampSubtitleAm",
      title: "Bootcamp Page Subtitle (Amharic)",
      type: "text",
      rows: 2,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription1En",
      title: "Bootcamp Description Paragraph 1 (English)",
      type: "text",
      rows: 4,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription1Am",
      title: "Bootcamp Description Paragraph 1 (Amharic)",
      type: "text",
      rows: 4,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription2En",
      title: "Bootcamp Description Paragraph 2 (English)",
      type: "text",
      rows: 4,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription2Am",
      title: "Bootcamp Description Paragraph 2 (Amharic)",
      type: "text",
      rows: 4,
      group: "bootcamp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampFeaturesEn",
      title: "Bootcamp Features (English)",
      type: "array",
      group: "bootcamp",
      of: [{ type: "string" }],
      description: "List of bootcamp feature bullet points (English)",
    }),
    defineField({
      name: "bootcampFeaturesAm",
      title: "Bootcamp Features (Amharic)",
      type: "array",
      group: "bootcamp",
      of: [{ type: "string" }],
      description: "List of bootcamp feature bullet points (Amharic)",
    }),
    defineField({
      name: "bootcampDurationEn",
      title: "Bootcamp Duration (English)",
      type: "string",
      group: "bootcamp",
    }),
    defineField({
      name: "bootcampDurationAm",
      title: "Bootcamp Duration (Amharic)",
      type: "string",
      group: "bootcamp",
    }),
    defineField({
      name: "bootcampFormatEn",
      title: "Bootcamp Format (English)",
      type: "string",
      group: "bootcamp",
    }),
    defineField({
      name: "bootcampFormatAm",
      title: "Bootcamp Format (Amharic)",
      type: "string",
      group: "bootcamp",
    }),
    defineField({
      name: "bootcampCurriculumTitleEn",
      title: "Bootcamp Curriculum Title (English)",
      type: "string",
      group: "bootcamp",
    }),
    defineField({
      name: "bootcampCurriculumTitleAm",
      title: "Bootcamp Curriculum Title (Amharic)",
      type: "string",
      group: "bootcamp",
    }),
  ],
});
