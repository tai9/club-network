import React from "react";
import styled from "styled-components";
import Logo from "../Logo";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogoLoading = () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
};

export default LogoLoading;
