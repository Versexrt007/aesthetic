import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, CalendarDays, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/layout";
import { heroImage } from "@/lib/site-data";
import { BookingWizard } from "@/components/BookingWizard";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Treatment — Maison Lumière London" },
      {
        name: "description",
        content:
          "Reserve your medical aesthetic treatment at Maison Lumière on Harley Street. Choose from Microneedling, Dermal Fillers, Botox, PRP, or Laser Hair Removal with your preferred specialist.",
      },
      { property: "og:title", content: "Book a Treatment — Maison Lumière London" },
      {
        property: "og:description",
        content:
          "Reserve your medical aesthetic treatment with our Harley Street practitioners. Live automated calendar booking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <PageShell>
      {/* Editorial Minimalist Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-secondary/20 pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Sparkles className="h-3 w-3" /> Online Reservations · Harley Street
            </span>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Select your treatment,{" "}
              <span className="italic text-primary">practitioner & time</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Live automated scheduling connected directly to our clinical calendar. Select between
              our two medical practitioners and your desired treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <BookingWizard />
      </section>

      {/* Trust & Policy strip */}
      <section className="border-t border-border/60 bg-secondary/20 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-3 lg:px-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Medical-Grade Standards</strong>
              <br />
              All procedures administered by qualified practitioners.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Instant Confirmation</strong>
              <br />
              Direct automated calendar integration & email receipt.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Tailored Consultation</strong>
              <br />
              Every appointment includes a comprehensive facial assessment.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
