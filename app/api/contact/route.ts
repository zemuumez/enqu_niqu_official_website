import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-11",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, collaborationType, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields (First Name, Last Name, Email, Subject, and Message are required)" },
        { status: 400 }
      );
    }

    // Create the document in Sanity
    const doc = {
      _type: "contactSubmission",
      firstName,
      lastName,
      email,
      phone: phone || "",
      collaborationType: collaborationType || "",
      subject,
      message,
      read: false,
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(doc);
    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error("Error creating contact submission in Sanity:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit message to CMS" },
      { status: 500 }
    );
  }
}
