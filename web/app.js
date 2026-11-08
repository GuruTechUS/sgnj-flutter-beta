/* Sikh Games of NJ — interactive preview.
   Sample weekend lives in this browser. The mobile app reads Cloud Firestore (sgofnj). */

const KEY = "sgnj-preview-v1";
const SPORTS = [
  { id: "soccer", title: "Soccer" },
  { id: "basketball", title: "Basketball" },
  { id: "volleyball", title: "Volleyball" },
  { id: "track", title: "Track" }
];
const CATEGORIES = [
  { id: "u10", desc: "Under 10" },
  { id: "u14", desc: "Under 14" },
  { id: "u18", desc: "Under 18" },
  { id: "a18", desc: "18 & Above" }
];
const SPORT_TITLE = Object.fromEntries(SPORTS.map((s) => [s.id, s.title]));
const CAT_DESC = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.desc]));

const ICONS = {
  home: '<path d="M12 3.2 3.2 11H6v9h4.2v-5.2h3.6V20H18v-9h2.8L12 3.2z"/>',
  gallery: '<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm3.2 10.2 2.4-3 1.9 2.3 3.2-4.2 3.6 4.9H7.2z"/>',
  link: '<path d="M10.7 13.3a4 4 0 0 1 0-5.6l1.2-1.2a4 4 0 0 1 5.6 5.6l-.8.8-1.4-1.4.8-.8a2 2 0 0 0-2.8-2.8l-1.2 1.2a2 2 0 0 0 0 2.8l.3.3-1.4 1.4-.3-.3zm2.6-2.6a4 4 0 0 1 0 5.6l-1.2 1.2a4 4 0 1 1-5.6-5.6l.8-.8 1.4 1.4-.8.8a2 2 0 0 0 2.8 2.8l1.2-1.2a2 2 0 0 0 0-2.8l-.3-.3 1.4-1.4.3.3z"/>',
  bell: '<path d="M12 22a2.2 2.2 0 0 0 2.2-1.8h-4.4A2.2 2.2 0 0 0 12 22zm6.2-5.2V11a6.2 6.2 0 0 0-4.6-6V4.2a1.6 1.6 0 1 0-3.2 0V5A6.2 6.2 0 0 0 5.8 11v5.8L4 18.6v1h16v-1l-1.8-1.8z"/>',
  bellSolid: '<path d="M12 22a2.3 2.3 0 0 0 2.3-2h-4.6A2.3 2.3 0 0 0 12 22zm7-6V11a7 7 0 0 0-5-6.7V3.5a2 2 0 1 0-4 0v.8A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2z"/>',
  phone: '<path d="M6.7 3.6h2.6l1.2 3-1.7 1a12.2 12.2 0 0 0 5.6 5.6l1-1.7 3 1.2v2.6A1.8 1.8 0 0 1 16.6 17 13.6 13.6 0 0 1 7 7.4a1.8 1.8 0 0 1-.3-3.8z"/>',
  info: '<path d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1.1 15h-2.2v-6h2.2v6zm0-8h-2.2V7h2.2v2z"/>',
  back: '<path d="M15.5 5.5 9 12l6.5 6.5-1.4 1.4L6.2 12l7.9-7.9 1.4 1.4z"/>',
  add: '<path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z"/>',
  edit: '<path d="M3 17.2V21h3.8l11-11-3.8-3.8-11 11zM20.7 7.1a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.8-1.8z"/>',
  send: '<path d="M3.2 11.2 20.5 4 13.4 21l-2.4-7.2-7.8-2.6z"/>',
  pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>',
  file: '<path d="M6 2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5L13 3.5z"/>',
  person: '<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z"/>',
  chevron: '<path d="M9 6l6 6-6 6-1.4-1.4L12.2 12 7.6 7.4 9 6z"/>'
};

const MOTIFS = {
  soccer: '<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="22" fill="none" stroke="white" stroke-width="3"/><path fill="white" d="M40 22l7 8h-14zm-14 12 6 2 2 8-8 2zm22 0 8 4-4 8-8-2 2-8zM32 52l8 6 8-6-2-6h-12z"/></svg>',
  basketball: '<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="22" fill="none" stroke="white" stroke-width="3"/><path fill="none" stroke="white" stroke-width="3" d="M40 18v44M18 40h44M24 26c8 6 16 8 16 14s-8 8-16 14M56 26c-8 6-16 8-16 14s8 8 16 14"/></svg>',
  volleyball: '<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="22" fill="none" stroke="white" stroke-width="3"/><path fill="none" stroke="white" stroke-width="3" d="M40 18c8 8 10 16 10 22s-2 14-10 22M28 24c10 4 16 10 18 18M52 24c-8 6-12 14-12 22"/></svg>',
  track: '<svg viewBox="0 0 80 80" aria-hidden="true"><path fill="none" stroke="white" stroke-width="3" d="M18 50c0-14 10-26 22-26s22 12 22 26"/><path fill="none" stroke="white" stroke-width="3" d="M26 50c0-9 6-16 14-16s14 7 14 16M18 50h44M30 58h20"/></svg>',
  langar: '<svg viewBox="0 0 80 80" aria-hidden="true"><path fill="white" d="M22 36h36c-2 14-10 22-18 22S24 50 22 36z"/><path fill="none" stroke="white" stroke-width="3" d="M28 36c0-8 4-14 12-14s12 6 12 14M34 22v-6h12"/></svg>'
};

const TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "gallery", label: "Gallery", icon: "gallery" },
  { id: "links", label: "Links", icon: "link" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "contacts", label: "Contacts", icon: "phone" },
  { id: "info", label: "Info", icon: "info" }
];

let db;
const ui = {
  route: { name: "home" },
  search: { gender: "all", sport: "all", category: "all", text: "" },
  keepScroll: false
};

function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else node.setAttribute(key, String(value));
  });
  [].concat(children).forEach((child) => {
    if (child == null || child === false) return;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  });
  return node;
}

function icon(name) {
  const wrap = h("span", { class: "glyph-svg", "aria-hidden": "true" });
  wrap.innerHTML = `<svg viewBox="0 0 24 24">${ICONS[name] || ""}</svg>`;
  return wrap;
}

function motifNode(name) {
  const wrap = h("div", { class: "motif" });
  if (name === "khanda") {
    wrap.append(h("img", { class: "tile-logo", src: "assets/logo.png", alt: "" }));
    return wrap;
  }
  wrap.innerHTML = Object.prototype.hasOwnProperty.call(MOTIFS, name) ? MOTIFS[name] : MOTIFS.soccer;
  return wrap;
}

function genderLabel(gender) {
  return gender === "boys" ? "Boys" : "Girls";
}

function knownDivision(gender, sport, category) {
  return (gender === "boys" || gender === "girls") && SPORT_TITLE[sport] && CAT_DESC[category];
}

function matchup(event) {
  if (!event.isTeamSport || !Array.isArray(event.teams)) return event.round || SPORT_TITLE[event.sport] || "Game";
  const a = (event.teams[0] && event.teams[0].name) || "—";
  const b = (event.teams[1] && event.teams[1].name) || "—";
  return `${a} vs ${b}`;
}

function divisionLine(event) {
  return `${genderLabel(event.gender)} · ${SPORT_TITLE[event.sport] || event.sport} · ${CAT_DESC[event.category] || event.category}`;
}

function statusClass(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("live")) return "live";
  if (value.includes("final")) return "final";
  if (value.includes("delay")) return "delayed";
  if (value.includes("time")) return "ontime";
  return "scheduled";
}

function formatTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function timeAgo(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const delta = Date.now() - date.getTime();
  const future = delta < 0;
  const seconds = Math.abs(delta) / 1000;
  let phrase = "just now";
  if (seconds >= 45 && seconds < 3600) {
    const minutes = Math.round(seconds / 60);
    phrase = `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  } else if (seconds >= 3600 && seconds < 86400) {
    const hours = Math.round(seconds / 3600);
    phrase = `${hours} ${hours === 1 ? "hour" : "hours"}`;
  } else if (seconds >= 86400) {
    const days = Math.round(seconds / 86400);
    phrase = `${days} ${days === 1 ? "day" : "days"}`;
  }
  if (phrase === "just now") return phrase;
  return future ? `in ${phrase}` : `${phrase} ago`;
}

function minutesAgo(mins) {
  return new Date(Date.now() - mins * 60000).toISOString();
}

function minutesFromNow(mins) {
  return new Date(Date.now() + mins * 60000).toISOString();
}

function isSafeImage(url) {
  return typeof url === "string" && /^data:image\/(png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(url);
}

function telHref(tel) {
  return typeof tel === "string" && /^\+\d{10,15}$/.test(tel) ? `tel:${tel}` : "";
}

function mailHref(email) {
  return typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? `mailto:${email}` : "";
}

function team(name, score) {
  return { name, score };
}

function game(partial) {
  return Object.assign({
    isTeamSport: true,
    teams: [],
    updates: [],
    status: "Scheduled",
    round: "Group",
    location: ""
  }, partial);
}

function seed() {
  const events = [
    game({
      id: "bs-u10-final",
      gender: "boys", sport: "soccer", category: "u10",
      teams: [team("Guru Nanak Youth", 3), team("Dashmesh United", 2)],
      location: "Bridgewater Turf 1", round: "Group A", status: "Final",
      startTime: minutesAgo(60 * 22),
      updates: [{ id: "u1", content: "Full time. Guru Nanak Youth take the group.", timestamp: minutesAgo(60 * 20) }]
    }),
    game({
      id: "bs-u14-qf",
      gender: "boys", sport: "soccer", category: "u14",
      teams: [team("Central Jersey Khalsa", 0), team("South Jersey Sikhs", 0)],
      location: "Carteret Field", round: "Quarterfinal", status: "Scheduled",
      startTime: minutesFromNow(150)
    }),
    game({
      id: "bs-u18-semi",
      gender: "boys", sport: "soccer", category: "u18",
      teams: [team("Akaal FC", 2), team("Garden State Lions", 1)],
      location: "Bridgewater Turf 2", round: "Semifinal", status: "Live",
      startTime: minutesAgo(42),
      updates: [
        { id: "u2", content: "Akaal FC lead 2–1 at the half. Turf 2.", timestamp: minutesAgo(8) },
        { id: "u3", content: "Garden State Lions equalize, then Akaal FC answer.", timestamp: minutesAgo(20) },
        { id: "u4", content: "Kickoff. Both sides are on the field.", timestamp: minutesAgo(40) }
      ]
    }),
    game({
      id: "bs-u18-final",
      gender: "boys", sport: "soccer", category: "u18",
      teams: [team("North Jersey Warriors", 0), team("Princeton Sevadars", 0)],
      location: "Bridgewater Turf 2", round: "Final", status: "Scheduled",
      startTime: minutesFromNow(60 * 22)
    }),
    game({
      id: "bs-a18",
      gender: "boys", sport: "soccer", category: "a18",
      teams: [team("Khalsa United", 0), team("Jersey City Akal", 0)],
      location: "Carteret Field", round: "Final", status: "On Time",
      startTime: minutesFromNow(240)
    }),
    game({
      id: "bb-u14",
      gender: "boys", sport: "basketball", category: "u14",
      teams: [team("Glen Rock Giants", 48), team("Carteret Kings", 41)],
      location: "Glen Rock Gym, Court 1", round: "Quarterfinal", status: "Final",
      startTime: minutesAgo(60 * 26)
    }),
    game({
      id: "bb-u18",
      gender: "boys", sport: "basketball", category: "u18",
      teams: [team("Edison Royals", 0), team("Sangat Select", 0)],
      location: "Glen Rock Gym, Court 2", round: "Semifinal", status: "On Time",
      startTime: minutesFromNow(70)
    }),
    game({
      id: "bv-u18",
      gender: "boys", sport: "volleyball", category: "u18",
      teams: [team("Sohila VC", 0), team("Nishan Volleyball", 0)],
      location: "Glen Rock Gym, Court 3", round: "Group B", status: "Scheduled",
      startTime: minutesFromNow(60 * 20)
    }),
    game({
      id: "bt-u18",
      gender: "boys", sport: "track", category: "u18",
      isTeamSport: false, teams: null,
      location: "South Brunswick Track", round: "Heat 2 · 100m", status: "On Time",
      startTime: minutesFromNow(35)
    }),
    game({
      id: "bt-a18",
      gender: "boys", sport: "track", category: "a18",
      isTeamSport: false, teams: null,
      location: "South Brunswick Track", round: "Final · 200m", status: "Final",
      startTime: minutesAgo(60 * 18),
      updates: [{ id: "u5", content: "Winning time 24.8. Results are posted at the east gate.", timestamp: minutesAgo(60 * 17) }]
    }),
    game({
      id: "gs-u14",
      gender: "girls", sport: "soccer", category: "u14",
      teams: [team("Kaur United", 1), team("Sangat FC", 0)],
      location: "Bridgewater Turf 1", round: "Semifinal", status: "Final",
      startTime: minutesAgo(180),
      updates: [{ id: "u6", content: "Kaur United through to the final, 1–0.", timestamp: minutesAgo(150) }]
    }),
    game({
      id: "gs-u18",
      gender: "girls", sport: "soccer", category: "u18",
      teams: [team("Bridgewater Kaurs", 0), team("Edison Royals", 0)],
      location: "Carteret Field", round: "Semifinal", status: "Delayed",
      startTime: minutesFromNow(95),
      updates: [{ id: "u7", content: "Kickoff moved 15 minutes. Stay by the main tent.", timestamp: minutesAgo(25) }]
    }),
    game({
      id: "gs-a18",
      gender: "girls", sport: "soccer", category: "a18",
      teams: [team("Central Jersey KC", 0), team("South Jersey Kaurs", 0)],
      location: "Bridgewater Turf 1", round: "Final", status: "Scheduled",
      startTime: minutesFromNow(60 * 23)
    }),
    game({
      id: "gb-u14",
      gender: "girls", sport: "basketball", category: "u14",
      teams: [team("Princeton Sevadars", 0), team("Guru Nanak Youth", 0)],
      location: "Glen Rock Gym, Court 1", round: "Group A", status: "Scheduled",
      startTime: minutesFromNow(200)
    }),
    game({
      id: "gb-u18",
      gender: "girls", sport: "basketball", category: "u18",
      teams: [team("Akaal Girls", 36), team("Garden State Lions", 34)],
      location: "Glen Rock Gym, Court 2", round: "Semifinal", status: "Final",
      startTime: minutesAgo(60 * 21)
    }),
    game({
      id: "gb-a18",
      gender: "girls", sport: "basketball", category: "a18",
      teams: [team("Khalsa United", 0), team("Jersey City Akal", 0)],
      location: "Glen Rock Gym, Court 1", round: "Final", status: "Scheduled",
      startTime: minutesFromNow(60 * 24)
    }),
    game({
      id: "gv-u14",
      gender: "girls", sport: "volleyball", category: "u14",
      teams: [team("Nishan Volleyball", 0), team("Sohila VC", 0)],
      location: "Glen Rock Gym, Court 3", round: "Group A", status: "Scheduled",
      startTime: minutesFromNow(60 * 21)
    }),
    game({
      id: "gv-u18",
      gender: "girls", sport: "volleyball", category: "u18",
      teams: [team("Bridgewater Kaurs", 0), team("Carteret Kings", 0)],
      location: "Glen Rock Gym, Court 3", round: "Quarterfinal", status: "On Time",
      startTime: minutesFromNow(110)
    }),
    game({
      id: "gt-u14",
      gender: "girls", sport: "track", category: "u14",
      teams: [team("Dashmesh Relay", 0), team("Sangat Relay", 0)],
      location: "South Brunswick Track", round: "4x100 relay", status: "Scheduled",
      startTime: minutesFromNow(60 * 25)
    })
  ];

  return {
    version: 1,
    admin: false,
    subscriptions: {},
    feedback: [],
    about: {
      appName: "Sikh Games of NJ",
      tagline: "A weekend of sport for the sangat. Play fair, cheer loud, and stay for langar.",
      org: "GuruTech",
      phone: "+1 732-555-0148",
      tel: "+17325550148",
      email: "hello@sikhgamesofnj.example",
      feedbackTitle: "Give us your feedback"
    },
    events,
    notifications: [
      {
        id: "n1",
        eventId: "bs-u18-semi",
        event: "Boys / Soccer / u18",
        title: "Akaal FC vs Garden State Lions",
        body: "Akaal FC lead 2–1 at the half. Turf 2.",
        timestamp: minutesAgo(8)
      },
      {
        id: "n2",
        eventId: "gs-u18",
        event: "Girls / Soccer / u18",
        title: "Bridgewater Kaurs vs Edison Royals",
        body: "Kickoff moved 15 minutes. Stay by the main tent.",
        timestamp: minutesAgo(25)
      },
      {
        id: "n3",
        eventId: "bt-u18",
        event: "Boys / Track / u18",
        title: "Heat 2 · 100m",
        body: "Warm up by the east gate. Heat 2 is on time.",
        timestamp: minutesAgo(50)
      },
      {
        id: "n4",
        event: "Courts",
        title: "Glen Rock Gym",
        body: "Court 2 doors are open. Basketball check-in is at the table inside.",
        timestamp: minutesAgo(90)
      },
      {
        id: "n5",
        event: "Weekend",
        title: "Gates are open",
        body: "Welcome to Sikh Games weekend. Schedules on the board match this app.",
        timestamp: minutesAgo(60 * 6)
      }
    ],
    links: [
      {
        id: "rules",
        name: "Rules of play",
        sections: [
          { h: "The clock", p: ["Games start on the posted hour. There is a five-minute grace, then the clock runs.", "A tied knockout game goes to extra time, then penalties for soccer and a short overtime for basketball."] },
          { h: "Rosters", p: ["Players stay in the age group they registered. A younger player may be called up with the desk’s okay.", "Shin guards for soccer. Non-marking shoes on the gym floor."] },
          { h: "Officials", p: ["The referee’s call stands. Captains speak for the team.", "Protest a roster, not a whistle. Bring it to the games desk before the next game."] }
        ]
      },
      {
        id: "conduct",
        name: "Code of conduct",
        sections: [
          { h: "On the field", p: ["Respect opponents, officials, and volunteers. Abusive language ends a player’s day.", "Keep the sideline clear so the marshal can see the boundary."] },
          { h: "In the sangat", p: ["Head coverings stay on in the divan hall. Sports fields follow the marshal’s call.", "Langar is part of the weekend. Clear your spot and let elders sit first."] },
          { h: "Photos", p: ["Ask before you photograph a child who is not on your team.", "The gallery only shows pictures the games desk has reviewed."] }
        ]
      },
      {
        id: "venues",
        name: "Venue guide",
        sections: [
          { h: "Bridgewater Turf", p: ["Soccer finals and the live U18 semifinal. Parking is the gurdwara lot, then the school overflow.", "Water is at the main tent. Spikes stay off the turf."] },
          { h: "Carteret Field", p: ["Soccer overflow and the delayed girls semifinal. Enter from the north gate."] },
          { h: "Glen Rock Gym", p: ["Basketball on courts 1 and 2. Volleyball on court 3.", "Only players and one coach past the table."] },
          { h: "South Brunswick Track", p: ["Heats run from the east straight. Spikes are allowed in the marked lanes only."] }
        ]
      },
      {
        id: "weekend",
        name: "Weekend at a glance",
        sections: [
          { h: "What is on", p: ["Girls and boys play soccer, basketball, volleyball, and track.", "Divisions are under 10, under 14, under 18, and 18 & above. An empty division means that bracket is not running."] },
          { h: "How to follow a game", p: ["Open a division from Home, or search by team.", "The bell keeps that game on your alerts list on this device.", "Demo admin, on the Info tab, can add a game, move a score, and post an update."] }
        ]
      }
    ],
    contacts: [
      { name: "Games Desk", number: "+1 732-555-0148", tel: "+17325550148", info: "Gates, weather calls, and general questions all weekend." },
      { name: "Soccer Coordinator", number: "+1 732-555-0172", tel: "+17325550172", info: "Turf assignments at Bridgewater and Carteret." },
      { name: "Court Sports", number: "+1 908-555-0114", tel: "+19085550114", info: "Basketball and volleyball at Glen Rock gym." },
      { name: "Track Marshal", number: "+1 609-555-0166", tel: "+16095550166", info: "Heats, lanes, and the east-gate warm-up." }
    ],
    gallery: [
      { id: "g1", title: "Opening", caption: "Saturday morning with the sangat", tone: "saffron", motif: "khanda" },
      { id: "g2", title: "U18 semifinal", caption: "Akaal FC on the attack", tone: "turf", motif: "soccer" },
      { id: "g3", title: "Gym lights", caption: "Basketball at Glen Rock", tone: "royal", motif: "basketball" },
      { id: "g4", title: "At the net", caption: "Volleyball quarterfinal", tone: "rose", motif: "volleyball" },
      { id: "g5", title: "Heat 2", caption: "100m on the east straight", tone: "night", motif: "track" },
      { id: "g6", title: "Langar line", caption: "Everyone eats", tone: "indigo", motif: "langar" }
    ]
  };
}

function normalize(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.events)) return null;
  data.subscriptions = data.subscriptions && typeof data.subscriptions === "object" ? data.subscriptions : {};
  data.notifications = Array.isArray(data.notifications) ? data.notifications : [];
  data.links = Array.isArray(data.links) ? data.links : [];
  data.contacts = Array.isArray(data.contacts) ? data.contacts : [];
  data.feedback = Array.isArray(data.feedback) ? data.feedback : [];
  data.gallery = (Array.isArray(data.gallery) ? data.gallery : []).filter((item) => {
    if (!item || typeof item.id !== "string") return false;
    if (item.dataUrl && !isSafeImage(item.dataUrl)) return false;
    return true;
  });
  data.admin = !!data.admin;
  data.about = data.about || {};
  data.events.forEach((event) => {
    if (!Array.isArray(event.updates)) event.updates = [];
  });
  return data;
}

function load() {
  try {
    const saved = normalize(JSON.parse(localStorage.getItem(KEY) || "null"));
    if (saved) return saved;
  } catch (err) {
    /* fall through to a fresh sample weekend */
  }
  const fresh = seed();
  try { localStorage.setItem(KEY, JSON.stringify(fresh)); } catch (err) { /* private mode */ }
  return fresh;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
    return true;
  } catch (err) {
    toast("This browser could not store that change. Try a smaller photo.");
    return false;
  }
}

function getEvent(id) {
  return db.events.find((event) => event.id === id);
}

function parseHash() {
  const parts = (location.hash || "#/").replace(/^#/, "").split("/").filter(Boolean);
  if (!parts.length) return { name: "home" };
  const [name, a, b, c] = parts;
  if (name === "search") return { name: "search" };
  if (["gallery", "links", "notifications", "contacts", "info"].includes(name)) return { name };
  if (name === "schedule" && a && b && c) return { name, gender: a, sport: b, category: c };
  if (name === "event" && a) return { name, id: decodeURIComponent(a) };
  if (name === "add" && a && b && c) return { name, gender: a, sport: b, category: c };
  if (name === "edit" && a) return { name, id: decodeURIComponent(a) };
  if (name === "photo" && a) return { name, id: decodeURIComponent(a) };
  if (name === "doc" && a) return { name, id: a };
  return { name: "home" };
}

function go(path, options = {}) {
  const next = path.startsWith("#") ? path : `#${path.startsWith("/") ? path : `/${path}`}`;
  if (location.hash === next || (next === "#/" && (location.hash === "" || location.hash === "#/"))) {
    ui.route = parseHash();
    render();
    return;
  }
  if (options.replace) location.replace(next);
  else location.hash = next;
}

function fallbackFor(route) {
  if (!route) return "/";
  if (route.name === "event") {
    const event = getEvent(route.id);
    if (event) return `/schedule/${event.gender}/${event.sport}/${event.category}`;
  }
  if (route.name === "edit" && route.id) return `/event/${route.id}`;
  if (route.name === "photo") return "/gallery";
  if (route.name === "doc") return "/links";
  if (route.name === "add") return `/schedule/${route.gender}/${route.sport}/${route.category}`;
  return "/";
}

function back() {
  const fallback = fallbackFor(ui.route);
  const before = location.hash;
  history.back();
  window.setTimeout(() => {
    if (location.hash === before) go(fallback);
  }, 60);
}

function isStack(route) {
  return ["schedule", "event", "add", "edit", "photo", "doc"].includes(route.name);
}

function tabFor(route) {
  if (route.name === "search" || route.name === "home" || route.name === "schedule" || route.name === "event" || route.name === "add" || route.name === "edit") {
    return "home";
  }
  if (route.name === "photo") return "gallery";
  if (route.name === "doc") return "links";
  return TABS.some((tab) => tab.id === route.name) ? route.name : "home";
}

function toast(message) {
  const node = document.getElementById("toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 2800);
}

function toggleSub(id, fromCard) {
  db.subscriptions[id] = !db.subscriptions[id];
  save();
  toast(db.subscriptions[id] ? "Alerts on for this game, on this device." : "Alerts off for this game.");
  render({ keepScroll: true });
  if (fromCard) {
    /* render already rebuilt the card */
  }
}

function bellButton(id) {
  const on = !!db.subscriptions[id];
  const button = h("button", {
    class: `bell${on ? " on" : ""}`,
    type: "button",
    "aria-pressed": on ? "true" : "false",
    "aria-label": on ? "Stop alerts for this game" : "Get alerts for this game",
    onClick: (event) => {
      event.stopPropagation();
      event.preventDefault();
      toggleSub(id);
    }
  });
  button.append(icon(on ? "bellSolid" : "bell"));
  return button;
}

function eventCard(event, options = {}) {
  const row = h("article", { class: "event" });
  const main = h("button", {
    class: "event-main",
    type: "button",
    onClick: () => go(`/event/${encodeURIComponent(event.id)}`)
  }, [
    h("div", {}, [
      options.showDivision ? h("p", { class: "subline", text: divisionLine(event) }) : null,
      h("p", { class: "matchup", text: matchup(event) }),
      event.location ? h("p", { class: "subline", text: event.location }) : null,
      h("span", { class: `status ${statusClass(event.status)}`, text: event.status || "Scheduled" })
    ]),
    h("div", { class: "when" }, [
      h("strong", { text: formatTime(event.startTime) }),
      h("span", { text: formatDate(event.startTime).replace(/^[A-Za-z]+,\s/, "") })
    ])
  ]);
  row.append(main, bellButton(event.id));
  return row;
}

function topBar(mode) {
  const homeOn = mode !== "search";
  return h("header", { class: "home-head" }, [
    h("div", { class: "brand" }, [
      h("div", { class: "ripple", "aria-hidden": "true" }, [
        h("div", { class: "logo-badge" }, [
          h("img", { src: "assets/logo.png", alt: "" })
        ])
      ]),
      h("div", { class: "brand-text" }, [
        h("p", { class: "eyebrow", text: "Sample schedule" }),
        h("h1", { text: "Sikh Games of NJ" })
      ])
    ]),
    h("div", { class: `switch${homeOn ? "" : " search"}`, role: "tablist", "aria-label": "Home or search" }, [
      h("span", { class: "knob", "aria-hidden": "true" }),
      h("button", {
        class: homeOn ? "on" : "off",
        type: "button",
        role: "tab",
        "aria-selected": homeOn ? "true" : "false",
        text: "Home",
        onClick: () => go("/")
      }),
      h("button", {
        class: homeOn ? "off" : "on",
        type: "button",
        role: "tab",
        "aria-selected": homeOn ? "false" : "true",
        text: "Search",
        onClick: () => go("/search")
      })
    ])
  ]);
}

const LINE = {
  soccer: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="currentColor" d="m12 6.8 1.7 2.6h-3.4L12 6.8zM8.4 10.4l1.3.5.5 2.1-2 .6-1.2-1.5.7-1.7zm7.2 0 .7 1.7-1.2 1.5-2-.6.5-2.1 1.3-.5zM10 15.4 12 17l2-1.6-.5-1.4h-3L10 15.4z"/></svg>',
  basketball: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M12 4v16M4 12h16M7 7.2c2.2 1.6 3.6 3 3.6 4.8S9.2 16.2 7 17.8M17 7.2c-2.2 1.6-3.6 3-3.6 4.8s1.4 3.2 3.6 4.8"/></svg>',
  volleyball: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M12 4c2.4 2.6 3.2 5 3.2 8s-.8 5.4-3.2 8M8 6.4c2.8 1.2 4.6 3.2 5.2 6M16 6.4C13.8 8.4 12.6 10.8 12.6 13.4"/></svg>',
  track: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 16c0-4.4 3.6-8 8-8s8 3.6 8 8M7.5 16c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5M4 16h16"/></svg>'
};

function sportGlyph(id) {
  const node = h("span", { class: "mini", "aria-hidden": "true" });
  node.innerHTML = LINE[id] || LINE.soccer;
  return node;
}

function homeView() {
  const live = db.events.filter((event) => String(event.status).toLowerCase() === "live");
  const upcoming = db.events.filter((event) => new Date(event.startTime).getTime() >= Date.now()).length;
  const view = h("div", { class: "view home-view" });
  view.append(topBar("home"));
  view.append(h("div", { class: "stats" }, [
    h("span", { text: `${db.events.length} games` }),
    h("span", { text: `${live.length} live` }),
    h("span", { text: `${upcoming} still ahead` })
  ]));
  if (live[0]) {
    const event = live[0];
    view.append(h("button", {
      class: "live-strip",
      type: "button",
      onClick: () => go(`/event/${encodeURIComponent(event.id)}`)
    }, [
      h("span", { class: "pulse", "aria-hidden": "true" }),
      h("span", { text: `Live · ${divisionLine(event)} · ${matchup(event)}` })
    ]));
  }
  ["girls", "boys"].forEach((gender) => {
    view.append(h("h2", { class: "section-label", text: genderLabel(gender) }));
    const scroller = h("div", { class: "scroller" });
    SPORTS.forEach((sport) => {
      const card = h("article", { class: `sport-card ${gender}` });
      card.append(h("div", { class: "sport-title" }, [
        sportGlyph(sport.id),
        h("h3", { text: sport.title })
      ]));
      const ages = h("div", { class: "ages" });
      CATEGORIES.forEach((category) => {
        const count = db.events.filter((event) => event.gender === gender && event.sport === sport.id && event.category === category.id).length;
        ages.append(h("button", {
          class: "age",
          type: "button",
          "aria-label": `${genderLabel(gender)} ${sport.title} ${category.desc}, ${count} ${count === 1 ? "game" : "games"}`,
          onClick: () => go(`/schedule/${gender}/${sport.id}/${category.id}`)
        }, [
          h("i", { text: category.id }),
          h("small", { text: category.desc })
        ]));
      });
      card.append(ages);
      scroller.append(card);
    });
    view.append(scroller);
  });
  view.append(h("p", { class: "footnote", text: "Sample weekend stored on this device. Scores, bells, and photos you change stay in this browser." }));
  return view;
}

function eventsMatchingSearch() {
  const query = ui.search.text.trim().toLowerCase();
  return db.events.filter((event) => {
    if (ui.search.gender !== "all" && event.gender !== ui.search.gender) return false;
    if (ui.search.sport !== "all" && event.sport !== ui.search.sport) return false;
    if (ui.search.category !== "all" && event.category !== ui.search.category) return false;
    if (!query) return true;
    const names = (event.teams || []).map((item) => String(item.name || "").toLowerCase());
    return names.some((name) => name.includes(query));
  }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
}

function fillSearchResults(mount) {
  const events = eventsMatchingSearch();
  if (!events.length) {
    mount.append(h("div", { class: "empty" }, [
      h("strong", { text: "No games found" }),
      "Try another team, or clear a filter."
    ]));
    return;
  }
  events.forEach((event) => mount.append(eventCard(event, { showDivision: true })));
}

function searchView() {
  const view = h("div", { class: "view search-view" });
  view.append(topBar("search"));
  const filters = h("div", { class: "filters" });
  filters.append(selectFilter("Division", "gender", [
    ["all", "Boys & girls"],
    ["boys", "Boys"],
    ["girls", "Girls"]
  ]));
  filters.append(selectFilter("Sport", "sport", [["all", "All sports"]].concat(SPORTS.map((sport) => [sport.id, sport.title]))));
  filters.append(selectFilter("Age", "category", [["all", "All ages"]].concat(CATEGORIES.map((category) => [category.id, category.id]))));
  const searchLabel = h("label", {}, [
    h("span", { class: "sr", text: "Search team" }),
    h("input", {
      type: "search",
      placeholder: "Search team",
      value: ui.search.text,
      "aria-label": "Search team",
      onInput: (event) => {
        ui.search.text = event.target.value;
        paintSearchResults();
      }
    })
  ]);
  filters.append(searchLabel);
  const results = h("div", { id: "search-results" });
  fillSearchResults(results);
  view.append(filters, results);
  return view;
}

function selectFilter(label, key, options) {
  const select = h("select", {
    "aria-label": label,
    onChange: (event) => {
      ui.search[key] = event.target.value;
      paintSearchResults();
    }
  });
  options.forEach(([value, text]) => {
    const option = h("option", { value, text });
    if (ui.search[key] === value) option.selected = true;
    select.append(option);
  });
  select.value = ui.search[key];
  return h("label", {}, [select]);
}

function paintSearchResults() {
  const results = document.getElementById("search-results");
  if (!results) {
    render();
    return;
  }
  results.replaceChildren();
  fillSearchResults(results);
}

function appBar(title, subtitle, action, withBack = true) {
  const bar = h("header", { class: withBack ? "appbar" : "appbar rooted" });
  if (withBack) {
    const backButton = h("button", { class: "icon-btn", type: "button", "aria-label": "Back", onClick: back });
    backButton.append(icon("back"));
    bar.append(backButton);
  }
  bar.append(h("div", { class: "titles" }, [
    h("h1", { text: title }),
    subtitle ? h("p", { text: subtitle }) : null
  ]));
  if (action) bar.append(action);
  return bar;
}

function scheduleView(route) {
  const view = h("div", { class: "view sheet" });
  if (!knownDivision(route.gender, route.sport, route.category)) {
    view.append(appBar("Schedule", "Unknown division"), h("div", { class: "empty" }, [
      h("strong", { text: "That division is not on the board" })
    ]));
    return view;
  }
  const title = `${genderLabel(route.gender)} · ${SPORT_TITLE[route.sport]}`;
  let action = null;
  if (db.admin) {
    action = h("button", {
      class: "icon-btn",
      type: "button",
      "aria-label": "Add game",
      onClick: () => go(`/add/${route.gender}/${route.sport}/${route.category}`)
    });
    action.append(icon("add"));
  }
  view.append(appBar(title, CAT_DESC[route.category], action));
  if (db.admin) view.append(h("p", { class: "admin-banner", text: "Demo admin · changes stay in this browser" }));
  const events = db.events
    .filter((event) => event.gender === route.gender && event.sport === route.sport && event.category === route.category)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  if (!events.length) {
    const empty = h("div", { class: "empty" }, [
      h("strong", { text: "No games in this division yet" }),
      "This bracket is not on the sample weekend."
    ]);
    if (db.admin) {
      empty.append(h("button", {
        class: "linkish",
        type: "button",
        text: "Add the first game",
        onClick: () => go(`/add/${route.gender}/${route.sport}/${route.category}`)
      }));
    }
    view.append(empty);
    return view;
  }
  events.forEach((event) => view.append(eventCard(event)));
  return view;
}

function bumpScore(id, index, delta) {
  const event = getEvent(id);
  if (!event || !event.teams || !event.teams[index]) return;
  const next = Math.max(0, Number(event.teams[index].score || 0) + delta);
  event.teams[index].score = next;
  save();
  render({ keepScroll: true });
}

function postUpdate(id, content) {
  const event = getEvent(id);
  const text = content.trim();
  if (!event || !text) return false;
  const timestamp = new Date().toISOString();
  event.updates.unshift({ id: `u${Date.now()}`, content: text, timestamp });
  db.notifications.unshift({
    id: `n${Date.now()}`,
    eventId: event.id,
    event: `${genderLabel(event.gender)} / ${SPORT_TITLE[event.sport]} / ${event.category}`,
    title: matchup(event),
    body: text,
    timestamp
  });
  return save();
}

function eventView(id) {
  const event = getEvent(id);
  const view = h("div", { class: "view sheet" });
  if (!event) {
    view.append(appBar("Game"), h("div", { class: "empty" }, [h("strong", { text: "That game is not on the board" })]));
    return view;
  }
  let action = null;
  if (db.admin) {
    action = h("button", {
      class: "icon-btn",
      type: "button",
      "aria-label": "Edit game",
      onClick: () => go(`/edit/${encodeURIComponent(event.id)}`)
    });
    action.append(icon("edit"));
  }
  view.append(appBar(divisionLine(event), event.round, action));
  if (db.admin) view.append(h("p", { class: "admin-banner", text: "Demo admin · changes stay in this browser" }));

  const main = h("section", { class: "card" });
  main.append(h("div", { class: "detail-top" }, [
    h("div", {}, [
      h("p", { class: "clock", text: formatTime(event.startTime) }),
      h("p", { text: formatDate(event.startTime) })
    ]),
    bellButton(event.id)
  ]));

  if (event.isTeamSport && event.teams && event.teams.length >= 2) {
    const board = h("div", { class: `scoreboard${db.admin ? " admin" : ""}` });
    const side = (index) => {
      const item = event.teams[index];
      return h("div", { class: "team" }, [
        h("div", { class: "score", text: String(item.score || 0) }),
        h("div", { class: "team-name", text: item.name || "Team" })
      ]);
    };
    const steps = (index) => h("div", { class: "steps" }, [
      h("button", { class: "step", type: "button", "aria-label": `Increase score for ${event.teams[index].name || "team"}`, text: "+", onClick: () => bumpScore(event.id, index, 1) }),
      h("button", { class: "step", type: "button", "aria-label": `Decrease score for ${event.teams[index].name || "team"}`, text: "−", onClick: () => bumpScore(event.id, index, -1) })
    ]);
    if (db.admin) board.append(steps(0));
    board.append(side(0), h("div", { class: "vs", text: "vs" }), side(1));
    if (db.admin) board.append(steps(1));
    main.append(board);
  } else {
    main.append(h("p", { class: "no-score", text: "No score card for this event" }));
  }
  main.append(h("p", { class: "roundline", text: `${event.round || "Game"} · ${event.status || "Scheduled"}` }));
  view.append(main);

  if (event.location) {
    const pin = icon("pin");
    view.append(h("section", { class: "card pin" }, [
      pin,
      h("div", {}, [
        h("strong", { text: "Location" }),
        h("p", { text: event.location })
      ])
    ]));
  }

  if (db.admin) {
    const input = h("input", { type: "text", maxlength: "180", placeholder: "Any new updates?", "aria-label": "Update" });
    const send = h("button", {
      class: "send",
      type: "button",
      "aria-label": "Post update",
      onClick: () => {
        if (!input.value.trim()) {
          toast("Write an update first.");
          return;
        }
        postUpdate(event.id, input.value);
        toast("Update posted.");
        render({ keepScroll: true });
      }
    });
    send.append(icon("send"));
    view.append(h("section", { class: "card" }, [h("div", { class: "composer" }, [input, send])]));
  }

  const updates = h("section", { class: "card updates" }, [h("h2", { text: "Event updates" })]);
  if (!event.updates.length) {
    updates.append(h("div", { class: "empty-updates" }, [
      h("img", { src: "assets/no-updates.png", alt: "" }),
      h("p", { text: "No new updates" })
    ]));
  } else {
    event.updates.forEach((update) => {
      updates.append(h("article", { class: "update" }, [
        h("time", { text: timeAgo(update.timestamp) }),
        h("p", { text: update.content || "" })
      ]));
    });
  }
  view.append(updates);
  return view;
}

function localInputValue(iso) {
  const date = iso ? new Date(iso) : new Date(Date.now() + 3600000);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formView(route) {
  const editing = route.name === "edit";
  const existing = editing ? getEvent(route.id) : null;
  const view = h("div", { class: "view sheet" });
  if (editing && !existing) {
    view.append(appBar("Edit game"), h("div", { class: "empty" }, [h("strong", { text: "That game is not on the board" })]));
    return view;
  }
  if (!editing && !knownDivision(route.gender, route.sport, route.category)) {
    view.append(appBar("Add game"), h("div", { class: "empty" }, [h("strong", { text: "That division is not on the board" })]));
    return view;
  }
  const gender = editing ? existing.gender : route.gender;
  const sport = editing ? existing.sport : route.sport;
  const category = editing ? existing.category : route.category;
  view.append(appBar(editing ? "Edit game" : "Add game", `${genderLabel(gender)} · ${SPORT_TITLE[sport]} · ${category}`));

  const error = h("p", { class: "form-error", hidden: true });
  const round = h("input", { value: existing ? existing.round || "" : "", required: true });
  const status = h("input", { value: existing ? existing.status || "" : "Scheduled", placeholder: "Scheduled, On Time, Live…" });
  const location = h("input", { value: existing ? existing.location || "" : "", placeholder: "Ground details" });
  const when = h("input", { type: "datetime-local", value: localInputValue(existing && existing.startTime) });
  const teamSport = h("input", { type: "checkbox" });
  teamSport.checked = existing ? !!existing.isTeamSport : true;
  const teamA = h("input", { value: existing && existing.teams && existing.teams[0] ? existing.teams[0].name || "" : "" });
  const teamB = h("input", { value: existing && existing.teams && existing.teams[1] ? existing.teams[1].name || "" : "" });
  const teamsBox = h("div", {}, [
    field("Team A", teamA),
    field("Team B", teamB)
  ]);
  const syncTeams = () => { teamsBox.hidden = !teamSport.checked; };
  teamSport.addEventListener("change", syncTeams);
  syncTeams();

  const form = h("form", { class: "pad" });
  form.append(
    error,
    field("Round", round),
    field("Status", status),
    field("Location", location),
    field("Start date and time", when),
    h("label", { class: "switch-row" }, [h("span", { text: "Team sport" }), teamSport]),
    teamsBox,
    h("button", { class: "primary", type: "submit", text: editing ? "Update" : "Add" })
  );
  form.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
    const start = new Date(when.value);
    if (!round.value.trim() || !status.value.trim() || !location.value.trim() || Number.isNaN(start.getTime())) {
      error.hidden = false;
      error.textContent = "Round, status, location, and a start time are required.";
      return;
    }
    if (teamSport.checked && (!teamA.value.trim() || !teamB.value.trim())) {
      error.hidden = false;
      error.textContent = "Enter both team names, or turn team sport off.";
      return;
    }
    const payload = {
      round: round.value.trim(),
      status: status.value.trim(),
      location: location.value.trim(),
      startTime: start.toISOString(),
      isTeamSport: teamSport.checked,
      teams: teamSport.checked
        ? [
          team(teamA.value.trim(), existing && existing.teams && existing.teams[0] ? existing.teams[0].score || 0 : 0),
          team(teamB.value.trim(), existing && existing.teams && existing.teams[1] ? existing.teams[1].score || 0 : 0)
        ]
        : null
    };
    if (editing) {
      Object.assign(existing, payload);
      save();
      toast("Game updated.");
      go(`/event/${encodeURIComponent(existing.id)}`);
      return;
    }
    const created = game(Object.assign({
      id: `e${Date.now().toString(36)}`,
      gender, sport, category, updates: []
    }, payload));
    db.events.push(created);
    save();
    toast("Game added.");
    go(`/event/${encodeURIComponent(created.id)}`);
  });
  view.append(form);
  return view;
}

function field(label, control) {
  return h("label", { class: "field" }, [h("span", { text: label }), control]);
}

function validGallery() {
  return db.gallery.filter((item) => item && (!item.dataUrl || isSafeImage(item.dataUrl)));
}

function visual(item, large) {
  const frame = h("div", { class: `${large ? "photo-stage " : ""}tone-${item.tone || "royal"}` });
  if (item.dataUrl && isSafeImage(item.dataUrl)) {
    frame.append(h("img", { class: "cover", src: item.dataUrl, alt: item.title || "Gallery photo" }));
  } else {
    frame.append(motifNode(item.motif || "soccer"));
  }
  return frame;
}

function galleryView() {
  const view = h("div", { class: "view sheet" });
  const input = h("input", { type: "file", accept: "image/png,image/jpeg,image/webp,image/gif", hidden: true });
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    if (file.size > 700000) {
      toast("Choose a photo under 700 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      if (!isSafeImage(url)) {
        toast("Use a PNG, JPG, WEBP, or GIF.");
        return;
      }
      db.gallery.unshift({
        id: `g${Date.now().toString(36)}`,
        title: file.name.replace(/\.[^.]+$/, "").slice(0, 40) || "Photo",
        caption: "Added on this device",
        tone: "night",
        dataUrl: url
      });
      if (save()) {
        toast("Photo added on this device.");
        render();
      }
    };
    reader.readAsDataURL(file);
  });
  const add = h("button", { class: "bar-text", type: "button", text: "Add photos", onClick: () => input.click() });
  const bar = appBar("Gallery", "", add, false);
  view.append(bar, input);
  view.append(h("p", { class: "hint", text: "Photos you add stay in this browser. In the mobile app, the games desk reviews pictures before they go on the board." }));
  const items = validGallery();
  if (!items.length) {
    view.append(h("div", { class: "empty" }, [h("strong", { text: "No photos yet" })]));
    return view;
  }
  const grid = h("div", { class: "masonry" });
  items.forEach((item, index) => {
    const button = h("button", {
      class: `tile tone-${item.tone || "royal"}${index % 3 === 0 ? " tall" : ""}`,
      type: "button",
      onClick: () => go(`/photo/${encodeURIComponent(item.id)}`)
    });
    if (item.dataUrl && isSafeImage(item.dataUrl)) {
      button.append(h("img", { class: "cover", src: item.dataUrl, alt: "" }));
    } else {
      button.append(motifNode(item.motif || "soccer"));
    }
    button.append(h("span", { class: "shade" }));
    button.append(h("span", { class: "label" }, [
      item.title || "Photo",
      item.caption ? h("small", { text: item.caption }) : null
    ]));
    grid.append(button);
  });
  view.append(grid);
  return view;
}

