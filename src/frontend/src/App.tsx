import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coffee,
  ConciergeBell,
  GlassWater,
  Hospital,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Phone,
  Plane,
  Presentation,
  ShoppingBag,
  Star,
  Tv,
  UtensilsCrossed,
  Wifi,
  Wind,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { SpecialOffer } from "./backend.d";
import { useActor } from "./hooks/useActor";

// ─── React Query Client ───────────────────────────────────────────────────────
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HotelWebsite />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

// ─── Booking Modal State (global via prop drilling kept minimal) ──────────────
function HotelWebsite() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const openBooking = (room = "") => {
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian text-foreground">
      <NavBar
        onBookNow={() => openBooking()}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection onBookNow={() => openBooking()} />
      <AboutSection />
      <RoomsSection onBookRoom={openBooking} />
      <FacilitiesSection />
      <LocationSection />
      <ReviewsSection />
      <GallerySection onImageClick={setLightboxImg} />
      <OffersSection onClaimOffer={openBooking} />
      <CtaBannerSection onBookNow={() => openBooking()} />
      <ContactSection />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919818822556"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white rounded-full px-4 py-3 shadow-lg transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-semibold hidden sm:inline">
          Chat with Us
        </span>
      </a>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-obsidian border-t border-gold/30 flex">
        <button
          type="button"
          onClick={() => openBooking()}
          className="flex-1 btn-gold py-4"
          data-ocid="nav.primary_button"
        >
          Book Now
        </button>
        <a
          href="tel:+919818822556"
          className="flex-1 bg-obsidian text-gold font-bold py-4 text-sm uppercase tracking-widest text-center flex items-center justify-center gap-1 border-l border-gold/30"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>

      {/* Booking Modal */}
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultRoom={selectedRoom}
      />

      {/* Lightbox */}
      {lightboxImg && (
        <dialog
          className="lightbox-overlay"
          onClick={() => setLightboxImg(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxImg(null)}
          aria-modal="true"
          aria-label="Image lightbox"
          open
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded"
          />
        </dialog>
      )}
    </div>
  );
}

