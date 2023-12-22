import { ScreenSizes } from "@/constants/screenSizes";
import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px;
  align-items: center;
  padding-left: 16px;
  gap: 16px;

  background: transparent;
  position: absolute;
  width: 100%;
  top: 0;

  .pointer {
    cursor: pointer;
  }

  @media (max-width: ${ScreenSizes.small}) {
    padding-left: 0;
  }

  @media (max-width: ${ScreenSizes.mobile}) {
    display: none;
  }
`;

export const HeaderMobile = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #060817;
  display: flex;
  gap: 32px;
  padding: 12px 16px;
  z-index: 999;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  display: none;
  @media (max-width: ${ScreenSizes.mobile}) {
    display: flex;
  }
`;

export const HeaderRoutes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  font-size: 17px;
  line-height: 140%;
  align-items: center;
  padding-left: 24px;

  a:hover {
    color: ${(props) => props.theme.antd.colorPrimary};
    cursor: pointer;
  }

  @media (max-width: ${ScreenSizes.small}) {
    gap: 24px;
  }
`;

export const AccountLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 17px;
  line-height: 140%;
`;

export const AccountHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 17px;
  font-weight: 600;
  line-height: 140%;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid rgb(98, 83, 83);
`;

export const AccountLevel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid rgb(98, 83, 83);
  .xp {
    font-size: 13px;
  }
`;

export const AccountFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 16px;

  div {
    cursor: pointer;
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid rgb(98, 83, 83);
  background: rgb(16, 16, 16);
  border-radius: 6px;
  width: 378px;
`;

export const AccountWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;

  .heading {
    font-size: 18px;
    line-height: 120%;
    font-weight: 700;
  }

  .read {
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }

  .noti-list {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    .noti-item:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    max-height: 400px;
    overflow: auto;
  }

  .noti-item {
    padding: 8px 32px 8px 24px;
    min-width: 310px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      border-radius: 12px;
    }
  }
`;

export const CustomLink = styled(Link)`
  display: flex;
  .icon {
    display: none;
  }
  .text {
    display: block;
  }
  @media (max-width: ${ScreenSizes.small}) {
    .text {
      display: none;
    }
    .icon {
      display: block;
      font-size: 24px;
    }
  }
`;
