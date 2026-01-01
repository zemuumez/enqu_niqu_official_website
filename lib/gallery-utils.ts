import fs from "fs";
import path from "path";

/**
 * Read images from a session folder dynamically
 * This function reads the actual files from the public/images folder
 */
export function getSessionImages(sessionNumber: number): string[] {
  const sessionDir = path.join(
    process.cwd(),
    "public",
    "images",
    `Session${sessionNumber}`
  );

  try {
    const files = fs.readdirSync(sessionDir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
      .sort() // Sort alphabetically for consistent ordering
      .map((f) => `/images/Session${sessionNumber}/${f}`);
  } catch (e) {
    // Folder doesn't exist or can't be read
    return [];
  }
}

/**
 * Get all session numbers that have images
 */
export function getAvailableSessions(): number[] {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const sessions: number[] = [];

  try {
    const folders = fs.readdirSync(imagesDir, { withFileTypes: true });
    folders.forEach((folder) => {
      if (folder.isDirectory() && folder.name.startsWith("Session")) {
        const sessionNum = parseInt(folder.name.replace("Session", ""));
        if (!isNaN(sessionNum)) {
          const sessionImages = getSessionImages(sessionNum);
          if (sessionImages.length > 0) {
            sessions.push(sessionNum);
          }
        }
      }
    });
  } catch (e) {
    // Directory doesn't exist
  }

  return sessions.sort((a, b) => b - a);
}
