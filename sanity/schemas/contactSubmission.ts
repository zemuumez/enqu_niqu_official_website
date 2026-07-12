import { defineType, defineField } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Submissions",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "collaborationType",
      title: "Collaboration Type",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "read",
      title: "Mark as Read",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      subject: "subject",
      submittedAt: "submittedAt",
      read: "read",
    },
    prepare(selection) {
      const { firstName, lastName, subject, submittedAt, read } = selection;
      const formattedDate = submittedAt ? new Date(submittedAt).toLocaleDateString() : "";
      return {
        title: `${firstName} ${lastName} (${read ? "✓ Read" : "✉ Unread"})`,
        subtitle: `${subject || "No Subject"} - ${formattedDate}`,
      };
    },
  },
});
