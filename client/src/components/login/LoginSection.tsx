import { AuthState } from "@/context/authContext";
import React from "react";
import { BsRobot } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const LoginSection = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = AuthState();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("login", await login);
      const message = await login({ email, password });
      console.log("message", message);

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className="antialiased bg-gradient-to-br from-green-100 to-white">
      <div className="px-6 mx-auto max-w-screen-xl">
        <div className="flex flex-col text-center md:flex-row  h-[calc(100vh-6rem)] justify-center items-center md:content-between gap-6 md:gap-2">
          {/* LEFT SECTION: ICONS AND HEADER */}
          <div className="flex flex-col items-center md:items-start w-full space-y-2">
            <div className="">
              <BsRobot className="text-6xl text-gray-800" />
            </div>
            <h1 className="text-5xl text-gray-800 font-bold"> BrainyChat </h1>
            <p className=" mx-auto md:mx-0 text-gray-500">
              Smart AI Chat for Instant Answers
            </p>
          </div>
          {/* RIGHT SECTION: FORM */}
          <div className="w-full md:w-full lg:w-8/12 mx-auto md:mx-0 text-left">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              {/* TITLE */}
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-5">
                Login
              </h2>
              <form action="" className="w-full" onSubmit={handleSubmit}>
                {/* EMAIL INPUT AND PASSWORD */}
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="email" className="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    placeholder="Please insert your email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                {/* PASSWORD INPUT AND PASSWORD  */}
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                {/* REGISTER IF YOU DON'T HAVE ACCOUNT */}
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="submit"
                    className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <HiOutlineLogin className="text-2xl" />
                      </div>
                      <div className="font-bold">Log in</div>
                    </div>
                  </button>
                  <div className="flex mt-4">
                    <div>
                      Don't have an account?
                      <Link
                        to="/register"
                        className="text-gray-500 font-bold hover:text-gray-400 transition-colors duration-300 ml-1"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
