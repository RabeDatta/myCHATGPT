import { cn } from "@/utils/classNames";
import React from "react";

function ChatLoadingSection() {
  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white h-full">
      <div className="px-6 mx-auto max-w-screen-xl py-6">
        {/* INTRODUCTION */}
        <div>
          <h1 className="text-4xl text-gray-800 font-bold flex gap-2 items-center animate-pulse">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </h1>
          <p className="text-xl text-gray-500 pt-2 animate-pulse">
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          </p>
        </div>

        {/* CHAT */}
        <div className="py-8 h-full flex items-center justify-center relative">
          <div
            className="flex flex-col flex-grow w-full sm:max-w-3xl shadow-xl 
    rounded-lg overflow-hidden   bg-white min-h-[660px] h-auto "
          >
            {/* CHAT HEADER */}
            <div
              className="w-full bg-green-200/70 h-[58px]  
  flex items-center justify-between sticky top-0 z-10 animate-pulse"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full mx-4"></div>
              <div className="flex flex-col gap-2 items-center">
                <div className="w-36 h-4 bg-gray-200 "></div>
                <div className="w-28 h-4 bg-gray-200"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded-full mx-4"></div>
            </div>
            {/* DISPLAYED MESSAGE SECTION */}
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto gap-2">
              {/* Assistant message skeleton */}
              <div className="flex w-full mt-2 space-x-3 max-w-full sm:max-w-[70%]">
                {/* PROFILE PIC */}
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                {/* MESSAGE */}
                <div className="bg-gray-200 p-3 rounded-r-lg rounded-bl-lg w-1/2 h-10"></div>
              </div>

              {/* User message skeleton */}
              <div className="flex w-full mt-2 space-x-3 max-w-full sm:max-w-[70%] ml-auto justify-end">
                {/* MESSAGE */}
                <div className="bg-gray-200 text-white p-3 rounded-l-lg rounded-br-lg h-10 w-1/2"></div>
                {/* PROFILE PIC */}
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <div className="bg-gray-200/60 p-4 relative flex flex-col">
              {/* TEXTAREA SECTION  */}
              <div className="w-full bg-white h-24 rounded animate-pulse"></div>

              {/* SUBMIT BTN */}
              <div className="flex justify-end items-center  mt-2 px-1 animate-pulse">
                <div className="py-[14px] px-12 bg-gray-200 rounded"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoadingSection;
