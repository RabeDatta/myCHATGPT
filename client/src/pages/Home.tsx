import NavBar from "@/components/nav/NavBar";
import Options from "@/components/options/Options";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <NavBar />
      <div className="antialiased bg-gradient-to-br from-green-100 to-white h-full">
        <Options />
      </div>
    </div>
  );
};

export default Home;
