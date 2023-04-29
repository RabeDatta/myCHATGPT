import NavBar from "@/components/nav/NavBar";
import Menu from "@/components/Menu/Menu";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <NavBar />
      <div className="antialiased bg-gradient-to-br from-green-100 to-white h-full">
        <Menu />
      </div>
    </div>
  );
};

export default Home;
