import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.WALLET_PRIVATE_KEY,
  "sepolia",
  {
    secretKey: process.env.CONTRACT_SECRET_KEY,
  }
);
