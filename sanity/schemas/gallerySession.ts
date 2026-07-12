import { defineField, defineType } from "sanity";

export const gallerySession = defineType({
  name: "gallerySession",
  title: "Gallery Sessions",
  type: "document",
  fields: [
    defineField({
      name: "session",
      title: "Session Number",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
      description: "e.g., 8 for Session 8",
    }),
    defineField({
      name: "title",
      title: "Title / Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., 'Session 8 - January 6 Gathering'",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "session",
      media: "images.0",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: `Session ${subtitle}`,
        media: media,
      };
    },
  },
});
