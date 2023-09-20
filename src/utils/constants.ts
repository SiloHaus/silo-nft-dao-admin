import { Keychain } from "@daohaus/keychain-utils";

export const NFT_DAO_REFERRER = "DHFixedLootShamanSummoner";

// temp
export const NFT_ADDRESS = "0x183cf837a551BD04A509F1cAE2b7C36394720b7c";

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
