import React from "react";
import { Wrapper } from "./styled";
import { Flex, Progress } from "antd";
import { CalendarOutlined, TwitterOutlined } from "@ant-design/icons";
import Level from "@/components/common/Level";
import moment from "moment";
import useMember from "@/hooks/useMember";

const MemberInfo = () => {
  const { data: memberData } = useMember();
  return (
    <Wrapper>
      <Flex vertical gap={12}>
        <Flex gap={8}>
          <CalendarOutlined />
          <div>
            Member since {moment(memberData?.data.createdAt).format("MMM YYYY")}
          </div>
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
