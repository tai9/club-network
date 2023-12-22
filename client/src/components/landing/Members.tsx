import React, { useRef } from "react";
import { MembersLayout } from "./styled";
import { Button, Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MemberCard from "./MemberCard";
import MemberCard2 from "./MemberCard2";

const Members = () => {
  const ref = useRef<any>();
  return (
    <MembersLayout>
      {/* <div
        style={{
          fontSize: 32,
        }}
      >
        Only on Uncut!
      </div>
      <Button shape="round">VIEW MORE</Button> */}

      {/* <div className="member-carousel">
        <Button
          className="left-btn"
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            ref.current?.prev();
          }}
        />
        <div>
          <Carousel ref={ref} infinite autoplay>
            <MemberCard2 />
            <MemberCard2 />
            <MemberCard2 />
          </Carousel>
        </div>
        <Button
          className="right-btn"
          type="primary"
          shape="circle"
          icon={<ArrowRightOutlined />}
          onClick={() => {
            ref.current?.next();
          }}
        />
      </div> */}
    </MembersLayout>
  );
};

export default Members;
