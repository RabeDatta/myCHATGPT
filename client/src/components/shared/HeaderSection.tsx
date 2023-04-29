import React from "react";

type props = {
  title: string;
  description: string;
};

const HeaderSection = ({ title, description }: props) => {
  return (
    <header>
      <h1 className="text-4xl text-gray-800 font-bold flex gap-2 items-center">
        {title}
      </h1>
      <p className="text-xl text-gray-500 pt-2">{description}</p>
    </header>
  );
};

export default HeaderSection;
