import React from "react";
import { Wrapper } from "./styled";
import { Flex, Progress } from "antd";
import { CalendarOutlined, TwitterOutlined } from "@ant-design/icons";
import Level from "@/components/common/Level";
import moment from "moment";
import { useMemberExp, useMemberById } from "@/hooks/useMember";
import { useParams } from "next/navigation";

const MemberInfo = () => {
  const params = useParams();
  const id = params?.id as string;
  const { data: memberData } = useMemberById(+id);
  const { data: levelData } = useMemberExp();

  return (
    <Wrapper>
      <Flex vertical gap={12}>
        <Flex gap={8}>
          <CalendarOutlined />
          <div>
            Member since {moment(memberData?.createdAt).format("MMM YYYY")}
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
