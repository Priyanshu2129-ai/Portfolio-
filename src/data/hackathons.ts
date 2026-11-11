export interface HackathonEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  teamProject: string;
  achievement: string;
  description: string;
  certificatePlaceholder: string;
}

export const hackathonsData: HackathonEvent[] = [
  {
    id: "nodecraft-hackathon-2026",
    name: "NodeCraft Hackathon",
    date: "13 October 2026",
    venue: "GP Patna-7, Gulzarbagh",
    mode: "Offline",
    teamProject: "LOCAHELP",
    achievement: "Participation Certificate",
    description: "Intensive offline hackathon hosted at GP Patna-7 campus. Collaborated in a cross-functional student team to design, prototype, and present LOCAHELP — our voice-first hyperlocal service discovery concept.",
    certificatePlaceholder: "/images/certificates/nodecraft-hackathon-cert.svg"
  },
  {
    id: "spark-idea-hackathon-2026",
    name: "Spark Idea Hackathon",
    date: "14 October 2026",
    venue: "NGP Patna-13 Campus",
    mode: "Offline",
    teamProject: "LOCAHELP",
    achievement: "Participation Certificate",
    description: "Fast-paced offline innovation challenge at NGP Patna-13. Refined the LOCAHELP value proposition, interactive presentation deck, and UI prototypes focused on empowering unorganized local gig workers.",
    certificatePlaceholder: "/images/certificates/spark-idea-hackathon-cert.svg"
  }
];

export const locaHelpData = {
  name: "LOCAHELP — VOICE-FIRST HYPERLOCAL SERVICE PLATFORM",
  tagline: "Connecting Communities with Real-Time Local Skills within 2–5 KM",
  description: "LocaHelp is an AI-powered platform that connects people with nearby local workers, farmers, drivers, and essential service providers. Users can find services through voice commands in their local language, while workers can register and share their real-time availability. Our key innovation is hyperlocal matching and a Live Skill Map, helping people discover nearby resources within a 2–5 km radius. Our goal is to make digitally invisible workers discoverable, create local employment opportunities, and make everyday services more accessible.",
  vision: "No local resource should remain invisible because of technology.",
  role: "Frontend Developer & Presentation (PPT) Maker",
  contributions: [
    "Frontend UI prototyping of the voice search and nearby resource cards",
    "Conceptual design of the Live Skill Map and 2–5 km radius discovery radar",
    "End-to-end design and delivery of the official pitch presentation deck"
  ],
  nature: "Team Hackathon Concept Project (NodeCraft & Spark Idea Hackathons)",
  simulatedWorkers: [
    { title: "Electrician & Repair", distance: "0.8 km", status: "Available Now", voiceQuery: "Ghar me bijli board theek karwana hai", category: "Technical" },
    { title: "Local Organic Farmer", distance: "2.1 km", status: "Farm Fresh Supply", voiceQuery: "Taza sabzi kahan milegi", category: "Agriculture" },
    { title: "Hyperlocal Goods Driver", distance: "1.4 km", status: "On Route", voiceQuery: "Saman le jane ke liye pickup chahiye", category: "Logistics" },
    { title: "Plumbing Specialist", distance: "3.2 km", status: "Available Now", voiceQuery: "Pipe leak ho gaya hai jaldi aao", category: "Plumbing" }
  ]
};

