import { Flex, Progress } from "antd";
import React from "react";
import { HighlightText } from "../styled";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

type Props = {
  value: number;
  percent: number;
};

const Level = ({ value, percent }: Props) => {
  return (
    <Flex vertical gap={8}>
      <HighlightText>Level {value}</HighlightText>
      <Progress percent={percent} strokeColor={twoColors} />
    </Flex>
  );
};

export default Level;
