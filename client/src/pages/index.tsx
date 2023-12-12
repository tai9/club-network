import NewFeed from "@/components/home/NewFeed";
import ProfileInfo from "@/components/home/ProfileInfo";
import { MainLayout } from "@/layouts";

const HomePage = () => {
  return (
    <div>
      <ProfileInfo />
      <NewFeed />
    </div>
  );
};

HomePage.Layout = MainLayout;

export default HomePage;
