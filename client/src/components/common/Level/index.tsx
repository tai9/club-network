import { Flex, Progress, Tooltip } from "antd";
import React, { useMemo } from "react";
import { HighlightText } from "../styled";
import { useLevels } from "@/hooks/useLevels";
import { ILevel } from "@server/types/Level";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

type Props = {
  exp: number;
  showProgress?: boolean;
};

const Level = ({ exp, showProgress }: Props) => {
  const { data } = useLevels(exp);
  const currentLevel = useMemo(() => data as ILevel, [data]);

  const percent = useMemo(
    () => (currentLevel ? (exp * 100) / currentLevel?.targetPoint : 0),
    [currentLevel, exp]
  );

  return (
    <Flex vertical gap={8}>
      <HighlightText fontSize={20}>{currentLevel?.name}</HighlightText>
      {showProgress && (
        <Tooltip title={`${currentLevel?.description}: ${exp} XP`}>
          <Progress
            percent={+percent.toFixed(2)}
            strokeColor={twoColors}
            status="active"
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default Level;
