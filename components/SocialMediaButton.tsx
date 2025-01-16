import React from "react";

interface SocialMediaButtonProps {
  href: string;
  colors: string;
  icon: React.ReactElement;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  href,
  colors,
  icon,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-4 rounded-full shadow-xl transform hover:scale-110 transition-transform ${colors}`}
    >
      {icon}
    </a>
  );
};

export default SocialMediaButton;
