import React from "react";
import { Wrapper } from "./styled";
import { Flex, Progress } from "antd";
import { CalendarOutlined, TwitterOutlined } from "@ant-design/icons";
import Level from "@/components/common/Level";

const MemberInfo = () => {
  return (
    <Wrapper>
      <Flex vertical gap={12}>
        <Flex gap={8}>
          <CalendarOutlined />
          <div>Member since Jul 2023</div>
        </Flex>
        <Flex gap={8}>
          <TwitterOutlined />
          <div>Twitter</div>
        </Flex>
      </Flex>
      <Level percent={90} value={2} />
    </Wrapper>
  );
};

export default MemberInfo;
