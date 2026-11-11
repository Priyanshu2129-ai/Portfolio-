import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import LocaHelpFeature from '@/components/locahelp/LocaHelpFeature';
import HackathonsSection from '@/components/hackathons/HackathonsSection';
import AchievementsSection from '@/components/achievements/AchievementsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/navigation/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LocaHelpFeature />
        <HackathonsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
