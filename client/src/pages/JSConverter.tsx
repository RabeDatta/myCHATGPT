import JSConverterSection from "@/components/jsConverter/JSConverterSection";
import NavBar from "@/components/nav/NavBar";
import SQLQueryGeneratorSection from "@/components/sqlQuery/SQLQueryGeneratorSection";
import SummarySection from "@/components/summary/SummarySection";
import React from "react";

const JSConverter = () => {
  return (
    <div className="h-full">
      <NavBar />
      <JSConverterSection />
    </div>
  );
};

export default JSConverter;
