import { AuthState } from "@/context/authContext";
import React, { useEffect } from "react";
import { BsRobot } from "react-icons/bs";
import { api } from "@/api/apiInstances";
import TypingAnimation from "@/components/shared/TypingAnimation";
import { cn } from "@/utils/classNames";
import TimeAgo from "@/components/shared/TimeAgo";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdZoomInMap, MdZoomOutMap } from "react-icons/md";
import DOMPurify from "dompurify";
import ChatHeader from "../shared/ChatHeader";
import HeaderSection from "../shared/HeaderSection";
import { handleUnauthorized } from "@/utils/handleError";
import { useNavigate } from "react-router-dom";
import UserMessage from "../shared/UserMessage";
import AssistantTypingMessage from "../shared/AssistantTypingMessage";

function NotesSection() {
  const { currentUser, checkAuthStatus } = AuthState();
  const navigate = useNavigate();

  const [value, setValue] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [assistantTyping, setAssistantTyping] = React.useState(false);

  const MAX_TEXT_VALUE = 80;

  const timestamp = new Date().toISOString();

  const [conversation, setConversation] = React.useState<
    {
      role: string;
      content: string;
      listContent?: boolean;
      timestamp: string;
    }[]
  >([
    {
      role: "assistant",
      content: `Hello${
        currentUser ? `, ${currentUser.username}` : ""
      }! I help you to generate keys points about topic!`,
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
      const { data } = await api.post("/openAI/wiki", { value });
      setValue("");

      // Simulate typing delay using setTimeout
      setTimeout(() => {
        setAssistantTyping(false);
        setConversation((prev) => {
          return [...prev, data.message];
        });
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
          title="Notes"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            cupiditate numquam incidunt quia tempore, doloribus delectus vel."
        />
        {/* MESSAGE BOX & TEXTAREA */}
        <div
          className="flex flex-col flex-grow w-full sm:max-w-3xl shadow-xl 
    rounded-lg overflow-hidden   bg-white min-h-[660px] h-auto"
        >
          <ChatHeader botName="Study Points Bot" />
          {/* DISPLAYED MESSAGE SECTION */}
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {conversation.map((detail, index) => {
              const isUser = detail.role === "user";

              const sanitizedData = () => ({
                __html: DOMPurify.sanitize(detail.content),
              });

              return isUser ? (
                // USER MESSAGE
                <UserMessage
                  content={detail.content}
                  timestamp={detail.timestamp}
                />
              ) : (
                // ASSISTANT MESSAGE
                <div key={index}>
                  <div className="flex w-full mt-2 space-x-3 max-w-lg">
                    {/* PROFILE PIC */}
                    <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
                      <div className="absolute w-full h-full top-0 left-1">
                        <BsRobot className="text-3xl text-gray-800" />
                      </div>
                    </div>
                    {/* MESSAGE */}
                    <div>
                      <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        {/* <p className="text-sm">{detail.content}</p> */}
                        {detail.listContent ? (
                          <div
                            dangerouslySetInnerHTML={sanitizedData()}
                            className="p-4 pt-1 pb-1 space-y-2"
                          />
                        ) : (
                          <p>{detail.content}</p>
                        )}
                      </div>

                      <div className="flex py-1 items-end justify-start gap-2 w-full">
                        <span className="text-xs text-gray-500 leading-none">
                          BuddhiBot •
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

            {/* LOADING MESSAGE */}
            {assistantTyping && <AssistantTypingMessage />}
          </div>
          {/* TEXTAREA SECTION  */}
          <div className="bg-gray-200/60 p-4 relative flex flex-col">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={cn(
                `flex items-center min-h-[12.5rem] w-full rounded 
              px-3 py-2 pr-7 pt-4 text-lg relative outline-none resize-none transition-[min-height] duration-400`,
                isExpanded ? "min-h-[8rem]" : "min-h-[5rem]",
                value.length === MAX_TEXT_VALUE
                  ? "border-2 border-red-600"
                  : null
              )}
              placeholder="Type your Topic here..."
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
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesSection;
