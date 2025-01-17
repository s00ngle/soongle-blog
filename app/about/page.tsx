import InfoSection from "@/components/InfoSection";
import SocialMediaButton from "@/components/SocialMediaButton";
import { Metadata } from "next";
import activities from "@/data/about/activities";
import awards from "@/data/about/awards";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "About",
};

const SOCIAL_MEDIA_BUTTONS = [
  {
    href: "https://www.youtube.com/@soongle",
    colors: "bg-red-600 text-white",
    icon: <FaYoutube className="text-3xl" />,
  },
  {
    href: "https://www.instagram.com/kyso_on/",
    colors:
      "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white",
    icon: <FaInstagram className="text-3xl" />,
  },
  {
    href: "https://github.com/s00ngle",
    colors: "bg-gray-800 text-white",
    icon: <FaGithub className="text-3xl" />,
  },
];

const AboutPage = () => {
  return (
    <PageContainer>
      <h1 className="mt-4 text-5xl font-bold text-gray-900 tracking-tight">
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
    </PageContainer>
  );
};

export default AboutPage;
