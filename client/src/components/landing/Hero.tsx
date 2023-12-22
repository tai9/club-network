import React, { useRef } from "react";
import { HeroLayout } from "./styled";
import { Button, Carousel } from "antd";
import MemberCard from "./MemberCard";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Hero = () => {
  const ref = useRef<any>();
  return (
    <HeroLayout>
      <div className="hero-row">
        <div className="hero-left">
          <div className="hero-title">Be Seen, Be Valued!</div>
          <div className="hero-desc">
            Unlock a world where creators and collectors converge, collaborate,
            and thrive in the AI art realm.
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
          <div>
            <Carousel ref={ref} infinite autoplay>
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
