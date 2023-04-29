import { AuthState } from "@/context/authContext";
import React from "react";
import { BsRobot } from "react-icons/bs";
import { api } from "@/api/apiInstances";
import TypingAnimation from "@/components/shared/TypingAnimation";
import { cn } from "@/utils/classNames";
import TimeAgo from "@/components/shared/TimeAgo";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdZoomInMap, MdZoomOutMap } from "react-icons/md";
import DisplayCode from "@/components/shared/DisplayCode";
import BotMessage from "@/components/shared/BotMessage";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../shared/ChatHeader";
import HeaderSection from "../shared/HeaderSection";
import { toast } from "react-hot-toast";
import { handleUnauthorized } from "@/utils/handleError";

function JSConverterSection() {
  const { currentUser, checkAuthStatus } = AuthState();

  const [value, setValue] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [assistantTyping, setAssistantTyping] = React.useState(false);

  const MAX_TEXT_VALUE = 600;

  const timestamp = new Date().toISOString();
  const navigate = useNavigate();

  const [conversation, setConversation] = React.useState<
    {
      role: string;
      content: string;
      timestamp: string;
      jsCode?: null | string;
      explanation?: null | string;
    }[]
  >([
    {
      role: "assistant",
      content: `Hello${
        currentUser ? `, ${currentUser.username}` : ""
      }! Welcome to SQL query generator.`,
      timestamp,
    },
    {
      role: "assistant",
      content: "Please enter the text you'd like to generator SQL query for: ",
      timestamp,
    },
  ]);

  console.log("conversation", conversation);

  const handleClick = async () => {
    try {
      setConversation((prev) => [
        ...prev,
        { role: "user", content: value, timestamp },
      ]);
      setAssistantTyping(true); // Set assistant typing status to true
      const { data } = await api.post("/openAI/js-converter", { value });
      setValue("");

      // Simulate typing delay using setTimeout
      setTimeout(() => {
        setAssistantTyping(false);
        setConversation((prev) => [...prev, data.message]);
      }, 1000 * Math.random() + 300);
    } catch (e: any) {
      setAssistantTyping(false);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The chatbot is currently at maximum capacity and cannot handle any more requests at this time. Please try again later.",
          timestamp,
        },
      ]);
      setValue("");
      const statusCode = e.response.status;
      console.log(statusCode);
      console.log(e);
      handleUnauthorized(statusCode, checkAuthStatus, navigate, "login");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-white items-center py-7 min-h-[89.7vh]">
      <div className="flex flex-col items-center justify-center px-6 mx-auto max-w-screen-xl gap-8">
        {/* HEADER */}
        <HeaderSection
          title="JS Converter"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            cupiditate numquam incidunt quia tempore, doloribus delectus vel."
        />
        {/* MESSAGE BOX & TEXTAREA */}
        <div
          className="flex flex-col flex-grow w-full sm:max-w-3xl shadow-xl 
      rounded-lg overflow-hidden bg-white min-h-[660px] h-auto"
        >
          {/* CHAT HEADER */}
          <ChatHeader botName="JS Converter Bot" />

          {/* DISPLAYED MESSAGE SECTION */}
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {conversation.map((detail, index) => {
              const isUser = detail.role === "user";
              console.log("current Date: ", detail.timestamp);

              return isUser ? (
                // USER MESSAGE
                <div key={index}>
                  <div className="flex w-full mt-2 space-x-3 sm:max-w-[93%] ml-auto justify-end">
                    {/* MESSAGE */}
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
                    {/* PROFILE PIC */}
                    <div className="flex-shrink-0 h-10 w-10 rounded-full">
                      <IoPersonCircleOutline size={40} />
                    </div>
                  </div>
                </div>
              ) : (
                // ASSISTANT MESSAGE
                <div key={index}>
                  <div className="flex w-full mt-2 space-x-3 max-w-full">
                    {/* PROFILE PIC */}
                    <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
                      <div className="absolute w-full h-full top-0 left-1">
                        <BsRobot className="text-3xl text-gray-800" />
                      </div>
                    </div>
                    {/* MESSAGE & CODE CONTAINER */}
                    <div className="w-full flex flex-col gap-2">
                      {/* MESSAGE */}
                      {!detail.jsCode &&
                        !detail.explanation &&
                        detail.content && (
                          <BotMessage
                            timestamp={detail.timestamp}
                            content={detail.content}
                          />
                        )}

                      {detail.jsCode && (
                        <DisplayCode
                          hasJSCode
                          hasExplanation
                          timestamp={detail.timestamp}
                          content={detail.jsCode}
                        />
                      )}

                      {detail.explanation && (
                        <BotMessage
                          timestamp={detail.timestamp}
                          content={detail.explanation}
                        />
                      )}
                      {/* CODE DISPLAY */}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LOADING MESSAGE */}
            {assistantTyping && (
              <div>
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
              </div>
            )}
          </div>
          {/* TEXTAREA SECTION  */}
          <div className="bg-gray-200/60 p-4 relative flex flex-col">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={cn(
                `flex items-center min-h-[12.5rem] w-full rounded 
                px-3 py-2 pr-7 pt-4 text-lg relative outline-none resize-none transition-[min-height] duration-400`,
                isExpanded ? "min-h-[8rem]" : "min-h-[4rem]",
                value.length === MAX_TEXT_VALUE
                  ? "border-2 border-red-600"
                  : null
              )}
              placeholder="Type your Paragraph here..."
              maxLength={MAX_TEXT_VALUE}
            />

            {/* EXPAND ICON */}
            <span
              className="absolute right-8 top-5 cursor-pointer hover:bg-gray-200 p-2 rounded-full z-50 bg-white"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <MdZoomOutMap /> : <MdZoomInMap />}
            </span>

            {/* SUBMIT BTN */}
            <div className="flex justify-between items-center  mt-2 px-1">
              <span
                className={cn(
                  value.length === MAX_TEXT_VALUE ? "text-red-600" : null
                )}
              >
                {value.length} / {MAX_TEXT_VALUE}
              </span>
              <button
                disabled={!value.length || assistantTyping}
                onClick={handleClick}
                className={cn(
                  `border-2 bg-white z-10
                    py-1 px-5 rounded-lg border-green-300 text-green-300  
                   hover:bg-green-300 hover:text-white transition-all`,
                  assistantTyping ? "cursor-not-allowed " : null
                )}
              >
                Translate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JSConverterSection;
