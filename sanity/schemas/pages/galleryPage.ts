import { defineField, defineType } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Gallery Page Content",
      readOnly: true,
    }),

    // ── SECTION 1: HEADER ────────────────────────────────────────────
    defineField({
      name: "badgeEn",
      title: "Badge Text (English)",
      type: "string",
      group: "header",
      initialValue: "Gallery",
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
      initialValue: "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    }),
    defineField({
      name: "titleAm",
      title: "Page Title (Amharic)",
      type: "string",
      group: "header",
      initialValue: "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    }),
    defineField({
      name: "subtitleEn",
      title: "Page Subtitle (English)",
      type: "text",
      rows: 3,
      group: "header",
      initialValue:
        "Scenes from award gatherings, storytelling circles, and a community that keeps recognition alive.",
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
