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

      <main className="grow">{children}</main>

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