// ─── NAV BAR ─────────────────────────────────────────────────────────────────
function NavBar({
  onBookNow,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  onBookNow: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Rooms", href: "#rooms" },
    { label: "Facilities", href: "#facilities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Offers", href: "#offers" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      data-ocid="nav.section"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/95 backdrop-blur-md shadow-gold"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl md:text-2xl font-bold text-gold tracking-widest uppercase">
            Zone Connect
          </span>
          <span className="font-body text-[10px] md:text-xs text-foreground/60 tracking-[0.2em] uppercase">
            by The Park | Saket, Delhi
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919818822556"
            className="flex items-center gap-2 text-gold border border-gold/50 hover:border-gold rounded-sm px-3 py-2 text-sm font-body tracking-wider transition-all hover:bg-gold/10"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 98188 22556
          </a>
          <button
            type="button"
            onClick={onBookNow}
            data-ocid="nav.primary_button"
            className="btn-gold px-5 py-2"
          >
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian/98 border-t border-gold/20 px-4 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors border-b border-white/5 font-body"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+919818822556"
            className="flex items-center gap-2 text-gold mt-4 text-sm font-body"
          >
            <Phone className="w-4 h-4" />
            +91 98188 22556
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ onBookNow }: { onBookNow: () => void }) {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <img
        src="/assets/generated/hero-hotel.dim_1600x900.jpg"
        alt="Zone Connect by The Park"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/92" />

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto pt-20">
        {/* Gold line */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-px w-28 bg-gold/70" />
          <span className="text-gold text-[11px] tracking-[0.65em] uppercase font-body">
            Saket · New Delhi
          </span>
          <div className="h-px w-28 bg-gold/70" />
        </div>

        <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-[5.25rem] lg:text-[6.25rem] font-bold text-white leading-[0.88] tracking-tight animate-fade-in-up mb-10">
          Luxury Stay in the
          <br />
          Heart of{" "}
          <em className="not-italic gold-text-gradient">Saket, New Delhi</em>
        </h1>

        <p className="font-body text-white/65 text-base md:text-lg max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-200 tracking-wide font-light">
          Experience comfort, style and unmatched convenience
          <br className="hidden md:block" /> at Zone Connect by The Park
        </p>

        {/* Urgency badge */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up animate-delay-300">
          <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="font-body text-white/90 text-sm tracking-wider uppercase bg-red-900/40 border border-red-500/30 px-4 py-1.5 rounded-full">
            Limited Rooms Available Today
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up animate-delay-400">
          <button
            type="button"
            onClick={onBookNow}
            data-ocid="hero.primary_button"
            className="btn-gold px-12 py-4 min-w-[220px]"
          >
            Book Now
          </button>
          <a
            href="tel:+919818822556"
            data-ocid="hero.secondary_button"
            className="btn-gold-outline px-12 py-4 flex items-center justify-center gap-2 min-w-[220px]"
          >
            <Phone className="w-4 h-4" />
            Call Now: +91 98188 22556
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up animate-delay-500">
          {[
            "4-Star Experience",
            "Free WiFi",
            "Best Rate Guarantee",
            "24/7 Service",
          ].map((b) => (
            <span
              key={b}
              className="font-body text-[10px] text-white/55 border border-white/15 px-5 py-2.5 tracking-[0.2em] uppercase"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-20 md:py-28 section-padding bg-obsidian"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-4">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Premier Address in the Heart of South Delhi
            </h2>
            <div className="h-px w-16 bg-gold mb-6" />
            <p className="font-body text-foreground/70 leading-relaxed mb-6">
              Zone Connect by The Park is ideally positioned at DLF South Court,
              Saket District Centre — one of South Delhi's most coveted
              addresses. Surrounded by premier shopping destinations, top
              hospitals, and thriving business hubs, the hotel offers the
              perfect blend of luxury, convenience, and world-class hospitality.
            </p>
            <p className="font-body text-foreground/70 leading-relaxed mb-8">
              Whether you're here for business or leisure, our meticulously
              designed spaces, attentive service, and prime location ensure an
              extraordinary stay experience that exceeds every expectation.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { label: "Reviews", value: "500+" },
                { label: "Rating", value: "4.5★" },
                { label: "Est.", value: "2010" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-gold">
                    {s.value}
                  </p>
                  <p className="font-body text-xs tracking-widest uppercase text-foreground/50 mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/assets/generated/gallery-lobby.dim_800x600.jpg"
              alt="Hotel Lobby"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold/30" />
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-gold/30" />
            <div className="absolute bottom-4 right-4 bg-gold/10 border border-gold/30 backdrop-blur-sm px-4 py-3">
              <p className="font-display text-gold text-2xl font-bold">4★</p>
              <p className="font-body text-xs text-foreground/70 tracking-wider">
                Luxury Hotel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ROOMS SECTION ────────────────────────────────────────────────────────────
const rooms = [
  {
    id: "rooms.item.1",
    name: "Deluxe Room",
    price: "₹4,999",
    image: "/assets/generated/room-deluxe.dim_800x600.jpg",
    badge: null,
    amenities: [
      { icon: BedDouble, label: "King Bed" },
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: ConciergeBell, label: "Room Service" },
      { icon: Building2, label: "City View" },
    ],
    roomKey: "Deluxe Room",
  },
  {
    id: "rooms.item.2",
    name: "Executive Suite",
    price: "₹7,499",
    image: "/assets/generated/room-suite.dim_800x600.jpg",
    badge: "MOST POPULAR",
    amenities: [
      { icon: BedDouble, label: "King Bed" },
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Monitor, label: "Smart TV" },
      { icon: GlassWater, label: "Mini Bar" },
      { icon: Coffee, label: "Lounge" },
    ],
    roomKey: "Executive Suite",
  },
  {
    id: "rooms.item.3",
    name: "Business Room",
    price: "₹5,999",
    image: "/assets/generated/room-business.dim_800x600.jpg",
    badge: null,
    amenities: [
      { icon: BedDouble, label: "Twin Beds" },
      { icon: Monitor, label: "Work Desk" },
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Presentation, label: "Meeting Access" },
    ],
    roomKey: "Business Room",
  },
];

function RoomsSection({ onBookRoom }: { onBookRoom: (room: string) => void }) {
  return (
    <section
      id="rooms"
      data-ocid="rooms.section"
      className="py-20 md:py-28 section-padding bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Accommodations
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Rooms &amp; Suites
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              data-ocid={room.id}
              className="group relative bg-obsidian border border-white/10 hover:border-gold/40 transition-all duration-500 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-gold before:scale-y-0 before:origin-bottom hover:before:scale-y-100 before:transition-transform before:duration-500"
            >
              {room.badge && (
                <div className="absolute top-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold" />
              )}
              {room.badge && (
                <div className="absolute top-3 right-3 z-10 bg-obsidian/80 border border-gold/60 text-gold text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 backdrop-blur-sm">
                  {room.badge}
                </div>
              )}
              <div className="relative overflow-hidden h-64">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display text-xl font-bold text-foreground leading-snug">
                      {room.name}
                    </h3>
                    <div className="text-right ml-3 shrink-0">
                      <p className="font-display text-2xl font-bold text-gold leading-none">
                        {room.price}
                      </p>
                      <p className="font-body text-[10px] text-foreground/40 tracking-widest uppercase mt-0.5">
                        per night
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent mt-3" />
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.amenities.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1 bg-white/5 border border-white/8 px-2.5 py-1"
                    >
                      <Icon className="w-3 h-3 text-gold shrink-0" />
                      <span className="font-body text-[10px] text-foreground/55 tracking-wide">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onBookRoom(room.roomKey)}
                  data-ocid="rooms.primary_button"
                  className="w-full btn-gold py-3"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FACILITIES SECTION ───────────────────────────────────────────────────────
const facilities = [
  { icon: Wifi, name: "Free WiFi", desc: "High-speed internet throughout" },
  {
    icon: UtensilsCrossed,
    name: "Restaurant",
    desc: "Multi-cuisine dining experience",
  },
  { icon: ConciergeBell, name: "Room Service", desc: "24-hour in-room dining" },
  { icon: Car, name: "Parking", desc: "Secure complimentary parking" },
  {
    icon: Presentation,
    name: "Meeting Rooms",
    desc: "State-of-the-art conference facilities",
  },
  { icon: Clock, name: "24Hr Reception", desc: "Round-the-clock concierge" },
  { icon: Wind, name: "Air Conditioning", desc: "Climate-controlled comfort" },
];

function FacilitiesSection() {
  return (
    <section
      id="facilities"
      data-ocid="facilities.section"
      className="py-20 md:py-28 section-padding bg-obsidian"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Amenities
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            World-Class Facilities
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {facilities.map(({ icon: Icon, name, desc }) => (
            <div
              key={name}
              className="group bg-card border border-white/10 hover:border-gold/40 p-6 text-center transition-all duration-300 hover:shadow-gold"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gold/30 group-hover:border-gold bg-gold/5 mx-auto mb-4 transition-all">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-1">
                {name}
              </h3>
              <p className="font-body text-xs text-foreground/50 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION SECTION ─────────────────────────────────────────────────────────
const proximities = [
  { icon: ShoppingBag, place: "Select Citywalk Mall", time: "2 min walk" },
  { icon: ShoppingBag, place: "DLF Avenue Mall", time: "5 min walk" },
  { icon: Hospital, place: "Max Hospital Saket", time: "5 min drive" },
  { icon: Plane, place: "IGI Airport", time: "30 min drive" },
];

function LocationSection() {
  return (
    <section
      id="location"
      data-ocid="location.section"
      className="py-20 md:py-28 section-padding bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Location
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Perfectly Located in Saket
          </h2>
          <p className="font-body text-foreground/60 mt-3">
            Located at DLF South Court, Saket District Centre
          </p>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Proximity cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {proximities.map(({ icon: Icon, place, time }) => (
                <div
                  key={place}
                  className="flex items-center gap-4 bg-obsidian border border-white/10 hover:border-gold/40 p-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">
                      {place}
                    </p>
                    <p className="font-body text-xs text-gold">{time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden">
              <img
                src="/assets/generated/location-saket.dim_800x500.jpg"
                alt="Saket Location"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent flex items-end p-4">
                <div>
                  <p className="font-display text-white font-bold">
                    Saket District Centre
                  </p>
                  <p className="font-body text-xs text-white/70 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> New Delhi 110017
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div
            data-ocid="location.map_marker"
            className="h-80 md:h-full min-h-[320px] overflow-hidden border border-white/10"
          >
            <iframe
              title="Zone Connect by The Park Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8!2d77.2177!3d28.5245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1d5800ee7c9%3A0x7d0ea04a0b7da5e3!2sZone%20Connect%20by%20The%20Park!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS SECTION ──────────────────────────────────────────────────────────
const reviews = [
  {
    text: "Absolutely loved the stay! The location is perfect — walking distance from Select Citywalk. Rooms are immaculate and staff is extremely courteous.",
    name: "Priya S.",
    role: "Business Traveler",
    id: "reviews.item.1",
  },
  {
    text: "Best hotel in Saket for business trips. The meeting facilities are top-notch and the WiFi is super fast. Will definitely return.",
    name: "Rahul M.",
    role: "Corporate Guest",
    id: "reviews.item.2",
  },
  {
    text: "We stayed here for a medical appointment at Max Hospital nearby. The hotel was a lifesaver — comfortable, clean and the staff arranged everything perfectly.",
    name: "Anjali K.",
    role: "Medical Tourist",
    id: "reviews.item.3",
  },
];

function ReviewsSection() {
  return (
    <section
      id="reviews"
      data-ocid="reviews.section"
      className="py-20 md:py-28 section-padding bg-cream"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-dark mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-obsidian">
            What Our Guests Say
          </h2>
          <div className="h-px w-16 bg-gold-dark mx-auto mt-5 mb-3" />
          <p className="font-body text-sm text-obsidian/60 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            4.5/5 on Google · 500+ Reviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {reviews.map((r) => (
            <div
              key={r.id}
              data-ocid={r.id}
              className="bg-white border border-obsidian/10 p-6 relative"
            >
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="font-body text-obsidian/75 leading-relaxed mb-5 italic text-sm">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-gold-dark font-bold text-sm">
                    {r.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-body font-semibold text-obsidian text-sm">
                    {r.name}
                  </p>
                  <p className="font-body text-xs text-obsidian/50">{r.role}</p>
                </div>
              </div>
              <div className="absolute top-6 right-6 text-6xl text-gold/10 font-display leading-none">
                &ldquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
const galleryImages = [
  {
    src: "/assets/generated/room-deluxe.dim_800x600.jpg",
    alt: "Deluxe Room",
    tall: false,
  },
  {
    src: "/assets/generated/room-suite.dim_800x600.jpg",
    alt: "Executive Suite",
    tall: true,
  },
  {
    src: "/assets/generated/gallery-restaurant.dim_800x600.jpg",
    alt: "Restaurant",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-lobby.dim_800x600.jpg",
    alt: "Lobby",
    tall: false,
  },
  {
    src: "/assets/generated/gallery-pool.dim_800x600.jpg",
    alt: "Pool",
    tall: true,
  },
  {
    src: "/assets/generated/location-saket.dim_800x500.jpg",
    alt: "Saket Location",
    tall: false,
  },
];

function GallerySection({
  onImageClick,
}: { onImageClick: (src: string) => void }) {
  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-20 md:py-28 section-padding bg-obsidian"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Gallery
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Experience Zone Connect
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <button
              type="button"
              key={img.src}
              data-ocid={`gallery.item.${i + 1}`}
              onClick={() => onImageClick(img.src)}
              className={`relative group overflow-hidden cursor-pointer ${
                img.tall ? "row-span-2" : ""
              }`}
              style={{ height: img.tall ? "360px" : "180px" }}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="font-body text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OFFERS SECTION ───────────────────────────────────────────────────────────
const fallbackOffers = [
  {
    title: "Weekend Escape",
    description:
      "Stay 2 nights, save 20%. Valid Friday to Sunday. Includes complimentary breakfast for two.",
    discountPercentage: BigInt(20),
    validUntil: BigInt(0),
    active: true,
  },
  {
    title: "Business Advantage",
    description:
      "7-night corporate stay with complimentary breakfast & airport pickup. Perfect for extended business visits.",
    discountPercentage: BigInt(15),
    validUntil: BigInt(0),
    active: true,
  },
  {
    title: "Extended Stay",
    description:
      "Book 5+ nights and enjoy 25% off plus a complimentary room upgrade to the next category.",
    discountPercentage: BigInt(25),
    validUntil: BigInt(0),
    active: true,
  },
];

function OffersSection({ onClaimOffer }: { onClaimOffer: () => void }) {
  const { actor, isFetching } = useActor();
  const { data: backendOffers } = useQuery<SpecialOffer[]>({
    queryKey: ["activeOffers"],
    queryFn: async () => {
      if (!actor) return fallbackOffers;
      const offers = await actor.getActiveOffers();
      return offers.length > 0 ? offers : fallbackOffers;
    },
    enabled: !!actor && !isFetching,
    initialData: fallbackOffers,
  });

  const offers =
    backendOffers && backendOffers.length > 0 ? backendOffers : fallbackOffers;

  return (
    <section
      id="offers"
      data-ocid="offers.section"
      className="py-20 md:py-28 section-padding bg-card"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Limited Time
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Exclusive Offers
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.slice(0, 3).map((offer, i) => (
            <div
              key={offer.title}
              data-ocid={`offers.item.${i + 1}`}
              className="relative bg-obsidian border border-white/10 hover:border-gold/50 p-6 transition-all group"
            >
              <div className="absolute -top-3 left-6">
                <span className="bg-gold text-obsidian text-xs font-bold tracking-widest uppercase px-3 py-1">
                  {Number(offer.discountPercentage)}% OFF
                </span>
              </div>
              <div className="mt-3">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {offer.title}
                </h3>
                <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4">
                  {offer.description}
                </p>
                <p className="font-body text-xs text-red-400 mb-5 flex items-center gap-1.5">
                  <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  Offer ends soon
                </p>
                <button
                  type="button"
                  onClick={() => onClaimOffer()}
                  data-ocid="offers.primary_button"
                  className="w-full btn-gold-outline py-2.5 flex items-center justify-center gap-2"
                >
                  Claim Offer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CtaBannerSection({ onBookNow }: { onBookNow: () => void }) {
  return (
    <section
      data-ocid="cta.section"
      className="relative py-24 md:py-32 section-padding overflow-hidden bg-obsidian"
    >
      {/* Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-gold/10 to-obsidian" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.10 85 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
            Direct Booking
          </span>
          <div className="h-px w-12 bg-gold" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Book Your Stay Today
        </h2>
        <p className="font-body text-foreground/70 text-lg mb-3">
          Get the best rates when you book directly with us. No hidden fees.
        </p>
        <p className="font-body text-red-400 text-sm mb-8 flex items-center justify-center gap-2">
          <span className="pulse-dot w-2 h-2 rounded-full bg-red-400 inline-block" />
          Limited rooms available — Don't miss out!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={onBookNow}
            data-ocid="cta.primary_button"
            className="btn-gold px-10 py-4"
          >
            Book Now
          </button>
          <a
            href="tel:+919818822556"
            data-ocid="cta.secondary_button"
            className="btn-gold-outline px-10 py-4 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call +91 98188 22556
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const now = BigInt(Date.now());
      await actor.submitInquiry(
        form.name,
        form.email,
        form.phone,
        now,
        now,
        "General Inquiry",
        form.message,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent! We'll contact you shortly.");
    },
    onError: () => toast.error("Failed to send. Please call us directly."),
  });

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 md:py-28 section-padding bg-obsidian"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Contact Us
          </h2>
          <div className="h-px w-16 bg-gold mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info + form */}
          <div>
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">
                    Address
                  </p>
                  <p className="font-body text-sm text-foreground/60">
                    A1, DLF South Court, Saket District Centre,
                    <br />
                    New Delhi, Delhi 110017
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">
                    Phone
                  </p>
                  <a
                    href="tel:+919818822556"
                    className="font-body text-sm text-gold hover:underline"
                  >
                    +91 98188 22556
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/919818822556"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-green-400 hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="bg-green-900/20 border border-green-500/30 rounded p-6 text-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <p className="font-body text-green-300 font-semibold">
                  Message sent successfully!
                </p>
                <p className="font-body text-foreground/60 text-sm mt-1">
                  We'll get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate();
                }}
                className="space-y-4"
              >
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    data-ocid="contact.input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    className="bg-card border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="email@example.com"
                      required
                      className="bg-card border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+91 98xxx xxxxx"
                      className="bg-card border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    data-ocid="contact.textarea"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="How can we help you?"
                    rows={4}
                    required
                    className="bg-card border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  data-ocid="contact.submit_button"
                  className="w-full btn-gold py-3"
                >
                  {mutation.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="h-80 md:h-full min-h-[400px] overflow-hidden border border-white/10">
            <iframe
              title="Hotel Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8!2d77.2177!3d28.5245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1d5800ee7c9%3A0x7d0ea04a0b7da5e3!2sZone%20Connect%20by%20The%20Park!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-obsidian border-t border-gold/20 py-12 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo + tagline */}
          <div>
            <h3 className="font-display text-2xl font-bold text-gold tracking-widest uppercase mb-2">
              Zone Connect
            </h3>
            <p className="font-body text-xs tracking-[0.2em] text-foreground/50 uppercase mb-3">
              by The Park | Saket, Delhi
            </p>
            <p className="font-body text-sm text-foreground/50 leading-relaxed">
              A premier luxury & business hotel in the heart of South Delhi's
              most coveted address.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "#about",
                "#rooms",
                "#facilities",
                "#gallery",
                "#offers",
                "#contact",
              ].map((href) => (
                <a
                  key={href}
                  href={href}
                  className="font-body text-sm text-foreground/50 hover:text-gold transition-colors capitalize"
                >
                  {href.replace("#", "")}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Contact
            </h4>
            <p className="font-body text-sm text-foreground/50 mb-2">
              A1, DLF South Court, Saket District Centre
            </p>
            <p className="font-body text-sm text-foreground/50 mb-2">
              New Delhi, Delhi 110017
            </p>
            <a
              href="tel:+919818822556"
              className="font-body text-sm text-gold hover:underline block mb-2"
            >
              +91 98188 22556
            </a>
            <a
              href="https://wa.me/919818822556"
              className="font-body text-sm text-green-400 hover:underline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-foreground/40 text-center">
            © {year} Zone Connect by The Park. All rights reserved.
          </p>
          <p className="font-body text-xs text-foreground/40 text-center">
            Best Rate Guarantee · Free Cancellation · 24/7 Support
          </p>
          <p className="font-body text-xs text-foreground/30 text-center">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
function BookingModal({
  open,
  onClose,
  defaultRoom,
}: {
  open: boolean;
  onClose: () => void;
  defaultRoom: string;
}) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    roomType: defaultRoom || "Deluxe Room",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  // Sync defaultRoom when it changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on open
  useEffect(() => {
    setForm((p) => ({ ...p, roomType: defaultRoom || "Deluxe Room" }));
  }, [defaultRoom, open]);

  // Reset on open
  // biome-ignore lint/correctness/useExhaustiveDependencies: setSuccess is a stable setter
  useEffect(() => {
    if (open) {
      setSuccess(false);
    }
    // eslint-disable-next-line
  }, [open]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const checkIn = BigInt(new Date(form.checkIn).getTime());
      const checkOut = BigInt(new Date(form.checkOut).getTime());
      await actor.submitInquiry(
        form.name,
        form.email,
        form.phone,
        checkIn,
        checkOut,
        form.roomType,
        form.message,
      );
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success("Booking inquiry submitted! We'll confirm within 2 hours.");
    },
    onError: () =>
      toast.error(
        "Submission failed. Please call us directly at +91 98188 22556",
      ),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        data-ocid="booking.modal"
        className="bg-card border-gold/20 max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            Reserve Your Stay
          </DialogTitle>
          <p className="font-body text-sm text-foreground/60">
            Zone Connect by The Park, Saket Delhi
          </p>
        </DialogHeader>

        {success ? (
          <div data-ocid="booking.success_state" className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">
              Booking Inquiry Received!
            </h3>
            <p className="font-body text-foreground/60 text-sm mb-4">
              Our team will contact you within 2 hours to confirm your
              reservation.
            </p>
            <p className="font-body text-gold text-sm">
              Or call us:{" "}
              <a href="tel:+919818822556" className="underline">
                +91 98188 22556
              </a>
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-4 mt-2"
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                  Full Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                  className="bg-obsidian border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@example.com"
                    required
                    className="bg-obsidian border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                  />
                </div>
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Phone *
                  </Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 98xxx xxxxx"
                    required
                    className="bg-obsidian border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Check-in *
                  </Label>
                  <Input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, checkIn: e.target.value }))
                    }
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-obsidian border-white/10 focus:border-gold text-foreground rounded-sm"
                  />
                </div>
                <div>
                  <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                    Check-out *
                  </Label>
                  <Input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, checkOut: e.target.value }))
                    }
                    required
                    min={form.checkIn || new Date().toISOString().split("T")[0]}
                    className="bg-obsidian border-white/10 focus:border-gold text-foreground rounded-sm"
                  />
                </div>
              </div>
              <div>
                <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                  Room Type
                </Label>
                <Select
                  value={form.roomType}
                  onValueChange={(v) => setForm((p) => ({ ...p, roomType: v }))}
                >
                  <SelectTrigger
                    data-ocid="booking.select"
                    className="bg-obsidian border-white/10 focus:border-gold text-foreground rounded-sm"
                  >
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10">
                    <SelectItem value="Deluxe Room">
                      Deluxe Room — ₹4,999/night
                    </SelectItem>
                    <SelectItem value="Executive Suite">
                      Executive Suite — ₹7,499/night
                    </SelectItem>
                    <SelectItem value="Business Room">
                      Business Room — ₹5,999/night
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-xs tracking-wider uppercase text-foreground/60 mb-1.5 block">
                  Special Requests
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Early check-in, dietary preferences, special occasions..."
                  rows={3}
                  className="bg-obsidian border-white/10 focus:border-gold text-foreground placeholder:text-foreground/30 rounded-sm resize-none"
                />
              </div>
            </div>

            {mutation.isPending && (
              <div
                data-ocid="booking.loading_state"
                className="flex items-center gap-2 text-foreground/60 text-sm font-body"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting your inquiry...
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/20 text-foreground/70 hover:text-foreground rounded-sm font-body text-xs tracking-wider uppercase"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                data-ocid="booking.submit_button"
                className="flex-1 bg-gold hover:bg-gold-dark text-obsidian font-bold rounded-sm font-body text-xs tracking-widest uppercase"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
