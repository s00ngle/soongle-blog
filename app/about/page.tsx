import InfoSection from "@/components/InfoSection";
import SocialMediaButton from "@/components/SocialMediaButton";
import { Metadata } from "next";
import SOCIAL_MEDIA_BUTTONS from "@/data/about/socialMediaButtons";
import activities from "@/data/about/activities";
import awards from "@/data/about/awards";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage = () => {
  return (
    <div className="flex-grow flex flex-col items-center py-6 bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
        About Me
      </h1>
      <p className="mt-4 text-center text-gray-700 max-w-2xl">
        Hello! I'm Soongle, a frontend developer passionate about technology.
        This blog is a space where I share my learning and experiences.
      </p>

      {/* Social Media Buttons */}
      <div className="mt-8 flex space-x-8">
        {SOCIAL_MEDIA_BUTTONS.map((button, index) => (
          <SocialMediaButton
            key={index}
            href={button.href}
            colors={button.colors}
            icon={button.icon}
          />
        ))}
      </div>

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
    </div>
  );
};

export default AboutPage;
