import { ITicket } from "@server/types/Ticket";
import { Button, Flex, Typography } from "antd";
import { ProfileCardLayout } from "./styled";

type Props = {
  ticket: ITicket;
};

const TicketCard = ({ ticket }: Props) => {
  return (
    <ProfileCardLayout>
      <img src={ticket.image} alt={ticket.name} width="100%" />

      <Typography.Title level={5}>{ticket.name}</Typography.Title>

      <Flex justify="space-between" className="price-section">
        <Flex vertical>
          <Typography.Text type="secondary">Price</Typography.Text>
          <div>{ticket.defaultPrice || "-"}</div>
        </Flex>
        <Flex vertical>
          <Typography.Text type="secondary">Supply</Typography.Text>
          <Typography.Text strong>
            {ticket.supply === 0 && ticket.quantity === 0
              ? "-"
              : `${ticket.supply}/${ticket.quantity}`}
          </Typography.Text>
        </Flex>
      </Flex>

      <Button disabled={ticket.status !== "SALE"}>
        {ticket.status === "SALE" ? "Buy" : `Owned ${ticket.owner?.fullname}`}
      </Button>
    </ProfileCardLayout>
  );
};

export default TicketCard;
