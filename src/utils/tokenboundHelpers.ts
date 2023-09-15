import { ValidNetwork } from "@daohaus/keychain-utils";
import { TOKENBOUND_URL } from "./constants";

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
