import queryClient from "@/configs/queryClient";
import ticketController from "@/controllers/ticketController";
import { PlusOutlined } from "@ant-design/icons";
import { ITicket } from "@server/types/Ticket";
import { useMutation } from "@tanstack/react-query";
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  ModalProps,
  Typography,
  Upload,
} from "antd";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type Props = ModalProps & {
  handleCancel: () => void;
  ticket?: ITicket;
  title?: string;
};

const CreateModal = ({ handleCancel, ticket, title, ...props }: Props) => {
  const { message } = App.useApp();
  const isEditting = !!ticket;

  const createMutation = useMutation({
    mutationKey: ["tickets", "create"],
    mutationFn: (variables: any) => {
      const data = new FormData();
      data.append("name", variables.name);
      data.append("description", variables.description);
      data.append("file", variables.file[0].originFileObj);
      return ticketController.create(data);
    },
    onSuccess: (response) => {
      message.success(`Create ${response.data.fullname} success`);
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      handleCancel();
    },
    onError: () => {
      message.error("Create ticket error");
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["tickets", "update"],
    mutationFn: (variables: [number, any]) =>
      ticketController.update(variables[0], variables[1]),
    onSuccess: (response) => {
      message.success(`Update ${response.data.fullname} success`);
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      handleCancel();
    },
    onError: () => {
      message.error("Update ticket error");
    },
  });

  const onFinish = async (values: any) => {
    if (isEditting) {
      await updateMutation.mutateAsync([ticket.id, values]);
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
        initialValues={{ ...ticket }}
      >
        <Form.Item<ITicket>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input disabled={isEditting} />
        </Form.Item>

        <Form.Item<ITicket>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input disabled={isEditting} />
        </Form.Item>

        <Form.Item
          label="Upload"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          required
        >
          {isEditting ? (
            <img
              src={ticket.image}
              style={{
                borderRadius: 6,
              }}
              width={128}
            />
          ) : (
            <Upload listType="picture-card" maxCount={1}>
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          )}
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
