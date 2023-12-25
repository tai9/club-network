import React, { useEffect, useState } from "react";
import { App, Button, Flex, Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { HighlightText } from "../common/styled";
import { IMember } from "@server/types/Member";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import memberController from "@/controllers/memberController";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/configs/queryClient";
import Level from "../common/Level";
import CreateModal from "./CreateModal";

type Props = {
  showSearch?: boolean;
  onlyView?: boolean;
  dataSource?: IMember[];
  isLoading?: boolean;
};

const MemberTable = ({
  dataSource,
  showSearch,
  onlyView = true,
  isLoading,
}: Props) => {
  const { modal, message } = App.useApp();

  const [data, setData] = useState(dataSource);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [member, setMember] = useState<IMember>();

  const handleEditCancel = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const deleteMutation = useMutation({
    mutationKey: ["members", "delete"],
    mutationFn: async (member: IMember) => {
      await memberController.delete(member.id);
      return member;
    },
    onSuccess: (res) => {
      message.success(`Delete ${res.fullname} successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      message.error("Delete member error!");
    },
  });

  const handleDelete = (member: IMember) => {
    modal.confirm({
      title: `Are you sure to delete ${member.fullname}?`,
      onOk: async () => {
        await deleteMutation.mutateAsync(member);
      },
    });
  };

  const columns: ColumnsType<IMember> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      responsive: ["md"],
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (value, record) => {
        return (
          <Link
            href={`/member/${record.id}`}
            style={{
              textDecoration: "underline",
            }}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (role) => {
        return <HighlightText>{role?.description || "-"}</HighlightText>;
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
      render: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "Level",
      dataIndex: "exp",
      key: "exp",
      width: 150,
      responsive: ["sm"],
      render: (value) => {
        return <Level exp={value} />;
      },
    },
    {
      title: "Post",
      dataIndex: "postCount",
      key: "postCount",
      responsive: ["lg"],
      render: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "Support",
      dataIndex: "support",
      key: "support",
      responsive: ["lg"],
      render: (_, record) => {
        return (
          <span>
            {record.reactionCount?.find((x) => x.type === "LIKE")?.count || "-"}
          </span>
        );
      },
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
      responsive: ["lg"],
      render: (_, record) => {
        return (
          <span>
            {record.reactionCount?.find((x) => x.type === "LIKE")?.count || "-"}
          </span>
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

    ...(!onlyView
      ? [
          {
            title: "Action",
            key: "action",
            render: (_: any, record: IMember) => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    setMember(record);
                    setOpenEditModal(true);
                  }}
                  icon={<EditOutlined />}
                />
                <Button
                  onClick={() => handleDelete(record)}
                  icon={<DeleteOutlined />}
                />
              </Space>
            ),
          },
        ]
      : []),
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
              (x.fullname as string)
                ?.toLowerCase()
                .includes(value.toLowerCase())
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
        title={"Update a member"}
        open={openEditModal}
        handleCancel={handleEditCancel}
        member={member}
      />
    </Flex>
  );
};

export default MemberTable;
