import { AuthState } from "@/context/authContext";
import React from "react";
import {
  BsChatHeart,
  BsChatLeftDots,
  BsFileEarmarkRichtext,
  BsFillChatHeartFill,
  BsImages,
  BsTextParagraph,
} from "react-icons/bs";
import { SiConvertio } from "react-icons/Si";
import { Link } from "react-router-dom";

const Options = () => {
  const { currentUser } = AuthState();

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white h-full">
      <div className="px-6 mx-auto max-w-screen-xl py-6">
        {/* GREETINGS */}
        <div>
          <h1 className="text-4xl text-gray-800 font-bold flex gap-2 items-center">
            Hello,{currentUser?.username} <span className="wave"> 👋🏼 </span>
          </h1>
          <p className="text-xl text-gray-500 pt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            cupiditate numquam incidunt quia tempore, doloribus delectus vel.
            Soluta facere nemo harum est totam iure labore modi blanditiis
            neque, sunt sint.
          </p>
        </div>

        {/* OPTIONS */}
        <h3 className="text-4xl font-bold text-green-400 text-center mt-6 uppercase menu">
          Menu
        </h3>

        <div className="pt-8 my-4 grid max-w-[60ch] gap-y-10 md:max-w-none md:grid-cols-2 md:grid-rows-2 md:gap-y-12 md:gap-x-8">
          {/* SUMMARY  */}
          <Link
            to="/summary"
            className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-white/40 p-4 pt-6 hover:border-white/80 dark:border-gray-800 hover:dark:border-gray-600 md:p-6"
          >
            <h2 className="text-green-400 text-2xl font-bold tracking-tight group-hover:underline">
              Text Summary
            </h2>
            <p>
              Start with the tutorial. It will quickly introduce you to the
              primary features of React Router: from configuring routes, to
              loading and mutating data, to pending and optimistic UI.
            </p>
            <div className="absolute top-[-35px] right-[-3px] bg-gray-100 p-4 rounded-full">
              <BsFileEarmarkRichtext size={60} className="text-green-400" />
            </div>
          </Link>
          {/* PARAGRAPH */}
          <Link
            to="/keypoints"
            className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-gray-50 p-4 pt-6 hover:border-gray-100 dark:border-gray-800 hover:dark:border-gray-600 md:p-6"
          >
            <h2 className="text-green-500 text-2xl font-bold tracking-tight group-hover:underline">
              Study Notes
            </h2>
            <p>
              Start with the tutorial. It will quickly introduce you to the
              primary features of React Router: from configuring routes, to
              loading and mutating data, to pending and optimistic UI.
            </p>
            <div className="absolute top-[-35px] right-[-3px] bg-gray-100 p-3 rounded-full">
              <BsTextParagraph size={60} className="text-green-400" />
            </div>
          </Link>
          {/* CHAT */}
          <Link
            to="/sql-query"
            className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-gray-50 p-4 pt-6 hover:border-gray-100 dark:border-gray-800 hover:dark:border-gray-600 md:p-6"
          >
            <h2 className="text-green-500 text-2xl font-bold tracking-tight group-hover:underline">
              SQL Query Generator{" "}
              {/* <sup className="text-sm py-1 px-2 bg-green-200/60 rounded-lg hover:no-underline">
                {" "}
                new{" "}
              </sup> */}
            </h2>
            <p>
              Start with the tutorial. It will quickly introduce you to the
              primary features of React Router: from configuring routes, to
              loading and mutating data, to pending and optimistic UI.
            </p>
            <div className="absolute top-[-35px] right-[-3px] bg-gray-100 p-4 rounded-full">
              <BsChatLeftDots size={50} className="text-green-400" />
            </div>
          </Link>
          {/* JS CONVERTER */}
          <Link
            to="/"
            className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-gray-50 p-4 pt-6 hover:border-gray-100 dark:border-gray-800 hover:dark:border-gray-600 md:p-6"
          >
            <h2 className="text-green-500 text-2xl font-bold tracking-tight group-hover:underline">
              JS Converter
            </h2>
            <p>
              Start with the tutorial. It will quickly introduce you to the
              primary features of React Router: from configuring routes, to
              loading and mutating data, to pending and optimistic UI.
            </p>
            <div className="absolute top-[-35px] right-[-3px] bg-gray-100 p-4 rounded-full">
              <SiConvertio size={60} className="text-green-400" />
            </div>
          </Link>
          {/* IMAGE */}
          <Link
            to="/"
            className="group relative flex flex-col gap-1 rounded-lg border-[3px] border-gray-50 p-4 pt-6 hover:border-gray-100 dark:border-gray-800 hover:dark:border-gray-600 md:p-6"
          >
            <h2 className="text-green-500 text-2xl font-bold tracking-tight group-hover:underline">
              Sci-fi Image
            </h2>
            <p>
              Start with the tutorial. It will quickly introduce you to the
              primary features of React Router: from configuring routes, to
              loading and mutating data, to pending and optimistic UI.
            </p>
            <div className="absolute top-[-35px] right-[-3px] bg-gray-100 p-4 rounded-full">
              <BsImages size={60} className="text-green-400" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Options;
