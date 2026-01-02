"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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

    // Programs
    "programs.title": "Our Initiatives",
    "programs.summer_camp": "Awards",
    "programs.weekend": "Community Dialogues",

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
    "contact.phone": "+251 935 167 575",
    "contact.email": "hello@enqusetniquset.com",

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

    // Gallery Page
    "gallery.title": "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    "gallery.subtitle":
      "Scenes from award gatherings, storytelling circles, and a community that keeps recognition alive.",
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

    // Programs
    "programs.title": "Our Initiatives",
    "programs.summer_camp": "Awards",
    "programs.weekend": "Community Dialogues",

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
    "contact.phone": "+251 911 000 000",
    "contact.email": "hello@enkuniqu.com",

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

    // Gallery Page
    "gallery.title": "ዕንቁ ሴት ንቁ ሴት ምስክሮች",
    "gallery.subtitle":
      "የሽልማት ምስክሮች፣ የተናጋሪ ውይይቶች እና የእውቅናን የሚያደግ ማህበረሰብ ቅንጥቦች።",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
