import { Avatar, Input } from "antd";
import {
  AccountFooter,
  AccountHeading,
  AccountInfo,
  AccountLayout,
  AccountLevel,
  AccountWrapper,
  HeaderRoutes,
  Wrapper,
} from "./styled";
import { BellOutlined, RedditOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { HighlightText } from "../styled";
import ClickOutSide from "../ClickOutSide";

export default function Header() {
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };
  return (
    <Wrapper>
      <HeaderRoutes>
        <RedditOutlined />
        <span>Members</span>
        <span>Explore</span>
      </HeaderRoutes>

      <AccountLayout>
        <Input size="large" placeholder="Search on Club" />
        <div className="pointer">
          <Avatar size={48} icon={<BellOutlined />} />
        </div>
        <div className="pointer">
          <Avatar
            onClick={() => setOpenAcount(true)}
            size={48}
            icon={<UserOutlined />}
          />
        </div>
      </AccountLayout>

      <AccountWrapper
        style={{
          visibility: openAcount ? "visible" : "hidden",
        }}
      >
        <ClickOutSide onClickOutside={handleClose}>
          <AccountInfo>
            <AccountHeading>
              <div>Tailor Nguyen</div>
              <div>
                <Avatar
                  onClick={() => setOpenAcount(true)}
                  size={48}
                  icon={<UserOutlined />}
                />
              </div>
            </AccountHeading>

            <AccountLevel>
              <div>
                <HighlightText>Level 0</HighlightText>
              </div>
              <div className="xp">3 XP</div>
            </AccountLevel>

            <AccountFooter>
              <div>Profile</div>
              <div>Account</div>
              <div>Help</div>
              <div>Sign out</div>
            </AccountFooter>
          </AccountInfo>
        </ClickOutSide>
      </AccountWrapper>
    </Wrapper>
  );
}
