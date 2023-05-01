import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import TimeAgo from "./TimeAgo";

type prop = {
  content: string;
  timestamp: string;
};

function UserMessage({ content, timestamp }: prop) {
  return (
    <div className="flex w-full mt-2 space-x-3 sm:max-w-[93%] ml-auto justify-end">
      {/* MESSAGE */}
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{content}</p>
        </div>
        <div className="flex   items-center justify-center gap-1 w-full">
          <span className="text-xs text-gray-500 leading-none">
            <TimeAgo timestamp={timestamp} />
          </span>
          <span> • </span>
          <span className="text-xs text-gray-500 leading-none"> You </span>
        </div>
      </div>
      {/* PROFILE PIC */}
      <div className="flex-shrink-0 h-10 w-10 rounded-full">
        <IoPersonCircleOutline size={40} />
      </div>
    </div>
  );
}

export default UserMessage;
