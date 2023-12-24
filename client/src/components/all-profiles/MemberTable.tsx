import React, { useState } from "react";
import { Flex, Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type Props = {
  dataSource?: any[];
};

const MemberTable = ({ dataSource }: Props) => {
  const [data, setData] = useState(dataSource);
  const columns: ColumnsType<DataType> = [
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
    },
    {
      title: "Post",
      dataIndex: "postCount",
      key: "postCount",
    },
    {
      title: "Support",
      dataIndex: "support",
      key: "support",
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
      <Input
        placeholder="Search by name"
        size="large"
        onChange={(e) => {
          const value = e.currentTarget.value;
          const searchData = dataSource?.filter((x) =>
            (x.fullname as string)?.toLowerCase().includes(value.toLowerCase())
          );
          setData(searchData);
        }}
      />
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
};

export default MemberTable;
