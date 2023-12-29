import { Keychain } from "@daohaus/keychain-utils";

export const NFT_DAO_REFERRER = "DHFixedLootShamanSummoner";

export const SEQUENCE_ENDPOINTS: Keychain = {
  "0x1": "https://mainnet-indexer.sequence.app",
  "0x5": "https://goerli-indexer.sequence.app",
  "0x64": "https://gnosis-indexer.sequence.app",
  "0x89": "https://polygon-indexer.sequence.app",
  "0xa": "https://optimism-indexer.sequence.app",
  "0xa4b1": "https://arbitrum-indexer.sequence.app",
};

// TODO: check these urls
export const TOKENBOUND_URL: Keychain = {
  "0x1": "https://tokenbound.org/assets/mainnet",
  "0x5": "https://tokenbound.org/assets/goerli",
  "0x64": "https://tokenbound.org/assets/gnosis",
  "0x89": "https://tokenbound.org/assets/polygon",
  "0xa": "https://tokenbound.org/assets/optimism",
  "0xa4b1": "https://tokenbound.org/assets/arbitrum",
};

export const OPENSEA_URL: Keychain = {
  "0x1": "https://opensea.io/assets/ethereum",
  "0x5": "https://testnet.opensea.io/assets/goerli",
  "0x64": "https://opensea.io/assets/gnosis",
  "0x89": "https://opensea.io/assets/polygon",
  "0xa": "https://opensea.io/assets/optimism",
  "0xa4b1": "https://opensea.io/assets/arbitrum",
};

export const SEQUENCE_CHAIN_NAME: Keychain = {
  "0x1": "mainnet",
  "0x5": "goerli",
  "0x64": "gnosis",
  "0x89": "polygon",
  "0xa": "optimism",
  "0xa4b1": "arbitrum",
};
