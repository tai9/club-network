import React, { useState } from "react";
import { Flex, Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { HighlightText } from "../common/styled";
import { IMember } from "@server/types/Member";
import moment from "moment";

type Props = {
  showSearch?: boolean;
  dataSource?: IMember[];
};

const MemberTable = ({ dataSource, showSearch }: Props) => {
  const [data, setData] = useState(dataSource);
  const columns: ColumnsType<IMember> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
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
      render: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
      render: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "Post",
      dataIndex: "postCount",
      key: "postCount",
      render: (value) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "Support",
      dataIndex: "support",
      key: "support",
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
      render: (value) => {
        return <span>{moment(value).format("DD/MM/yyyy hh:mm:ss")}</span>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => {
        return <span>{moment(value).format("DD/MM/yyyy hh:mm:ss")}</span>;
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
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
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
};

export default MemberTable;
