import { useMember } from "@/hooks/useMember";
import { useTickets } from "@/hooks/useTickets";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { IGetTicketsParams } from "@server/types/Ticket";
import { App, Button, Empty, Flex, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CreateModal from "./CreateModal";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import TicketCard from "./TicketCard";
import TicketTable from "./TicketTable";
import { ProfileList, ProfilesWrapper } from "./styled";

const TicketPage = () => {
  const [params, setParams] = useState<IGetTicketsParams>();
  const { data, isFetching } = useTickets(params);
  const { data: memberData } = useMember();

  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [openCreate, setOpenCreate] = useState(false);

  const [search, setSearch] = useState<string>();
  const [searchDebounced] = useDebounce(search, 1000);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      search: searchDebounced,
    }));
  }, [searchDebounced]);

  const handleCancel = () => {
    setOpenCreate(false);
  };

  const handleLayoutChange = (value: "grid" | "table") => {
    setLayout(value);
  };

  const renderProfileCardGrid = () => {
    if (data && data.count === 0) {
      return <Empty />;
    }
    return (
      <ProfileList>
        {data?.data.map((ticket) => {
          return (
            <React.Fragment key={ticket.id}>
              <TicketCard ticket={ticket} />
            </React.Fragment>
          );
        })}

        {isFetching &&
          Array.from({ length: 24 }, (_, i) => <ProfileCardSkeleton key={i} />)}
      </ProfileList>
    );
  };

  return (
    <ProfilesWrapper>
      <div className="heading">All Tickets</div>
      <Flex gap={18} vertical>
        <Flex justify="space-between" align="center">
          <div>
            {memberData?.role?.name === "CN" && (
              <Flex gap={12}>
                <Button type="primary" onClick={() => setOpenCreate(true)}>
                  + Create ticket
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
          allowClear
          onChange={(e) => {
            const value = e.currentTarget.value || undefined;
            setSearch(value);
          }}
        />
        {layout === "grid" && renderProfileCardGrid()}
        {layout === "table" && (
          <TicketTable
            isLoading={isFetching}
            onlyView={false}
            dataSource={data?.data}
          />
        )}
      </Flex>

      <CreateModal
        title={"Create a ticket"}
        open={openCreate}
        handleCancel={handleCancel}
      />
    </ProfilesWrapper>
  );
};

export default TicketPage;
