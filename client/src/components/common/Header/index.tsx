import { RedditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import ClickOutSide from "../ClickOutSide";
import CustomAvatar from "../CustomAvatar";
import { HighlightText } from "../styled";
import Notification from "./Notification";
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

export default function Header() {
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };
  return (
    <Wrapper>
      <HeaderRoutes>
        <RedditOutlined />
        <Link href={"/all-profiles"}>Members</Link>
        <span>Explore</span>
      </HeaderRoutes>

      <AccountLayout>
        <Input size="large" placeholder="Search on Club" />
        <Notification />
        <CustomAvatar onClick={() => setOpenAcount(true)} />
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
