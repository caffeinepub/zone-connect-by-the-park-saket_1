import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation } from "@tanstack/react-query";
import {
  Award,
  CheckCircle,
  ChevronDown,
  Droplets,
  FlaskConical,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sprout,
  Star,
  TreePine,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

// ── Scroll Animation Hook ──
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const el of document.querySelectorAll(".animate-on-scroll")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ── SEO Meta Tags ──
function useSEO() {
  useEffect(() => {
    document.title = "Harish Pure Honey – 100% Pure & Natural Honey";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name='${name}']`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property='${property}']`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      "description",
      "Harish Pure Honey – 100% pure, raw, chemical-free natural honey. Direct from beekeepers. Order on WhatsApp +91 9350247746.",
    );
    setMeta(
      "keywords",
      "pure honey, natural honey, raw honey, organic honey, Harish honey, chemical free honey, buy honey online India",
    );
    setOg("og:title", "Harish Pure Honey – 100% Pure & Natural Honey");
    setOg(
      "og:description",
      "Raw, chemical-free honey collected with care for your health. Direct from beekeepers.",
    );
    setOg("og:image", "/assets/generated/honey-hero.dim_1200x700.jpg");
    setOg("og:type", "website");
    setOg("twitter:card", "summary_large_image");
    setOg("twitter:title", "Harish Pure Honey – 100% Pure & Natural Honey");
    setOg(
      "twitter:description",
      "Raw, chemical-free natural honey. Order on WhatsApp.",
    );

    // JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Harish Pure Honey",
      description:
        "100% pure, raw, chemical-free natural honey direct from beekeepers.",
      telephone: "+91 9350247746",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      url: window.location.origin,
      sameAs: ["https://wa.me/919350247746"],
    };
    let scriptEl = document.querySelector(
      "#json-ld",
    ) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "json-ld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schema);
  }, []);
}

const WHATSAPP_URL = "https://wa.me/919350247746";
const CALL_URL = "tel:+919350247746";

export default function App() {
  useScrollReveal();
  useSEO();

  return (
    <div className="min-h-screen bg-cream font-body overflow-x-hidden">
      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
      {/* Mobile Bottom Bar */}
      <MobileBottomBar />
      {/* Main Sections */}
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <OrderSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

// ── Floating WhatsApp ──
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      className="fixed bottom-24 right-4 z-50 md:bottom-8 md:right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-pulse" />
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
    </a>
  );
}

// ── Mobile Bottom Bar ──
function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex h-16 shadow-2xl"
      style={{ background: "oklch(0.18 0.02 50)" }}
    >
      <a
        href={CALL_URL}
        data-ocid="mobile.call_button"
        className="flex-1 flex items-center justify-center gap-2 text-white font-semibold text-sm"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <div className="w-px bg-white/20" />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="mobile.whatsapp_button"
        className="flex-1 flex items-center justify-center gap-2 font-semibold text-sm text-white"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp Order
      </a>
    </div>
  );
}