function photoView(id) {
  const items = validGallery();
  const index = items.findIndex((item) => item.id === id);
  const view = h("div", { class: "view photo-view" });
  if (index < 0) {
    view.append(appBar("Photo"), h("p", { class: "photo-cap", text: "That photo is no longer in the gallery." }));
    return view;
  }
  const item = items[index];
  let action = null;
  if (db.admin) {
    action = h("button", {
      class: "bar-text",
      type: "button",
      text: "Delete",
      onClick: () => {
        db.gallery = db.gallery.filter((photo) => photo.id !== item.id);
        save();
        toast("Photo removed from this device.");
        const next = items[index + 1] || items[index - 1];
        if (next) go(`/photo/${encodeURIComponent(next.id)}`, { replace: true });
        else go("/gallery", { replace: true });
      }
    });
  }
  view.append(appBar(item.title || "Photo", "", action));
  const stage = visual(item, true);
  let startX = 0;
  stage.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  stage.addEventListener("pointerup", (event) => {
    const delta = event.clientX - startX;
    if (delta > 50 && index > 0) go(`/photo/${encodeURIComponent(items[index - 1].id)}`, { replace: true });
    if (delta < -50 && index < items.length - 1) go(`/photo/${encodeURIComponent(items[index + 1].id)}`, { replace: true });
  });
  const nav = h("div", { class: "photo-nav" });
  if (index > 0) {
    nav.append(h("button", { type: "button", text: "Previous", onClick: () => go(`/photo/${encodeURIComponent(items[index - 1].id)}`, { replace: true }) }));
  } else nav.append(h("span", {}));
  nav.append(h("span", { text: `${index + 1} / ${items.length}` }));
  if (index < items.length - 1) {
    nav.append(h("button", { type: "button", text: "Next", onClick: () => go(`/photo/${encodeURIComponent(items[index + 1].id)}`, { replace: true }) }));
  }
  view.append(stage, h("p", { class: "photo-cap", text: item.caption || "" }), nav);
  return view;
}

