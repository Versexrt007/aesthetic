// Calendar booking helpers — wired to the connected calendar integration.
// Supports multi-service calendar routing based on user's active CRM calendars.

export const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
export const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

export const LOCATION_ID = "GlvE6t7BUj08nQ1UzZzb";

// Service-specific Calendar IDs configured in your CRM
export const SERVICE_CALENDARS: Record<string, string> = {
  Microneedling: "8xh9JbgohdIH31YEzju5",
  "Dermal Fillers": "GtBpiBbe75B9XvpDlQFl",
  "Botox Injections": "ZEPwnCRQ5NAIheBoUMbA",
  "PRP Therapy": "dhB3w8Sow7A5qls1vmyH",
  "Laser Hair Removal": "l8Zg3qZO55FbfDuavKXN",
};

export const DEFAULT_CALENDAR_ID = "8xh9JbgohdIH31YEzju5";

// Custom field IDs (registered via CRM integration)
export const SERVICE_FIELD_ID = "EIqhBpZczq52jhIaEaHc";
export const PRACTITIONER_FIELD_ID = "HyYvCKHYyJuM2WUW2jH7";

type RegisteredCustomFieldId = string;
type CustomFieldValue = { id: RegisteredCustomFieldId; field_value: string };

export type BookingPayload = {
  locationId: string;
  calendarId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedSlot: string;
  selectedTimezone?: string;
  sessionId?: string;
  customFields?: CustomFieldValue[];
} & Partial<
  Record<
    | "notes"
    | "address1"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "companyName"
    | "website"
    | "gender"
    | "dateOfBirth"
    | "timezone",
    string
  >
>;

export const getBrowserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const clampAvailabilityRange = (startMs: number, endMs: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = Math.max(startMs, today.getTime());
  const maxEndDate = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEndDate);

  return { startDate, endDate };
};

export type FreeSlotsResponse = Record<string, { slots: string[] }>;

export const fetchCalendarFreeSlots = async (
  calendarId: string,
  startMs: number,
  endMs: number,
): Promise<FreeSlotsResponse> => {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });

  const response = await fetch(`${BOOKING_API_URL}/calendars/${calendarId}/free-slots?${params}`);
  if (!response.ok) throw new Error("Failed to fetch calendar availability");
  return response.json() as Promise<FreeSlotsResponse>;
};

export const submitCalendarBooking = async (payload: BookingPayload) => {
  const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      selectedTimezone: payload.selectedTimezone ?? getBrowserTimezone(),
      sessionId: payload.sessionId ?? crypto.randomUUID(),
      customFields: payload.customFields ?? [],
    }),
  });

  if (!response.ok) throw new Error("Booking submission failed");
  return response.json();
};
