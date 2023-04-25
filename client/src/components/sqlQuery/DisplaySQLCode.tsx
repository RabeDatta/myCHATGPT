import TimeAgo from "@/shared/TimeAgo";
import React from "react";

type Props = {
  timestamp: string;
  content: string;
};

function DisplaySQLCode({ timestamp, content }: Props) {
  return (
    <div
      className="sm:w-[96%] flex 
flex-col overflow-y-auto"
    >
      <div
        className="w-[96%] h-44 shadow-md	
rounded-lg bg-[#1e1e1e] overflow-y-auto relative code-scrollbar"
      >
        <div
          className="w-full h-9 
  bg-[rgb(50,50,50)] flex items-center
  pl-2  sticky top-0
  "
        >
          <div
            className="h-4 w-4 
    rounded-[50%] m-1 bg-[rgb(255,96,86)]"
          ></div>
          <div
            className="h-4 w-4  
    rounded-[50%] m-1 bg-[rgb(255,189,45)]"
          ></div>
          <div
            className="h-4 w-4 
    rounded-[50%] m-1 bg-[rgb(38,201,64)]"
          ></div>
        </div>
        {/* CODE OUTPUT */}
        <div className="break-before-all">
          {/* <pre className="break-all">
            <code className="p-6 pt-4 uppercase text-gray-300">{content}</code>
          </pre> */}
          <p className="p-6 pt-4 uppercase text-gray-300">{content}</p>
        </div>
      </div>
      <div className="flex py-1 items-end justify-start gap-2 w-full">
        <span className="text-xs text-gray-500 leading-none">BrainyBot •</span>
        <span className="text-xs text-gray-500 leading-none">
          <TimeAgo timestamp={timestamp} />
        </span>
      </div>
    </div>
  );
}

export default DisplaySQLCode;
