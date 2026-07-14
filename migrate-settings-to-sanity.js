import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-11";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === "your-actual-project-id") {
  console.error("Error: Please specify a valid NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token) {
  console.error("Error: Please specify a SANITY_WRITE_TOKEN in .env.local with write permissions.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const defaultSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Global Site Settings & Translations",
  email: "hello@enqusetniquset.com",
  phone: "+251 913 528 574",
  address: "Addis Ababa, Ethiopia",
  
  // Hero Section
  heroTitleEn: "Awakening the Gems Within Women",
  heroTitleAm: "Awakening the Gems Within Women",
  heroSubtitleEn: "ENQU SET NIQU SET is an award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",
  heroSubtitleAm: "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) is an award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",

  // About Section
  aboutTitleEn: "About ENQU SET NIQU SET",
  aboutTitleAm: "About ዕንቁ ሴት ንቁ ሴት",
  aboutDescriptionEn: "An award-driven empowerment program and community platform dedicated to honoring the hidden brilliance and resilience of women who have long gone unrecognized.",
  aboutDescriptionAm: "An award-driven empowerment program and community platform dedicated to honoring the hidden brilliance and resilience of women who have long gone unrecognized.",
  aboutGraduatesWorkedEn: "Founded by Samuel Geremew with co-founders Mulutsehay Geremew, Weynishèt Geremew, and family collaborators to awaken gems across communities",
  aboutGraduatesWorkedAm: "Founded by Samuel Geremew with co-founders Mulutsehay Geremew, Weynishèt Geremew, and family collaborators to awaken gems across communities",

  // Bootcamp Section
  bootcampTitleEn: "Inside ዕንቁ ሴት ንቁ ሴት",
  bootcampTitleAm: "Inside ዕንቁ ሴት ንቁ ሴት",
  bootcampSubtitleEn: "How our award gatherings and storytelling experiences unfold.",
  bootcampSubtitleAm: "How our award gatherings and storytelling experiences unfold.",
  bootcampDescription1En: "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) recognizes, amplifies, and celebrates women whose resilience has been overlooked. Every gathering is curated with care—from nominations to the moment an awakened gem is honored.",
  bootcampDescription1Am: "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) recognizes, amplifies, and celebrates women whose resilience has been overlooked. Every gathering is curated with care—from nominations to the moment an awakened gem is honored.",
  bootcampDescription2En: "We prioritize authenticity over hype: honest dialogue, thoughtful recognition, and a community that believes visibility is a catalyst for change.",
  bootcampDescription2Am: "We prioritize authenticity over hype: honest dialogue, thoughtful recognition, and a community that believes visibility is a catalyst for change.",
};

async function run() {
  console.log("Migrating site settings to Sanity CMS...");
  try {
    const result = await client.createOrReplace(defaultSettings);
    console.log("Success! Site settings successfully uploaded to Sanity. Document ID:", result._id);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

run();
