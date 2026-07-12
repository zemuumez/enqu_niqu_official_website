import { groq } from "next-sanity";

// Query to get all programs / initiatives
export const programsQuery = groq`
  *[_type == "program"] | order(order asc, _createdAt desc) {
    title,
    duration,
    age,
    price,
    description,
    features,
    popular,
    level,
    schedule
  }
`;

// Query to get all founders and voices
export const foundersQuery = groq`
  *[_type == "founder"] | order(order asc, _createdAt desc) {
    name,
    role,
    image,
    bio,
    specialties,
    experience,
    education,
    achievements,
    email,
    github,
    linkedin
  }
`;

// Query to get all gallery sessions
export const gallerySessionsQuery = groq`
  *[_type == "gallerySession"] | order(session desc) {
    session,
    title,
    "images": images[].asset->url
  }
`;