function linksView() {
  const view = h("div", { class: "view sheet" });
  view.append(appBar("Docs / Links", "", null, false));
  if (!db.links.length) {
    view.append(h("div", { class: "empty" }, [h("strong", { text: "No documents yet" })]));
    return view;
  }
  db.links.forEach((link) => {
    const button = h("button", {
      class: "list-card",
      type: "button",
      onClick: () => go(`/doc/${encodeURIComponent(link.id)}`)
    });
    const glyph = h("span", { class: "glyph" });
    glyph.append(icon("file"));
    button.append(glyph, h("div", { class: "grow" }, [
      h("strong", { text: link.name || "Document" }),
      h("p", { text: "Open in the app" })
    ]));
    const chevron = h("span", { class: "chevron", "aria-hidden": "true" });
    chevron.append(icon("chevron"));
    button.append(chevron);
    view.append(button);
  });
  return view;
}

function docView(id) {
  const doc = db.links.find((link) => link.id === id);
  const view = h("div", { class: "view sheet" });
  if (!doc) {
    view.append(appBar("Document"), h("div", { class: "empty" }, [h("strong", { text: "That document is not on the board" })]));
    return view;
  }
  view.append(appBar(doc.name || "Document"));
  const reader = h("article", { class: "reader" }, [h("h2", { text: doc.name || "Document" })]);
  (doc.sections || []).forEach((section) => {
    if (section.h) reader.append(h("h3", { text: section.h }));
    (section.p || []).forEach((paragraph) => reader.append(h("p", { text: paragraph })));
  });
  view.append(reader);
  return view;
}

