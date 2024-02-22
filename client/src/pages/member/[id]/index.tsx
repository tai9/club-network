import NewFeed from "@/components/home/NewFeed";
import ProfileInfo from "@/components/home/ProfileInfo";
import memberController from "@/controllers/memberController";
import { MainLayout } from "@/layouts";
import { IMember } from "@server/types/Member";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const HomePage = () => {
  return (
    <div>
      <ProfileInfo />
      <NewFeed />
    </div>
  );
};
// TODO: Implement ISR
// const HomePage = ({
//   memberData,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
//   return (
//     <div>
//       <ProfileInfo />
//       <NewFeed />
//     </div>
//   );
// };

// export const getServerSideProps = (async (context) => {
//   const memberId = context.query.id as string;
//   // const res = await memberController.get(+memberId);

//   // Pass data to the page via props
//   return { props: { memberData: undefined } };
// }) satisfies GetServerSideProps<{ memberData?: IMember }>;

HomePage.Layout = MainLayout;

export default HomePage;
