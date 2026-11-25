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
    id: "citycare-hospital-management",
    title: "CityCare Hospital Management System",
    tagline: "A Centralized Digital Platform for Hospital Operations",
    category: "Live Project",
    description: "A hospital management web application designed to organize key hospital workflows, including patient, doctor, appointment and billing management, through a centralized interface.",
    longDescription: "CityCare is a practical hospital management project focused on making everyday hospital administration more organized. It includes an administrative interface for managing core hospital records and workflows, with a persistent backend powered by MongoDB.",
    thumbnail: "/images/projects/hospital-management.svg",
    features: [
      "Centralized hospital administration dashboard",
      "Patient record management",
      "Doctor management",
      "Appointment management",
      "Billing management",
      "Admin authentication and session management",
      "MongoDB-backed data storage"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Render"
    ],
    developmentInfo: "Individually developed hospital management web application with a Node.js and Express backend, MongoDB persistence, and live deployment on Render.",
    liveUrl: "https://citycare-l61z.onrender.com/",
    highlights: [
      "Live production deployment",
      "MongoDB-backed persistence",
      "Hospital administration workflows"
    ]
  }
];
