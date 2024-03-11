import queryClient from "@/configs/queryClient";
import memberController from "@/controllers/memberController";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ITicket } from "@server/types/Ticket";
import { useMutation } from "@tanstack/react-query";
import { App, Button, Flex, Input, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import { TicketName } from "./styled";

type Props = {
  showSearch?: boolean;
  onlyView?: boolean;
  dataSource?: ITicket[];
  isLoading?: boolean;
};

const TicketTable = ({
  dataSource,
  showSearch,
  onlyView = true,
  isLoading,
}: Props) => {
  const { modal, message } = App.useApp();

  const [data, setData] = useState(dataSource);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [ticket, setTicket] = useState<ITicket>();

  const handleEditCancel = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const deleteMutation = useMutation({
    mutationKey: ["members", "delete"],
    mutationFn: async (ticket: ITicket) => {
      await memberController.delete(ticket.id);
      return ticket;
    },
    onSuccess: (res) => {
      message.success(`Delete ${res.name} successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      message.error("Delete ticket error!");
    },
  });

  const handleDelete = (ticket: ITicket) => {
    modal.confirm({
      title: `Are you sure to delete ${ticket.name}?`,
      onOk: async () => {
        await deleteMutation.mutateAsync(ticket);
      },
    });
  };

  const handleBuy = (ticket: ITicket) => {
    const isOnSale = ticket.status === "SALE" && !!ticket.checkoutUrl;
    if (isOnSale) {
      window.open(ticket.checkoutUrl, "_ blank");
    }
  };

  const columns: ColumnsType<ITicket> = [
    {
      title: "Token ID",
      dataIndex: "tokenId",
      key: "tokenId",
      responsive: ["md"],
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 500,
      render: (value, record) => {
        const isOnSale = record.status === "SALE" && !!record.checkoutUrl;
        return (
          <div
            onClick={() => handleBuy(record)}
            style={{
              cursor: isOnSale ? "pointer" : "auto",
            }}
          >
            <TicketName>
              <img src={record.image} alt={value} width={24} height={24} />
              <Typography.Text underline={isOnSale}>{value}</Typography.Text>
            </TicketName>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      render: (value) => {
        return (
          <Typography.Paragraph ellipsis>{value || "-"}</Typography.Paragraph>
        );
      },
    },
    {
      title: "Supply",
      dataIndex: "supply",
      key: "supply",
      responsive: ["sm"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm"],
    },
    {
      title: "Price",
      dataIndex: "defaultPrice",
      key: "defaultPrice",
      responsive: ["sm"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      render: (value) => {
        return <span>{value || "NOT ON SALE"}</span>;
      },
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      responsive: ["lg"],
      render: (_, record) => {
        return (
          <Link
            href={`/member/${record.owner?.id}`}
            style={{
              textDecoration: "underline",
            }}
          >
            {record.owner?.fullname}
          </Link>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["xl"],
      render: (value) => {
        return <span>{moment(value).format("DD/MM/yyyy hh:mm:ss")}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      responsive: ["md"],
      render: (value) => {
        return <span>{moment(value).format("DD/MM/yyyy hh:mm:ss")}</span>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: ITicket) => (
        <Space size="middle">
          {!onlyView && (
            <>
              <Button
                disabled={record.status !== "SALE"}
                onClick={() => {
                  setTicket(record);
                  setOpenEditModal(true);
                }}
                icon={<EditOutlined />}
              />
              <Button
                disabled={record.status !== "CREATED"}
                onClick={() => handleDelete(record)}
                icon={<DeleteOutlined />}
              />
            </>
          )}

          {onlyView && (
            <Button
              disabled={record.status !== "SALE"}
              onClick={() => handleBuy(record)}
            >
              BUY
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Flex vertical gap={12}>
      {showSearch && (
        <Input
          placeholder="Search by name"
          size="large"
          onChange={(e) => {
            const value = e.currentTarget.value;
            const searchData = dataSource?.filter((x) =>
              (x.name as string)?.toLowerCase().includes(value.toLowerCase())
            );
            setData(searchData);
          }}
        />
      )}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(e) => e.id}
        loading={isLoading}
      />
      <CreateModal
        title={"Update a ticket"}
        open={openEditModal}
        handleCancel={handleEditCancel}
        ticket={ticket}
      />
    </Flex>
  );
};

export default TicketTable;
