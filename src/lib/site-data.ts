export type Service = {
  slug: string;
  name: string;
  calendarId: string;
  blurb: string;
  description: string;
  duration: string;
  price: string;
  image: string;
};

// Exactly matches the user's CRM services and calendar IDs from the dashboard screenshot
export const services: Service[] = [
  {
    slug: "microneedling",
    name: "Microneedling",
    calendarId: "8xh9JbgohdIH31YEzju5",
    blurb: "Precision collagen induction for refined texture & firm, radiant skin.",
    description:
      "A clinical collagen-induction therapy using micro-fine medical needles to stimulate your skin's natural repair pathways, softening scarring, evening tone and visibly tightening the dermal matrix.",
    duration: "30 min",
    price: "From £180",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/ed6dd0c8-eaf7-4851-9a84-11826eeb740f.png",
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    calendarId: "GtBpiBbe75B9XvpDlQFl",
    blurb: "Sculpted contours, restored volume & harmonious facial definition.",
    description:
      "Premium hyaluronic-acid dermal fillers meticulously placed to re-architect lost structural volume, define the jawline, restore mid-face fullness and hydrate contours with natural, undetectable finesse.",
    duration: "30 min",
    price: "From £295",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/46d0b81e-5caa-4ee4-bd73-6e5861cf951d.png",
  },
  {
    slug: "botox-injections",
    name: "Botox Injections",
    calendarId: "ZEPwnCRQ5NAIheBoUMbA",
    blurb: "Smooth fine expression lines while keeping natural movement.",
    description:
      "Targeted wrinkle-relaxing treatments designed to soften forehead creases, frown lines and crow's feet, maintaining complete facial expressiveness with an effortlessly rested appearance.",
    duration: "30 min",
    price: "From £220",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/39afc5d9-9599-4091-9d39-6d7aae05f867.png",
  },
  {
    slug: "prp-therapy",
    name: "PRP Therapy",
    calendarId: "dhB3w8Sow7A5qls1vmyH",
    blurb: "Autologous platelet-rich plasma for profound cellular renewal.",
    description:
      "Harnessing your body's concentrated growth factors to trigger deep regenerative repair, stimulate micro-circulation, boost collagen synthesis and rejuvenate delicate under-eye or facial tissue.",
    duration: "30 min",
    price: "From £320",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/29db9fa1-3076-490b-97c6-4d7416c49bc4.png",
  },
  {
    slug: "laser-hair-removal",
    name: "Laser Hair Removal",
    calendarId: "l8Zg3qZO55FbfDuavKXN",
    blurb: "Medical-grade laser technology for permanently smooth, silky skin.",
    description:
      "State-of-the-art dual-wavelength laser technology delivering fast, virtually painless sessions tailored across all skin types for long-lasting hair reduction.",
    duration: "30 min",
    price: "From £90",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/785d1fc1-016d-492a-8be3-1bcae9017fd4.png",
  },
];

export type Practitioner = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

// Two dedicated medical practitioners for staff selection
export const practitioners: Practitioner[] = [
  {
    id: "dr-elena-hart",
    name: "Dr. Elena Hart",
    role: "Medical Director & Aesthetic Doctor",
    bio: "With over a decade of clinical practice on Harley Street, Dr. Hart is renowned for her minimalist enhancement philosophy — natural facial balance that lets your individuality shine through.",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/db883763-f2df-4c8c-b0ce-cff99bbe3ad2.png",
  },
  {
    id: "sophia-reed",
    name: "Sophia Reed",
    role: "Senior Clinical Aesthetician",
    bio: "Specialising in advanced dermal rejuvenation, laser technologies and regenerative therapies, Sophia delivers clinical precision within a restorative, bespoke patient experience.",
    image:
      "https://vibe.filesafe.space/1789037433091055259/assets/292d9eef-ca56-49b9-aa23-3ec1b41f8976.png",
  },
];

export const clinic = {
  name: "Maison Lumière",
  tagline: "Medical Aesthetics & Skin Sanctuary",
  address: "42 Harley Street, Marylebone, London W1G 9PR",
  phone: "+44 20 7946 0123",
  email: "concierge@maisonlumiere.co.uk",
  hours: [
    { day: "Monday – Friday", time: "09:00 – 19:30" },
    { day: "Saturday", time: "10:00 – 18:00" },
    { day: "Sunday", time: "By Appointment Only" },
  ],
};

export const heroImage =
  "https://vibe.filesafe.space/1789037433091055259/assets/f8e19b49-2453-4e07-aeee-a1e19b22dce9.png";
