import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { LayoutProps } from "@/types/common";
import { Space_Grotesk } from "next/font/google";
import styled from "styled-components";

const font = Space_Grotesk({ subsets: ["latin"] });
export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <Wrapper className={`${font.className}`}>
      <Header />

      <Main className="grow">{children}</Main>

      <Footer />
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .grow {
    flex-grow: 1;
  }
`;

export const Main = styled.main`
  flex-grow: 1;

  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;
