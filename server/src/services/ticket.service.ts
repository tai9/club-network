import { Ticket } from "@/entities";
import { AppDataSource } from "../configs/db.config";
import { IGetTicketsParams } from "@/types/Ticket";
import { Like } from "typeorm";
import axios from "axios";

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

const getTicketByTokenId = async (tokenId: string) => {
  try {
    return await ticketRepository.findOneBy({
      tokenId,
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

interface ICheckoutLinkBody {
  title: string;
  description?: string;
  tokenId: string;
  imageUrl: string;
}

const createCheckoutLink = async ({
  title,
  description,
  tokenId,
  imageUrl,
}: ICheckoutLinkBody) => {
  try {
    const body = {
      title,
      description,
      tokenId,
      imageUrl,
      contractId: process.env.THIRDWEB_CONTRACT_ID,
      thirdwebClientId: process.env.THIRDWEB_CLIENT_ID,
      successCallbackUrl:
        process.env.NODE_ENV === "production"
          ? process.env.CLUB_NETWORK_CLIENT_URL
          : "",
      cancelCallbackUrl: "",
      brandButtonShape: "rounded",
      brandColorScheme: "#f7c842",
      brandDarkMode: true,
      hideNativeMint: false,
      listingId: "",
      twitterHandleOverride: "",
      hidePaperWallet: false,
      hideExternalWallet: false,
      hidePayWithCard: false,
      hidePayWithCrypto: false,
      hidePayWithIdeal: true,
      limitPerTransaction: 5,
      redirectAfterPayment: false,
      sendEmailOnTransferSucceeded: true,
      priceAndCurrencySymbol: {
        price: "0",
        currencySymbol: "ETH",
      },
      mintFunctionName: "",
      mintFunctionArgs: {},
    };
    const res = await axios.post<{ checkoutUrl: string }>(
      `${process.env.THIRDWEB_PAYMENT_ENDPOINT}/shareable-checkout-link`,
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.THIRDWEB_API_SECRET_KEY}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export default {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  createCheckoutLink,
  getTicketByTokenId,
};
