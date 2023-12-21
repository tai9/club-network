import NewFeed from "@/components/home/NewFeed";
import ProfileInfo from "@/components/home/ProfileInfo";
import { MainLayout } from "@/layouts";
import React from "react";

const PostDetailPage = () => {
  return (
    <div>
      <ProfileInfo />
      <NewFeed />
    </div>
  );
};

PostDetailPage.Layout = MainLayout;

export default PostDetailPage;
