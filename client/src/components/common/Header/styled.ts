import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  align-items: center;
`;

export const HeaderRoutes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
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
