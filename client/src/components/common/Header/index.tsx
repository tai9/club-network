import useClubNetwork from "@/hooks/useClubNetwork";
import { useLevels } from "@/hooks/useLevels";
import { useMember } from "@/hooks/useMember";
import { ILevel } from "@/types/Level";
import { RedditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import { deleteCookie } from "cookies-next";
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

export default function Header() {
  const { openLoginModal, setOpenLoginModal } = useClubNetwork();
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };

  const { data } = useMember();
  const { data: myExp } = useLevels(data?.exp);
  const currentLevel = useMemo(() => myExp as ILevel, [myExp]);

  const handleSignIn = async () => {
    setOpenLoginModal(true);
  };

  const handleSignOut = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    deleteCookie("memberId");
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
            <CustomAvatar
              username={data.username}
              onClick={() => setOpenAcount(true)}
            />
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
                  <CustomAvatar
                    onClick={() => setOpenAcount(true)}
                    size={48}
                    username={data.username}
                  />
                </div>
              </AccountHeading>

              <AccountLevel>
                <div>
                  <HighlightText>{currentLevel?.name}</HighlightText>
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
