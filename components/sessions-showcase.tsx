"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

interface Attendee {
  name: string;
  category: string;
  description: string;
  image: string;
}

interface Session {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  nominees: Attendee[];
  honored: Attendee[];
}

const sessionsData: Session[] = [
  {
    id: 1,
    title: "Founding Gathering",
    date: "Jan 3",
    location: "Addis Ababa",
    description:
      "Honoring the first awakened gems who sparked ENQU SET NIQU SET.",
    image: "/images/image.png",
    nominees: [
      {
        name: "Selamawit Bekele",
        category: "RESILIENCE",
        description:
          "Built a shelter initiative for girls after surviving displacement.",
        image: "/ethiopian-woman-shelter-work.jpg",
      },
      {
        name: "Hanan Mohammed",
        category: "STORYTELLING",
        description: "Uses community radio to surface unheard women's stories.",
        image: "/placeholder-p89f8.png",
      },
      {
        name: "Lensa Adugna",
        category: "EDUCATION",
        description: "Mentors younger girls in digital literacy on weekends.",
        image: "/ethiopian-woman-teaching-technology.jpg",
      },
    ],
    honored: [
      {
        name: "Selamawit Bekele",
        category: "RESILIENCE",
        description:
          "Turned personal hardship into a shelter initiative for girls.",
        image: "/ethiopian-woman-shelter-work.jpg",
      },
      {
        name: "Hanan Mohammed",
        category: "STORYTELLING",
        description: "Amplified unheard women through community radio.",
        image: "/placeholder-p89f8.png",
      },
    ],
  },
  {
    id: 2,
    title: "Rising Voices",
    date: "Feb 14",
    location: "Dire Dawa",
    description: "Celebrating women breaking barriers in their communities.",
    image: "/ethiopian-women-community-gathering.jpg",
    nominees: [
      {
        name: "Meron Desta",
        category: "ENTREPRENEURSHIP",
        description: "Founded cooperative supporting 50+ women artisans.",
        image: "/ethiopian-woman-artisan-business.jpg",
      },
      {
        name: "Tigist Alemu",
        category: "HEALTHCARE",
        description: "Launched mobile clinic serving remote villages.",
        image: "/ethiopian-nurse-mobile-clinic.jpg",
      },
    ],
    honored: [
      {
        name: "Meron Desta",
        category: "ENTREPRENEURSHIP",
        description: "Empowered 50+ women through artisan cooperative.",
        image: "/ethiopian-woman-artisan-business.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Innovation Summit",
    date: "Mar 22",
    location: "Hawassa",
    description: "Recognizing pioneers in technology and innovation.",
    image: "/ethiopian-women-technology-conference.jpg",
    nominees: [
      {
        name: "Bethlehem Tilahun",
        category: "TECHNOLOGY",
        description: "Developed app connecting farmers to markets.",
        image: "/ethiopian-woman-software-developer.jpg",
      },
      {
        name: "Sara Negash",
        category: "INNOVATION",
        description: "Created solar-powered water purification system.",
        image: "/placeholder-exbe1.png",
      },
      {
        name: "Mahlet Kebede",
        category: "TECH EDUCATION",
        description: "Teaching coding to girls in rural schools.",
        image: "/ethiopian-woman-teaching-coding.jpg",
      },
    ],
    honored: [
      {
        name: "Bethlehem Tilahun",
        category: "TECHNOLOGY",
        description: "Transformed agricultural markets through technology.",
        image: "/ethiopian-woman-software-developer.jpg",
      },
      {
        name: "Sara Negash",
        category: "INNOVATION",
        description: "Brought clean water to 20+ communities.",
        image: "/placeholder-exbe1.png",
      },
    ],
  },
  {
    id: 4,
    title: "Creative Power",
    date: "Apr 18",
    location: "Bahir Dar",
    description: "Honoring artists shaping Ethiopian culture.",
    image: "/ethiopian-women-artists-gallery.jpg",
    nominees: [
      {
        name: "Rahel Yohannes",
        category: "VISUAL ARTS",
        description: "Paintings celebrate Ethiopian women's stories.",
        image: "/ethiopian-woman-painter-artist.jpg",
      },
      {
        name: "Aida Solomon",
        category: "MUSIC",
        description: "Preserving traditional songs through workshops.",
        image: "/ethiopian-woman-musician-traditional.jpg",
      },
    ],
    honored: [
      {
        name: "Rahel Yohannes",
        category: "VISUAL ARTS",
        description: "Gallery showcasing 100+ Ethiopian women's journeys.",
        image: "/ethiopian-woman-painter-artist.jpg",
      },
    ],
  },
  {
    id: 5,
    title: "Environmental Champions",
    date: "May 25",
    location: "Mekelle",
    description: "Celebrating guardians of Ethiopia's natural heritage.",
    image: "/ethiopian-women-environmental-conservation.jpg",
    nominees: [
      {
        name: "Frehiwot Gebre",
        category: "CONSERVATION",
        description: "Reforestation project planted 10,000 trees.",
        image: "/ethiopian-woman-planting-trees.jpg",
      },
      {
        name: "Hiwot Tadesse",
        category: "SUSTAINABILITY",
        description: "Waste management program for urban communities.",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        name: "Almaz Bekele",
        category: "WILDLIFE",
        description: "Protecting endangered species in national parks.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
    honored: [
      {
        name: "Frehiwot Gebre",
        category: "CONSERVATION",
        description: "Restored 500 hectares of degraded land.",
        image: "/ethiopian-woman-planting-trees.jpg",
      },
      {
        name: "Hiwot Tadesse",
        category: "SUSTAINABILITY",
        description: "Reduced urban waste by 40% in pilot communities.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 6,
    title: "Youth Leadership",
    date: "Jun 30",
    location: "Jimma",
    description: "Recognizing young women leading change.",
    image: "/placeholder.svg?height=600&width=800",
    nominees: [
      {
        name: "Selam Haile",
        category: "ADVOCACY",
        description: "Youth movement for girls' education rights.",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        name: "Bisrat Tesfaye",
        category: "SPORTS",
        description: "Football academy for underprivileged girls.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
    honored: [
      {
        name: "Selam Haile",
        category: "ADVOCACY",
        description: "Policy changes benefiting 5,000+ students.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  {
    id: 7,
    title: "Legacy Builders",
    date: "Jul 15",
    location: "Gondar",
    description: "Honoring women creating lasting community impact.",
    image: "/placeholder.svg?height=600&width=800",
    nominees: [
      {
        name: "Tsehay Alemayehu",
        category: "MENTORSHIP",
        description: "Mentored 200+ young women into leadership.",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        name: "Ework Tadesse",
        category: "PHILANTHROPY",
        description: "Scholarship fund supporting 100+ students.",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        name: "Genet Assefa",
        category: "SOCIAL JUSTICE",
        description: "Legal aid for women facing discrimination.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
    honored: [
      {
        name: "Tsehay Alemayehu",
        category: "MENTORSHIP",
        description: "Built leadership pipeline transforming communities.",
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        name: "Ework Tadesse",
        category: "PHILANTHROPY",
        description: "Enabled generational change through education.",
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
];

export default function SessionsShowcase() {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(sessionsData[0].image);
  const [focusedItem, setFocusedItem] = useState<{
    sessionId: number;
    type: "session" | "nominee" | "honored";
    index?: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;

      let foundFocus = false;
      sessionRefs.current.forEach((sessionEl, sessionIndex) => {
        if (!sessionEl || foundFocus) return;

        const sessionTop = sessionEl.offsetTop - scrollTop;
        const sessionBottom = sessionTop + sessionEl.offsetHeight;

        if (
          sessionTop < containerHeight * 0.5 &&
          sessionBottom > containerHeight * 0.3
        ) {
          const session = sessionsData[sessionIndex];

          const nomineeElements = sessionEl.querySelectorAll(
            "[data-nominee-index]"
          );
          nomineeElements.forEach((nomEl) => {
            if (foundFocus) return;
            const nomTop = (nomEl as HTMLElement).offsetTop + sessionTop;
            const nomBottom = nomTop + (nomEl as HTMLElement).offsetHeight;

            if (
              nomTop < containerHeight * 0.5 &&
              nomBottom > containerHeight * 0.3
            ) {
              const index = Number.parseInt(
                (nomEl as HTMLElement).dataset.nomineeIndex || "0"
              );
              setFocusedItem({ sessionId: session.id, type: "nominee", index });
              setCurrentImage(session.nominees[index].image);
              foundFocus = true;
            }
          });

          if (!foundFocus) {
            const honoredElements = sessionEl.querySelectorAll(
              "[data-honored-index]"
            );
            honoredElements.forEach((honEl) => {
              if (foundFocus) return;
              const honTop = (honEl as HTMLElement).offsetTop + sessionTop;
              const honBottom = honTop + (honEl as HTMLElement).offsetHeight;

              if (
                honTop < containerHeight * 0.5 &&
                honBottom > containerHeight * 0.3
              ) {
                const index = Number.parseInt(
                  (honEl as HTMLElement).dataset.honoredIndex || "0"
                );
                setFocusedItem({
                  sessionId: session.id,
                  type: "honored",
                  index,
                });
                setCurrentImage(session.honored[index].image);
                foundFocus = true;
              }
            });
          }

          if (!foundFocus) {
            setFocusedItem({ sessionId: session.id, type: "session" });
            setCurrentImage(session.image);
            foundFocus = true;
          }
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            {language === "am" ? "የሽልማት ክፍለ ጊዜዎች" : "Award Sessions Journey"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            {language === "am"
              ? "በየክፍለ ጊዜው የተከበሩ ሴቶችን ያስሱ"
              : "Scroll through our seven celebrations of remarkable Ethiopian women"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="relative lg:sticky lg:top-32 h-[500px] lg:h-[650px] self-start">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div key={currentImage} className="absolute inset-0">
                  <motion.img
                    src={currentImage}
                    alt="Session highlight"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-2">
                  {sessionsData.map((session) => (
                    <motion.div
                      key={session.id}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        focusedItem?.sessionId === session.id
                          ? "bg-white shadow-lg shadow-white/50"
                          : "bg-white/40 backdrop-blur-sm"
                      }`}
                      animate={{
                        scaleY: focusedItem?.sessionId === session.id ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
                {focusedItem && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-sm font-medium mt-4 text-center"
                  >
                    Session {focusedItem.sessionId} of {sessionsData.length}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          <div
            ref={containerRef}
            className="space-y-20 overflow-y-auto max-h-[600px] lg:max-h-[900px] pr-4 scroll-smooth sessions-scrollbar"
          >
            {sessionsData.map((session, sessionIndex) => (
              <motion.div
                key={session.id}
                ref={(el) => {
                  sessionRefs.current[sessionIndex] = el;
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: sessionIndex * 0.1 }}
                className="space-y-8"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        {language === "am"
                          ? `የሽልማት ክፍለ ጊዜ #${session.id}`
                          : `Session ${session.id}`}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {session.title}
                      </h3>
                    </div>
                    <div className="text-right text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                      <div className="font-bold text-gray-900">
                        {session.date}
                      </div>
                      <div className="text-xs">{session.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {session.description}
                  </p>
                </div>

                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-px bg-gradient-to-r from-purple-400 to-transparent" />
                    {language === "am" ? "እጩዎች" : "Nominees"}
                  </h4>
                  {session.nominees.map((nominee, index) => (
                    <motion.div
                      key={index}
                      data-nominee-index={index}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-2xl p-6 shadow-md border-2 transition-all duration-300 cursor-default ${
                        focusedItem?.sessionId === session.id &&
                        focusedItem?.type === "nominee" &&
                        focusedItem?.index === index
                          ? "border-purple-400 shadow-xl shadow-purple-100 bg-gradient-to-br from-white to-purple-50"
                          : "border-gray-100 hover:border-purple-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center flex-wrap gap-2">
                            <h5 className="font-bold text-lg text-gray-900">
                              {nominee.name}
                            </h5>
                            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full">
                              {nominee.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {nominee.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-px bg-gradient-to-r from-pink-400 to-transparent" />
                    {language === "am" ? "የተከበሩ" : "Honored"}
                  </h4>
                  {session.honored.map((honoree, index) => (
                    <motion.div
                      key={index}
                      data-honored-index={index}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-default ${
                        focusedItem?.sessionId === session.id &&
                        focusedItem?.type === "honored" &&
                        focusedItem?.index === index
                          ? "border-pink-400 shadow-2xl shadow-pink-100 scale-[1.02]"
                          : "border-purple-200 hover:border-pink-300"
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                          ★
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center flex-wrap gap-2">
                            <h5 className="font-bold text-lg text-gray-900">
                              {honoree.name}
                            </h5>
                            <span className="text-xs font-bold text-pink-700 bg-pink-200 px-3 py-1.5 rounded-full">
                              {honoree.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed font-medium">
                            {honoree.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {sessionIndex < sessionsData.length - 1 && (
                  <div className="pt-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                  ✓
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  {language === "am"
                    ? "ሁሉንም ክፍለ ጊዜዎች አጠናቀዋል"
                    : "You've explored all sessions"}
                </p>
                <p className="text-sm text-gray-600">
                  {language === "am"
                    ? "7 ክፍለ ጊዜዎች እና 100+ የተከበሩ ሴቶች"
                    : "7 sessions celebrating 100+ remarkable women"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
