import { MainLayout } from "@/layouts";
import { Button, Checkbox, Input } from "antd";

const HomePage = () => {
  return (
    <div>
      Member since Jul 2023
      <Button type="primary">Hello</Button>
      <Input />
      <Checkbox />
    </div>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
