import axiosClient, { axiosServer } from "@/configs/axiosConfig";
import { useMemberUpdateMutation } from "@/hooks/useMember";
import { MainLayout } from "@/layouts";
import { GlobalOutlined, UserOutlined } from "@ant-design/icons";
import { IMember } from "@server/types/Member";
import { Button, Divider, Flex, Tabs, Typography } from "antd";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { auth } from "../api/auth/[...nextauth]";

const AccountPage = ({
  memberData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { mutateAsync, data } = useMemberUpdateMutation();

  const handleLogin = async () => {
    // await signIn("credentials", {
    //   username: "haha",
    // });
    await signIn();
    // await signOut();
  };

  const handleSignout = async () => {
    await signOut();
  };

  const handleAxios = async () => {
    await axiosClient.get("/posts");
  };

  const [fullname, setFullname] = useState(memberData?.fullname);

  const handleUpdateFullname = async (f?: string) => {
    console.log(fullname, f);
    if (!memberData) return;

    // await mutateAsync({ ...memberData, fullname });
  };
  return (
    <>
      <div
        style={{
          margin: 80,
        }}
      >
        <button onClick={handleLogin}>login</button>
        <button onClick={handleSignout}>signOut</button>
        <button onClick={handleAxios}>axios clinet</button>
        <Tabs
          size="large"
          tabPosition="left"
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Personal Data",
              children: (
                <Flex
                  gap={24}
                  vertical
                  style={{
                    maxWidth: 400,
                  }}
                >
                  <Flex gap={64}>
                    <Typography.Title level={5}>Username</Typography.Title>
                    <Typography.Title copyable level={5} style={{ margin: 0 }}>
                      {memberData?.username}
                    </Typography.Title>
                  </Flex>
                  <Flex gap={100}>
                    <Typography.Title level={5}>Name</Typography.Title>
                    <Typography.Title
                      editable={{
                        onChange: async (e) => {
                          memberData &&
                            (await mutateAsync({ ...memberData, fullname: e }));
                          setFullname(e);
                        },
                        onEnd: () => handleUpdateFullname(fullname),
                        text: fullname,
                      }}
                      level={5}
                      style={{ margin: 0 }}
                    >
                      {fullname}
                    </Typography.Title>
                  </Flex>
                  <Flex gap={100}>
                    <Typography.Title level={5}>Email</Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {memberData?.email}
                    </Typography.Title>
                  </Flex>
                  <Flex vertical gap={8}>
                    <Divider />
                    <div>
                      <Button danger>DELETE ACCOUNT</Button>
                    </div>
                  </Flex>
                </Flex>
              ),
              icon: <UserOutlined />,
            },
            {
              key: "2",
              label: "Help Center",
              children: `Help Center`,
              icon: <GlobalOutlined />,
            },
          ]}
        />
      </div>
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res);
  if (!session) {
    return {
      props: {
        memberData: undefined,
      },
    };
  }

  const token = session.user.accessToken;

  const res = await axiosServer.get<IMember>("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const memberData = res.data;

  // Pass data to the page via props
  return {
    props: {
      memberData,
    },
  };
}) satisfies GetServerSideProps<{ memberData?: Partial<IMember> }>;

AccountPage.layout = MainLayout;

export default AccountPage;