function notificationsView() {
  const view = h("div", { class: "view sheet" });
  view.append(appBar("Notifications", "", null, false));
  if (!db.notifications.length) {
    view.append(h("div", { class: "empty" }, [h("strong", { text: "No notifications yet" })]));
    return view;
  }
  db.notifications.forEach((note) => {
    const eventId = note.eventId && getEvent(note.eventId) ? note.eventId : "";
    const card = h(eventId ? "button" : "article", {
      class: "list-card",
      type: eventId ? "button" : null,
      onClick: eventId ? () => go(`/event/${encodeURIComponent(eventId)}`) : null
    });
    const glyph = h("span", { class: "glyph" });
    glyph.append(icon("bell"));
    card.append(glyph, h("div", { class: "grow" }, [
      h("strong", { text: note.event || "Update" }),
      note.title ? h("p", { text: note.title }) : null,
      h("p", { text: note.body || "" }),
      h("p", { text: timeAgo(note.timestamp) })
    ]));
    view.append(card);
  });
  return view;
}

function contactsView() {
  const view = h("div", { class: "view sheet" });
  view.append(appBar("Contacts", "", null, false));
  view.append(h("p", { class: "hint", text: "Sample games-desk lines for this preview. They are not live phone numbers." }));
  if (!db.contacts.length) {
    view.append(h("div", { class: "empty" }, [h("strong", { text: "No contacts yet" })]));
    return view;
  }
  db.contacts.forEach((contact) => {
    const card = h("article", { class: "list-card" });
    const glyph = h("span", { class: "glyph" });
    glyph.append(icon("person"));
    const body = h("div", { class: "grow" }, [
      h("strong", { text: contact.name || "Contact" }),
      h("p", { text: contact.number || "" }),
      contact.info ? h("p", { text: contact.info }) : null
    ]);
    card.append(glyph, body);
    const href = telHref(contact.tel);
    if (href) {
      const call = h("a", { class: "call", href, "aria-label": `Call ${contact.name || "contact"}` });
      call.append(icon("phone"));
      card.append(call);
    }
    view.append(card);
  });
  return view;
}

