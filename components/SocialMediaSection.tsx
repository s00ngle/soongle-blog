import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import SocialMediaButton from "@/components/SocialMediaButton";

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

const SocialMediaSection = () => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        {" "}
        Contact
      </h2>
      <div className="flex justify-center space-x-8 mt-4">
        {SOCIAL_MEDIA_BUTTONS.map((button, index) => (
          <SocialMediaButton
            key={index}
            href={button.href}
            colors={button.colors}
            icon={button.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialMediaSection;
