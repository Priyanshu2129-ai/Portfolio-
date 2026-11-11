import { Achievement } from "@/types/achievement";

export const initialAchievements: Achievement[] = [
  {
    id: "initial-nodecraft-2026",
    title: "NodeCraft Hackathon — Participation",
    category: "Hackathons",
    organization: "GP Patna-7, Gulzarbagh",
    date: "13 October 2026",
    location: "Patna, Bihar",
    description: "Participated in the offline NodeCraft Hackathon at GP Patna-7. Collaborated with the team to conceptualize and develop LOCAHELP, an AI voice-first hyperlocal service discovery solution.",
    certificate_url: "/images/certificates/nodecraft-hackathon-cert.svg",
    external_url: null,
    is_published: true,
    display_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "initial-spark-idea-2026",
    title: "Spark Idea Hackathon — Participation",
    category: "Hackathons",
    organization: "NGP Patna-13 Campus",
    date: "14 October 2026",
    location: "Patna, Bihar",
    description: "Participated in the Spark Idea Hackathon at NGP Patna-13 Campus. Presented the LOCAHELP platform architecture, Live Skill Map prototype, and frontend workflows to the jury.",
    certificate_url: "/images/certificates/spark-idea-hackathon-cert.svg",
    external_url: null,
    is_published: true,
    display_order: 2,
    created_at: new Date().toISOString()
  }
];
