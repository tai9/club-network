import { Skeleton } from "antd";
import { PostWrapper } from "./styled";

const PostSkeleton = () => {
  return (
    <PostWrapper vertical>
      <Skeleton avatar paragraph={{ rows: 0 }} />
      <Skeleton />
    </PostWrapper>
  );
};

export default PostSkeleton;
