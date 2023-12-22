import React from "react";
import { MemberCardLayout } from "./styled";
import { Flex } from "antd";
import { HighlightText } from "../common/styled";

const MemberCard = () => {
  return (
    <div>
      <MemberCardLayout>
        <div className="user-avatar">
          <div className="mask">
            <img src="https://ik.imagekit.io/n8imvdjvz/tr:w-128,h-128/https://ik.imagekit.io/n8imvdjvz/tr:w-128,h-128/https://storage.googleapis.com/uncut-fm-production/production/users/4295803694/user_1696020606.png" />
          </div>
        </div>
        <div className="body">
          <Flex vertical gap={2}>
            <div className="text1">
              tailor <span className="role">(CN)</span>
            </div>
            <HighlightText>Level 10</HighlightText>
          </Flex>
          <div>Mathematician and Generative Artist :)</div>
        </div>
      </MemberCardLayout>
    </div>
  );
};

export default MemberCard;
