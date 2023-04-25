import KeyPointsSection from "@/components/keyPoints/KeyPointsSection";
import NavBar from "@/components/nav/NavBar";
import React from "react";

type Props = {};

const KeyPoints = (props: Props) => {
  return (
    <div className="h-full">
      <NavBar />
      <KeyPointsSection />
    </div>
  );
};

export default KeyPoints;
