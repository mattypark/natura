/**
 * Every visible string on the site lives here. The brand is a placeholder
 * ("Sylva") so the layout can be reused: swap these values and the whole
 * page re-skins without touching a component.
 */

export const brand = {
  name: "Sylva",
  legal: "Sylva Inc.",
  description: "Cue is a ring you press to talk to the AI agents you choose.",
  tagline: "a calmer way to ask your machines for things",
  email: "hello@sylva.example",
  city: "Portland",
  year: 2026,
  studyNotice: "Design study. Sylva and Cue are not real products.",
} as const;

export const products = {
  ring: "Cue",
  pods: "Murmur",
  os: "SylvaOS",
  companion: "sprout",
} as const;

export const waitlist = {
  label: "Join the waitlist",
  floating: "Get in line",
  href: "#waitlist",
} as const;

export const nav = {
  groups: [
    {
      label: "Hardware",
      items: [
        { name: products.ring, blurb: "A ring you press to speak.", href: "#ring", glyph: "ring" },
        { name: products.pods, blurb: "Replies, whispered back.", href: "#answers", glyph: "pods" },
      ],
    },
    {
      label: "Software",
      items: [
        { name: products.os, blurb: "Where your agents get work done.", href: "#os", glyph: "os" },
        { name: products.companion, blurb: "Our own small helper.", href: "#agents", glyph: "sprout" },
      ],
    },
  ],
} as const;

export const intro = {
  loading: `Loading ${brand.name}`,
  slow: "This is taking a little longer than usual.",
  retry: "Try again",
};

export const hero = {
  title: `${products.ring} ring`,
  caption: "Press, speak, let go.",
  scroll: "Scroll",
};

export const ringFeatures = [
  {
    id: "press",
    eyebrow: "The ring",
    title: "Press. Speak. Let go.",
    body: `${products.ring} sits low on your index finger. Your thumb finds the button without looking, and whatever you say next goes to the agent you picked.`,
  },
  {
    id: "listen",
    eyebrow: "Mic and glow",
    title: "Listening only while held.",
    body: "The mic wakes the moment you press and sleeps the moment you lift. A soft glow on the band tells you it is on.",
  },
] as const;

export const filmTeaser = {
  label: "Watch the film",
  title: products.ring,
  dialogTitle: `The ${products.ring} film`,
  dialogBody: "Drop your own film into public/media/film.mp4 and it plays here.",
  close: "Close",
};

export type SensorChapter = {
  id: "cardio" | "recovery" | "activity";
  eyebrow: string;
  title: string;
  features: { name: string; body: string }[];
  card: { title: string; caption: string; stat: string; statLabel: string };
};

export const sensorChapters: SensorChapter[] = [
  {
    id: "cardio",
    eyebrow: "Cardio",
    title: "A closer read on every beat.",
    features: [
      { name: "Pulse & variability", body: "Green LEDs trace each heartbeat and the gaps between them." },
      { name: "Oxygen level", body: "Red and infrared light estimate how saturated your blood is." },
    ],
    card: { title: "Pulse today", caption: "Low to high, hour by hour.", stat: "64", statLabel: "bpm average" },
  },
  {
    id: "recovery",
    eyebrow: "Recovery",
    title: "What your nights are made of.",
    features: [
      { name: "Sleep phases", body: "Motion and heart rhythm sort the night into stages." },
      { name: "Skin warmth", body: "Small temperature drifts hint at stress, illness or a change in routine." },
    ],
    card: { title: "Last night", caption: "11:05 pm to 7:12 am.", stat: "7h 41m", statLabel: "asleep" },
  },
  {
    id: "activity",
    eyebrow: "Activity",
    title: "Small steps, all counted.",
    features: [{ name: "Steps", body: "A motion sensor inside the band tallies your walking through the day." }],
    card: { title: "Steps", caption: "From midnight, hour by hour.", stat: "6,930", statLabel: "steps" },
  },
];

export const manyMinds = {
  lineOne: "Many minds.",
  lineTwo: "One small ring.",
};

export type Agent = {
  id: string;
  name: string;
  role: string;
};

/** Fictional agents. Each id maps to an original glyph in AgentGlyph.tsx. */
export const agents: Agent[] = [
  { id: "fern", name: "Fern", role: "Garden & home" },
  { id: "tally", name: "Tally", role: "Lists & errands" },
  { id: "quill", name: "Quill", role: "Code & servers" },
  { id: "kite", name: "Kite", role: "Weather & outdoors" },
  { id: "atlas", name: "Atlas", role: "Travel" },
  { id: "echo", name: "Echo", role: "Calls & messages" },
  { id: "nova", name: "Nova", role: "Research" },
  { id: "moss", name: "Moss", role: "Money" },
  { id: "pip", name: "Pip", role: "Kids & family" },
  { id: "juno", name: "Juno", role: "Sleep & calm" },
  { id: "orbit", name: "Orbit", role: "Calendar" },
  { id: "sprout", name: products.companion, role: `Made by ${brand.name}` },
];

export const orbitChapters = [
  {
    id: "agents",
    title: ["Pick a voice.", "Any voice."],
    body: "Keep the assistants you already pay for, or start fresh with ours. Route each question to the one that fits, and decide what it is allowed to open.",
  },
  {
    id: "devices",
    title: ["Then let", "them drive."],
    body: "Agents can work your laptop and your phone the way you would, tapping, typing and opening files, inside the limits you set.",
  },
] as const;

