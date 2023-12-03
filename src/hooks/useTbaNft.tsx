import { useQuery } from "react-query";
import { TBVersion, TokenboundClient } from "@tokenbound/sdk";
import { SequenceMetadataClient } from "@0xsequence/metadata";

import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { SEQUENCE_CHAIN_NAME } from "../utils/constants";

const fetchNftForTba = async ({
  tbaAddress,
  chainId,
}: {
  tbaAddress: `0x${string}`;
  chainId?: string;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;
  const sequenceChain = SEQUENCE_CHAIN_NAME[chainId as ValidNetwork];

  if (!networkId || !sequenceChain) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({
    chainId: networkId,
    version: TBVersion.V2,
  });

  const nft = await tokenboundClient.getNFT({
    accountAddress: tbaAddress,
  });

  let metadata;
  if (nft) {
    const metadataClient = new SequenceMetadataClient();

    const tokenMetadata = await metadataClient.getTokenMetadata({
      chainID: sequenceChain,
      contractAddress: nft.tokenContract,
      tokenIDs: [nft.tokenId],
    });

    metadata = tokenMetadata.tokenMetadata[0];
  }

  return { tbaData: nft, metadata };
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

  return { nft: data, error, ...rest };
};
