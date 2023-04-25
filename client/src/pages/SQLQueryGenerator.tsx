import NavBar from "@/components/nav/NavBar";
import SQLQueryGeneratorSection from "@/components/sqlQuery/SQLQueryGeneratorSection";
import SummarySection from "@/components/summary/SummarySection";
import React from "react";

const SQLQueryGenerator = () => {
  return (
    <div className="h-full">
      <NavBar />
      <SQLQueryGeneratorSection />
    </div>
  );
};

export default SQLQueryGenerator;
