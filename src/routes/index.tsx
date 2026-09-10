import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, ShieldCheck, Clock, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/layout";
import { services, practitioners, clinic, heroImage } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Lumière — Aesthetic & Skin Clinic, London" },
      {
        name: "description",
        content:
          "Harley Street aesthetic clinic offering Microneedling, Dermal Fillers, Botox Injections, PRP Therapy and Laser Hair Removal with expert practitioners.",
      },
      { property: "og:title", content: "Maison Lumière — Aesthetic & Skin Clinic, London" },
      {
        property: "og:description",
        content:
          "A refined London med spa devoted to subtle enhancement and lasting skin health. Book your treatment online.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Serene minimalist treatment room at Maison Lumière med spa London"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-16 lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur">
              <Leaf className="h-3.5 w-3.5" /> Harley Street · London
            </span>
            <h1 className="mt-7 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Subtle enhancement,
              <span className="block italic text-primary">lasting radiance.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A considered London medical aesthetic clinic where clinical rigor meets a calming,
              minimalist ritual — revealing skin that looks like you, only refreshed.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-sm transition-all hover:opacity-90"
              >
                Book a Treatment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-border bg-background/60 px-8 py-4 text-sm font-medium tracking-wide text-foreground backdrop-blur transition-colors hover:bg-secondary"
              >
                Our Philosophy
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-border/50 pt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Doctor-Led Clinic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Harley Street W1
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Live Automated Booking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-8 lg:grid-cols-4 lg:px-10">
          {[
            { icon: ShieldCheck, label: "Medical-led care", sub: "GMC registered doctors" },
            { icon: Star, label: "5-star client outcomes", sub: "Discreet natural results" },
            { icon: Leaf, label: "Regenerative protocols", sub: "Collagen & skin health" },
            { icon: Clock, label: "Harley Street clinic", sub: "Monday to Saturday" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-6 w-6 text-primary shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium tracking-wide text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services (the 5 active CRM services) */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Our Treatments</span>
            <h2 className="mt-3 max-w-xl font-display text-4xl text-foreground sm:text-5xl">
              Medical treatments, tailored to you
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Our curated portfolio of five high-performance aesthetic and regenerative treatments,
            administered with meticulous clinical precision.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to="/booking"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary/20">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-sm font-semibold text-primary">{service.price}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.blurb}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {service.duration} session
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary transition-transform group-hover:translate-x-1">
                    Book online <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Practitioners section (2 staff members) */}
      <section className="border-t border-border/60 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              Medical Specialists
            </span>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Meet our practitioners
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Select your preferred clinician when booking online. Both specialists work closely to
              provide continuous, considered patient care.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            {practitioners.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{p.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wider text-primary">{p.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  </div>
                  <Link
                    to="/booking"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-transform hover:translate-x-1"
                  >
                    Schedule with {p.name.split(" ")[0]} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist Harley Street CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-24 shadow-xl">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-primary-foreground/10" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary-foreground">
              <Sparkles className="h-3 w-3" /> Reservations Open
            </span>
            <h2 className="mt-4 font-display text-4xl text-primary-foreground sm:text-5xl">
              Begin your skin journey
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80 leading-relaxed">
              Select your treatment, choose between our medical doctor and senior aesthetician, and
              book directly into our Harley Street calendar.
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-all hover:opacity-90"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-6 text-xs text-primary-foreground/70">
              {clinic.address} · {clinic.phone}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
