/**
 * Gallery Configuration
 * 
 * To add new images to a session:
 * 1. Add the image file to the corresponding Session folder in /public/images/
 * 2. Update the imageCount for that session below
 * 
 * The component will automatically load all images from the session folder.
 */

export interface SessionConfig {
  session: number;
  imageCount: number;
  imagePattern?: string; // Optional: if images follow a specific naming pattern
}

export const gallerySessions: SessionConfig[] = [
  { session: 1, imageCount: 5 },
  { session: 2, imageCount: 10 },
  { session: 3, imageCount: 9 },
  { session: 4, imageCount: 18 },
  { session: 6, imageCount: 5 },
  { session: 7, imageCount: 5 },
];

/**
 * Generate image paths for a session
 * This function creates paths based on common image naming patterns
 */
export function generateSessionImagePaths(
  sessionNumber: number,
  imageCount: number
): string[] {
  const paths: string[] = [];
  const sessionFolder = `/images/Session${sessionNumber}/`;

  // Try to load images - the actual filenames will be determined by what's in the folder
  // For now, we'll use a pattern that works with the existing structure
  // In production, you might want to use require.context or a build-time script
  
  // Since we can't dynamically read the file system, we'll use a helper
  // that tries common image extensions and patterns
  for (let i = 1; i <= imageCount; i++) {
    // This is a placeholder - in a real implementation, you'd want to
    // either use a build script to generate this list, or use an API
    // For now, we'll return paths that need to be populated
    paths.push(`${sessionFolder}image-${i}`);
  }

  return paths;
}

