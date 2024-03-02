import React from "react";
import { IMember } from "@server/types/Member";
import {
  App,
  Modal,
  ModalProps,
  Button,
  Form,
  Input,
  Typography,
  Select,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import memberController from "@/controllers/memberController";
import queryClient from "@/configs/queryClient";
import { useRoles } from "@/hooks/useRoles";

type Props = ModalProps & {
  handleCancel: () => void;
  member?: IMember;
  title?: string;
};

const CreateModal = ({ handleCancel, member, title, ...props }: Props) => {
  const { message } = App.useApp();
  const isEditting = !!member;
  const { data: roles } = useRoles();

  const createMutation = useMutation({
    mutationKey: ["members", "create"],
    mutationFn: memberController.create,
    onSuccess: (response) => {
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

  const updateMutation = useMutation({
    mutationKey: ["members", "update"],
    mutationFn: (variables: [number, any]) =>
      memberController.update(variables[0], variables[1]),
    onSuccess: (response) => {
      message.success(`Update ${response.data.fullname} success`);
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
      handleCancel();
    },
    onError: () => {
      message.error("Update member error");
    },
  });

  const onFinish = async (values: any) => {
    if (isEditting) {
      await updateMutation.mutateAsync([member.id, values]);
      return;
    }
    await createMutation.mutateAsync(values);
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
      <Typography.Title level={2}>{title}</Typography.Title>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ ...member, role: member?.role?.id }}
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
          rules={[
            { required: !isEditting, message: "Please input your password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<IMember>
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select
            options={roles?.data.map((x) => ({
              value: x.id,
              label: x.description,
            }))}
          />
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
          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
