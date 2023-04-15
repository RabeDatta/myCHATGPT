import LoginSection from "@/components/login/LoginSection";
import NavBar from "@/components/nav/NavBar";
import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div>
      <NavBar />
      <LoginSection />
    </div>
  );
};

export default Login;
