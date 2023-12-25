import memberController from "@/controllers/memberController";
import { useMember, useMembers } from "@/hooks/useMember";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { App, Button, Flex, Input, Radio } from "antd";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useState } from "react";
import BulkCreateModal from "./BulkCreateModal";
import CreateModal from "./CreateModal";
import MemberTable from "./MemberTable";
import ProfileCard from "./ProfileCard";
import { ProfileList, ProfilesWrapper } from "./styled";

const AllProfiles = () => {
  const { data } = useMembers();
  const { message } = App.useApp();
  const { data: memberData } = useMember();

  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [openBulk, setOpenBulk] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const mutation = useMutation({
    mutationKey: ["members", "export-csv"],
    mutationFn: memberController.export,
    onSuccess: (response) => {
      const blob = new Blob([response.data], { type: "text/csv" });
      saveAs(blob, `members-list-${Date.now()}`);
    },
    onError: () => {
      message.error("Export csv file error");
    },
  });

  const handleExport = async () => {
    await mutation.mutateAsync();
  };

  const handleBulkCancel = () => {
    setOpenBulk(false);
  };

  const handleCancel = () => {
    setOpenCreate(false);
  };

  const handleLayoutChange = (value: "grid" | "table") => {
    setLayout(value);
  };

  return (
    <ProfilesWrapper>
      <div className="heading">All Profiles</div>
      <Flex gap={18} vertical>
        <Flex justify="space-between" align="center">
          <div>
            {memberData?.role?.name === "CN" && (
              <Flex gap={12}>
                <Button type="primary" onClick={() => setOpenCreate(true)}>
                  + Create member
                </Button>
                <Button onClick={() => setOpenBulk(true)}>
                  + Bulk create members
                </Button>
                <Button loading={mutation.isPending} onClick={handleExport}>
                  Export members
                </Button>
              </Flex>
            )}
          </div>
          <Radio.Group
            size="large"
            value={layout}
            onChange={(e) => handleLayoutChange(e.target.value)}
          >
            <Radio.Button value="grid">
              <TableOutlined />
            </Radio.Button>
            <Radio.Button value="table">
              <UnorderedListOutlined />
            </Radio.Button>
          </Radio.Group>
        </Flex>
        <Input
          placeholder="Search by name"
          size="large"
          // onChange={(e) => {
          //   const value = e.currentTarget.value;
          //   const searchData = dataSource?.filter((x) =>
          //     (x.fullname as string)
          //       ?.toLowerCase()
          //       .includes(value.toLowerCase())
          //   );
          //   setData(searchData);
          // }}
        />
        {layout === "grid" && (
          <ProfileList>
            {data?.data.map((member) => {
              return (
                <Link key={member.id} href={`/member/${member.id}`}>
                  <ProfileCard member={member} />
                </Link>
              );
            })}
          </ProfileList>
        )}
        {layout === "table" && (
          <MemberTable onlyView={false} dataSource={data?.data} />
        )}
      </Flex>

      <CreateModal
        title={"Create a member"}
        open={openCreate}
        handleCancel={handleCancel}
      />
      <BulkCreateModal open={openBulk} handleCancel={handleBulkCancel} />
    </ProfilesWrapper>
  );
};

export default AllProfiles;
