import { ValidNetwork } from "@daohaus/keychain-utils";
import { OPENSEA_URL, TOKENBOUND_URL } from "./constants";

export const tbaAppLink = ({
  contractAddress,
  tokenId,
  daoChain,
}: {
  tokenId?: string;
  contractAddress?: string;
  daoChain?: string;
}) => {
  if (!daoChain || !tokenId || !contractAddress) return undefined;
  return `${
    TOKENBOUND_URL[daoChain as ValidNetwork]
  }/${contractAddress}/${tokenId}`;
};

export const openseaAppLink = ({
  contractAddress,
  tokenId,
  daoChain,
}: {
  tokenId?: string;
  contractAddress?: string;
  daoChain?: string;
}) => {
  if (!daoChain || !tokenId || !contractAddress) return undefined;
  return `${
    OPENSEA_URL[daoChain as ValidNetwork]
  }/${contractAddress}/${tokenId}`;
};
