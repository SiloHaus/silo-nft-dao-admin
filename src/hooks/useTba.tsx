import { useQuery } from "react-query";
import { TokenboundClient } from '@tokenbound/sdk'

import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";

const fetchTbaForNft = async ({
  contractAddress,
  tokenId,
  chainId,
}: {
  contractAddress: `0x${string}`;
  tokenId: string;
  chainId: string;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;

  if (!networkId) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({ chainId: networkId })

  const tokenBoundAccount = await tokenboundClient.getAccount({
    tokenContract: contractAddress,
    tokenId,
  });

  console.log('tokenBoundAccount', tokenBoundAccount)

  return tokenBoundAccount;
};

export const useTba = ({,
  contractAddress,
  tokenId,
  chainId,
}: {
  contractAddress: `0x${string}`;
  tokenId: string;
  chainId: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tba-${contractAddress}-${tokenId}`],
    () => fetchTbaForNft({ contractAddress ,tokenId,  chainId }),
    { enabled: !!contractAddress }
  );

  return { tba: data, error, ...rest };
};
