import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Stethoscope,
  Heart,
  Baby,
  Smile,
  ShieldCheck,
  Clock,
  CalendarCheck,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import heroDoctor from "@/assets/hero-doctor.jpg";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediCare Clinic — Book Trusted Doctor Appointments Online" },
      {
        name: "description",
        content:
          "MediCare Clinic offers compassionate, expert healthcare with easy online appointment booking. Meet our specialists in general medicine, cardiology, dental care, and pediatrics.",
      },
      { property: "og:title", content: "MediCare Clinic — Book Trusted Doctor Appointments Online" },
      {
        property: "og:description",
        content:
          "MediCare Clinic offers compassionate, expert healthcare with easy online appointment booking. Meet our specialists in general medicine, cardiology, dental care, and pediatrics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Stethoscope,
    title: "General Checkup",
    desc: "Comprehensive health assessments to keep you feeling your best all year round.",
  },
  {
    icon: Smile,
    title: "Dental Care",
    desc: "Gentle, modern dentistry from routine cleanings to advanced restorative work.",
  },
  {
    icon: Heart,
    title: "Cardiology",
    desc: "Expert heart care with advanced diagnostics and personalized treatment plans.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    desc: "Warm, kid-friendly care that supports every stage of your child's growth.",
  },
];

const doctors = [
  {
    name: "Dr. James Carter",
    specialty: "Cardiologist",
    photo: doctor1,
  },
  {
    name: "Dr. Emily Rhodes",
    specialty: "General Physician",
    photo: doctor2,
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    photo: doctor3,
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Experienced Doctors",
    desc: "Board-certified specialists with decades of combined clinical expertise.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Our care team is always a call away — day, night, weekends and holidays.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Online Booking",
    desc: "Reserve your visit in under a minute, right from your phone or laptop.",
  },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Heart className="h-5 w-5" fill="currentColor" />
      </span>
      <span className="text-lg font-bold tracking-tight text-foreground">
        MediCare<span className="text-primary"> Clinic</span>
      </span>
    </Link>
  );
}

function BookButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/book"
      className={
        "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 " +
        className
      }
    >
      Book Appointment
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <BookButton />
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground transition hover:border-primary hover:text-primary md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {/* Mobile menu */}
        <div
          className={
            "grid overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur transition-[grid-template-rows,opacity] duration-300 md:hidden " +
            (menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
          }
        >
          <div className="min-h-0">
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-primary-soft hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <BookButton className="w-full" />
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_10%,var(--primary-soft),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-primary-soft/60 blur-3xl animate-blob"
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Trusted care, since 2005
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-[2rem] font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Your Health,{" "}
                <span className="text-primary">Our Priority</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                At MediCare Clinic we combine compassionate doctors, modern
                facilities, and simple online booking so quality healthcare fits
                easily into your life.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <BookButton className="w-full sm:w-auto" />
                <a
                  href="#services"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
                >
                  Explore services
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 sm:gap-6">
                {[
                  { k: "50+", v: "Specialists" },
                  { k: "25k", v: "Happy patients" },
                  { k: "4.9★", v: "Patient rating" },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="text-xl font-bold text-foreground sm:text-2xl">{s.k}</dt>
                    <dd className="text-xs text-muted-foreground">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={200} className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary-soft/70 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] animate-float">
              <img
                src={heroDoctor}
                alt="Smiling doctor at MediCare Clinic"
                width={1200}
                height={1200}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Next available</p>
                <p className="text-xs text-muted-foreground">Today · 3:30 PM</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Services */}
      <section id="services" className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Care designed around you
            </h2>
            <p className="mt-4 text-muted-foreground">
              A full spectrum of medical services delivered by specialists who
              genuinely listen.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} as="article">
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="bg-secondary/60 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Meet the team
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Featured doctors
                </h2>
              </div>
              <a
                href="#doctors"
                className="text-sm font-semibold text-primary transition hover:underline"
              >
                View all specialists →
              </a>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
            {doctors.map((d, i) => (
              <Reveal key={d.name} delay={i * 120} as="article">
                <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]">
                  <div className="aspect-[4/5] overflow-hidden bg-primary-soft">
                    <img
                      src={d.photo}
                      alt={`${d.name}, ${d.specialty}`}
                      width={800}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">{d.name}</h3>
                    <p className="text-sm text-primary">{d.specialty}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Link
                        to="/book"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 hover:shadow-[var(--shadow-soft)]"
                      >
                        Book Now
                      </Link>
                      <a
                        href="#doctors"
                        className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Profile
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why choose us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Healthcare that just works
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 md:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 120}>
                <div className="group text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <w.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-soft)] sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-blob"
              />
              <div className="relative grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    Ready to feel your best?
                  </h2>
                  <p className="mt-3 max-w-xl text-primary-foreground/80">
                    Book your appointment in under a minute and see a doctor as
                    soon as today.
                  </p>
                </div>
                <Link
                  to="/book"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:brightness-95 hover:shadow-lg md:w-auto md:justify-self-end"
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Compassionate, modern healthcare for you and your family.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> hello@medicare.clinic
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                123 Wellness Ave, Suite 200
                <br />
                San Francisco, CA
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Mon–Fri: 8:00 AM – 8:00 PM</li>
              <li>Saturday: 9:00 AM – 5:00 PM</li>
              <li>Sunday: On-call only</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
            © {new Date().getFullYear()} MediCare Clinic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
