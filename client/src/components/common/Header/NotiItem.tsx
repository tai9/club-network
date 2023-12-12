import { Flex } from "antd";
import React from "react";
import CustomAvatar from "../CustomAvatar";

const NotiItem = () => {
  return (
    <Flex className="noti-item" align="center" gap={8}>
      <CustomAvatar />
      <Flex vertical>
        <div>
          <b>Tailor </b> like your <b>post</b>
        </div>
        <i
          style={{
            fontSize: 13,
            color: "#ccc6bd",
          }}
        >
          Hi there
        </i>
        <div
          style={{
            fontSize: 13,
            color: "#ccc6bd",
          }}
        >
          4 days ago
        </div>
      </Flex>
    </Flex>
  );
};

export default NotiItem;
