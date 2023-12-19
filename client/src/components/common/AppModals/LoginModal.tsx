import postController from "@/controllers/postController";
import useClubNetwork from "@/hooks/useClubNetwork";
import usePosts from "@/hooks/usePosts";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Modal,
  Input,
  Form,
  Typography,
  message,
} from "antd";
import axiosClient from "@/configs/axiosClient";
import { setCookie } from "cookies-next";
import { useMember } from "@/hooks/useMember";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginModal = () => {
  const { openLoginModal, setOpenLoginModal } = useClubNetwork();
  const { refetch } = useMember();
  const onFinish = async (values: any) => {
    try {
      const res = await axiosClient.post("/login", {
        username: values.username,
        password: values.password,
      });
      setCookie("memberId", res.data.id);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("accessToken", res.data.accessToken);
      // window.location.reload();
      await refetch();
      onCancel();
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
      width={300}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title
          level={4}
          style={{
            textAlign: "center",
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          Sign In
        </Typography.Title>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;