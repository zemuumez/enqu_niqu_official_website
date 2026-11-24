"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  settings: any;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Initiatives",
    "nav.persons": "Founders",
    "nav.pricing": "Impact",
    "nav.contact": "Contact",
    "nav.signup": "Nominate",
    "nav.login": "Join",
    "nav.gallery": "Gallery",
    "nav.bootcamp": "Inside ENQU SET NIQU SET",

    // Hero Section
    "hero.title": "Awakening the Gems Within Women",
    "hero.subtitle":
      "ENQU SET NIQU SET is an award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",
    "hero.cta": "Nominate a Woman",
    "hero.learn_more": "Explore ENQU SET NIQU SET",

    // About Section
    "about.title": "About ENQU SET NIQU SET",
    "about.description":
      "An award-driven empowerment program and community platform dedicated to honoring the hidden brilliance and resilience of women who have long gone unrecognized.",
    "about.graduates_worked":
      "Founded by Samuel Geremew with co-founders Mulutsehay Geremew, Weynishèt Geremew, and family collaborators to awaken gems across communities",
    "about.students_enrolled": "Stories Amplified",
    "about.expert_instructors": "Community Partners",
    "about.mission":
      "ENQU means Gem, the hidden value inside every woman waiting to be seen and celebrated.",
    "about.vision":
      "Mission: to empower girls and women through recognition, storytelling, and community-driven celebration.",
    "about.philosophy":
      "Recognition restores dignity, storytelling heals, and community amplifies what the world overlooked.",

    // Programs
    "programs.title": "Our Initiatives",
    "programs.summer_camp": "Awards",
    "programs.weekend": "Community Dialogues",
    "programs.section_label": "What ENQU SET NIQU SET Does",
    "programs.section_title": "Awakening the Gems Within Women",
    "programs.section_subtitle":
      "Recognition is not a luxury—it is a catalyst for change. Our initiatives honor resilience, amplify unheard voices, and create spaces where women are seen.",

    // persons Section
    "persons.title": "Founders & Voices",
    "persons.description":
      "Guided by a family-led founding team and a growing circle of award recipients who inspire through their resilience and purpose.",
    "person.samuel_name": "Samuel Geremew",
    "person.samuel_title": "Founder",
    "person.mulu_name": "Mulutsehay Geremew",
    "person.mulu_title": "Co-founder & Marketing Manager",
    "person.weynshet_name": "Weynshet Geremew",
    "person.weynshet_title": "Co-founder & CEO",
    "person.hana_name": "Hana Setargachew",
    "person.hana_title": "Co-founder & Assistant Manager",
    "person.asmelash_name": "Asmelash Geremew",
    "person.asmelash_title": "Financial Manager",
    "person.zebider_name": "Sister Zebider Zewdie",
    "person.zebider_title": "Ambassador",
    "founders.section_label": "Founders & Voices",
    "founders.section_title": "Authentic, Family-Led Leadership",
    "founders.section_subtitle":
      "Guided by a family-centered founding team and a growing circle of award recipients who inspire through their resilience and purpose.",

    // Gallery
    "gallery.title": "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    "gallery.subtitle":
      "Scenes from award gatherings, storytelling circles, and a community that keeps recognition alive.",
    "gallery.section_label": "Glimpses of ENQU SET NIQU SET",
    "gallery.section_title": "Recognition in Motion",
    "gallery.section_subtitle":
      "Award evenings, panels, and intimate conversations that celebrate the gems within women.",

    // Contact Section
    "contact.title": "Get in Touch",
    "contact.description":
      "Partner with us, nominate a resilient woman, or host a ዕንቁ ሴት ንቁ ሴት conversation. We would love to hear from you.",
    "contact.name_label": "Your Name",
    "contact.email_label": "Your Email",
    "contact.subject_label": "Subject",
    "contact.message_label": "Your Message",
    "contact.send_message": "Send Message",
    "contact.address_label": "Our Location",
    "contact.address": "Addis Ababa, Ethiopia",
    "contact.phone": "+251 913 528 574",
    "contact.email": "hello@enqusetniquset.com",
    "contact.section_label": "Partner With Purpose",
    "contact.section_title": "Nominate, Collaborate, or Host",
    "contact.section_subtitle":
      "Share a resilient woman's story, partner with our mission, or bring a ዕንቁ ሴት ንቁ ሴት gathering to your community.",

    // Bootcamp Page
    "bootcamp.title": "Inside ዕንቁ ሴት ንቁ ሴት",
    "bootcamp.subtitle":
      "How our award gatherings and storytelling experiences unfold.",
    "bootcamp.description_1":
      "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) recognizes, amplifies, and celebrates women whose resilience has been overlooked. Every gathering is curated with care—from nominations to the moment an awakened gem is honored.",
    "bootcamp.description_2":
      "We prioritize authenticity over hype: honest dialogue, thoughtful recognition, and a community that believes visibility is a catalyst for change.",
    "bootcamp.duration": "7 events hosted • Next gathering: January 6",
    "bootcamp.format": "Women-centered • Community-powered",
    "bootcamp.curriculum": "What to Expect",
    "bootcamp.feature_1": "Award categories honoring diverse resilience",
    "bootcamp.feature_2": "Nomination process handled with care",
    "bootcamp.feature_3": "Storytelling panels & dialogue circles",
    "bootcamp.feature_4": "Community impact beyond the stage",
    "bootcamp.feature_5": "Podcast archive launching soon",

    // Film Reel
    "filmreel.title": "Our Journey Through Time",
    "filmreel.subtitle":
      "Scroll to explore past honorees and the current session",

    // Footer
    "footer.description":
      "Award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",
    "footer.tagline": "Awakening the Gems Within Women",
  },
  am: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.programs": "Initiatives",
    "nav.persons": "Founders",
    "nav.pricing": "Impact",
    "nav.contact": "Contact",
    "nav.signup": "Nominate",
    "nav.login": "Join",
    "nav.gallery": "Gallery",
    "nav.bootcamp": "Inside ENQU SET NIQU SET",

    // Hero Section
    "hero.title": "Awakening the Gems Within Women",
    "hero.subtitle":
      "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) is an award-driven empowerment platform recognizing, amplifying, and celebrating resilient women whose stories deserve the spotlight.",
    "hero.cta": "Nominate a Woman",
    "hero.learn_more": "Explore ዕንቁ ሴት ንቁ ሴት",

    // About Section
    "about.title": "About ዕንቁ ሴት ንቁ ሴት",
    "about.description":
      "An award-driven empowerment program and community platform dedicated to honoring the hidden brilliance and resilience of women who have long gone unrecognized.",
    "about.graduates_worked":
      "Founded by Samuel Geremew with co-founders Mulutsehay Geremew, Weynishèt Geremew, and family collaborators to awaken gems across communities",
    "about.students_enrolled": "Stories Amplified",
    "about.expert_instructors": "Community Partners",
    "about.mission":
      "ዕንቁ ማለት ውድ ዕንቅልፍ ነው፣ በእያንዳንዷ ሴት ውስጥ ያለው ድብቅ ዋጋ ሲታይና ሲከበር የሚጠባበቅ።",
    "about.vision":
      "ተልእኮ: ልጃገረዶችንና ሴቶችን በእውቅና፣ በታሪክ አተራረክ፣ እና በማህበረሰብ-ተኮር ክብረ-በዓል ማብቃት።",
    "about.philosophy":
      "እውቅና ክብርን ያድሳል፣ ታሪክ አተራረክ ያድናል፣ ማህበረሰብ ዓለም ያልተመለከተውን ያጎላል።",

    // Programs
    "programs.title": "Our Initiatives",
    "programs.summer_camp": "Awards",
    "programs.weekend": "Community Dialogues",
    "programs.section_label": "ዕንቁ ሴት ንቁ ሴት ምን ያደርጋል",
    "programs.section_title": "በሴቶች ውስጥ ያለውን ዕንቁ ማንቃት",
    "programs.section_subtitle":
      "እውቅና የቅንጦት ሳይሆን የለውጥ ማነቃቂያ ነው። ተነሳሽነታችን ጽኑነትን ያከብራል፣ ያልተሰሙ ድምጾችን ያጎላል።",

    // persons Section
    "persons.title": "Founders & Voices",
    "persons.description":
      "Guided by a family-led founding team and a growing circle of award recipients who inspire through their resilience and purpose.",
    "person.samuel_name": "Samuel Geremew",
    "person.samuel_title": "Founder",
    "person.mulu_name": "Mulu Tsehay Geremew",
    "person.mulu_title": "Co-founder & Marketing Manager",
    "person.weynshet_name": "Weynshet Geremew",
    "person.weynshet_title": "Co-founder & CEO",
    "person.hana_name": "Hana Setargachew",
    "person.hana_title": "Co-founder & Assistant Manager",
    "person.asmelash_name": "Asmelash Geremew",
    "person.asmelash_title": "Financial Manager",
    "person.zebider_name": "Sister Zebider Zewdie",
    "person.zebider_title": "Ambassador",
    "founders.section_label": "መስራቾች እና ድምጾች",
    "founders.section_title": "ቤተሰብ-ተኮር ትክክለኛ አመራር",
    "founders.section_subtitle":
      "በቤተሰብ-ተኮር መስራች ቡድን እና በጽኑነታቸው እና ዓላማቸው በሚያነቃቁ የሽልማት ተቀባዮች ክበብ የሚመራ።",

    // Gallery
    "gallery.title": "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    "gallery.subtitle":
      "የሽልማት ምስክሮች፣ የተናጋሪ ውይይቶች እና የእውቅናን የሚያደግ ማህበረሰብ ቅንጥቦች።",
    "gallery.section_label": "የዕንቁ ሴት ንቁ ሴት ቅንጥቦች",
    "gallery.section_title": "በእንቅስቃሴ ላይ ያለ እውቅና",
    "gallery.section_subtitle":
      "የሽልማት ምሽቶች፣ ፓነሎች፣ እና በሴቶች ውስጥ ያሉትን ዕንቁዎች የሚያከብሩ ቅርብ ውይይቶች።",

    // Contact Section
    "contact.title": "Get in Touch",
    "contact.description":
      "Partner with us, nominate a resilient woman, or host a ዕንቁ ሴት ንቁ ሴት conversation. We would love to hear from you.",
    "contact.name_label": "Your Name",
    "contact.email_label": "Your Email",
    "contact.subject_label": "Subject",
    "contact.message_label": "Your Message",
    "contact.send_message": "Send Message",
    "contact.address_label": "Our Location",
    "contact.address": "Addis Ababa, Ethiopia",
    "contact.phone": "+251 913 528 574",
    "contact.email": "hello@enqusetniquset.com",
    "contact.section_label": "ከዓላማ ጋር ተባበሩ",
    "contact.section_title": "አጩ፣ ተባበር፣ ወይም አስተናግድ",
    "contact.section_subtitle":
      "የጽኑ ሴት ታሪክ ያጋሩ፣ ከተልእኳችን ጋር ተባበሩ፣ ወይም የዕንቁ ሴት ንቁ ሴት ስብስብ ወደ ማህበረሰብዎ ያምጡ።",

    // Bootcamp Page
    "bootcamp.title": "Inside ዕንቁ ሴት ንቁ ሴት",
    "bootcamp.subtitle":
      "How our award gatherings and storytelling experiences unfold.",
    "bootcamp.description_1":
      "ENQU SET NIQU SET (ዕንቁ ሴት ንቁ ሴት) recognizes, amplifies, and celebrates women whose resilience has been overlooked. Every gathering is curated with care—from nominations to the moment an awakened gem is honored.",
    "bootcamp.description_2":
      "We prioritize authenticity over hype: honest dialogue, thoughtful recognition, and a community that believes visibility is a catalyst for change.",
    "bootcamp.duration": "7 events hosted • Next gathering: January 6",
    "bootcamp.format": "Women-centered • Community-powered",
    "bootcamp.curriculum": "What to Expect",
    "bootcamp.feature_1": "Award categories honoring diverse resilience",
    "bootcamp.feature_2": "Nomination process handled with care",
    "bootcamp.feature_3": "Storytelling panels & dialogue circles",
    "bootcamp.feature_4": "Community impact beyond the stage",
    "bootcamp.feature_5": "Podcast archive launching soon",

    // Film Reel
    "filmreel.title": "በጊዜ ውስጥ ያለ ጉዟችን",
    "filmreel.subtitle":
      "ያለፉ ተሸላሚዎችን እና የወቅቱን ክፍለ-ጊዜ ለመመልከት ወደ ታች ያሸብልሉ",

    // Footer
    "footer.description":
      "ታሪካቸው ትኩረት የሚገባቸውን ጽኑ ሴቶችን የሚያውቅ፣ የሚያጎላና የሚያከብር በሽልማት-ተኮር የማብቃት መድረክ።",
    "footer.tagline": "በሴቶች ውስጥ ያሉትን ዕንቁዎች ማንቃት",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ 
  children,
  initialSettings,
  pageContent,
}: { 
  children: ReactNode;
  initialSettings?: any;
  pageContent?: any;
}) {
  const [language, setLanguage] = useState<Language>("en");

  // Merge pageContent over initialSettings so page-specific document takes priority
  const activeData = { ...(initialSettings || {}), ...(pageContent || {}) };

  const t = (key: string): string => {
    if (activeData) {
      // Dynamic CRM contact settings override
      if (key === "contact.phone" && activeData.phone) return activeData.phone;
      if (key === "contact.email" && activeData.email) return activeData.email;
      if (key === "contact.address" && activeData.address) return activeData.address;

      // Dynamic Page Content settings overrides (localized)
      // Map of translation key → [enField, amField, fallbackEnField?, fallbackAmField?]
      const overrideMap: Record<string, string[]> = {
        "hero.title": ["heroTitleEn", "heroTitleAm"],
        "hero.subtitle": ["heroSubtitleEn", "heroSubtitleAm"],
        "about.title": ["aboutTitleEn", "aboutTitleAm"],
        "about.description": ["aboutDescriptionEn", "aboutDescriptionAm"],
        "about.graduates_worked": ["aboutGraduatesWorkedEn", "aboutGraduatesWorkedAm"],
        "about.mission": ["aboutMissionEn", "aboutMissionAm"],
        "about.vision": ["aboutVisionEn", "aboutVisionAm"],
        "about.philosophy": ["aboutPhilosophyEn", "aboutPhilosophyAm"],
        "bootcamp.title": ["bootcampTitleEn", "bootcampTitleAm", "titleEn", "titleAm"],
        "bootcamp.subtitle": ["bootcampSubtitleEn", "bootcampSubtitleAm", "subtitleEn", "subtitleAm"],
        "bootcamp.description_1": ["bootcampDescription1En", "bootcampDescription1Am", "description1En", "description1Am"],
        "bootcamp.description_2": ["bootcampDescription2En", "bootcampDescription2Am", "description2En", "description2Am"],
        "bootcamp.duration": ["bootcampDurationEn", "bootcampDurationAm", "durationEn", "durationAm"],
        "bootcamp.format": ["bootcampFormatEn", "bootcampFormatAm", "formatEn", "formatAm"],
        "bootcamp.curriculum": ["bootcampCurriculumTitleEn", "bootcampCurriculumTitleAm", "curriculumTitleEn", "curriculumTitleAm"],
        "programs.section_label": ["programsHighlightLabelEn", "programsHighlightLabelAm", "programsSectionLabelEn", "programsSectionLabelAm", "labelEn", "labelAm"],
        "programs.section_title": ["programsHighlightTitleEn", "programsHighlightTitleAm", "programsSectionTitleEn", "programsSectionTitleAm", "titleEn", "titleAm"],
        "programs.section_subtitle": ["programsHighlightSubtitleEn", "programsHighlightSubtitleAm", "programsSectionSubtitleEn", "programsSectionSubtitleAm", "subtitleEn", "subtitleAm"],
        "founders.section_label": ["foundersHighlightLabelEn", "foundersHighlightLabelAm", "foundersSectionLabelEn", "foundersSectionLabelAm", "labelEn", "labelAm"],
        "founders.section_title": ["foundersHighlightTitleEn", "foundersHighlightTitleAm", "foundersSectionTitleEn", "foundersSectionTitleAm", "titleEn", "titleAm"],
        "founders.section_subtitle": ["foundersHighlightSubtitleEn", "foundersHighlightSubtitleAm", "foundersSectionSubtitleEn", "foundersSectionSubtitleAm", "subtitleEn", "subtitleAm"],
        "gallery.section_label": ["galleryHighlightLabelEn", "galleryHighlightLabelAm", "gallerySectionLabelEn", "gallerySectionLabelAm", "badgeEn", "badgeAm"],
        "gallery.section_title": ["galleryHighlightTitleEn", "galleryHighlightTitleAm", "gallerySectionTitleEn", "gallerySectionTitleAm", "titleEn", "titleAm"],
        "gallery.section_subtitle": ["galleryHighlightSubtitleEn", "galleryHighlightSubtitleAm", "gallerySectionSubtitleEn", "gallerySectionSubtitleAm", "subtitleEn", "subtitleAm"],
        "contact.section_label": ["contactHighlightLabelEn", "contactHighlightLabelAm", "contactSectionLabelEn", "contactSectionLabelAm", "badgeEn", "badgeAm"],
        "contact.section_title": ["contactHighlightTitleEn", "contactHighlightTitleAm", "contactSectionTitleEn", "contactSectionTitleAm", "titleEn", "titleAm"],
        "contact.section_subtitle": ["contactHighlightSubtitleEn", "contactHighlightSubtitleAm", "contactSectionSubtitleEn", "contactSectionSubtitleAm", "subtitleEn", "subtitleAm"],
        "filmreel.title": ["filmReelTitleEn", "filmReelTitleAm"],
        "filmreel.subtitle": ["filmReelSubtitleEn", "filmReelSubtitleAm"],
        "footer.description": ["footerDescriptionEn", "footerDescriptionAm"],
        "footer.tagline": ["footerTaglineEn", "footerTaglineAm"],
      };

      const fields = overrideMap[key];
      if (fields) {
        if (language === "en") {
          // Check English fields in order of priority (0, 2, 4...)
          for (let i = 0; i < fields.length; i += 2) {
            const val = activeData[fields[i]];
            if (val) return val;
          }
        } else {
          // Check Amharic fields in order of priority (1, 3, 5...)
          for (let i = 1; i < fields.length; i += 2) {
            const val = activeData[fields[i]];
            if (val) return val;
          }
        }
      }
    }

    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, settings: activeData || null }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
