import { Ticket } from "@/entities";
import { AppDataSource } from "../configs/db.config";
import { IGetTicketsParams } from "@/types/Ticket";
import { Like } from "typeorm";

const ticketRepository = AppDataSource.getRepository(Ticket);

const getTickets = async (queries: IGetTicketsParams) => {
  try {
    const skip = (queries.page - 1) * queries.limit;
    let where = {};
    let order = {};

    if (!!queries.order?.length) {
      queries.order.forEach((o) => {
        const [key, value] = o.split(",");
        order[key] = value;
      });
    }

    if (queries.search) {
      where["content"] = Like(`%${queries.search}%`);
    }

    const [data, count] = await ticketRepository.findAndCount({
      relations: ["createdBy", "owner"],
      where,
      skip,
      take: queries.limit,
      order: {
        updatedAt: "DESC",
        ...order,
      },
    });
    const totalPages = Math.ceil(count / queries.limit) || 1;
    return {
      count,
      totalPages,
      page: queries.page,
      limit: queries.limit,
      data,
    };
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

const getTicketById = async (id: number) => {
  try {
    return await ticketRepository.findOneBy({
      id,
    });
  } catch (err) {
    throw err;
  }
};

const updateTicket = async (ticket: Ticket) => {
  try {
    return await ticketRepository.update(ticket.id, ticket);
  } catch (err) {
    throw err;
  }
};

export default {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
};
