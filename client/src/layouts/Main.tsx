import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ScreenSizes } from "@/constants/screenSizes";
import useClubNetwork from "@/hooks/useClubNetwork";
import { LayoutProps } from "@/types/common";
import { UpOutlined, UserOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/router";
import styled from "styled-components";

const SpaceGroteskFont = Space_Grotesk({ subsets: ["latin"] });

export const MainLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const path = router.asPath;
  const displayFooter = !path.includes("/all-profiles");

  const { onlineUsers } = useClubNetwork();

  return (
    <Wrapper className={`${SpaceGroteskFont.className}`}>
      <Header />

      <Main path={path} className="grow">
        {children}
      </Main>

      <FloatButton.BackTop
        icon={<UpOutlined />}
        style={{
          bottom: 150,
          right: 80,
        }}
      />

      <FloatButton
        tooltip={<div>Online users</div>}
        badge={{ count: onlineUsers.length, color: "#52c41a" }}
        style={{
          bottom: 80,
          right: 80,
        }}
        icon={<UserOutlined />}
      />
      {displayFooter && <Footer />}
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
