import React from "react";
import { LandingLayout } from "./styled";
import Hero from "./Hero";
import Members from "./Members";
import Info from "./Info";

const LandingPage = () => {
  return (
    <LandingLayout>
      <Hero />
      <Members />
      <Info />
    </LandingLayout>
  );
};

export default LandingPage;
