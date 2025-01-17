import { FaReact, FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const skills = [
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-4xl text-blue-600" />,
    level: 80,
  },
  {
    name: "React",
    icon: <FaReact className="text-4xl text-blue-400" />,
    level: 90,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-4xl text-black" />,
    level: 85,
  },

  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-4xl text-teal-500" />,
    level: 80,
  },
  {
    name: "Storybook",
    icon: <SiStorybook className="text-4xl text-pink-500" />,
    level: 75,
  },
  {
    name: "Git",
    icon: <FaGithub className="text-4xl text-gray-800" />,
    level: 85,
  },
];

const TechSkills = () => {
  return (
    <div className="mt-6">
      <h2 className="text-3xl font-semibold text-gray-900 text-center">
        My Tech Skills
      </h2>
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg border max-w-4xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              {/* Icon */}
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </div>
              {/* Skill Name */}
              <span className="text-sm font-medium text-gray-800">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSkills;
