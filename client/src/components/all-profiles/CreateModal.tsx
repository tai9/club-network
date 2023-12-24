import React from "react";
import { IMember } from "@server/types/Member";
import { App, Modal, ModalProps, Button, Form, Input, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import memberController from "@/controllers/memberController";
import queryClient from "@/configs/queryClient";

type Props = ModalProps & {
  handleCancel: () => void;
};

const CreateModal = ({ handleCancel, ...props }: Props) => {
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationKey: ["members", "create"],
    mutationFn: memberController.create,
    onSuccess: (response) => {
      console.log(response);
      message.success(`Create ${response.data.fullname} success`);
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      handleCancel();
    },
    onError: () => {
      message.error("Create member error");
    },
  });

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    await mutation.mutateAsync(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      {...props}
      destroyOnClose
      footer={null}
      onCancel={handleCancel}
      width={350}
    >
      <Typography.Title level={2}>Create a member</Typography.Title>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<IMember>
          label="Fullname"
          name="fullname"
          rules={[{ required: true, message: "Please input your fullname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<IMember>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IMember> label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item<IMember> label="Bio" name="bio">
          <Input />
        </Form.Item>
        <Form.Item<IMember> label="Facebook Link" name="fbLink">
          <Input />
        </Form.Item>
        <Form.Item<IMember> label="Twitter Link" name="twitterLink">
          <Input />
        </Form.Item>
        <Form.Item<IMember> label="Instagram Link" name="insLink">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
