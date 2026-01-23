import { Github } from "lucide-react";

const items = [
  { name: "Github", icon: Github, link: "https://github.com/KerttuRungi/CarsWebApp" },
];

export const Footer = () => {
  return (
    <div className="w-full bg-[#3F4F45] py-4 px-2">
      <div className="flex flex-col px-2 py-4 mx-auto justify-between sm:flex-row text-center">
        <p className="py-4 ">2026 Cars, Kerttu R. All rights reserved</p>
        <div className="flex justify-between pt-4 text-2xl">
          {items.map((x, index) => (
            <a
              key={index}
              href={x.link}
              target="_blank"
              className="hover:text-white"
            >
              <x.icon />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Footer;