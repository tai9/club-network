import { Ticket } from "@/entities";
import { AppDataSource } from "../configs/db.config";

const ticketRepository = AppDataSource.getRepository(Ticket);

// TODO: query by params
const getTickets = async () => {
  try {
    const [data, count] = await ticketRepository.findAndCount({
      relations: ["createdBy", "owner"],
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createTicket = async (ticket: Ticket) => {
  try {
    return await ticketRepository.save(ticket);
  } catch (err) {
    throw err;
  }
};

export default {
  getTickets,
  createTicket,
};
