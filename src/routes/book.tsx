import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Clock,
  Heart,
  Stethoscope,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — MediCare Clinic" },
      {
        name: "description",
        content:
          "Book an appointment with a MediCare Clinic specialist in minutes. Choose your doctor, pick a date and time, and confirm online.",
      },
      { property: "og:title", content: "Book an Appointment — MediCare Clinic" },
      {
        property: "og:description",
        content:
          "Reserve your visit with a MediCare Clinic doctor online in under a minute.",
      },
    ],
  }),
  component: BookPage,
});

const doctors = [
  { id: "ahmed", name: "Dr. Ahmed Khan", specialty: "Cardiologist" },
  { id: "sara", name: "Dr. Sara Malik", specialty: "Dermatologist" },
  { id: "bilal", name: "Dr. Bilal Raza", specialty: "Pediatrician" },
];

const timeSlots = [
  { time: "9:00 AM", booked: false },
  { time: "10:00 AM", booked: true },
  { time: "11:30 AM", booked: false },
  { time: "2:00 PM", booked: false },
  { time: "3:30 PM", booked: true },
  { time: "4:30 PM", booked: false },
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

function BookPage() {
  const [doctorId, setDoctorId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const doctor = doctors.find((d) => d.id === doctorId);
  const canConfirm =
    doctor && date && slot && fullName.trim() && phone.trim() && email.trim();

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!canConfirm) return;
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setConfirmed(false);
    setDoctorId("");
    setDate(undefined);
    setSlot("");
    setFullName("");
    setPhone("");
    setEmail("");
    setReason("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            ← Back to home
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_10%,var(--primary-soft),transparent_60%)]"
        />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Book an appointment
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Schedule your visit in{" "}
            <span className="text-primary">a few clicks</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Choose your doctor, pick a date and time, and share a few details.
            We'll take care of the rest.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {confirmed && doctor && date ? (
          <ConfirmationCard
            doctor={doctor}
            date={date}
            slot={slot}
            name={fullName}
            onReset={handleReset}
          />
        ) : (
          <form
            onSubmit={handleConfirm}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]"
          >
            <div className="space-y-8">
              {/* Doctor */}
              <Section step={1} title="Select doctor">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {doctors.map((d) => {
                    const selected = doctorId === d.id;
                    return (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => setDoctorId(d.id)}
                        className={cn(
                          "flex flex-col items-start gap-3 rounded-2xl border bg-card p-5 text-left shadow-[var(--shadow-card)] transition-all duration-300",
                          selected
                            ? "border-primary ring-2 ring-primary/30 -translate-y-0.5 shadow-[var(--shadow-soft)]"
                            : "border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]",
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl transition-all duration-300",
                            selected
                              ? "bg-primary text-primary-foreground scale-110 rotate-6"
                              : "bg-primary-soft text-primary",
                          )}
                        >
                          <Stethoscope className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{d.name}</p>
                          <p className="text-sm text-primary">{d.specialty}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Date */}
              <Section step={2} title="Select date">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left text-sm font-medium shadow-[var(--shadow-card)] transition hover:border-primary/40 sm:w-80",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setSlot("");
                      }}
                      disabled={(d) =>
                        d < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </Section>

              {/* Time slot */}
              <Section step={3} title="Select time slot">
                {!date ? (
                  <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
                    Pick a date first to see available time slots.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {timeSlots.map((s) => {
                      const selected = slot === s.time;
                      return (
                        <button
                          type="button"
                          key={s.time}
                          disabled={s.booked}
                          onClick={() => setSlot(s.time)}
                          className={cn(
                            "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            s.booked &&
                              "cursor-not-allowed border-border bg-muted text-muted-foreground line-through",
                            !s.booked && selected &&
                              "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)] scale-105",
                            !s.booked && !selected &&
                              "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary",
                          )}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          {s.time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Section>

              {/* Patient details */}
              <Section step={4} title="Patient details">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="fullName">
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="h-11 rounded-xl"
                      required
                    />
                  </Field>
                  <Field label="Phone number" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="h-11 rounded-xl"
                      required
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Email address" htmlFor="email">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 rounded-xl"
                        required
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Reason for visit" htmlFor="reason">
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Briefly describe your symptoms or reason for the visit…"
                        className="min-h-28 rounded-xl"
                      />
                    </Field>
                  </div>
                </div>
              </Section>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Summary
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <SummaryRow
                    icon={<Stethoscope className="h-4 w-4" />}
                    label="Doctor"
                    value={doctor ? `${doctor.name} · ${doctor.specialty}` : "Not selected"}
                    active={!!doctor}
                  />
                  <SummaryRow
                    icon={<CalendarIcon className="h-4 w-4" />}
                    label="Date"
                    value={date ? format(date, "PPP") : "Not selected"}
                    active={!!date}
                  />
                  <SummaryRow
                    icon={<Clock className="h-4 w-4" />}
                    label="Time"
                    value={slot || "Not selected"}
                    active={!!slot}
                  />
                  <SummaryRow
                    icon={<User className="h-4 w-4" />}
                    label="Patient"
                    value={fullName || "Not provided"}
                    active={!!fullName}
                  />
                </dl>
                <button
                  type="submit"
                  disabled={!canConfirm}
                  className={cn(
                    "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300",
                    canConfirm
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg active:translate-y-0"
                      : "cursor-not-allowed bg-muted text-muted-foreground",
                  )}
                >
                  Confirm Appointment
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  You'll receive a confirmation email shortly.
                </p>
              </div>
            </aside>
          </form>
        )}
      </main>
    </div>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" delay={step * 80}>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-soft)] sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
            {step}
          </span>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          active ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd
          className={cn(
            "mt-0.5 truncate text-sm font-medium",
            active ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

function ConfirmationCard({
  doctor,
  date,
  slot,
  name,
  onReset,
}: {
  doctor: { name: string; specialty: string };
  date: Date;
  slot: string;
  name: string;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Appointment confirmed
        </h2>
        <p className="mt-3 text-muted-foreground">
          {name ? `${name}, your` : "Your"} appointment is confirmed with{" "}
          <span className="font-semibold text-foreground">{doctor.name}</span>{" "}
          on{" "}
          <span className="font-semibold text-foreground">
            {format(date, "PPP")}
          </span>{" "}
          at <span className="font-semibold text-foreground">{slot}</span>.
        </p>
        <dl className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 rounded-2xl bg-primary-soft/60 p-5 text-left">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Doctor
            </dt>
            <dd className="mt-1 text-sm font-semibold">{doctor.specialty}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Date
            </dt>
            <dd className="mt-1 text-sm font-semibold">{format(date, "MMM d")}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Time
            </dt>
            <dd className="mt-1 text-sm font-semibold">{slot}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Book another
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
