import React from "react";

function MenuLoadingSection() {
  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white h-full">
      <div className="px-6 mx-auto max-w-screen-xl py-6">
        {/* GREETINGS */}
        <div>
          <h1 className="text-4xl text-gray-800 font-bold flex gap-2 items-center animate-pulse">
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </h1>
          <p className="text-xl text-gray-500 pt-2 animate-pulse">
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          </p>
        </div>

        {/* OPTIONS */}
        <h3 className="text-4xl font-bold text-green-400 text-center mt-6 uppercase menu">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-green-200 rounded"> </div>
          </div>
        </h3>

        <div className="pt-8 my-4 grid max-w-[60ch] gap-y-10 md:max-w-none md:grid-cols-2 md:grid-rows-2 md:gap-y-12 md:gap-x-8">
          {new Array(6).fill(0).map((_, index) => (
            <div className="flex flex-col gap-1 rounded-lg border-[3px] border-gray-100 p-4 pt-6 md:p-6">
              {/* Skeleton Loading */}
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuLoadingSection;
