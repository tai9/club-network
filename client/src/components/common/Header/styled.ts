import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px;
  align-items: center;
  position: relative;

  .pointer {
    cursor: pointer;
  }
`;

export const HeaderRoutes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 48px;
  font-size: 17px;
  line-height: 140%;

  span:hover {
    color: ${(props) => props.theme.antd.colorPrimary};
    cursor: pointer;
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
    padding: 8px 96px 8px 24px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      border-radius: 12px;
    }
  }
`;
