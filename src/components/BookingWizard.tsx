import { useState, useMemo, useEffect, type FormEvent } from "react";
import {
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { services, practitioners, type Service } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  fetchCalendarFreeSlots,
  submitCalendarBooking,
  SERVICE_CALENDARS,
  DEFAULT_CALENDAR_ID,
  LOCATION_ID,
  SERVICE_FIELD_ID,
  PRACTITIONER_FIELD_ID,
  type FreeSlotsResponse,
} from "@/lib/booking";

const STEPS = ["Treatment", "Practitioner", "Date & Time", "Details"] as const;

const formatDateKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>(practitioners[0].name);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [slots, setSlots] = useState<FreeSlotsResponse>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const activeCalendarId =
    SERVICE_CALENDARS[selectedService.name] || selectedService.calendarId || DEFAULT_CALENDAR_ID;

  useEffect(() => {
    const start = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const end = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0);
    const startMs = start.getTime();
    const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59).getTime();

    setLoadingSlots(true);
    fetchCalendarFreeSlots(activeCalendarId, startMs, endMs)
      .then((data) => setSlots(data))
      .catch(() => setSlots({}))
      .finally(() => setLoadingSlots(false));
  }, [viewMonth, activeCalendarId]);

  const monthDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  }, [viewMonth]);

  const availableDates = useMemo(() => new Set(Object.keys(slots)), [slots]);
  const todayKey = formatDateKey(new Date());
  const slotsForSelected = selectedDate ? (slots[selectedDate]?.slots ?? []) : [];

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      await submitCalendarBooking({
        locationId: LOCATION_ID,
        calendarId: activeCalendarId,
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        phone: details.phone,
        selectedSlot,
        notes: details.notes
          ? `${details.notes} | Preferred staff: ${selectedPractitioner}`
          : `Staff: ${selectedPractitioner}`,
        customFields: [
          { id: SERVICE_FIELD_ID, field_value: selectedService.name },
          { id: PRACTITIONER_FIELD_ID, field_value: selectedPractitioner },
        ],
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setErrorMessage("Could not complete booking. Please verify details and try again.");
    }
  };

  const monthLabel = viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  if (status === "done") {
    return (
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-lg">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
        </span>
        <span className="mt-4 inline-block text-xs uppercase tracking-[0.25em] text-primary">
          Confirmed
        </span>
        <h2 className="mt-2 font-display text-4xl text-foreground">You are booked</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you, <span className="font-medium text-foreground">{details.firstName}</span>. Your{" "}
          <strong className="font-medium text-foreground">{selectedService.name}</strong>{" "}
          appointment with{" "}
          <strong className="font-medium text-foreground">{selectedPractitioner}</strong> has been
          scheduled.
        </p>
        <div className="mt-6 divide-y divide-border/60 rounded-2xl border border-border bg-secondary/30 p-5 text-left text-sm">
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Treatment</span>
            <span className="font-medium text-foreground">{selectedService.name}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Practitioner</span>
            <span className="font-medium text-foreground">{selectedPractitioner}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium text-foreground">
              {new Date(selectedSlot).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium text-foreground">
              {new Date(selectedSlot).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => {
              setStatus("idle");
              setStep(0);
              setSelectedSlot("");
            }}
          >
            Book another
          </Button>
          <Button className="flex-1 rounded-full" onClick={() => window.location.assign("/")}>
            Back home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
      <div className="mb-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition-all",
                  i === step
                    ? "border-2 border-primary bg-primary text-primary-foreground"
                    : i < step
                      ? "border border-primary bg-primary/10 text-primary"
                      : "border border-border bg-card text-muted-foreground/60 cursor-not-allowed",
                )}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </button>
              <span
                className={cn(
                  "hidden text-[11px] tracking-wider uppercase sm:block",
                  i === step ? "font-semibold text-foreground" : "text-muted-foreground/60",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-3 h-[1px] flex-1", i < step ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="font-display text-3xl text-foreground">Choose your treatment</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((s) => {
              const isSelected = selectedService.slug === s.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setSelectedService(s)}
                  className={cn(
                    "flex gap-4 rounded-2xl border p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40",
                  )}
                >
                  <img src={s.image} alt={s.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-lg text-foreground">{s.name}</h3>
                        <span className="text-xs font-semibold text-primary">{s.price}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.blurb}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3 text-primary" /> {s.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={next} size="lg" className="rounded-full px-8">
              Select Practitioner <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-display text-3xl text-foreground">Select your practitioner</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Treatment: <strong className="text-foreground">{selectedService.name}</strong>
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {practitioners.map((p) => {
              const isSelected = selectedPractitioner === p.name;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPractitioner(p.name)}
                  className={cn(
                    "relative flex flex-col items-center rounded-2xl border p-8 text-center transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40",
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                      <UserCheck className="h-3 w-3" /> Selected
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-28 w-28 rounded-full border-2 border-border object-cover"
                  />
                  <h3 className="mt-4 font-display text-xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-primary">{p.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.bio}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={back} className="rounded-full">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <Button onClick={next} size="lg" className="rounded-full px-8">
              Choose Date & Time <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-3xl text-foreground">Select a date & time</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            {selectedService.name} with {selectedPractitioner}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between rounded-xl bg-secondary/30 px-4 py-3">
                <button
                  type="button"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-display text-lg text-foreground">{monthLabel}</span>
                <button
                  type="button"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <span key={d} className="py-2">
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1">
                {monthDays.map((d, i) => {
                  if (!d) return <span key={i} className="aspect-square" />;
                  const key = formatDateKey(d);
                  const isPast = key < todayKey;
                  const hasSlots = availableDates.has(key) && !isPast;
                  const isSelected = selectedDate === key;

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!hasSlots}
                      onClick={() => {
                        setSelectedDate(key);
                        setSelectedSlot("");
                      }}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-xl text-xs transition-all",
                        isSelected
                          ? "bg-primary font-semibold text-primary-foreground"
                          : hasSlots
                            ? "bg-secondary/40 font-medium text-foreground hover:bg-primary/20"
                            : "cursor-not-allowed text-muted-foreground/30",
                      )}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>

              {loadingSlots && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-primary">
                  <Loader2 className="h-3 w-3 animate-spin" /> Checking availability…
                </p>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
                  <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  Available Times
                </h3>

                {!selectedDate ? (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Select a highlighted date to see available hours.
                  </p>
                ) : slotsForSelected.length === 0 ? (
                  <p className="mt-4 text-xs text-muted-foreground">
                    {loadingSlots ? "Loading…" : "No available times on this date."}
                  </p>
                ) : (
                  <div className="mt-4 max-h-64 overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-2">
                      {slotsForSelected.map((slot) => {
                        const timeStr = new Date(slot).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        const isSlotActive = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "rounded-xl border py-2.5 px-3 text-xs font-medium transition-all",
                              isSlotActive
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-foreground hover:border-primary/40",
                            )}
                          >
                            {timeStr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={back} className="rounded-full">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <Button onClick={next} size="lg" className="rounded-full px-8" disabled={!selectedSlot}>
              Continue to Details <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h2 className="font-display text-3xl text-foreground">Your details</h2>
          <div className="mt-4 divide-y divide-border/60 rounded-2xl border border-border bg-secondary/30 p-5 text-sm">
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Treatment</span>
              <span className="font-medium text-foreground">{selectedService.name}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Specialist</span>
              <span className="font-medium text-foreground">{selectedPractitioner}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">When</span>
              <span className="font-medium text-foreground">
                {selectedSlot &&
                  `${new Date(selectedSlot).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                  })} at ${new Date(selectedSlot).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="b-fn">First name *</Label>
              <Input
                id="b-fn"
                required
                value={details.firstName}
                onChange={(e) => setDetails((d) => ({ ...d, firstName: e.target.value }))}
                placeholder="Olivia"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="b-ln">Last name *</Label>
              <Input
                id="b-ln"
                required
                value={details.lastName}
                onChange={(e) => setDetails((d) => ({ ...d, lastName: e.target.value }))}
                placeholder="Sinclair"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="b-em">Email *</Label>
              <Input
                id="b-em"
                type="email"
                required
                value={details.email}
                onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                placeholder="olivia@example.co.uk"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="b-ph">Phone *</Label>
              <Input
                id="b-ph"
                type="tel"
                required
                value={details.phone}
                onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                placeholder="+44 7123 456789"
              />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <Label htmlFor="b-nt">Notes (optional)</Label>
            <Input
              id="b-nt"
              value={details.notes}
              onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
              placeholder="Any specific requests or sensitivities..."
            />
          </div>

          {errorMessage && <p className="mt-4 text-xs text-destructive">{errorMessage}</p>}

          <div className="mt-8 flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={back} className="rounded-full">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="rounded-full px-10"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reserving…
                </>
              ) : (
                <>
                  Confirm Booking <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Connected to clinic calendar automation</span>
          </div>
        </form>
      )}
    </div>
  );
}
