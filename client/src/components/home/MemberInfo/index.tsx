import React from "react";
import { Wrapper } from "./styled";
import { Flex, Progress } from "antd";
import { CalendarOutlined, TwitterOutlined } from "@ant-design/icons";
import Level from "@/components/common/Level";
import moment from "moment";
import useMember from "@/hooks/useMember";
import { useMyLevel } from "@/hooks/useLevels";

const MemberInfo = () => {
  const { data: memberData } = useMember();
  const { data: levelData } = useMyLevel();

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
      <Level exp={levelData?.exp || 0} />
    </Wrapper>
  );
};

export default MemberInfo;
