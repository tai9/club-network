import { ScreenSizes } from "@/constants/screenSizes";
import { Flex } from "antd";
import styled from "styled-components";

export const FooterLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 66px 32px 32px;
  background-color: rgb(21, 21, 21);
  width: 100%;
  overflow: hidden;
  position: relative;
  border-top: 1px solid rgba(252, 248, 242, 0.2);

  .footer-main {
    display: flex;
    justify-content: space-between;
    gap: 32px;
  }

  .footer-bottom {
    justify-content: flex-end;
  }

  @media (max-width: ${ScreenSizes.mobile}) {
    margin-bottom: 52px;
    .footer-main {
      flex-direction: column;
    }
    .footer-bottom {
      justify-content: flex-start;
    }
  }
`;
