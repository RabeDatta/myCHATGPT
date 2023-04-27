import TimeAgo from "@/components/shared/TimeAgo";
import { cn } from "@/utils/classNames";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import {
  BsClipboard2,
  BsClipboard2Check,
  BsClipboard2CheckFill,
  BsClipboard2Fill,
  BsFillClipboard2CheckFill,
} from "react-icons/bs";
import useCopy from "use-copy";

type Props = {
  timestamp: string;
  content: string;
  hasJSCode?: boolean;
  hasExplanation?: boolean;
};

function DisplayCode({
  hasJSCode = false,
  hasExplanation = false,
  timestamp,
  content,
}: Props) {
  const [copied, copy, setCopied] = useCopy(content);

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div
      className="sm:w-[96%] flex 
flex-col overflow-y-auto"
    >
      <div
        className={cn(
          `w-[96%] h-auto shadow-md	
          rounded-lg overflow-x-auto relative code-scrollbar`,
          hasJSCode ? "bg-black" : "bg-[#1e1e1e]"
        )}
      >
        <div
          className={cn(
            `w-full h-9 
           flex items-center justify-between
          px-2 sticky top-0
          `,
            hasJSCode ? "bg-[rgb(52,53,65)]" : "bg-[rgb(50,50,50)]"
          )}
        >
          {!hasJSCode ? (
            <div className="flex">
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
          ) : (
            <div className="pl-2">
              <p className="text-[14px] text-[#ececf1]"> JavaScript </p>
            </div>
          )}

          {!hasJSCode ? (
            <div
              className="text-green-600 text-lg  
             rounded-full cursor-pointer pr-1"
              onClick={copyText}
            >
              {copied ? <BsFillClipboard2CheckFill /> : <BsClipboard2Fill />}
            </div>
          ) : (
            <div
              className="text-green-600 text-lg  
             rounded-full cursor-pointer pr-1"
              onClick={copyText}
            >
              {copied ? (
                <span className="flex flex-row items-center gap-[0.4rem] text-[#ececf1] text-sm">
                  <AiOutlineCheck /> copied
                </span>
              ) : (
                <span className="flex flex-row items-center gap-[0.4rem] text-[#ececf1] text-sm">
                  <BsClipboard2 /> Copy code
                </span>
              )}
            </div>
          )}
        </div>

        {/* CODE OUTPUT */}
        <div className="break-normal">
          <pre className="p-6 pt-4 h-auto overflow-auto break-normal whitespace-pre-line">
            <code className="text-gray-300">{content}</code>
          </pre>
          {/* <p className="p-6 pt-4 uppercase text-gray-300">{content}</p> */}
        </div>
      </div>
      {!hasExplanation && (
        <div className="flex py-1 items-end justify-start gap-2 w-full">
          <span className="text-xs text-gray-500 leading-none">
            BuddhiBot •
          </span>
          <span className="text-xs text-gray-500 leading-none">
            <TimeAgo timestamp={timestamp} />
          </span>
        </div>
      )}
    </div>
  );
}

export default DisplayCode;