export const devices = {
  laptopTitle: products.ring,
  laptopPrompt: "Ask anything",
  laptopButton: "Hold to talk",
  phoneTitle: products.os,
  phoneRows: [
    { agent: "quill", title: "Checkout errors", status: "Fixed" },
    { agent: "atlas", title: "Saturday ferry", status: "Booked" },
    { agent: "sprout", title: "Sleep check-in", status: "Ready" },
    { agent: "moss", title: "Split the dinner bill", status: "Sent" },
    { agent: "orbit", title: "Move the dentist", status: "Done" },
    { agent: "echo", title: "Call back Sam", status: "Queued" },
  ],
};

export const gallery = {
  heading: `${products.ring} on an ordinary day`,
  sub: "Made-up requests to made-up agents.",
  scenes: [
    {
      id: "quill",
      agent: "quill",
      you: "Quill, checkout is throwing errors. Can you look?",
      reply: "Rolled back last night's deploy. Errors are at zero.",
      detail: "A summary of what broke and what changed is waiting in your inbox.",
      palette: ["#3d4a3f", "#c9a77c", "#1e2620"],
    },
    {
      id: "atlas",
      agent: "atlas",
      you: "Atlas, when does my ferry leave Saturday?",
      reply: "8:40 from Pier 3. Your boarding pass is on your phone.",
      detail: "Pulled from the booking email you forwarded last week.",
      palette: ["#6b4a33", "#e1c39b", "#2b1d14"],
    },
    {
      id: "sprout",
      agent: "sprout",
      you: "sprout, did I sleep better than Tuesday?",
      reply: "Yes. Forty minutes more, with fewer wake-ups.",
      detail: "Sleep data only reaches an agent when you allow it.",
      palette: ["#2f3f4c", "#d6b8a4", "#151d24"],
    },
  ],
};

export const osReveal = {
  wordmarkStart: "Sylva",
  wordmarkEnd: "OS",
  body: `The home your agents share. Link ${products.ring}, your apps and your devices, decide what each agent may touch, and watch every job from one screen.`,
};

export const smallRing = {
  eyebrow: "The system",
  title: ["Light on the finger.", "Long in reach."],
  body: `${products.ring} catches what you ask. ${products.os} hands it to the right agent, lets it reach the right app, and keeps the answer where you will find it.`,
};

/** Words wrapped in *asterisks* render in the accent colour. */
export const kinetic = `*${products.ring}* hears the *ask.* *${products.os}* finds who *answers* it.`;

export const connections = {
  title: "Skip the app drawer.",
  body: `${products.os} is where your agents settle in, wired to ${products.ring} and to the apps you use. Grant access, watch progress and pick up any thread later, all in one window.`,
};

export const answers = {
  title: "Replies find you, wherever you are.",
  ear: {
    title: "In your ears",
    body: `Listen through ${products.pods}, or any headphones already paired with your phone.`,
    cta: `Meet ${products.pods}`,
    toastAgent: products.companion,
    toastStatus: "Done",
    toastBody: "Friday's dentist moved to 3:30. Calendar updated.",
  },
  lock: {
    title: "On your lock screen",
    body: "A Live Activity tracks the job until it is finished.",
    cta: `See ${products.os}`,
    date: "Saturday, 9 May",
    time: "10:24",
    activityAgent: "atlas",
    activityTitle: "Booking the ferry",
    activityStatus: "2 of 3 steps",
  },
  app: {
    title: "In the app",
    body: `Read the whole answer, check each step and keep talking in ${products.os}.`,
    cta: `Open ${products.os}`,
  },
};

export const faq = {
  title: "Questions, answered.",
  sub: `The basics on ${products.ring}, agents and privacy.`,
  ask: `Ask ${products.companion}`,
  more: "Something else? Write to us.",
  items: [
    {
      q: `What does ${brand.name} make?`,
      a: `Three things that work together: the ${products.ring} ring, ${products.pods} earbuds and ${products.os}. You talk, and an agent you chose does the work.`,
    },
    {
      q: `How does ${products.ring} work?`,
      a: `Hold the button and speak. Let go and ${products.os} routes the request to an agent, which can use the apps you have connected.`,
    },
    {
      q: "Am I locked into one agent?",
      a: "No. Connect several, set a default, or say a name out loud to hand one a specific job.",
    },
    {
      q: "Where do replies show up?",
      a: `In your earbuds, on your lock screen or in the ${products.os} app, whichever is closest.`,
    },
    {
      q: "What happens to my data?",
      a: "Agents see only what you grant. Health readings stay private unless you share them, and you can take access back at any time.",
    },
    {
      q: "When can I get one?",
      a: "We are opening a waitlist first. Join it and we will write the day orders open.",
    },
  ],
};

export const cta = {
  title: "Get on the list before launch.",
  body: `Join and we will show your spot in line, plus the occasional note from ${products.companion}.`,
  placeholder: "you@example.com",
  submit: waitlist.label,
  success: "You are on the list. Watch your inbox.",
  invalid: "That email does not look right.",
};

export const footer = {
  community: {
    title: "Find us",
    links: [
      { label: "Discord", href: "#" },
      { label: "X", href: "#" },
    ],
    note: "Build notes and open chats with the team.",
  },
  columns: [
    { title: "Product", links: [products.ring, products.os, products.pods, products.companion, "Apps"] },
    { title: "Company", links: ["About", "Jobs", "Press kit"] },
    { title: "Support", links: ["Help", "Security", "Accessibility"] },
    { title: "Legal", links: ["Privacy", "Cookies", "Terms", "AI notice"] },
  ],
  madeIn: `made slowly in ${brand.city}`,
};

export const outro = {
  line: `Grown slowly, by ${brand.name}.`,
};
