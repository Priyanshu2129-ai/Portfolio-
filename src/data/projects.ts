import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "student-resource-hub",
    title: "Student Resource Hub",
    tagline: "Centralized Academic & Exam Preparation Platform for Diploma Students",
    category: "Live Project",
    description: "A centralized learning platform designed for Diploma students to access academic resources and prepare more effectively for examinations.",
    longDescription: "Developed to bridge the academic resource gap for diploma engineering students. The platform brings together syllabus-aligned study notes, curated previous year exam questions (PYQs), and laboratory practical guides, complemented by an intelligent AI-driven quiz generator for rapid revision and self-assessment.",
    thumbnail: "/images/projects/student-resource-hub.svg",
    features: [
      "Curated syllabus-aligned study notes",
      "Previous Year Questions (PYQs) archive",
      "Comprehensive practical materials & manuals",
      "Centralized study resource repository",
      "AI-integrated quiz generation for exam preparation",
      "Secure user authentication & JWT sessions",
      "Cloud asset storage for academic documents"
    ],
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google AI APIs",
      "TypeScript",
      "JWT",
      "Cloudinary",
      "HTML",
      "CSS",
      "GitHub",
      "Vercel"
    ],
    developmentInfo: "Full-stack web application designed, developed and deployed live on Vercel.",
    liveUrl: "https://student-resources-hq1anqjkr-student-resource-hub1.vercel.app/login",
    highlights: [
      "Live production deployment",
      "AI-assisted revision quizzes",
      "Active utility for diploma students"
    ]
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    tagline: "Digital Hospital Access & Patient Information Architecture Concept",
    category: "Personal Concept Project",
    description: "A digital hospital-access concept designed to make hospital information and basic services easier to access, reducing the need for patients to stand in long queues just to obtain information or initiate common requests.",
    longDescription: "A conceptual digital healthcare portal envisioned to streamline patient access, directory navigation, and emergency preparedness. Focuses on intuitive user workflows, clarity of departmental scheduling, and transparent doctor consultation availability without real-world healthcare provider integration.",
    thumbnail: "/images/projects/hospital-management.svg",
    features: [
      "Modern patient-first landing page",
      "Comprehensive hospital information architecture",
      "Departments and clinical specialties index",
      "Doctors directory with specialty filtering",
      "Detailed doctor profiles & credentials",
      "Online appointment booking workflow concept",
      "Patient contact & inquiry form",
      "High-visibility emergency contact information",
      "Hospital location guidance and interactive map view",
      "Frequently Asked Questions (FAQ) repository",
      "Planned virtual hospital tour (concept roadmap)"
    ],
    technologies: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Supabase",
      "Vercel"
    ],
    developmentInfo: "Individually developed frontend concept project. Public GitHub repository is not yet published. Marked virtual tour as planned roadmap.",
    isPlanned: false, // Core concept built, virtual tour planned
    highlights: [
      "Individually designed concept",
      "Queue-reduction UX focus",
      "Virtual tour on product roadmap"
    ]
  }
];

