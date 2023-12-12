import styled from "styled-components";

export const ProfileInfoWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 44px 16px;
`;

export const ProfileName = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

export const NewFeedWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) 400px;
  gap: 24px;
  padding: 40px 44px 50px;
`;
