import { defineField, defineType } from "sanity";

export const programsPage = defineType({
  name: "programsPage",
  title: "Initiatives Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "cta", title: "2. Call To Action (Bottom)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Initiatives Page Content",
      readOnly: true,
    }),

    // ── SECTION 1: HEADER ────────────────────────────────────────────
    defineField({
      name: "labelEn",
      title: "Page Badge / Label (English)",
      type: "string",
      group: "header",
      initialValue: "Initiatives",
    }),
    defineField({
      name: "labelAm",
      title: "Page Badge / Label (Amharic)",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "titleEn",
      title: "Page Title (English)",
      type: "string",
      group: "header",
      initialValue: "Recognition as a Catalyst",
    }),
    defineField({
      name: "titleAm",
      title: "Page Title (Amharic)",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "subtitleEn",
      title: "Page Subtitle (English)",
      type: "text",
      rows: 3,
      group: "header",
      initialValue:
        "Initiatives designed to awaken the gems within women through awards, storytelling, community impact, and a forthcoming podcast.",
    }),
    defineField({
      name: "subtitleAm",
      title: "Page Subtitle (Amharic)",
      type: "text",
      rows: 3,
      group: "header",
    }),

    // ── SECTION 2: CTA ───────────────────────────────────────────────
    defineField({
      name: "ctaTitleEn",
      title: "Bottom CTA Heading (English)",
      type: "string",
      group: "cta",
      initialValue: "Ready to Uplift a Story?",
    }),
    defineField({
      name: "ctaTitleAm",
      title: "Bottom CTA Heading (Amharic)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescriptionEn",
      title: "Bottom CTA Description (English)",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue:
        "Nominate a resilient woman, host a storytelling circle, or partner with ENQU SET NIQU SET to amplify awakened gems.",
    }),
    defineField({
      name: "ctaDescriptionAm",
      title: "Bottom CTA Description (Amharic)",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaButtonTextEn",
      title: "Button Text (English)",
      type: "string",
      group: "cta",
      initialValue: "Share a Story",
    }),
    defineField({
      name: "ctaButtonTextAm",
      title: "Button Text (Amharic)",
      type: "string",
      group: "cta",
    }),
  ],
});
