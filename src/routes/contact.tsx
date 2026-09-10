import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/layout";
import { clinic, heroImage } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  postTrackingEvent,
  TRACKING_ID,
  TRACKING_LOCATION_ID,
  TRACKING_PROJECT_ID,
  ENQUIRY_TYPE_FIELD_ID,
} from "@/lib/tracking";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Lumière, London" },
      {
        name: "description",
        content:
          "Get in touch with Maison Lumière, a London med spa on Harley Street. Send an enquiry and our team will be in touch shortly.",
      },
      { property: "og:title", content: "Contact — Maison Lumière, London" },
      {
        property: "og:description",
        content: "Get in touch with Maison Lumière, a London med spa on Harley Street.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Contact,
});

const enquiryTypes = [
  "General enquiry",
  "Treatment consultation",
  "Pricing & packages",
  "Existing appointment",
];

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "contact-form",
      formData: {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        calendar_notes: form.message,
      },
      formLabels: {
        first_name: "First name",
        last_name: "Last name",
        email: "Email",
        phone: "Phone",
        calendar_notes: "Message",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: TRACKING_ID,
      locationId: TRACKING_LOCATION_ID,
      projectId: TRACKING_PROJECT_ID,
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        source: "ai_studio",
        projectId: TRACKING_PROJECT_ID,
        formName: "Contact Form",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        [ENQUIRY_TYPE_FIELD_ID]: {
          value: form.enquiryType,
          label: "Enquiry Type",
        },
      },
    });

    // Fire-and-forget tracking; show success after a brief moment.
    setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Maison Lumière clinic" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/40" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Get in Touch</span>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-foreground sm:text-6xl">
            We'd love to hear from you
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Whether you're ready to book or simply have a question, our team is here to guide you
            with care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-6 font-display text-3xl text-foreground">Thank you</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Your enquiry has been received. A member of our team will be in touch with you
                    very soon.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        enquiryType: "",
                        message: "",
                      });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        required
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        required
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Bennett"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="jane@example.co.uk"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+44 7…"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Enquiry type</Label>
                    <Select
                      value={form.enquiryType}
                      onValueChange={(v) => update("enquiryType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an enquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {enquiryTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us a little about what you're looking for…"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full rounded-full"
                  >
                    {status === "submitting" ? (
                      "Sending…"
                    ) : (
                      <>
                        Send Enquiry <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-secondary/40 p-8">
              <h2 className="font-display text-2xl text-foreground">Visit the clinic</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                  <span className="text-muted-foreground">{clinic.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                  <a
                    href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {clinic.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {clinic.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/40 p-8">
              <h2 className="flex items-center gap-2 font-display text-2xl text-foreground">
                <Clock className="h-5 w-5 text-primary" strokeWidth={1.5} />
                Opening hours
              </h2>
              <ul className="mt-6 space-y-3 text-sm">
                {clinic.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-foreground">{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
