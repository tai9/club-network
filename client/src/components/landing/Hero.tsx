import useClubNetwork from "@/hooks/useClubNetwork";
import { useNotificationPosts } from "@/hooks/usePosts";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import MemberCard from "./MemberCard";
import { HeroLayout } from "./styled";

const Hero = () => {
  const ref = useRef<any>();
  const { isLoggedIn, memberData, handleOpenLogin } = useClubNetwork();
  const { data: notiPosts } = useNotificationPosts();

  const router = useRouter();
  const handleJoin = () => {
    if (isLoggedIn) {
      router.push(`/member/${memberData?.id}`);
      return;
    }
    handleOpenLogin();
  };
  return (
    <HeroLayout>
      <div className="hero-row">
        <div className="hero-left">
          <div className="hero-title">Be Seen, Be Valued!</div>
          <div className="hero-desc">
            Unlock a world where creators and collectors converge, collaborate,
            and thrive in the AI art realm.
          </div>
          <div>
            <Button
              type="primary"
              size="large"
              style={{
                width: 130,
                height: 48,
              }}
              onClick={handleJoin}
            >
              JOIN
            </Button>
          </div>
        </div>
        <div className="hero-right">
          <Button
            className="left-btn"
            type="primary"
            ghost
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              ref.current?.prev();
            }}
          />
          <div
            style={{
              maxWidth: "100vw",
            }}
          >
            <Carousel ref={ref}>
              {notiPosts?.data.map((post) => (
                <MemberCard post={post} key={post.id} />
              ))}
            </Carousel>
          </div>
          <Button
            className="right-btn"
            type="primary"
            ghost
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => {
              ref.current?.next();
            }}
          />
        </div>
      </div>
    </HeroLayout>
  );
};

export default Hero;