function infoView() {
  const about = db.about || {};
  const view = h("div", { class: "view sheet" });
  const action = h("button", {
    class: "bar-text",
    type: "button",
    text: db.admin ? "Log out" : "Demo admin",
    onClick: () => {
      db.admin = !db.admin;
      save();
      toast(db.admin ? "Demo admin is on. Changes stay in this browser." : "Demo admin is off.");
      render({ keepScroll: true });
    }
  });
  view.append(appBar("Info", "", action, false));
  view.append(h("section", { class: "card hero-card" }, [
    h("img", { class: "logo", src: "assets/logo.png", alt: "" }),
    h("h2", { text: about.appName || "Sikh Games of NJ" })
  ]));
  view.append(h("p", { class: "tagline", text: about.tagline || "" }));

  const feedbackTitle = h("button", {
    class: "list-card",
    type: "button",
    onClick: () => {
      const box = document.getElementById("feedback-box");
      if (box) box.hidden = !box.hidden;
    }
  });
  const mailGlyph = h("span", { class: "glyph" });
  mailGlyph.append(icon("send"));
  feedbackTitle.append(mailGlyph, h("div", { class: "grow" }, [
    h("strong", { text: about.feedbackTitle || "Give us your feedback" }),
    h("p", { text: "Saved on this device" })
  ]));
  view.append(feedbackTitle);

  const feedbackInput = h("textarea", { rows: "3", maxlength: "400", placeholder: "How was the weekend?" });
  const feedbackError = h("p", { class: "form-error", hidden: true });
  const feedbackBox = h("form", { class: "card", id: "feedback-box", hidden: true });
  feedbackBox.append(feedbackError, feedbackInput, h("button", { class: "primary", type: "submit", text: "Save feedback" }));
  feedbackBox.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = feedbackInput.value.trim();
    if (!text) {
      feedbackError.hidden = false;
      feedbackError.textContent = "Write a note first.";
      return;
    }
    db.feedback.unshift({ id: `f${Date.now()}`, text, timestamp: new Date().toISOString() });
    save();
    feedbackInput.value = "";
    toast("Feedback saved on this device.");
    render();
  });
  view.append(feedbackBox);
  db.feedback.forEach((note) => {
    view.append(h("article", { class: "saved-note" }, [
      h("time", { text: timeAgo(note.timestamp) }),
      h("p", { text: note.text || "" })
    ]));
  });

  const org = h("article", { class: "list-card org" });
  org.append(h("img", { src: "assets/gurutech.png", alt: "" }), h("div", { class: "grow" }, [
    h("strong", { text: about.org || "GuruTech" }),
    h("p", { text: "Built the mobile app" })
  ]));
  view.append(org);

  const phoneHref = telHref(about.tel);
  if (phoneHref) {
    const phone = h("a", { class: "list-card", href: phoneHref });
    const glyph = h("span", { class: "glyph" });
    glyph.append(icon("phone"));
    phone.append(glyph, h("div", { class: "grow" }, [
      h("strong", { text: about.phone || "" }),
      h("p", { text: "Sample games desk" })
    ]));
    view.append(phone);
  }
  const emailHref = mailHref(about.email);
  if (emailHref) {
    const email = h("a", { class: "list-card", href: emailHref });
    const glyph = h("span", { class: "glyph" });
    glyph.append(icon("send"));
    email.append(glyph, h("div", { class: "grow" }, [
      h("strong", { text: about.email }),
      h("p", { text: "Sample address" })
    ]));
    view.append(email);
  }

  view.append(h("p", { class: "note", text: "The iOS and Android app reads live games from Cloud Firestore in the Firebase project sgofnj. This preview keeps a full sample weekend in your browser so every screen works without that connection." }));
  view.append(h("div", { class: "pad" }, [
    h("button", {
      class: "secondary",
      type: "button",
      text: "Restore sample weekend",
      onClick: () => {
        if (!window.confirm("Restore the original sample games? Games, scores, and photos you added on this device will be removed.")) return;
        localStorage.removeItem(KEY);
        db = load();
        toast("Sample weekend restored.");
        render();
      }
    })
  ]));
  return view;
}

