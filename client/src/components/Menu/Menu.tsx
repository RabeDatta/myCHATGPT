import { AuthState } from "@/context/authContext";
import { allOptions } from "./allIOptions";
import Option from "./Option";

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
          {allOptions.map((item, index) => (
            <Option
              key={index}
              path={item.path}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Options;
