"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

type AwardEvent = {
  title: string
  date: string
  image: string
  caption: string
  nominees: { name: string; note: string }[]
  winners: { name: string; category: string; description: string }[]
}

const events: AwardEvent[] = [
  {
    title: "Founding Gathering",
    date: "Jan 6 • Addis Ababa",
    image: "/images/TeachingAndLearning/workshop.jpg",
    caption: "Honoring the first awakened gems who sparked ENQU SET NIQU SET.",
    nominees: [
      { name: "Selamawit Bekele", note: "Built a shelter initiative for girls after surviving displacement." },
      { name: "Hanan Mohammed", note: "Uses community radio to surface unheard women’s stories." },
      { name: "Lensa Adugna", note: "Mentors younger girls in digital literacy on weekends." },
    ],
    winners: [
      { name: "Selamawit Bekele", category: "Resilience", description: "Turned personal hardship into a shelter initiative for girls." },
      { name: "Hanan Mohammed", category: "Storytelling", description: "Amplified unheard women through community radio." },
    ],
  },
  {
    title: "Community Roots",
    date: "March • Hawassa",
    image: "/images/TeachingAndLearning/insa2.jpg",
    caption: "A lakeside circle honoring quiet contributors in care and education.",
    nominees: [
      { name: "Winta Hailemariam", note: "Started neighborhood care circles for new mothers." },
      { name: "Rediet Kassa", note: "Teaches weekend literacy to girls who left school early." },
      { name: "Meaza Tadesse", note: "Drives a mobile library van across rural villages." },
    ],
    winners: [
      { name: "Winta Hailemariam", category: "Community Care", description: "Built neighborhood care circles for new mothers." },
      { name: "Meaza Tadesse", category: "Education", description: "Created mobile reading rooms for girls." },
    ],
  },
  {
    title: "Voices Unbound",
    date: "May • Mekelle",
    image: "/images/TeachingAndLearning/sss.jpg",
    caption: "Storytelling night centering survivors who became symbols of courage.",
    nominees: [
      { name: "Hirut Endale", note: "Coaches survivors to turn pain into purposeful speaking." },
      { name: "Abigiya Gebru", note: "Runs a hotline that connects women to safe counsel." },
      { name: "Mahlet Lemma", note: "Paints public murals that reclaim space for women." },
    ],
    winners: [
      { name: "Abigiya Gebru", category: "Voice", description: "Opened a hotline for women seeking safe counsel." },
      { name: "Mahlet Lemma", category: "Art & Healing", description: "Used mural art to reclaim public space for women." },
    ],
  },
  {
    title: "Quiet Leadership",
    date: "July • Bahir Dar",
    image: "/images/TeachingAndLearning/workshop2.jpg",
    caption: "Recognizing women who lead without title, lifting villages forward.",
    nominees: [
      { name: "Arsema Yohannes", note: "Built seed banks that women manage together." },
      { name: "Saba Fikru", note: "Organizes maternal health caravans to remote areas." },
      { name: "Sofia Dawit", note: "Guides girls into vocational training pathways." },
    ],
    winners: [
      { name: "Arsema Yohannes", category: "Agriculture", description: "Organized women-led seed banks to secure harvests." },
      { name: "Saba Fikru", category: "Health", description: "Ran traveling clinics for maternal care." },
    ],
  },
  {
    title: "Changemakers",
    date: "Sept • Dire Dawa",
    image: "/images/TeachingAndLearning/insa1.jpg",
    caption: "Awarding women who transform adversity into community momentum.",
    nominees: [
      { name: "Blain Tarekegn", note: "Grew cooperatives that keep craft income with women artisans." },
      { name: "Mahiyech Moges", note: "Counsels youth on self-worth and confidence." },
      { name: "Rahel Wolde", note: "Runs mentorship circles that feed into leadership pipelines." },
    ],
    winners: [
      { name: "Blain Tarekegn", category: "Enterprise", description: "Built women-run cooperatives for sustainable crafts." },
      { name: "Rahel Wolde", category: "Youth Mentorship", description: "Mentored girls into leadership pipelines." },
    ],
  },
  {
    title: "The Bridge",
    date: "Nov • Adama",
    image: "/images/TeachingAndLearning/insa3.jpg",
    caption: "Highlighting allies and collaborators who open doors for awakened gems.",
    nominees: [
      { name: "Abeba Habte", note: "Funds cross-city travel so honorees can share stories." },
      { name: "Sosina Girma", note: "Hosts safe lodgings for visiting honorees." },
      { name: "Feven Alemu", note: "Builds volunteer crews for every gathering." },
    ],
    winners: [
      { name: "Abeba Habte", category: "Allyship", description: "Funded cross-city travel for honorees to share stories." },
      { name: "Feven Alemu", category: "Logistics", description: "Built a volunteer network that keeps events human and smooth." },
    ],
  },
  {
    title: "Future Echoes",
    date: "Dec • Addis Ababa",
    image: "/images/TeachingAndLearning/insa4.jpg",
    caption: "Setting the stage for the podcast era—stories that travel further.",
    nominees: [
      { name: "Tsion Solomon", note: "Preps honorees for podcast storytelling." },
      { name: "Lily Tsegaye", note: "Piloted digital nomination flows in Amharic." },
      { name: "Aida Kassahun", note: "Coaches girls to archive their own stories." },
    ],
    winners: [
      { name: "Tsion Solomon", category: "Podcast Pioneer", description: "Hosts pre-launch dialogues to archive voices." },
      { name: "Lily Tsegaye", category: "Innovation", description: "Piloted digital nomination flows in Amharic." },
    ],
  },
]

