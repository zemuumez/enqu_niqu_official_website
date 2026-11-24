import { program } from "./program";
import { founder } from "./founder";
import { gallerySession } from "./gallerySession";
import { contactSubmission } from "./contactSubmission";
import { siteSettings } from "./siteSettings";
import { awardEvent } from "./awardEvent";
import { sponsor } from "./sponsor";

// Page-by-page schemas
import { homePage } from "./pages/homePage";
import { programsPage } from "./pages/programsPage";
import { foundersPage } from "./pages/foundersPage";
import { galleryPage } from "./pages/galleryPage";
import { bootcampPage } from "./pages/bootcampPage";
import { contactPage } from "./pages/contactPage";

export const schemaTypes = [
  // Pages
  homePage,
  programsPage,
  foundersPage,
  galleryPage,
  bootcampPage,
  contactPage,

  // Global settings
  siteSettings,

  // Collections
  program,
  founder,
  gallerySession,
  awardEvent,
  sponsor,
  contactSubmission,
];
