import React, { useRef } from "react";
import { HeroLayout } from "./styled";
import { Button, Carousel } from "antd";
import MemberCard from "./MemberCard";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import useClubNetwork from "@/hooks/useClubNetwork";

const Hero = () => {
  const ref = useRef<any>();
  const { handleOpenLogin } = useClubNetwork();
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
              onClick={handleOpenLogin}
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
            <Carousel ref={ref} infinite>
              <MemberCard />
              <MemberCard />
              <MemberCard />
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
