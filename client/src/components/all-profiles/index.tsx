import memberController from "@/controllers/memberController";
import { useMembers } from "@/hooks/useMember";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { App, Button, Flex, Modal, Radio, UploadProps } from "antd";
import { saveAs } from "file-saver";
import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { ProfileList, ProfilesWrapper } from "./styled";
import { useState } from "react";
import BulkCreateModal from "./BulkCreateModal";
import CreateModal from "./CreateModal";

const AllProfiles = () => {
  const { data } = useMembers();
  const { message } = App.useApp();

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

  return (
    <ProfilesWrapper>
      <div className="heading">All Profiles</div>
      <Flex gap={18} vertical justify="space-between">
        <Flex justify="space-between" align="center">
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
          <Radio.Group size="large">
            <Radio.Button value="grid">
              <TableOutlined />
            </Radio.Button>
            <Radio.Button value="table">
              <UnorderedListOutlined />
            </Radio.Button>
          </Radio.Group>
        </Flex>
        <ProfileList>
          {data?.data.map((member) => {
            return (
              <Link key={member.id} href={`/member/${member.id}`}>
                <ProfileCard member={member} />
              </Link>
            );
          })}
        </ProfileList>
      </Flex>

      <CreateModal open={openCreate} handleCancel={handleCancel} />
      <BulkCreateModal open={openBulk} handleCancel={handleBulkCancel} />
    </ProfilesWrapper>
  );
};

export default AllProfiles;
