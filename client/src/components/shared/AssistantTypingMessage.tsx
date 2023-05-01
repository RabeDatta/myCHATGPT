import React from "react";
import TypingAnimation from "./TypingAnimation";
import { BsRobot } from "react-icons/bs";

function AssistantTypingMessage() {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
        <div className="absolute w-full h-full top-0 left-1">
          <BsRobot className="text-3xl text-gray-800" />
        </div>
      </div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <p className="text-sm">
            <TypingAnimation />
          </p>
        </div>
      </div>
    </div>
  );
}

export default AssistantTypingMessage;
