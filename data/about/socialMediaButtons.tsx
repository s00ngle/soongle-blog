import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

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

export default SOCIAL_MEDIA_BUTTONS;
