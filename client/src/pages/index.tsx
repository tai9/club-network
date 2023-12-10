import ProfileInfo from "@/components/home/ProfileInfo";
import { MainLayout } from "@/layouts";
import { Button, Checkbox, Input } from "antd";

const HomePage = () => {
  return (
    <div>
      <ProfileInfo />
    </div>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
