import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ScreenSizes } from "@/constants/screenSizes";
import { LayoutProps } from "@/types/common";
import { UpOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/router";
import styled from "styled-components";

const SpaceGroteskFont = Space_Grotesk({ subsets: ["latin"] });

export const MainLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <Wrapper className={`${SpaceGroteskFont.className}`}>
      <Header />

      <Main path={path} className="grow">
        {children}
      </Main>
      <FloatButton.BackTop
        icon={<UpOutlined />}
        style={{
          bottom: 90,
        }}
      />
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

  @media (max-width: ${ScreenSizes.mobile}) {
    padding-top: 24px;
  }
`;

export const Main = styled.main<{ path: string }>`
  flex-grow: 1;
  padding-top: ${(p) => (p.path === "/" ? 0 : "82px")};
  max-width: ${(p) => (p.path === "/" ? "auto" : "1100px")};
  margin: 0 auto;
  width: 100%;
`;
