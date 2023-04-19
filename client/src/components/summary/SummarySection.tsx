import { AuthState } from "@/context/authContext";
import React from "react";
import { BsRobot } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { api } from "@/api/apiInstances";

function SummarySection() {
  const { currentUser } = AuthState();
  const [paragraph, setParagraph] = React.useState("");

  const handleClick = async () => {
    try {
      await api.post("/openAI/summary", paragraph);
    } catch (e) {
      console.log(e);
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
            Soluta facere nemo harum est totam iure labore modi blanditiis
            neque, sunt sint.
          </p>
        </div>
        {/* MESSAGE BOX & TEXTAREA */}
        <div
          className="flex flex-col flex-grow w-full sm:max-w-xl shadow-xl 
    rounded-lg overflow-hidden pt-4 bg-white min-h-[620px] h-auto"
        >
          {/* DISPLAYED MESSAGE SECTION */}
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {/* BOT */}
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
                <div className="absolute w-full h-full top-0 left-1">
                  <BsRobot className="text-3xl text-gray-800" />
                </div>
              </div>
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">Hello, {currentUser?.username}</p>
                </div>
                <div className="flex py-1 items-end justify-start gap-2 w-full">
                  <span className="text-xs text-gray-500 leading-none">
                    BrainyBot •
                  </span>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
            </div>
            {/* BOT */}
            <div className="flex w-full mt-2 space-x-3 max-w-xs">
              <div className="flex-shrink-0 h-10 w-10 rounded-full relative">
                <div className="absolute w-full h-full top-0 left-1">
                  <BsRobot className="text-3xl text-gray-800" />
                </div>
              </div>
              <div>
                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                  <p className="text-sm">
                    Please enter the text you want to summarize.
                  </p>
                </div>
                <div className="flex py-1 items-end justify-start gap-2 w-full">
                  <span className="text-xs text-gray-500 leading-none">
                    BrainyBot •
                  </span>
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
            </div>
            {/* ME */}
            <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
              <div>
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod.
                  </p>
                </div>
                <div className="flex py-1 items-end justify-end gap-2 w-full">
                  <span className="text-xs text-gray-500 leading-none">
                    2 min ago
                  </span>
                  <span className="text-xs text-gray-500 leading-none">
                    • {currentUser?.username}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
            {/* ME */}
            <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
              <div>
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="flex py-1 items-end justify-end gap-2 w-full">
                  <span className="text-xs text-gray-500 leading-none">
                    3 min ago
                  </span>
                  <span className="text-xs text-gray-500 leading-none">
                    • {currentUser?.username}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
          </div>
          {/* TEXTAREA SECTION  */}
          <div className="bg-gray-200/60 p-4 relative">
            <textarea
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              className="flex items-center min-h-[12.5rem] w-full rounded 
              px-3 py-2 text-lg relative outline-none"
              placeholder="Type your Paragraph here..."
              maxLength={1200}
            />
            <button
              onClick={handleClick}
              className="absolute bottom-6 right-9 border-2 bg-white z-10
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
  );
}

export default SummarySection;
