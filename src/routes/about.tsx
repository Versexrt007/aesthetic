import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Award, Users, Leaf } from "lucide-react";
import { PageShell } from "@/components/layout";
import { practitioners, clinic, heroImage } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Maison Lumière, London" },
      {
        name: "description",
        content:
          "Meet the Maison Lumière philosophy and medical team — offering Microneedling, Dermal Fillers, Botox, PRP, and Laser Hair Removal on Harley Street, London.",
      },
      { property: "og:title", content: "About — Maison Lumière, London" },
      {
        property: "og:description",
        content:
          "A medical-led London med spa devoted to subtle enhancement and lasting skin health.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Heart,
    title: "Considered, never overdone",
    text: "We believe in enhancement that whispers rather than shouts — results that look like you, only refreshed.",
  },
  {
    icon: Award,
    title: "Medical-led expertise",
    text: "Every injectable and advanced treatment is delivered by qualified, experienced practitioners.",
  },
  {
    icon: Leaf,
    title: "Skin health first",
    text: "We treat the long-term health of your skin, not just the surface, for radiance that endures.",
  },
  {
    icon: Users,
    title: "Genuinely personal",
    text: "No two plans are alike. Your treatment is shaped entirely around your anatomy and your goals.",
  },
];

function About() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Maison Lumière clinic interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/40" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Our Story</span>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-foreground sm:text-6xl">
            A sanctuary for skin, in the heart of London
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-4xl text-foreground">
              Founded on a quieter kind of beauty
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Maison Lumière was born from a simple belief: that aesthetic medicine, at its best,
              should feel like care — calm, considered and deeply personal. We built our Harley
              Street clinic as a refuge from the noise, where every detail is designed to put you at
              ease.
            </p>
            <p>
              Our approach is medical-led and skin-first. We take time to understand the story your
              skin is telling, then craft a plan that enhances your natural features and supports
              long-term skin health — never chasing trends, never over-treating.
            </p>
            <p>The result is radiance that feels entirely your own.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              What We Stand For
            </span>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Our guiding principles
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-xl text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">
            The Practitioners
          </span>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Meet your specialists
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Choose your practitioner when booking — each brings a distinct specialism and a shared
            commitment to your care.
          </p>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {practitioners.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-wide text-primary">{p.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                <Link
                  to="/booking"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform hover:translate-x-1"
                >
                  Book with {p.name.split(" ")[0]} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-secondary/40 px-8 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-3xl text-foreground">Ready to begin?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Book your consultation at {clinic.name} today.
            </p>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Book an Appointment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
