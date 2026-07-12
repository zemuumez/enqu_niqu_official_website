import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Programs & Initiatives",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration/Status",
      type: "string",
      description: "e.g., '7 events hosted' or 'Launching soon'",
    }),
    defineField({
      name: "age",
      title: "Age/Timeframe Description",
      type: "string",
      description: "e.g., 'Next gathering: January 6' or 'Stories on air'",
    }),
    defineField({
      name: "price",
      title: "Key Tagline",
      type: "string",
      description: "e.g., 'Recognition that restores dignity'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features / Key Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "popular",
      title: "Mark as Popular/Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "level",
      title: "Focus/Type",
      type: "string",
      description: "e.g., 'Recognition' or 'Story archive'",
    }),
    defineField({
      name: "schedule",
      title: "Schedule/Rhythm",
      type: "string",
      description: "e.g., 'Twice yearly gatherings'",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Used to sort programs on the list page",
    }),
  ],
});