function viewFor(route) {
  if (route.name === "search") return searchView();
  if (route.name === "gallery") return galleryView();
  if (route.name === "links") return linksView();
  if (route.name === "notifications") return notificationsView();
  if (route.name === "contacts") return contactsView();
  if (route.name === "info") return infoView();
  if (route.name === "schedule") return scheduleView(route);
  if (route.name === "event") return eventView(route.id);
  if (route.name === "add" || route.name === "edit") return formView(route);
  if (route.name === "photo") return photoView(route.id);
  if (route.name === "doc") return docView(route.id);
  return homeView();
}

function renderTabs() {
  const nav = document.getElementById("tabs");
  const current = tabFor(ui.route);
  nav.replaceChildren();
  TABS.forEach((tab) => {
    const button = h("button", {
      class: "tab",
      type: "button",
      "aria-label": tab.label,
      title: tab.label
    });
    if (tab.id === current && !isStack(ui.route)) button.setAttribute("aria-current", "page");
    const bubble = h("span", { class: "bubble" });
    bubble.append(icon(tab.icon));
    if (tab.id === "notifications" && db.notifications.length) {
      bubble.append(h("span", { class: "dot" }));
    }
    button.append(bubble);
    button.addEventListener("click", () => go(tab.id === "home" ? "/" : `/${tab.id}`));
    nav.append(button);
  });
}

