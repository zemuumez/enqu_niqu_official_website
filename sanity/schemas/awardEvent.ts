import { defineField, defineType } from "sanity";

export const awardEvent = defineType({
  name: "awardEvent",
  title: "Award Events",
  type: "document",
  fields: [
    defineField({
      name: "sessionNumber",
      title: "Session Number",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
      description: "The award session/event number",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Event title (e.g., '7th ENQU SET NIQU SET Award Ceremony')",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Event date (e.g., 'January 6, 2025')",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Event venue or location",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      description: "Brief description or summary of the event",
    }),
    defineField({
      name: "nominees",
      title: "Nominees",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 2,
              description: "Brief note about the nominee",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "note" },
          },
        },
      ],
    }),
    defineField({
      name: "winners",
      title: "Winners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description: "Award category",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "category" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort order for display",
    }),
  ],
  preview: {
    select: {
      sessionNumber: "sessionNumber",
      title: "title",
    },
    prepare({ sessionNumber, title }) {
      return {
        title: `Session ${sessionNumber}`,
        subtitle: title,
      };
    },
  },
});
