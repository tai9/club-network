import useClubNetwork from "@/hooks/useClubNetwork";
import { useLevels } from "@/hooks/useLevels";
import { useMember } from "@/hooks/useMember";
import {
  AppstoreAddOutlined,
  SearchOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ILevel } from "@server/types/Level";
import { Button, Input } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import ClickOutSide from "../ClickOutSide";
import CustomAvatar from "../CustomAvatar";
import Logo from "../Logo";
import { HighlightText } from "../styled";
import Notification from "./Notification";
import {
  AccountFooter,
  AccountHeading,
  AccountInfo,
  AccountLayout,
  AccountLevel,
  AccountWrapper,
  CustomLink,
  HeaderMobile,
  HeaderRoutes,
  Wrapper,
} from "./styled";

export default function Header() {
  const { openLoginModal, setOpenLoginModal } = useClubNetwork();
  const [openAcount, setOpenAcount] = useState(false);
  const handleClose = () => {
    setOpenAcount(false);
  };

  const { data: session } = useSession();

  const { data } = useMember();
  const { data: myExp } = useLevels(data?.exp);
  const currentLevel = useMemo(() => myExp as ILevel, [myExp]);

  const handleSignIn = async () => {
    setOpenLoginModal(true);
  };

  const handleSignOut = async () => {
    // localStorage.removeItem("username");
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("memberId");
    // deleteCookie("memberId");
    // window.location.reload();
    await signOut();
  };

  const renderLinks = () => {
    return (
      <>
        <CustomLink href={"/"}>
          <Logo
            style={{
              width: 30,
            }}
          />
        </CustomLink>
        <CustomLink href={"/all-profiles"}>
          <span className="text">Members</span>
          <TeamOutlined className="icon" />
        </CustomLink>
        <CustomLink href={"/tickets"}>
          <span className="text">Tickets</span>
          <SnippetsOutlined className="icon" />
        </CustomLink>
        <CustomLink href={"/explore"}>
          <span className="text">Explore</span>
          <AppstoreAddOutlined className="icon" />
        </CustomLink>
      </>
    );
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <HeaderMobile>
        {renderLinks()}
        <SearchOutlined />
        {data && (
          <>
            <Notification size={32} />
            <CustomAvatar size={32} username={data.username} />
          </>
        )}
      </HeaderMobile>

      <Wrapper>
        <HeaderRoutes>{renderLinks()}</HeaderRoutes>

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
                  <Link href={`/account/`}>Account</Link>
                  <div>Help</div>
                  <div onClick={handleSignOut}>Sign out</div>
                </AccountFooter>
              </AccountInfo>
            </ClickOutSide>
          </AccountWrapper>
        )}
      </Wrapper>
    </div>
  );
}