// ── Hero Section ──
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/honey-hero.dim_1200x700.jpg"
          alt="Pure natural honey"
          className="w-full h-full object-cover"
          style={{ animation: "ken-burns 14s ease-out forwards" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.1 0.02 50 / 0.55) 0%, oklch(0.1 0.02 50 / 0.7) 50%, oklch(0.1 0.02 50 / 0.85) 100%)",
          }}
        />
      </div>

      {/* Hex Pattern Overlay */}
      <div className="absolute inset-0 z-0 hex-pattern opacity-30" />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍯</span>
          <span className="font-display text-xl font-bold text-white tracking-wide">
            Harish Pure Honey
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
          <a
            href="#about"
            data-ocid="nav.link"
            className="hover:text-honey-light transition-colors"
          >
            About
          </a>
          <a
            href="#benefits"
            data-ocid="nav.link"
            className="hover:text-honey-light transition-colors"
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            data-ocid="nav.link"
            className="hover:text-honey-light transition-colors"
          >
            Reviews
          </a>
          <a
            href="#contact"
            data-ocid="nav.link"
            className="hover:text-honey-light transition-colors"
          >
            Contact
          </a>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.primary_button"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          <MessageCircle className="w-4 h-4" />
          Order Now
        </a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          style={{
            background: "oklch(0.72 0.16 60 / 0.2)",
            border: "1px solid oklch(0.72 0.16 60 / 0.5)",
            color: "oklch(0.88 0.13 85)",
          }}
        >
          <Leaf className="w-4 h-4" />
          100% Natural & Organic
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          100% Pure & Natural Honey{" "}
          <span className="honey-shimmer block mt-1">Straight From Nature</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Raw, chemical-free honey collected with care for your health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: "#25D366" }}
          >
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </a>
          <a
            href={CALL_URL}
            data-ocid="hero.secondary_button"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg border-2 border-white/60 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {["✅ 100% Pure", "🚫 Chemical Free", "🌿 Natural & Organic"].map(
            (badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
                style={{
                  background: "oklch(1 0 0 / 0.12)",
                  border: "1px solid oklch(1 0 0 / 0.25)",
                  color: "white",
                }}
              >
                {badge}
              </span>
            ),
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

// ── About Section ──
function AboutSection() {
  const points = [
    {
      icon: <TreePine className="w-5 h-5" />,
      title: "Natural Beekeeping",
      desc: "Our bees roam freely in natural forests and wildflower meadows, collecting the finest nectar.",
    },
    {
      icon: <FlaskConical className="w-5 h-5" />,
      title: "No Chemicals Used",
      desc: "Zero pesticides, zero preservatives. Pure honey as nature intended.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "No Sugar Mixing",
      desc: "We never dilute or adulterate our honey. What you get is 100% what the bees made.",
    },
    {
      icon: <Sprout className="w-5 h-5" />,
      title: "Traditional Collection",
      desc: "Harvested using time-honored traditional methods that preserve every nutrient.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll relative">
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
              style={{
                background: "oklch(0.72 0.16 60 / 0.12)",
                border: "2px solid oklch(0.72 0.16 60 / 0.2)",
              }}
            />
            <img
              src="/assets/generated/beekeeper.dim_800x600.jpg"
              alt="Natural beekeeping"
              className="relative z-10 rounded-2xl w-full object-cover shadow-xl"
              style={{ maxHeight: "480px" }}
            />
            <div
              className="absolute -bottom-5 -right-5 z-20 rounded-2xl px-6 py-4 shadow-lg"
              style={{ background: "oklch(0.62 0.16 58)", color: "white" }}
            >
              <div className="font-display text-3xl font-bold">15+</div>
              <div className="text-sm font-medium opacity-90">
                Years of Experience
              </div>
            </div>
          </div>

          <div className="animate-on-scroll delay-200">
            <span className="text-sm font-bold uppercase tracking-widest honey-text">
              About Our Honey
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
              Pure Honey, The Way
              <span className="honey-text block">Nature Intended</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Harish Pure Honey, we believe in delivering honey in its most
              natural form. Sourced directly from carefully maintained beehives
              in pristine natural surroundings, every jar carries the authentic
              taste and health benefits that only truly pure honey can offer.
            </p>
            <div className="space-y-4">
              {points.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex items-start gap-4 animate-on-scroll delay-${(i + 1) * 100}`}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "oklch(0.72 0.16 60 / 0.12)" }}
                  >
                    <span className="honey-text">{p.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Benefits Section ──
function BenefitsSection() {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Boosts Immunity",
      desc: "Rich in antioxidants and enzymes that strengthen your immune system naturally.",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Improves Digestion",
      desc: "Natural prebiotics in pure honey promote healthy gut bacteria and smooth digestion.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Natural Energy Booster",
      desc: "Nature's perfect energy source — natural sugars give sustained energy without crashes.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Good for Skin & Health",
      desc: "Antimicrobial properties help heal skin, fight bacteria, and promote overall wellness.",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-20 md:py-28 hex-pattern"
      style={{ background: "oklch(0.18 0.02 50)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.88 0.13 85)" }}
          >
            Health Benefits
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
            Why Pure Honey Heals
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Centuries of Ayurvedic wisdom backed by modern science. Pure honey
            is nature's most complete superfood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`animate-on-scroll delay-${i * 100} rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all duration-300`}
              style={{
                background: "oklch(0.25 0.03 55)",
                border: "1px solid oklch(0.72 0.16 60 / 0.2)",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(0.72 0.16 60 / 0.15)" }}
              >
                <span style={{ color: "oklch(0.88 0.13 85)" }}>{b.icon}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                {b.title}
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.7 0.03 60)" }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ──
function WhyChooseSection() {
  const pillars = [
    {
      icon: "🍯",
      title: "100% Pure Honey",
      desc: "Every batch tested for purity. No dilution, ever.",
    },
    {
      icon: "🚫",
      title: "No Adulteration",
      desc: "No sugar syrup, no chemicals, no shortcuts.",
    },
    {
      icon: "🌸",
      title: "Natural Taste & Aroma",
      desc: "Rich, authentic floral aroma that only pure honey has.",
    },
    {
      icon: "🐝",
      title: "Direct From Beekeepers",
      desc: "Farm to jar — no middlemen, maximum freshness.",
    },
  ];

  return (
    <section id="why" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-sm font-bold uppercase tracking-widest honey-text">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            The Harish Pure Honey Promise
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We stake our reputation on purity. Every jar carries our personal
            guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`animate-on-scroll delay-${i * 100} rounded-2xl p-7 text-center hover:-translate-y-2 transition-all duration-300`}
              style={{
                background: "oklch(0.97 0.012 88)",
                border: "2px solid oklch(0.72 0.16 60 / 0.2)",
              }}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-on-scroll"
          style={{ background: "oklch(0.62 0.16 58)", color: "white" }}
        >
          {[
            { num: "5000+", label: "Happy Customers" },
            { num: "100%", label: "Pure Guarantee" },
            { num: "15+", label: "Years Experience" },
            { num: "0", label: "Chemicals Used" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl font-bold">
                {s.num}
              </div>
              <div className="text-sm mt-1 opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──
function TestimonialsSection() {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      text: "Main pehle market ka honey leti thi, lekin Harish ji ka honey taste kiya toh real difference pata chala. Bilkul pure aur natural hai. Poori family ko pasand hai!",
    },
    {
      name: "Rahul Verma",
      location: "Haryana",
      rating: 5,
      text: "Gym ke baad daily ek spoon leta hoon. Energy level kaafi better ho gayi hai aur taste bhi bahut achha lagta hai. Highly recommend!",
    },
    {
      name: "Anjali Singh",
      location: "Noida",
      rating: 5,
      text: "Skin care ke liye use kar rahi hoon. 2 mahine mein glow clearly visible hai. Aur ghar mein chai ke saath bhi lete hain. Ekdum genuine product!",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.96 0.015 85)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-sm font-bold uppercase tracking-widest honey-text">
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-current honey-text" />
            ))}
            <span className="ml-2 text-muted-foreground text-sm">
              5.0 from 200+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              data-ocid={`testimonials.item.${i + 1}`}
              className={`animate-on-scroll delay-${i * 100} rounded-2xl p-7 bg-white shadow-sm hover:-translate-y-1 transition-all duration-300`}
              style={{ border: "2px solid oklch(0.72 0.16 60 / 0.15)" }}
            >
              <div className="flex gap-0.5 mb-4">
                {["1", "2", "3", "4", "5"].slice(0, r.rating).map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current honey-text" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: "oklch(0.62 0.16 58)" }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">
                    {r.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {r.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Order Section ──
function OrderSection() {
  return (
    <section
      id="order"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "oklch(0.18 0.02 50)" }}
    >
      <div className="absolute inset-0 hex-pattern opacity-20" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <img
              src="/assets/generated/honey-drip.dim_800x600.jpg"
              alt="Pure honey dripping"
              className="rounded-2xl w-full object-cover shadow-2xl"
              style={{ maxHeight: "420px" }}
            />
          </div>
          <div className="animate-on-scroll delay-200 text-center md:text-left">
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.88 0.13 85)" }}
            >
              Order Now
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Order Pure Honey Today
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "oklch(0.7 0.03 60)" }}
            >
              Fresh from our beehives to your doorstep. Every jar is filled with
              love, purity, and the goodness of nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="order.primary_button"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Order
              </a>
              <a
                href={CALL_URL}
                data-ocid="order.secondary_button"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: "oklch(0.72 0.16 60)",
                  color: "oklch(0.88 0.13 85)",
                }}
              >
                <Phone className="w-5 h-5" />
                Call +91 9350247746
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Fast Delivery", "Secure Packaging", "100% Satisfaction"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-sm"
                    style={{ color: "oklch(0.7 0.03 60)" }}
                  >
                    <CheckCircle
                      className="w-4 h-4"
                      style={{ color: "oklch(0.72 0.16 60)" }}
                    />
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section ──
function FAQSection() {
  const faqs = [
    {
      q: "Is your honey 100% pure?",
      a: "Yes, absolutely. Our honey is 100% pure, raw, and unprocessed. It is sourced directly from our natural beehives and never mixed with any additives, syrups, or chemicals. We take pride in delivering honey in its most authentic form.",
    },
    {
      q: "Do you add sugar or any chemicals?",
      a: "Never. We strictly prohibit any kind of adulteration. No sugar, no glucose, no preservatives, no chemicals of any kind. What you receive is exactly what the bees made — pure, natural honey.",
    },
    {
      q: "How is the honey collected?",
      a: "We use traditional, time-tested beekeeping methods. Our bees are kept in natural environments with access to wildflowers and forest vegetation. Honey is harvested carefully without harming the bees or disrupting the hive, ensuring maximum purity and quality.",
    },
    {
      q: "How do I place an order?",
      a: "Simply click the 'Order on WhatsApp' button or call us at +91 9350247746. Tell us the quantity you need and your delivery address, and we'll arrange delivery directly to your doorstep.",
    },
    {
      q: "What are the health benefits of your honey?",
      a: "Pure natural honey boosts immunity, improves digestion, provides sustained natural energy, acts as a natural antibacterial agent, helps with skin health, soothes sore throats, and has been used in Ayurvedic medicine for centuries. Our honey retains all natural enzymes and nutrients.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-sm font-bold uppercase tracking-widest honey-text">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Have more questions? WhatsApp us at +91 9350247746
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="animate-on-scroll space-y-3"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${i}`}
              data-ocid={`faq.item.${i + 1}`}
              className="rounded-xl overflow-hidden"
              style={{
                border: "2px solid oklch(0.72 0.16 60 / 0.2)",
                background: "oklch(0.97 0.012 88)",
              }}
            >
              <AccordionTrigger
                data-ocid={`faq.toggle.${i + 1}`}
                className="px-6 py-4 font-semibold text-left text-foreground hover:no-underline hover:bg-honey/5 transition-colors"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ── Contact Section ──
function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitInquiry(data.name, data.phone, data.message);
    },
    onSuccess: () => {
      toast.success("Message sent! Harish will contact you soon. 🍯");
      setForm({ name: "", phone: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send. Please WhatsApp directly at +91 9350247746");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    mutation.mutate(form);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.96 0.015 85)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-sm font-bold uppercase tracking-widest honey-text">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            Contact Harish
          </h2>
          <p className="text-muted-foreground">
            We'd love to hear from you. Drop a message or reach us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="animate-on-scroll space-y-6">
            <div
              className="rounded-2xl p-8 bg-white shadow-sm"
              style={{ border: "2px solid oklch(0.72 0.16 60 / 0.2)" }}
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Reach Us Directly
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.72 0.16 60 / 0.12)" }}
                  >
                    <Users className="w-5 h-5 honey-text" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Owner
                    </div>
                    <div className="font-bold text-foreground">Harish</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.72 0.16 60 / 0.12)" }}
                  >
                    <Phone className="w-5 h-5 honey-text" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      Phone
                    </div>
                    <a
                      href={CALL_URL}
                      data-ocid="contact.secondary_button"
                      className="font-bold text-foreground hover:honey-text transition-colors"
                    >
                      +91 9350247746
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.3 0.1 155 / 0.12)" }}
                  >
                    <MessageCircle className="w-5 h-5 green-text" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                      WhatsApp
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="contact.primary_button"
                      className="font-bold text-foreground"
                    >
                      WhatsApp Order Available
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="mt-8 pt-6"
                style={{ borderTop: "1px solid oklch(0.72 0.16 60 / 0.2)" }}
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll delay-200">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 bg-white shadow-sm"
              style={{ border: "2px solid oklch(0.72 0.16 60 / 0.2)" }}
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Send a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Your Name *
                  </Label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Enter your name"
                    required
                    className="bg-cream border-border"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact-phone"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="contact-phone"
                    data-ocid="contact.input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="bg-cream border-border"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us what you need..."
                    rows={4}
                    className="bg-cream border-border resize-none"
                  />
                </div>

                {mutation.isPending && (
                  <div
                    data-ocid="contact.loading_state"
                    className="text-sm text-center honey-text font-medium"
                  >
                    Sending your message...
                  </div>
                )}
                {mutation.isSuccess && (
                  <div
                    data-ocid="contact.success_state"
                    className="text-sm text-center text-green-700 font-medium bg-green-50 rounded-lg py-2"
                  >
                    ✅ Message sent! We'll contact you soon.
                  </div>
                )}
                {mutation.isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="text-sm text-center text-red-600 font-medium bg-red-50 rounded-lg py-2"
                  >
                    ❌ Failed to send. Please WhatsApp directly.
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full py-3 font-bold text-white rounded-xl transition-all hover:opacity-90"
                  style={{ background: "oklch(0.62 0.16 58)" }}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10 text-center"
      style={{
        background: "oklch(0.14 0.02 50)",
        color: "oklch(0.55 0.02 60)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">🍯</span>
          <span className="font-display text-white font-bold text-lg">
            Harish Pure Honey
          </span>
        </div>
        <p className="text-sm mb-1">
          100% Pure & Natural Honey – Straight From Nature
        </p>
        <p className="text-sm mb-4">
          <a
            href={CALL_URL}
            className="hover:text-honey-light transition-colors"
          >
            +91 9350247746
          </a>
        </p>
        <div className="section-divider my-5" />
        <p className="text-xs">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-honey-light transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
