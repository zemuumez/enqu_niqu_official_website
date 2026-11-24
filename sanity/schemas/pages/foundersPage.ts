import { defineField, defineType } from "sanity";

export const foundersPage = defineType({
  name: "foundersPage",
  title: "Founders & Voices Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Founders & Voices Page Content",
      readOnly: true,
    }),

    // ── SECTION 1: HEADER ────────────────────────────────────────────
    defineField({
      name: "labelEn",
      title: "Page Badge / Label (English)",
      type: "string",
      group: "header",
      initialValue: "Founders & Voices",
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
      initialValue: "Founders & Voices",
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
        "Guided by a family-led founding team and a growing circle of award recipients who inspire through their resilience and purpose.",
    }),
    defineField({
      name: "subtitleAm",
      title: "Page Subtitle (Amharic)",
      type: "text",
      rows: 3,
      group: "header",
    }),
  ],
});
