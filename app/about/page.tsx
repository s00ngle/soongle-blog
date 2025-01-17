import InfoSection from "@/components/InfoSection";
import { Metadata } from "next";
import activities from "@/data/about/activities";
import awards from "@/data/about/awards";
import PageContainer from "@/components/PageContainer";
import TechSkills from "@/components/TechSkills";
import SocialMediaSection from "@/components/SocialMediaSection";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <PageContainer>
      <h1 className="mt-4 text-5xl font-bold text-gray-900 tracking-tight">
        About Me
      </h1>
      <p className="mt-4 text-center text-gray-700 max-w-2xl">
        Hello! I'm Soongle, a frontend developer with a passion for technology
        and playing the guitar. This blog is a space where I share my learning
        and experiences.
      </p>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Tech Skills Section */}
      <TechSkills />

      {/* Activity Section */}
      <InfoSection
        title="Activities"
        headers={["Activity", "Details", "Duration"]}
        data={activities}
      />

      {/* Award Section */}
      <InfoSection
        title="Awards"
        headers={["Competition", "Award", "Date"]}
        data={awards}
      />
    </PageContainer>
  );
};

export default AboutPage;
