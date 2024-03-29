import { ScreenSizes } from "@/constants/screenSizes";
import styled from "styled-components";

export const ProfilesWrapper = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;
  padding: 0 16px;
  padding-bottom: 64px;

  .heading {
    font-size: 56px;
    line-height: 120%;
    text-transform: unset;
    text-align: center;
    font-weight: 600;
  }

  @media (max-width: ${ScreenSizes.small}) {
    gap: 24px;
  }
`;

export const ProfileList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 1rem;
  width: 100%;
  -webkit-box-flex: 1;
  flex-grow: 1;

  @media (max-width: ${ScreenSizes.small}) {
    gap: 8px;
  }
`;

export const ProfileCardLayout = styled.div`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: rgba(255, 253, 253, 0.06) 0px 0px 0px 1px;
  padding: 12px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: background-color 500ms ease-out 0s;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  .price-section {
    padding: 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
  }
`;

export const TicketName = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    border-radius: 6px;
  }
`;
