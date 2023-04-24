import { AuthState } from "@/context/authContext";
import React, { useEffect } from "react";
import { BsRobot } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { api } from "@/api/apiInstances";
import TypingAnimation from "@/shared/TypingAnimation";
import { cn } from "@/utils/classNames";
import { parseDate, timeSince } from "@/utils/relativeDates";
import TimeAgo from "@/shared/TimeAgo";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdZoomInMap, MdZoomOutMap } from "react-icons/md";

function SummarySection() {
  const { currentUser } = AuthState();

  const [value, setValue] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const MAX_TEXT_VALUE = 1200;

  // const timestamp = new Date().toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  const timestamp = new Date().toISOString();

  const [conversation, setConversation] = React.useState<
    { role: string; content: string; timestamp: string }[]
  >([
    {
      role: "assistant",
      content: `Hello${
        currentUser ? `, ${currentUser.username}` : ""
      }! Welcome to the summarization chat. I can help you summarize any text you like. Simply enter your text and I'll provide you with a concise summary.`,
      timestamp,
    },
    {
      role: "assistant",
      content: "Please enter the text you'd like me to summarize: ",
      timestamp,
    },
  ]);

  const [loading, setLoading] = React.useState(false);

  console.log(conversation);

  const handleClick = async (e: React.MouseEventHandler<HTMLButtonElement>) => {
    try {
      setLoading(true);
      setConversation((prev) => [
        ...prev,
        { role: "user", content: value, timestamp },
      ]);
      const { data } = await api.post("/openAI/summary", { value });
      setValue("");
      setConversation((prev) => [...prev, data.message]);
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-white items-center py-7 h-[calc(100vh-7rem)]">
      <div className="flex flex-col items-center justify-center px-6 mx-auto max-w-screen-xl gap-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl text-gray-800 font-bold flex gap-2 items-center">
            Text summary generator
          </h1>
          <p className="text-xl text-gray-500 pt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            cupiditate numquam incidunt quia tempore, doloribus delectus vel.
          </p>
        </div>
        {/* MESSAGE BOX & TEXTAREA */}
        <div
          className="flex flex-col flex-grow w-full sm:max-w-2xl shadow-xl 
    rounded-lg overflow-hidden pt-4 bg-white min-h-[620px] h-auto"
        >
          {/* DISPLAYED MESSAGE SECTION */}
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {conversation.map((detail, index) => {
              const isUser = detail.role === "user";
              console.log("current Date: ", detail.timestamp);

              return isUser ? (
                // USER MESSAGE
                <div key={index}>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{detail.content}</p>
                      </div>
                      <div className="flex py-1 items-end justify-end gap-2 w-full">
                        <span className="text-xs text-gray-500 leading-none">
                          <TimeAgo timestamp={detail.timestamp} />
                        </span>
                        <span className="text-xs text-gray-500 leading-none">
                          • {currentUser?.username}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 h-10 w-10 rounded-full">
                      <IoPersonCircleOutline size={40} />
                    </div>
                  </div>
                </div>
              ) : (
                // ASSISTANT MESSAGE
                <div key={index}>
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
                      <div className="absolute w-full h-full top-0 left-1">
                        <BsRobot className="text-3xl text-gray-800" />
                      </div>
                    </div>
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{detail.content}</p>
                      </div>

                      <div className="flex py-1 items-end justify-start gap-2 w-full">
                        <span className="text-xs text-gray-500 leading-none">
                          BrainyBot •
                        </span>
                        <span className="text-xs text-gray-500 leading-none">
                          <TimeAgo timestamp={detail.timestamp} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* TEXTAREA SECTION  */}
          <div className="bg-gray-200/60 p-4 relative flex flex-col">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={cn(
                `flex items-center min-h-[12.5rem] w-full rounded 
              px-3 py-2 pr-7 pt-4 text-lg relative outline-none resize-none transition-[min-height] duration-400`,
                isExpanded ? "min-h-[30.5rem]" : "min-h-[10.5rem]",
                value.length === MAX_TEXT_VALUE
                  ? "border-2 border-red-600"
                  : null
              )}
              placeholder="Type your Paragraph here..."
              maxLength={1200}
            />

            <span
              className="absolute right-8 top-5 cursor-pointer hover:bg-gray-200 p-2 rounded-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <MdZoomOutMap /> : <MdZoomInMap />}
            </span>

            {/* submit btn */}
            <div className="flex justify-between items-center  mt-2">
              <span
                className={cn(
                  value.length === MAX_TEXT_VALUE ? "text-red-600" : null
                )}
              >
                {value.length} / {MAX_TEXT_VALUE}
              </span>
              <button
                onClick={handleClick}
                className="border-2 bg-white z-10
             py-1 px-5 rounded-lg border-green-300 text-green-300  
            hover:bg-green-300 hover:text-white transition-all"
              >
                {" "}
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummarySection;
