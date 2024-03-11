import TicketPage from "@/components/tickets";
import { MainLayout } from "@/layouts";
import React from "react";

const Tickets = () => {
  return (
    <>
      <TicketPage />
    </>
  );
};

Tickets.Layout = MainLayout;

export default Tickets;
