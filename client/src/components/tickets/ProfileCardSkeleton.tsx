import { Skeleton } from "antd";
import { ProfileCardLayout } from "./styled";

const ProfileCardSkeleton = () => {
  return (
    <ProfileCardLayout>
      <Skeleton avatar />
    </ProfileCardLayout>
  );
};

export default ProfileCardSkeleton;
