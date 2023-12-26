import { getPostDetailLink } from "@/utils/routeMapper";
import { IPost } from "@server/types/Post";
import { Flex, Typography } from "antd";
import Link from "next/link";
import Level from "../common/Level";
import { MemberCardLayout } from "./styled";

type Props = {
  post: IPost;
};

const MemberCard = ({ post }: Props) => {
  return (
    <Link href={getPostDetailLink(post.createdBy.id, post.id)}>
      <MemberCardLayout>
        <div className="user-avatar">
          <div className="mask">
            <img src="https://ik.imagekit.io/n8imvdjvz/tr:w-128,h-128/https://ik.imagekit.io/n8imvdjvz/tr:w-128,h-128/https://storage.googleapis.com/uncut-fm-production/production/users/4295803694/user_1696020606.png" />
          </div>
        </div>
        <div className="body">
          <Flex vertical gap={2}>
            <div className="text1">
              {post.createdBy.fullname}{" "}
              <span className="role">({post.createdBy.role?.description})</span>
            </div>
            <Level exp={post.createdBy.exp} />
          </Flex>
          <Typography.Paragraph
            ellipsis={{
              rows: 3,
            }}
          >
            {post.content}
          </Typography.Paragraph>
        </div>
      </MemberCardLayout>
    </Link>
  );
};

export default MemberCard;
