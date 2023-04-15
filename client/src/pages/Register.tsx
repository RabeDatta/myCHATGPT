import NavBar from "@/components/nav/NavBar";
import RegisterSection from "@/components/register/RegisterSection";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div>
      <NavBar />
      <RegisterSection />
    </div>
  );
};

export default Register;
