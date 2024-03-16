import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";

export const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.WALLET_PRIVATE_KEY,
  Sepolia,
  {
    secretKey: process.env.CONTRACT_SECRET_KEY,
  }
);
