import React from "react";
import ChatLoadingSection from "./ChatLoadingSection";
import MenuLoadingSection from "./MenuLoadingSection";
import { useLocation } from "react-router-dom";

function LoadingSection() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return <div>{isHome ? <MenuLoadingSection /> : <ChatLoadingSection />}</div>;
}

export default LoadingSection;
