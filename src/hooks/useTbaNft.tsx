import { useQuery } from "react-query";
import { TokenboundClient } from "@tokenbound/sdk";

import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";

const fetchNftForTba = async ({
  tbaAddress,
  chainId,
}: {
  tbaAddress: `0x${string}`;
  chainId?: string;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;

  if (!networkId) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({ chainId: networkId });

  const nft = await tokenboundClient.getNFT({
    accountAddress: tbaAddress,
  });

  console.log("nft from tba sdk", nft);

  return nft;
};

export const useTbaNft = ({
  tbaAddress,
  chainId,
}: {
  tbaAddress: `0x${string}`;
  chainId?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tbaNft-${tbaAddress}`],
    () => fetchNftForTba({ tbaAddress, chainId }),
    { enabled: !!tbaAddress && !!chainId }
  );

  return { ...data, error, ...rest };
};
