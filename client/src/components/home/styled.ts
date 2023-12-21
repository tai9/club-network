import { ScreenSizes } from "@/constants/screenSizes";
import styled from "styled-components";

export const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 44px 16px;

  @media (max-width: ${ScreenSizes.small}) {
    padding: 0px 16px 16px;
  }

  @media (max-width: ${ScreenSizes.mobile}) {
    padding: 24px 16px 16px;
    justify-content: center;

    .info {
      flex-direction: column;
      gap: 8px;
    }

    .profile-actions {
      position: absolute;
      flex-direction: column;
      right: 16px;
      top: 16px;
    }
  }
`;

export const ProfileName = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

export const NewFeedWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) 40%;
  gap: 24px;
  padding: 40px 44px 50px;

  @media (max-width: ${ScreenSizes.small}) {
    grid-template-columns: auto;
    padding: 12px 16px 20px;
  }
`;