function titleFor(route) {
  if (route.name === "search") return "Search · Sikh Games of NJ";
  if (route.name === "gallery" || route.name === "photo") return "Gallery · Sikh Games of NJ";
  if (route.name === "links" || route.name === "doc") return "Docs · Sikh Games of NJ";
  if (route.name === "notifications") return "Notifications · Sikh Games of NJ";
  if (route.name === "contacts") return "Contacts · Sikh Games of NJ";
  if (route.name === "info") return "Info · Sikh Games of NJ";
  if (route.name === "schedule") return "Schedule · Sikh Games of NJ";
  if (route.name === "event" || route.name === "edit") return "Game · Sikh Games of NJ";
  if (route.name === "add") return "Add game · Sikh Games of NJ";
  return "Sikh Games of NJ";
}

function render(options = {}) {
  ui.keepScroll = !!options.keepScroll;
  const main = document.getElementById("main");
  const previous = ui.keepScroll ? main.scrollTop : 0;
  const device = document.getElementById("device");
  device.classList.toggle("stack", isStack(ui.route));
  device.classList.toggle("photo", ui.route.name === "photo");
  document.title = titleFor(ui.route);
  main.replaceChildren(viewFor(ui.route));
  main.classList.remove("fade");
  void main.offsetWidth;
  if (!ui.keepScroll) main.classList.add("fade");
  main.scrollTop = ui.keepScroll ? previous : 0;
  renderTabs();
  ui.keepScroll = false;
}

function onKey(event) {
  if (ui.route.name !== "photo") return;
  if (event.target && ["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
  const items = validGallery();
  const index = items.findIndex((item) => item.id === ui.route.id);
  if (event.key === "Escape") back();
  if (event.key === "ArrowRight" && index >= 0 && index < items.length - 1) {
    go(`/photo/${encodeURIComponent(items[index + 1].id)}`, { replace: true });
  }
  if (event.key === "ArrowLeft" && index > 0) {
    go(`/photo/${encodeURIComponent(items[index - 1].id)}`, { replace: true });
  }
}

function boot() {
  db = load();
  if (!location.hash) history.replaceState(null, "", "#/");
  ui.route = parseHash();
  window.addEventListener("hashchange", () => {
    ui.route = parseHash();
    render();
  });
  document.addEventListener("keydown", onKey);
  render();
}

boot();
