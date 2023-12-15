import axiosClient from "@/configs/axiosClient";
import { RedditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";
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
import { useLevels } from "@/hooks/useLevels";
import { ILevel } from "@/types/Level";

export default function Header() {
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };

  const { data } = useMember();
  const { data: myExp } = useLevels(data?.exp);
  const currentLevel = useMemo(() => myExp as ILevel, [myExp]);

  const handleSignIn = async () => {
    const res = await axiosClient.post("/login", {
      username: "tailor2",
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
                <div>{data.fullname || data.username}</div>
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
                  <HighlightText>{currentLevel.name}</HighlightText>
                </div>
                <div className="xp">{data.exp} XP</div>
              </AccountLevel>

              <AccountFooter>
                <Link href={`/member/${data?.id}`}>Profile</Link>
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