function FloatingIcons() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0b0b0b, 4, 12)

    const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 50)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffc9a9, 0.6)
    dir.position.set(2, 3, 4)
    scene.add(dir)

    const palette = ["#f4b23c", "#d85e7a", "#a57bff", "#92d8c8"]
    const geometries = [
      new THREE.IcosahedronGeometry(0.35, 0),
      new THREE.TorusKnotGeometry(0.26, 0.08, 80, 14),
      new THREE.OctahedronGeometry(0.32),
      new THREE.ConeGeometry(0.3, 0.9, 6),
    ]

    const group = new THREE.Group()
    const meshes: THREE.Mesh[] = []
    const materials: THREE.Material[] = []
    for (let i = 0; i < 8; i++) {
      const geom = geometries[i % geometries.length]
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette[i % palette.length]),
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: 0.9,
        emissive: new THREE.Color(palette[(i + 1) % palette.length]).multiplyScalar(0.15),
      })
      materials.push(mat)
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      )
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      mesh.userData = { floatSpeed: 0.6 + Math.random() * 0.4, baseY: mesh.position.y }
      meshes.push(mesh)
      group.add(mesh)
    }
    scene.add(group)

    const onResize = () => {
      if (!canvas) return
      const { clientWidth, clientHeight } = canvas
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", onResize)
    onResize()

    let frame = 0
    let rafId = 0
    const animate = () => {
      frame += 0.005
      meshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.0025 + idx * 0.0004
        mesh.rotation.y += 0.003 + idx * 0.0003
        const { floatSpeed, baseY } = mesh.userData as { floatSpeed: number; baseY: number }
        mesh.position.y = baseY + Math.sin(frame * floatSpeed + idx) * 0.25
      })
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(rafId)
      renderer.dispose()
      geometries.forEach((g) => g.dispose())
      meshes.forEach((m) => m.geometry.dispose())
      materials.forEach((m) => m.dispose())
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />
}

