import { Flex, Progress, Tooltip } from "antd";
import React, { useMemo } from "react";
import { HighlightText } from "../styled";
import { useLevels } from "@/hooks/useLevels";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

type Props = {
  exp: number;
};

const Level = ({ exp }: Props) => {
  const { data } = useLevels();

  const currentLevel = useMemo(
    () => data?.data.find((x) => exp <= x.targetPoint),
    [data?.data, exp]
  );
  const percent = useMemo(
    () => (currentLevel ? (exp * 100) / currentLevel?.targetPoint : 0),
    [currentLevel, exp]
  );

  return (
    <Flex vertical gap={8}>
      <HighlightText fontSize={20}>{currentLevel?.name}</HighlightText>
      <Tooltip title={`${currentLevel?.description}: ${exp} XP`}>
        <Progress percent={percent} strokeColor={twoColors} status="active" />
      </Tooltip>
    </Flex>
  );
};

export default Level;
