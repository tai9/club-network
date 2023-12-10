import { Avatar, Input } from "antd";
import { AccountLayout, HeaderRoutes, Wrapper } from "./styled";
import { BellOutlined, RedditOutlined, UserOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <Wrapper>
      <HeaderRoutes>
        <RedditOutlined />
        <span>Members</span>
        <span>Explore</span>
      </HeaderRoutes>

      <AccountLayout>
        <Input size="large" placeholder="Search on Club" />
        <div>
          <Avatar size={48} icon={<BellOutlined />} />
        </div>
        <div>
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
      </AccountLayout>
    </Wrapper>
  );
}
