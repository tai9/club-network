import { Flex } from "antd";
import styled from "styled-components";

export const PostsSectionWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;

  .post {
    transition: background-color 500ms ease-out 0s;
  }
  .post:hover {
    background-color: rgba(255, 255, 255, 0.17);
    cursor: pointer;
  }
`;

export const Section1 = styled.div`
  border-radius: 4px;
  padding: 11px 16px 11px 14px;
  background-color: rgba(255, 255, 255, 0.07);
  transition: background-color 500ms ease-out 0s;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.17);
    cursor: pointer;
  }
`;

export const PostWrapper = styled(Flex)`
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 8px;

  .name {
    font-size: 15px;
    line-height: 120%;
    color: rgb(252, 248, 242);
    font-weight: 600;
  }
  .role {
    font-size: 13px;
    line-height: 140%;
    color: rgb(204, 198, 189);
    font-weight: 400;
  }
  .time {
    font-size: 13px;
    color: #ccc6bd;
  }
`;

export const MoreLink = styled(Flex)`
  color: #fcf8f2;
  font-size: 12px;
  transition: all 0.3s ease 0s;

  &:hover {
    text-decoration: underline;
  }
`;
