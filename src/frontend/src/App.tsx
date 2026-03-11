import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ExternalLink,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitForm } from "./hooks/useQueries";

const CREATOR_PHOTO =
  "/assets/uploads/Screenshot_2026-03-11-18-23-12-09_f9ee0578fe1cc94de7482bd41accb329-1.jpg";
const YT_CHANNEL = "https://youtube.com/@DhirajBundiwal";
const IG_LINK = "https://instagram.com/DhirajBundiwal";
const WA_LINK = "https://wa.me/917419820519";
const PHONE = "tel:7419820519";

// ── Meta Tags ──
function useMeta() {
  useEffect(() => {
    document.title =
      "Dhiraj Bundiwal - YouTube Creator | Vlogs, Entertainment & Village Life";
    const setMeta = (name: string, content: string, prop = false) => {
      const key = prop ? "property" : "name";
      let el = document.querySelector(
        `meta[${key}="${name}"]`,
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Official website of Dhiraj Bundiwal - Indian YouTuber creating vlogs, entertainment, village life videos and shorts. Subscribe now!",
    );
    setMeta(
      "keywords",
      "YouTube Creator, Indian YouTuber, Dhiraj Bundiwal Channel, Vlog YouTube Channel, Village Life YouTube",
    );
    setMeta("og:title", "Dhiraj Bundiwal - YouTube Creator", true);
    setMeta(
      "og:description",
      "Vlogs, Entertainment, Village Life & Shorts",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Dhiraj Bundiwal - YouTube Creator");

    // JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Dhiraj Bundiwal",
      url: window.location.origin,
      sameAs: [YT_CHANNEL, IG_LINK],
      jobTitle: "YouTube Creator",
      description:
        "Indian YouTuber creating vlogs, entertainment, village life videos and shorts.",
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
}

// ── Nav ──
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Gallery", href: "#gallery" },
  { label: "Collaborate", href: "#collaborate" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          data-ocid="nav.link"
          className="flex items-center gap-2 font-display font-bold text-lg tracking-tight"
        >
          <span className="text-red-500">▶</span>
          <span className="gradient-text">Dhiraj Bundiwal</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.primary_button"
          >
            <Button className="btn-neon-red text-white font-semibold ml-2 text-sm px-4 h-8 rounded-full border-0">
              🔴 Subscribe
            </Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  className="px-3 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={YT_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
                data-ocid="nav.primary_button"
              >
                <Button className="btn-neon-red text-white w-full rounded-full border-0">
                  🔴 Subscribe on YouTube
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ──
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/generated/dhiraj-hero-bg.dim_1920x1080.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 neon-grid-bg opacity-40" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.55 0.22 27 / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-4 pt-20 pb-32 max-w-4xl mx-auto">
        {/* Subscriber badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/5 border border-white/15 text-white/90"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          881+ Subscribers & Growing
        </motion.div>

        {/* Creator photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <img
              src={CREATOR_PHOTO}
              alt="Dhiraj Bundiwal"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover creator-photo-glow"
            />
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center border-2 border-black">
              <Youtube size={14} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight"
        >
          Welcome to <span className="gradient-text">Dhiraj Bundiwal</span>
          <br />
          <span className="text-white">Official Channel</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-white/60 text-base md:text-lg mb-8 tracking-widest uppercase font-accent"
        >
          Vlogs • Entertainment • Village Life • Shorts
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
          >
            <Button className="btn-neon-red text-white font-bold px-8 py-6 text-base rounded-full border-0 w-full sm:w-auto">
              <Youtube size={18} className="mr-2" />🔴 Subscribe on YouTube
            </Button>
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
          >
            <Button className="btn-neon-purple text-white font-bold px-8 py-6 text-base rounded-full w-full sm:w-auto">
              <Instagram size={18} className="mr-2" />📸 Follow on Instagram
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex justify-center"
        >
          <ChevronDown className="text-white/30 animate-bounce" size={28} />
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──
function AboutSection() {
  const stats = [
    { icon: <Users size={18} />, label: "881+ Subscribers" },
    { icon: <Video size={18} />, label: "Multiple Videos" },
    { icon: <TrendingUp size={18} />, label: "Growing Fast" },
  ];
  const tags = [
    "#Vlogs",
    "#Entertainment",
    "#VillageLife",
    "#Shorts",
    "#IndianYouTuber",
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 neon-grid-bg opacity-20" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            About Creator
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="card-dark rounded-2xl p-6 md:p-10 glow-border-red"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <img
                src={CREATOR_PHOTO}
                alt="Dhiraj Bundiwal"
                className="w-36 h-36 md:w-48 md:h-48 rounded-2xl object-cover glow-border-red"
              />
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
                Hey! I'm <span className="gradient-text">Dhiraj Bundiwal</span>
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                A passionate content creator from India. I create vlogs,
                entertainment content, village life videos, and viral shorts. My
                mission is to bring authentic rural Indian life to the world and
                entertain millions. Join my journey — subscribe and be part of
                the{" "}
                <strong className="text-white">Dhiraj Bundiwal family!</strong>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((t) => (
                  <span key={t} className="neon-tag font-accent">
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="stats-glow flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80 font-medium"
                  >
                    <span className="text-red-400">{s.icon}</span>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Videos ──
const VIDEOS = [
  {
    id: 1,
    title: "Village Life Vlog",
    desc: "Authentic rural Indian life documentary",
    thumb: "/assets/generated/dhiraj-thumb-1.dim_640x360.jpg",
  },
  {
    id: 2,
    title: "Entertainment Video",
    desc: "Fun, engaging entertainment content",
    thumb: "/assets/generated/dhiraj-thumb-2.dim_640x360.jpg",
  },
  {
    id: 3,
    title: "Latest Vlog",
    desc: "Behind the scenes of village life",
    thumb: "/assets/generated/dhiraj-thumb-3.dim_640x360.jpg",
  },
];

function VideosSection() {
  return (
    <section
      id="videos"
      className="py-20 px-4"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            Latest Videos 🎬
          </h2>
          <p className="text-white/50 mt-4">
            Watch the latest content from Dhiraj Bundiwal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {VIDEOS.map((v, i) => (
            <motion.a
              key={v.id}
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-ocid={`videos.item.${i + 1}`}
              className="group card-dark rounded-xl overflow-hidden cursor-pointer block"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={22} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-white mb-1">
                  {v.title}
                </h3>
                <p className="text-white/50 text-sm">{v.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-red-400 text-sm font-medium">
                  <ExternalLink size={12} />
                  Watch on YouTube
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="videos.primary_button"
          >
            <Button className="btn-neon-red text-white font-bold px-8 py-3 rounded-full border-0">
              <Youtube size={16} className="mr-2" />
              View All Videos
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Shorts ──
const SHORTS = [
  {
    id: 1,
    title: "Viral Short #1",
    views: "10K+ Views",
    thumb: "/assets/generated/dhiraj-short-1.dim_360x640.jpg",
  },
  {
    id: 2,
    title: "Village Life Short",
    views: "8K+ Views",
    thumb: "/assets/generated/dhiraj-thumb-1.dim_640x360.jpg",
  },
  {
    id: 3,
    title: "Entertainment Short",
    views: "12K+ Views",
    thumb: "/assets/generated/dhiraj-thumb-2.dim_640x360.jpg",
  },
];

function ShortsSection() {
  return (
    <section id="shorts" className="py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            Viral Shorts ⚡
          </h2>
          <p className="text-white/50 mt-4">Short, punchy, and viral</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {SHORTS.map((s, i) => (
            <motion.a
              key={s.id}
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              data-ocid={`shorts.item.${i + 1}`}
              className="group block"
            >
              {/* 9:16 vertical card */}
              <div
                className="relative rounded-xl overflow-hidden glow-border-purple"
                style={{ aspectRatio: "9/16" }}
              >
                <img
                  src={s.thumb}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    SHORT
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={18} fill="white" className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-display font-bold text-sm">
                    {s.title}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{s.views}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`${YT_CHANNEL}/shorts`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="shorts.primary_button"
          >
            <Button className="btn-neon-purple text-white font-bold px-8 py-3 rounded-full">
              <Zap size={16} className="mr-2" />
              Watch All Shorts
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ──
const GALLERY_ITEMS = [
  { src: CREATOR_PHOTO, alt: "Dhiraj Bundiwal" },
  {
    src: "/assets/generated/dhiraj-gallery-2.dim_400x400.jpg",
    alt: "Creator Life",
  },
  {
    src: "/assets/generated/dhiraj-gallery-3.dim_400x400.jpg",
    alt: "Village Life",
  },
  {
    src: "/assets/generated/dhiraj-thumb-1.dim_640x360.jpg",
    alt: "Content Creation",
  },
  {
    src: "/assets/generated/dhiraj-thumb-3.dim_640x360.jpg",
    alt: "Entertainment",
  },
  { src: "/assets/generated/dhiraj-thumb-2.dim_640x360.jpg", alt: "Vlog" },
];

function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="py-20 px-4"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            Creator Life 📸
          </h2>
          <p className="text-white/50 mt-4">
            Behind the scenes and life moments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              data-ocid={`gallery.item.${i + 1}`}
              className="relative overflow-hidden rounded-xl cursor-pointer gallery-img aspect-square"
              onClick={() => setLightbox(item.src)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <ExternalLink size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            data-ocid="gallery.modal"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
              data-ocid="gallery.close_button"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={lightbox}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl glow-border-purple"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Collab Form ──
function CollabSection() {
  const submitForm = useSubmitForm();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await submitForm.mutateAsync(form);
      toast.success("🎉 Thank you! We'll connect soon for collaboration!");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    }
  };

  const benefits = [
    { icon: <Users size={20} />, label: "881+ Subscribers" },
    { icon: <TrendingUp size={20} />, label: "High Engagement" },
    { icon: <Star size={20} />, label: "Village & Rural Audience" },
    { icon: <Zap size={20} />, label: "Authentic Content" },
  ];

  const offerings = [
    "Sponsored Videos",
    "Product Reviews",
    "Brand Mentions",
    "Instagram Promotions",
    "Short Video Ads",
  ];

  return (
    <section
      id="collaborate"
      className="py-20 px-4 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 neon-grid-bg opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            Work With Me 🤝
          </h2>
          <p className="text-white/50 mt-4 text-lg">
            Partner with Dhiraj Bundiwal for Brand Promotions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((b) => (
                <div
                  key={b.label}
                  data-ocid="collab.card"
                  className="card-dark rounded-xl p-4 text-center"
                >
                  <div className="flex justify-center text-red-400 mb-2">
                    {b.icon}
                  </div>
                  <p className="text-white font-semibold text-sm">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Offerings */}
            <div className="card-dark rounded-xl p-6 glow-border-yellow">
              <h3 className="font-display font-bold text-white text-lg mb-4">
                What I Offer
              </h3>
              <div className="flex flex-wrap gap-2">
                {offerings.map((o) => (
                  <span
                    key={o}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: "oklch(0.88 0.18 90 / 0.1)",
                      border: "1px solid oklch(0.88 0.18 90 / 0.4)",
                      color: "oklch(0.88 0.18 90)",
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="collab.primary_button"
                >
                  <Button
                    className="w-full rounded-full font-bold text-black"
                    style={{
                      background: "oklch(0.72 0.22 145)",
                      border: "none",
                    }}
                  >
                    <SiWhatsapp className="mr-2" size={16} />
                    Let's Collaborate via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-dark rounded-2xl p-6 glow-border-red"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">
              Send Collaboration Request
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm mb-1 block">
                  Name *
                </Label>
                <Input
                  data-ocid="collab.input"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">
                  Email *
                </Label>
                <Input
                  data-ocid="collab.input"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">
                    Phone
                  </Label>
                  <Input
                    data-ocid="collab.input"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 ..."
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1 block">
                    Company/Brand
                  </Label>
                  <Input
                    data-ocid="collab.input"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Brand name"
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1 block">
                  Message *
                </Label>
                <Textarea
                  data-ocid="collab.textarea"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell me about your brand and collaboration idea..."
                  rows={4}
                  className="bg-white/5 border-white/15 text-white placeholder:text-white/30 resize-none"
                />
              </div>
              <Button
                type="submit"
                data-ocid="collab.submit_button"
                disabled={submitForm.isPending}
                className="btn-neon-red w-full rounded-full text-white font-bold py-3 border-0"
              >
                {submitForm.isPending
                  ? "Sending..."
                  : "Send Collaboration Request 🚀"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ──
function ContactSection() {
  const contacts = [
    {
      icon: <Phone size={22} className="text-green-400" />,
      label: "Call Now",
      value: "7419820519",
      href: PHONE,
      ocid: "contact.button",
    },
    {
      icon: <SiWhatsapp size={22} className="text-green-400" />,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: WA_LINK,
      ocid: "contact.button",
    },
    {
      icon: <Youtube size={22} className="text-red-500" />,
      label: "YouTube",
      value: "@DhirajBundiwal",
      href: YT_CHANNEL,
      ocid: "contact.link",
    },
    {
      icon: <Instagram size={22} className="text-purple-400" />,
      label: "Instagram",
      value: "@DhirajBundiwal",
      href: IG_LINK,
      ocid: "contact.link",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4"
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white section-title-glow">
            Get In Touch 📲
          </h2>
          <p className="text-white/50 mt-4">
            Reach out through any channel below
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-ocid={c.ocid}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-dark rounded-xl p-5 flex items-center gap-4 group hover:glow-border-red transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <p className="text-white/50 text-xs font-accent uppercase tracking-wider">
                  {c.label}
                </p>
                <p className="text-white font-semibold">{c.value}</p>
              </div>
              <ExternalLink
                size={14}
                className="ml-auto text-white/30 group-hover:text-white/60 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-black border-t border-white/5 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.link"
          >
            <Youtube
              size={20}
              className="text-white/40 hover:text-red-500 transition-colors"
            />
          </a>
          <a
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.link"
          >
            <Instagram
              size={20}
              className="text-white/40 hover:text-purple-400 transition-colors"
            />
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.link"
          >
            <SiWhatsapp
              size={20}
              className="text-white/40 hover:text-green-400 transition-colors"
            />
          </a>
          <a href={PHONE} data-ocid="footer.link">
            <Phone
              size={20}
              className="text-white/40 hover:text-white transition-colors"
            />
          </a>
        </div>
        <p className="text-white/30 text-sm">
          © {year} Dhiraj Bundiwal. Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── Subscribe Popup ──
function SubscribePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("subscribe_popup_shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem("subscribe_popup_shown", "1");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setVisible(false)}
          data-ocid="subscribe.modal"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full rounded-2xl p-8 text-center glow-border-red"
            style={{ background: "#0f0f0f" }}
          >
            <button
              type="button"
              className="absolute top-3 right-3 text-white/40 hover:text-white"
              onClick={() => setVisible(false)}
              data-ocid="subscribe.close_button"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4">
              <Youtube size={30} className="text-white" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Don't Miss Out!
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Subscribe to{" "}
              <strong className="text-white">Dhiraj Bundiwal</strong> for vlogs,
              entertainment, and viral village life content.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={YT_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="subscribe.primary_button"
                onClick={() => setVisible(false)}
              >
                <Button className="btn-neon-red text-white w-full rounded-full font-bold border-0 py-3">
                  Subscribe Now 🔴
                </Button>
              </a>
              <button
                type="button"
                data-ocid="subscribe.cancel_button"
                onClick={() => setVisible(false)}
                className="text-white/40 hover:text-white/70 text-sm transition-colors py-2"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Floating WhatsApp ──
function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center whatsapp-pulse shadow-2xl"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={26} className="text-white" />
    </a>
  );
}

// ── Mobile Bottom Bar ──
function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex"
      style={{
        background: "rgba(0,0,0,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <a
        href={YT_CHANNEL}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="mobile_bar.primary_button"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-white"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.08)",
          background: "oklch(0.55 0.22 27 / 0.15)",
        }}
      >
        <Youtube size={18} className="text-red-500" />🔴 Subscribe
      </a>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="mobile_bar.secondary_button"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold text-white"
        style={{ background: "oklch(0.72 0.22 145 / 0.1)" }}
      >
        <SiWhatsapp size={18} className="text-green-400" />💬 WhatsApp
      </a>
    </div>
  );
}

// ── App ──
export default function App() {
  useMeta();

  return (
    <div className="min-h-screen bg-black">
      <Toaster theme="dark" position="top-center" />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <VideosSection />
        <ShortsSection />
        <GallerySection />
        <CollabSection />
        <ContactSection />
      </main>
      <Footer />
      <SubscribePopup />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
}
