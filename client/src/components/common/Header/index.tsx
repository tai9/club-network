import axiosClient from "@/configs/axiosClient";
import { RedditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
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
import { useMember } from "@/hooks/useMember";

export default function Header() {
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };

  const { data } = useMember();

  const handleSignIn = async () => {
    const res = await axiosClient.post("/login", {
      username: "tailor",
      password: "12345",
    });
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("accessToken", res.data.accessToken);
    window.location.reload();
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <Wrapper>
      <HeaderRoutes>
        <Link href={"/"}>
          <RedditOutlined />
        </Link>
        <Link href={"/all-profiles"}>Members</Link>
        <span>Explore</span>
      </HeaderRoutes>

      <AccountLayout>
        <Input size="large" placeholder="Search on Club" />
        {!data ? (
          <Button onClick={handleSignIn} type="primary" size="large">
            JOIN
          </Button>
        ) : (
          <>
            <Notification />
            <CustomAvatar onClick={() => setOpenAcount(true)} />
          </>
        )}
      </AccountLayout>

      {data && (
        <AccountWrapper
          style={{
            visibility: openAcount ? "visible" : "hidden",
          }}
        >
          <ClickOutSide onClickOutside={handleClose}>
            <AccountInfo>
              <AccountHeading>
                <div>{data.data.fullname || data.data.username}</div>
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
                <div onClick={handleSignOut}>Sign out</div>
              </AccountFooter>
            </AccountInfo>
          </ClickOutSide>
        </AccountWrapper>
      )}
    </Wrapper>
  );
}
