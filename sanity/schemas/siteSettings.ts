import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Label",
      type: "string",
      initialValue: "Global Site Settings & Translations",
      readOnly: true,
      description: "Internal name for this document",
    }),
    
    // Group: Contact Information
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      description: "Primary contact email address (e.g., hello@enqusetniquset.com)",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Primary contact phone number (e.g., +251 913 528 574)",
    }),
    defineField({
      name: "address",
      title: "Contact Address",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Office / organization location address",
    }),

    // Group: Hero Section
    defineField({
      name: "heroTitleEn",
      title: "Hero Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleAm",
      title: "Hero Title (Amharic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitleEn",
      title: "Hero Subtitle (English)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitleAm",
      title: "Hero Subtitle (Amharic)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // Group: About Section
    defineField({
      name: "aboutTitleEn",
      title: "About Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutTitleAm",
      title: "About Title (Amharic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutDescriptionEn",
      title: "About Description (English)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutDescriptionAm",
      title: "About Description (Amharic)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutGraduatesWorkedEn",
      title: "About Founders Summary (English)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutGraduatesWorkedAm",
      title: "About Founders Summary (Amharic)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // Group: Bootcamp Section (Inside ENQU SET NIQU SET)
    defineField({
      name: "bootcampTitleEn",
      title: "Bootcamp Page Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampTitleAm",
      title: "Bootcamp Page Title (Amharic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampSubtitleEn",
      title: "Bootcamp Page Subtitle (English)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampSubtitleAm",
      title: "Bootcamp Page Subtitle (Amharic)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription1En",
      title: "Bootcamp Description Paragraph 1 (English)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription1Am",
      title: "Bootcamp Description Paragraph 1 (Amharic)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription2En",
      title: "Bootcamp Description Paragraph 2 (English)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bootcampDescription2Am",
      title: "Bootcamp Description Paragraph 2 (Amharic)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
