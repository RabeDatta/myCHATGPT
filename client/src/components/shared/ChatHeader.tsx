import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { IoChevronBackOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

type Props = {
  botName: string;
};

function ChatHeader({ botName }: Props) {
  return (
    <div
      className="w-full bg-green-200/70 py-3 px-3 
  flex items-center justify-between sticky top-0 z-10"
    >
      <Link to={"/"}>
        <div
          title={"back to menu"}
          className="text-2xl px-2 py-2 hover:bg-gray-200/40 rounded-[50%]"
        >
          <IoChevronBackOutline />
        </div>
      </Link>
      <div className="flex flex-col justify-between items-center px-6">
        <h3 className="text-lg font-bold text-gray-800">{botName}</h3>
        <div className="flex items-center gap-1">
          <GoPrimitiveDot size={16} className="text-green-600" /> Online
        </div>
      </div>
      <div
        className="cursor-pointer text-2xl px-2 py-2 hover:bg-gray-200/40 rounded-[50%]"
        title={"clear chat"}
      >
        <RiDeleteBin6Line />
      </div>
    </div>
  );
}

export default ChatHeader;
