import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "header", title: "1. Header Section" },
    { name: "contactInfo", title: "2. Contact Details & Location" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Contact Page Content",
      readOnly: true,
    }),

    // ── SECTION 1: HEADER ────────────────────────────────────────────
    defineField({
      name: "badgeEn",
      title: "Badge Text (English)",
      type: "string",
      group: "header",
      initialValue: "Get in Touch",
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
      initialValue: "Get in Touch",
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
        "Partner with us, nominate a resilient woman, or host a ዕንቁ ሴት ንቁ ሴት conversation. We would love to hear from you.",
    }),
    defineField({
      name: "subtitleAm",
      title: "Page Subtitle (Amharic)",
      type: "text",
      rows: 3,
      group: "header",
    }),

    // ── SECTION 2: CONTACT DETAILS & LOCATION ─────────────────────────
    defineField({
      name: "phone",
      title: "Contact Phone Number",
      type: "string",
      group: "contactInfo",
      description: "e.g., +251 913 528 574",
    }),
    defineField({
      name: "email",
      title: "Contact Email Address",
      type: "string",
      group: "contactInfo",
      description: "e.g., hello@enqusetniquset.com",
    }),
    defineField({
      name: "address",
      title: "Office Location / City",
      type: "string",
      group: "contactInfo",
      description: "e.g., Addis Ababa, Ethiopia",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      group: "contactInfo",
      description: "Embed link for the Google Map iframe",
    }),
  ],
});
