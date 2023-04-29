import KeyPointsSection from "@/components/notes/notesSection";
import NavBar from "@/components/nav/NavBar";
import React from "react";
import NotesSection from "@/components/notes/notesSection";

type Props = {};

const Notes = (props: Props) => {
  return (
    <div className="h-full">
      <NavBar />
      <NotesSection />
    </div>
  );
};

export default Notes;
