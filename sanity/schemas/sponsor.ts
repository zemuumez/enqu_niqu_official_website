import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Partners & Sponsors",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Partner or sponsor name",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      description: "Link to partner/sponsor website",
    }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
          { title: "Community", value: "community" },
        ],
      },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this partner is currently active",
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
      title: "name",
      subtitle: "tier",
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : "No tier",
        media,
      };
    },
  },
});