export default function AwardsShowcase() {
  const NAV_OFFSET = 88
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeSpotlight, setActiveSpotlight] = useState<{ name: string; note: string; event: number } | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const articleRefs = useRef<(HTMLElement | null)[]>([])
  const nomineeRefs = useRef<(HTMLElement | null)[]>([])
  const [sectionActive, setSectionActive] = useState(false)
  const [hasAligned, setHasAligned] = useState(false)
  const [sessionsComplete, setSessionsComplete] = useState(false)

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setSectionActive(entry.isIntersecting))
      },
      { threshold: 0.6 },
    )
    sectionObserver.observe(sectionEl)
    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    if (sectionActive && !hasAligned) {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (rect) {
        const targetY = window.scrollY + rect.top - NAV_OFFSET
        window.scrollTo({ top: targetY, behavior: "smooth" })
      } else {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setHasAligned(true)
    }
  }, [sectionActive, hasAligned])

  useEffect(() => {
    const shouldLock = sectionActive && !sessionsComplete
    if (shouldLock) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previous
      }
    }
    document.body.style.overflow = ""
    return
  }, [sectionActive, sessionsComplete])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!sectionActive) return
      if (sessionsComplete) return
      if (window.innerWidth < 1024) return
      const scrollEl = detailsRef.current
      if (!scrollEl) return

      const atTop = scrollEl.scrollTop <= 0
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight

      const scrollingUp = event.deltaY < 0
      const scrollingDown = event.deltaY > 0

      const atLastSession = activeIndex === events.length - 1
      const canLeaveDown = atBottom && atLastSession && sessionsComplete
      const canLeaveUp = atTop && activeIndex === 0

      // Allow page scroll when at start (up) or once all sessions viewed (down)
      if ((scrollingUp && canLeaveUp) || (scrollingDown && canLeaveDown)) return

      event.preventDefault()
      scrollEl.scrollBy({ top: event.deltaY * 0.08, behavior: "smooth" })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [sectionActive, sessionsComplete, activeIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index") || 0)
            setActiveIndex(idx)
          }
        })
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.2,
      },
    )

    articleRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nomineeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const person = entry.target.getAttribute("data-name")
            const note = entry.target.getAttribute("data-note")
            const eventIdx = Number(entry.target.getAttribute("data-event") || 0)
            if (person && note) {
              setActiveSpotlight({ name: person, note, event: eventIdx })
              const isLastSession = eventIdx === events.length - 1
              const lastNominee = events[events.length - 1].nominees.at(-1)
              if (isLastSession && lastNominee && lastNominee.name === person) {
                setSessionsComplete(true)
              }
            }
          }
        })
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: 0.6 },
    )

    nomineeRefs.current.forEach((el) => el && nomineeObserver.observe(el))
    return () => nomineeObserver.disconnect()
  }, [])

  useEffect(() => {
    setActiveSpotlight({
      name: events[activeIndex].nominees[0]?.name || "",
      note: events[activeIndex].nominees[0]?.note || "",
      event: activeIndex,
    })
  }, [activeIndex])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative section bg-background overflow-hidden snap-y snap-mandatory min-h-screen pt-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <FloatingIcons />
      </div>
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="relative rounded-[24px] border border-white/30 bg-white/5 backdrop-blur-3xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/8 to-transparent pointer-events-none" />
                <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-transparent to-transparent blur-3xl" />
                  <div className="relative p-4">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                    <div
                      key={activeIndex}
                      className="w-full h-full transition-all duration-700 ease-out will-change-transform animate-fadeSlide"
                    >
                      <img
                        src={events[activeIndex].image}
                        alt={events[activeIndex].title}
                        className="w-full h-full object-cover brightness-110 contrast-110 saturate-[1.15] scale-[1.02] rounded-xl shadow-2xl"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-white/80">
                    <div className="font-semibold tracking-wide uppercase">{events[activeIndex].title}</div>
                    <div className="text-white/60">{events[activeIndex].date}</div>
                  </div>
                  <p className="mt-2 text-white/80 text-sm leading-relaxed">{events[activeIndex].caption}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={detailsRef}
            className="lg:col-span-3 space-y-16 lg:pr-2 snap-y snap-mandatory lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto scrollbar-hide"
          >
            {events.map((event, index) => (
              <article
                key={event.title}
                data-index={index}
                ref={(el) => (articleRefs.current[index] = el)}
                className="relative bg-surface/60 border border-border/60 rounded-2xl p-6 lg:p-8 shadow-lg backdrop-blur-md snap-start min-h-[80vh] flex flex-col"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-accent mb-2">Award Session #{index + 1}</div>
                    <h3 className="text-2xl lg:text-3xl font-light text-text-primary">{event.title}</h3>
                  </div>
                  <span className="text-sm text-text-muted">{event.date}</span>
                </div>
                <p className="mt-3 text-text-secondary leading-relaxed">{event.caption}</p>
                {activeSpotlight && activeSpotlight.event === index && (
                  <div className="mt-4 p-4 rounded-xl border border-border bg-secondary/60">
                    <div className="text-xs uppercase tracking-[0.18em] text-text-muted mb-1">Spotlight</div>
                    <div className="font-semibold text-text-primary">{activeSpotlight.name}</div>
                    <p className="text-sm text-text-secondary leading-relaxed">{activeSpotlight.note}</p>
                  </div>
                )}

                <div className="mt-6 grid sm:grid-cols-2 gap-6 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wide">Nominees</h4>
                    <ul className="space-y-2 text-text-secondary">
                      {event.nominees.map((nominee, nomineeIdx) => (
                        <li
                          key={nominee.name}
                          data-name={nominee.name}
                          data-note={nominee.note}
                          data-event={index}
                          ref={(el) => (nomineeRefs.current[index * 10 + nomineeIdx] = el)}
                          className={`flex items-start gap-2 spotlight-item ${
                            activeSpotlight &&
                            activeSpotlight.event === index &&
                            activeSpotlight.name === nominee.name
                              ? "bg-accent/5 border border-accent/30 rounded-lg p-2"
                              : ""
                          }`}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                          <div>
                            <div className="font-medium text-text-primary">{nominee.name}</div>
                            <p className="text-xs text-text-muted leading-snug">{nominee.note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-2 uppercase tracking-wide">Honored</h4>
                    <ul className="space-y-3 text-text-secondary">
                      {event.winners.map((winner) => (
                        <li key={winner.name}>
                          <div className="font-semibold text-text-primary">{winner.name}</div>
                          <div className="text-xs uppercase tracking-[0.16em] text-accent mb-1">{winner.category}</div>
                          <p className="text-sm leading-snug text-text-secondary">{winner.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.7s ease;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
