import Hero from "@/components/Hero";
import Eligibility from "@/components/Eligibility";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CinematicPreloader from "@/components/CinematicPreloader";
import Header from "@/components/Header";
import Organizers from "@/components/Organizers";
import PotionSmash from "@/components/PotionSmash";
import Prizes from "@/components/Prizes";
import PreviousYearMemories from "@/components/PreviousYearMemories";
import RobotInvite from "@/components/RobotInvite";
import Rules from "@/components/Rules";
import Sponsors from "@/components/Sponsors";
import TechCompanions from "@/components/TechCompanions";
import Timeline from "@/components/Timeline";
import Tracks from "@/components/Tracks";

export default function Home() {
  return (
    <main className="bg-transparent">
      <CinematicPreloader />
      <TechCompanions />
      <Header />
      <div className="fixed inset-0 w-full h-full -z-50 bg-[url('/bg-wonderland.png')] bg-cover bg-center bg-no-repeat" aria-hidden="true" />
      <Hero />
      <Tracks />
      <Timeline />
      <Prizes />
      <Eligibility />
      <Rules />
      <Organizers />
      <PreviousYearMemories />
      <section className="afterglow bg-transparent" id="registration">
        <div className="afterglow__mark" aria-hidden="true">✳</div>
        <div>
          <p className="eyebrow">The night is only beginning</p>
          <h2>Make something<br />worth staying up for.</h2>
        </div>
        <div className="afterglow__details">
          <p>Axis Institute of Technology &amp; Management</p>
          <p>National-level software hackathon <span>·</span> 17 October 2026</p>
          <p>Contact the AITM organizing team for registration details.</p>
        </div>
      </section>
      <Sponsors />
      <FAQ />
      <Footer />
      <RobotInvite />
      <PotionSmash />
    </main>
  );
}
