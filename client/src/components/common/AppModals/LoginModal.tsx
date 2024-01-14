import useClubNetwork from "@/hooks/useClubNetwork";
import { useMember } from "@/hooks/useMember";
import {
  AppleFilled,
  FacebookFilled,
  GoogleOutlined,
  RightOutlined,
  TwitterOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { App, Button, Flex, Form, Input, Modal, Typography } from "antd";
import { signIn } from "next-auth/react";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginModal = () => {
  const { openLoginModal, setOpenLoginModal } = useClubNetwork();
  const { refetch } = useMember();
  const { message } = App.useApp();
  const onFinish = async (values: any) => {
    try {
      const s = await signIn("credentials", {
        username: values.username,
        password: values.password,
      });
      console.log(s);

      // if (res.data.loginCount === 1) {
      //   message.success("Welcome to our club 🚀");
      // }

      // setCookie("memberId", res.data.id);
      // localStorage.setItem("username", res.data.username);
      // localStorage.setItem("accessToken", res.data.accessToken);
      // localStorage.setItem("memberId", res.data.id);
      // // window.location.reload();
      // await refetch();
      // onCancel();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    setOpenLoginModal(false);
  };

  return (
    <Modal
      open={openLoginModal}
      onOk={onFinish}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Flex vertical gap={24}>
        <Flex vertical align="center">
          <Typography.Title
            level={4}
            style={{
              marginTop: 20,
            }}
          >
            Let&apos;s get started
          </Typography.Title>
          <Typography.Text>Choose your way</Typography.Text>
        </Flex>

        <Flex vertical gap={8}>
          <div>Get a password-free link to connect</div>
          <Flex gap={12}>
            <Input
              style={{
                height: 64,
              }}
              size="large"
              placeholder="Enter your email"
            />
            <Button
              style={{
                height: 64,
                width: 74,
              }}
              size="large"
              type="primary"
              icon={<RightOutlined />}
            />
          </Flex>
        </Flex>
        <Flex vertical gap={8}>
          <div>Or connect with...</div>
          <Flex gap={12}>
            <Button
              style={{
                height: 64,
                width: 64,
              }}
              size="large"
              icon={
                <GoogleOutlined
                  style={{
                    fontSize: 28,
                  }}
                />
              }
            />
            <Button
              style={{
                height: 64,
                width: 64,
              }}
              size="large"
              icon={
                <TwitterOutlined
                  style={{
                    fontSize: 28,
                  }}
                />
              }
            />
            <Button
              style={{
                height: 64,
                width: 64,
              }}
              size="large"
              icon={
                <FacebookFilled
                  style={{
                    fontSize: 28,
                  }}
                />
              }
            />
            <Button
              style={{
                height: 64,
                width: 64,
              }}
              size="large"
              icon={
                <AppleFilled
                  style={{
                    fontSize: 28,
                  }}
                />
              }
            />
            <Button
              style={{
                height: 64,
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size="large"
              icon={
                <WalletOutlined
                  style={{
                    fontSize: 28,
                  }}
                />
              }
            >
              Wallet
            </Button>
          </Flex>
        </Flex>
        <Flex vertical gap={12}>
          <div>Or login with...</div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button size="large" type="primary" htmlType="submit">
                JOIN
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default LoginModal;
