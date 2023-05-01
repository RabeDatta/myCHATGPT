import { AuthState } from "@/context/authContext";
import React, { useEffect } from "react";
import { BsRobot } from "react-icons/bs";
import { api } from "@/api/apiInstances";
import TypingAnimation from "@/components/shared/TypingAnimation";
import { cn } from "@/utils/classNames";
import TimeAgo from "@/components/shared/TimeAgo";
import { IoPersonCircleOutline } from "react-icons/io5";
import BotMessage from "@/components/shared/BotMessage";
import ChatHeader from "../shared/ChatHeader";
import DisplayImg from "./DisplayImg";
import HeaderSection from "../shared/HeaderSection";
import { SubmitButton } from "../shared/Buttons";
import UserMessage from "../shared/UserMessage";
import AssistantTypingMessage from "../shared/AssistantTypingMessage";

function SciFiImageSection() {
  const { currentUser } = AuthState();

  const [value, setValue] = React.useState("");
  const [number, setNumber] = React.useState<number>(1);
  const [assistantTyping, setAssistantTyping] = React.useState(false);

  const MAX_TEXT_VALUE = 80;

  const timestamp = new Date().toISOString();

  const [conversation, setConversation] = React.useState<
    {
      role: string;
      content: string | null;
      data?: string;
      timestamp: string;
      name?: string;
    }[]
  >([
    {
      role: "assistant",
      content: `Hello${
        currentUser ? `, ${currentUser.username}` : ""
      }! Welcome to Image generator.`,
      timestamp,
    },
  ]);

  console.log("conversation", conversation);
  const wait = async (time: number) =>
    new Promise((res) => setTimeout(res, time));

  const handleClick = async () => {
    try {
      setConversation((prev) => [
        ...prev,
        { role: "user", content: value, timestamp },
      ]);
      setAssistantTyping(true); // Set assistant typing status to true

      await wait(1000);

      const { data } = await api.post("/openAI/scifi-image", {
        value,
        total: number,
      });

      setValue("");
      setAssistantTyping(false);
      setConversation((prev) => [...prev, data.message]);
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
      console.log(e);
    } finally {
      setAssistantTyping(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-white items-center py-7 min-h-[89.7vh]">
      <div className="flex flex-col items-center justify-center px-6 mx-auto max-w-screen-xl gap-8">
        {/* HEADER */}
        <HeaderSection
          title="SciFi Image"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            cupiditate numquam incidunt quia tempore, doloribus delectus vel."
        />
        {/* MESSAGE BOX & TEXTAREA */}
        <div
          className="flex flex-col flex-grow w-full sm:max-w-[50rem] shadow-xl 
      rounded-lg overflow-hidden bg-white min-h-[660px] h-auto"
        >
          {/* CHAT HEADER */}
          <ChatHeader botName="SciFi Image generator bot" />

          {/* DISPLAYED MESSAGE SECTION */}
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {conversation.map((detail, index) => {
              const isUser = detail.role === "user";

              return isUser ? (
                // USER MESSAGE
                <UserMessage
                  content={detail.content as string}
                  timestamp={detail.timestamp}
                />
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
                      {detail.content && (
                        <BotMessage
                          timestamp={detail.timestamp}
                          content={detail.content}
                        />
                      )}
                      {detail.data && (
                        <DisplayImg
                          name={detail.name || "Photo"}
                          timestamp={detail.timestamp}
                          data={detail.data}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LOADING MESSAGE */}
            {assistantTyping && <AssistantTypingMessage />}
          </div>
          {/* TEXTAREA SECTION  */}
          <div className="bg-gray-200/60 p-4 flex flex-col">
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor=""> # of Imgs: </label>
                <select
                  className="w-28 px-2 outline-none"
                  value={number}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setNumber(Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={cn(
                  `flex items-center w-full rounded 
                px-3 py-2 pr-7 text-lg relative outline-none resize-none transition-[min-height] duration-400 min-h-[4rem] focus:border-green-500`,

                  value.length === MAX_TEXT_VALUE
                    ? "border-2 border-red-600"
                    : null
                )}
                placeholder="Type your Paragraph here..."
                maxLength={MAX_TEXT_VALUE}
              />
            </div>

            {/* SUBMIT BTN */}
            <div className="flex justify-between items-center  mt-2 px-1">
              <span
                className={cn(
                  value.length === MAX_TEXT_VALUE ? "text-red-600" : null
                )}
              >
                {value.length} / {MAX_TEXT_VALUE}
              </span>

              <SubmitButton
                content="Generate"
                handleClick={handleClick}
                hasValue={Boolean(value.trim())}
                isAssistantTyping={assistantTyping}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SciFiImageSection;
