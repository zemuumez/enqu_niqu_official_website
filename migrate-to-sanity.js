import { createClient } from "@sanity/client";
import fs from "fs/promises";
import path from "path";

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

async function uploadImage(imagePath) {
  try {
    const fullPath = path.resolve(process.cwd(), "public", imagePath.replace(/^\//, ""));
    const fileBuffer = await fs.readFile(fullPath);
    console.log(`Uploading asset: ${imagePath}...`);
    const asset = await client.assets.upload("image", fileBuffer, {
      filename: path.basename(fullPath),
    });
    console.log(`Successfully uploaded: ${imagePath} (Asset ID: ${asset._id})`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`Failed to upload image ${imagePath}:`, err.message);
    return null;
  }
}

async function migratePrograms() {
  console.log("\n--- Migrating Programs ---");
  const programs = [
    {
      title: "Bi-annual & Thematic Award Events",
      duration: "7 events hosted",
      age: "Next gathering: January 6",
      price: "Recognition that restores dignity",
      description:
        "Award-based empowerment gatherings identifying, nominating, and honoring women whose strength and impact often go unseen.",
      features: [
        "Multiple award categories celebrating diverse forms of resilience",
        "Careful nomination review rooted in authenticity",
        "Visibility for survivors, changemakers, and quiet contributors",
        "Community belief over hype—recognition as a catalyst",
      ],
      popular: true,
      level: "Recognition",
      schedule: "Twice yearly gatherings",
      order: 1,
    },
    {
      title: "Podcast Initiative (Upcoming)",
      duration: "Launching soon",
      age: "Stories on air",
      price: "A living archive of awakened gems",
      description:
        "The ENQU SET NIQU SET Podcast will feature past recipients, nominees, and powerful untold stories—extending impact beyond physical gatherings.",
      features: [
        "Conversations on resilience, identity, and growth",
        "Spotlights on honorees and nominees",
        "Bridge between award events",
        "Archive preserving women's stories",
      ],
      popular: false,
      level: "Story archive",
      schedule: "Releases between gatherings",
      order: 2,
    },
  ];

  for (const prog of programs) {
    const doc = {
      _id: `program-${prog.order}`,
      _type: "program",
      title: prog.title,
      duration: prog.duration,
      age: prog.age,
      price: prog.price,
      description: prog.description,
      features: prog.features,
      popular: prog.popular,
      level: prog.level,
      schedule: prog.schedule,
      order: prog.order,
    };
    const created = await client.createOrReplace(doc);
    console.log(`Created/Updated program: "${created.title}"`);
  }
}

async function migrateFounders() {
  console.log("\n--- Migrating Founders ---");
  const founders = [
    {
      name: "Weynshet Geremew",
      role: "Co-founder & CEO",
      imagePath: "images/Persons/Weynshet_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: ["Program Stewardship", "Authenticity", "Community Care", "Event Design"],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "mulu_tsehay_tsehay@enkuniqu.com",
      order: 1,
    },
    {
      name: "Samuel Geremew",
      role: "Founder",
      imagePath: "images/Persons/SamuelGeremew.jpg",
      bio: "Founder who envisioned an empowerment platform that recognizes women as awakened gems, built on trust and authenticity.",
      specialties: ["Vision & Strategy", "Recognition Design", "Community Trust", "Storytelling"],
      experience: "7 events hosted",
      education: "Founder, ENQU SET NIQU SET",
      achievements: [
        "Launched ENQU SET NIQU SET with family",
        "Curated January 6 gathering",
        "Keeps recognition at the center",
      ],
      email: "samuel@enkuniqu.com",
      order: 2,
    },
    {
      name: "Hana Setargachew",
      role: "Co-founder & Assistant Manager",
      imagePath: "images/Persons/Hana_Setargachew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: ["Program Stewardship", "Authenticity", "Community Care", "Event Design"],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "hanasetargachewy@enkuniqu.com",
      order: 3,
    },
    {
      name: "Mulutsehay Geremew",
      role: "Co-founder & Marketing Manager",
      imagePath: "images/Persons/Mulu_Tsehay_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: ["Program Stewardship", "Authenticity", "Community Care", "Event Design"],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "mulu_tsehay@enkuniqu.com",
      order: 4,
    },
    {
      name: "Asmelash Geremew",
      role: "Financial Manager",
      imagePath: "images/Persons/Asmelash_Geremew.png",
      bio: "Co-founder centering women at every decision, ensuring ENQU SET NIQU SET stays deeply human and impact-driven.",
      specialties: ["Program Stewardship", "Authenticity", "Community Care", "Event Design"],
      experience: "Family-led leadership",
      education: "Co-founder, ENQU SET NIQU SET",
      achievements: [
        "Co-built a women-centered leadership team",
        "Shapes award categories with care",
        "Keeps events grounded in purpose",
      ],
      email: "asmelashgeremew@enkuniqu.com",
      order: 5,
    },
  ];

  for (const f of founders) {
    let imageRef = null;
    if (f.imagePath) {
      imageRef = await uploadImage(f.imagePath);
    }

    const doc = {
      _id: `founder-${f.order}`,
      _type: "founder",
      name: f.name,
      role: f.role,
      bio: f.bio,
      specialties: f.specialties,
      experience: f.experience,
      education: f.education,
      achievements: f.achievements,
      email: f.email,
      order: f.order,
      ...(imageRef && { image: imageRef }),
    };

    const created = await client.createOrReplace(doc);
    console.log(`Created/Updated founder: "${created.name}"`);
  }
}

async function migrateGalleries() {
  console.log("\n--- Migrating Gallery Sessions ---");
  
  // Read all folders under public/images
  const imagesDir = path.resolve(process.cwd(), "public", "images");
  const folders = await fs.readdir(imagesDir, { withFileTypes: true });
  
  // Filter for Session folders (Session1, Session2, ..., Session8)
  const sessionFolders = folders
    .filter((f) => f.isDirectory() && f.name.startsWith("Session"))
    .map((f) => f.name)
    .sort((a, b) => {
      const numA = parseInt(a.replace("Session", ""));
      const numB = parseInt(b.replace("Session", ""));
      return numA - numB;
    });

  console.log(`Found session folders: ${sessionFolders.join(", ")}`);

  for (const folderName of sessionFolders) {
    const sessionNum = parseInt(folderName.replace("Session", ""));
    const sessionDir = path.join(imagesDir, folderName);
    try {
      const files = await fs.readdir(sessionDir);
      const imageFiles = files.filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f)).sort();
      
      console.log(`\nProcessing ${folderName} (${imageFiles.length} files)...`);
      const uploadedImages = [];

      for (const file of imageFiles) {
        const relativePath = `images/${folderName}/${file}`;
        const imageRef = await uploadImage(relativePath);
        if (imageRef) {
          uploadedImages.push({
            _key: Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
            ...imageRef,
            caption: `Session ${sessionNum} Photo`,
            alt: `Session ${sessionNum} Gallery Image`,
          });
        }
      }

      if (uploadedImages.length > 0) {
        const doc = {
          _id: `gallerySession-${sessionNum}`,
          _type: "gallerySession",
          session: sessionNum,
          title: `Session ${sessionNum} Gathering`,
          images: uploadedImages,
        };
        const created = await client.createOrReplace(doc);
        console.log(`Created/Updated gallerySession: "${created.title}" with ${created.images.length} images`);
      }
    } catch (err) {
      console.warn(`Could not read folder for ${folderName}:`, err.message);
    }
  }
}

async function run() {
  try {
    console.log("Starting migration to Sanity...");
    await migratePrograms();
    await migrateFounders();
    await migrateGalleries();
    console.log("\nMigration completed successfully! 🎉");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

run();
