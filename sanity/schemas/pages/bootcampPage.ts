import { defineField, defineType } from "sanity";

export const bootcampPage = defineType({
  name: "bootcampPage",
  title: "Inside ENQU SET (Bootcamp) Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "overview", title: "2. Overview & Details" },
    { name: "curriculum", title: "3. Pillars & Curriculum" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Inside ENQU SET Page Content",
      readOnly: true,
    }),

    // ── SECTION 1: HEADER ────────────────────────────────────────────
    defineField({
      name: "badgeEn",
      title: "Badge Text (English)",
      type: "string",
      group: "header",
      initialValue: "Inside ENQU SET NIQU SET",
    }),
    defineField({
      name: "badgeAm",
      title: "Badge Text (Amharic)",
      type: "string",
      group: "header",
    }),
    defineField({
      name: "titleEn",
      title: "Page Title (English)",
      type: "string",
      group: "header",
      initialValue: "Inside ዕንቁ ሴት ንቁ ሴት",
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
      rows: 2,
      group: "header",
      initialValue: "How our award gatherings and storytelling experiences unfold.",
    }),
    defineField({
      name: "subtitleAm",
      title: "Page Subtitle (Amharic)",
      type: "text",
      rows: 2,
      group: "header",
    }),

    // ── SECTION 2: OVERVIEW ──────────────────────────────────────────
    defineField({
      name: "description1En",
      title: "Paragraph 1 (English)",
      type: "text",
      rows: 4,
      group: "overview",
      initialValue:
        "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) recognizes, amplifies, and celebrates women whose resilience has been overlooked. Every gathering is curated with care—from nominations to the moment an awakened gem is honored.",
    }),
    defineField({
      name: "description1Am",
      title: "Paragraph 1 (Amharic)",
      type: "text",
      rows: 4,
      group: "overview",
    }),
    defineField({
      name: "description2En",
      title: "Paragraph 2 (English)",
      type: "text",
      rows: 4,
      group: "overview",
      initialValue:
        "We prioritize authenticity over hype: honest dialogue, thoughtful recognition, and a community that believes visibility is a catalyst for change.",
    }),
    defineField({
      name: "description2Am",
      title: "Paragraph 2 (Amharic)",
      type: "text",
      rows: 4,
      group: "overview",
    }),
    defineField({
      name: "durationEn",
      title: "Duration / Status Badge (English)",
      type: "string",
      group: "overview",
      initialValue: "7 events hosted • Next gathering: January 6",
    }),
    defineField({
      name: "durationAm",
      title: "Duration / Status Badge (Amharic)",
      type: "string",
      group: "overview",
    }),
    defineField({
      name: "formatEn",
      title: "Format Badge (English)",
      type: "string",
      group: "overview",
      initialValue: "Women-centered • Community-powered",
    }),
    defineField({
      name: "formatAm",
      title: "Format Badge (Amharic)",
      type: "string",
      group: "overview",
    }),
    defineField({
      name: "ctaTextEn",
      title: "Button Text (English)",
      type: "string",
      group: "overview",
      initialValue: "Nominate a Woman",
    }),
    defineField({
      name: "ctaTextAm",
      title: "Button Text (Amharic)",
      type: "string",
      group: "overview",
    }),

    // ── SECTION 3: CURRICULUM & PILLARS ──────────────────────────────
    defineField({
      name: "curriculumTitleEn",
      title: "Pillars / Curriculum Heading (English)",
      type: "string",
      group: "curriculum",
      initialValue: "What to Expect",
    }),
    defineField({
      name: "curriculumTitleAm",
      title: "Pillars / Curriculum Heading (Amharic)",
      type: "string",
      group: "curriculum",
    }),
    defineField({
      name: "featuresEn",
      title: "Feature Cards (English)",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
      initialValue: [
        "Award categories honoring diverse resilience",
        "Nomination process handled with care",
        "Storytelling panels & dialogue circles",
        "Community impact beyond the stage",
        "Podcast archive launching soon",
      ],
    }),
    defineField({
      name: "featuresAm",
      title: "Feature Cards (Amharic)",
      type: "array",
      group: "curriculum",
      of: [{ type: "string" }],
    }),
  ],
});
