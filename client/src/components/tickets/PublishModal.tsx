import queryClient from "@/configs/queryClient";
import ticketController from "@/controllers/ticketController";
import { ITicket } from "@server/types/Ticket";
import { useMutation } from "@tanstack/react-query";
import {
  App,
  Button,
  Flex,
  Form,
  InputNumber,
  Modal,
  ModalProps,
  Progress,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { twoColors } from "../common/Level";
import TicketCard from "./TicketCard";

type Props = ModalProps & {
  handleCancel: () => void;
  ticket: ITicket;
};

const defaultState = {
  title: "Ready to process",
  percent: 0,
};

const PublishModal = ({ handleCancel, ticket, ...props }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [progressInfo, setProgressInfo] = useState(defaultState);

  useEffect(() => {
    return () => {
      setProgressInfo(defaultState);
    };
  }, []);

  const createMutation = useMutation({
    mutationKey: ["tickets", "create"],
    mutationFn: async (variables: any) => {
      const ticketId = ticket.id;
      // set up claim conditions
      setProgressInfo({
        title: "Setting up claim conditions...",
        percent: 30,
      });
      await ticketController.configClaimConditions(ticketId, {
        maxClaimableSupply: variables.maxClaimableSupply,
        price: variables.price,
      });
      setProgressInfo({
        title: "Create checkout link...",
        percent: 90,
      });

      // create checkout link
      await ticketController.createCheckoutLink(ticketId, {
        title: ticket.name,
        description: ticket.description || "",
      });

      // done
      setProgressInfo({
        title: "Published the ticket",
        percent: 100,
      });

      return;
    },
    onSuccess: (response) => {
      message.success(`Published ${ticket.name} success`);
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      setProgressInfo(defaultState);
      handleCancel();
    },
    onError: () => {
      message.error("Create ticket error");
    },
  });

  const onFinish = async (values: any) => {
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
      maskClosable={false}
    >
      <Typography.Title level={2}>Publish {ticket?.name}</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ ...ticket }}
      >
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber
            style={{
              width: "100%",
            }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Total Supply"
          name="maxClaimableSupply"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item shouldUpdate label="Preview">
          {() =>
            ticket && (
              <TicketCard
                ticket={{
                  ...ticket,
                  defaultPrice: form.getFieldValue("price") || 0,
                  quantity: form.getFieldValue("maxClaimableSupply") || 0,
                  status: "SALE",
                }}
              />
            )
          }
        </Form.Item>

        <Form.Item>
          <Flex vertical>
            <Typography.Text strong>{progressInfo.title}</Typography.Text>
            <Progress
              strokeColor={twoColors}
              status="active"
              percent={progressInfo.percent}
              showInfo={false}
            />
          </Flex>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending}
          >
            Publish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PublishModal;
