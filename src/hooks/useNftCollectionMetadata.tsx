import { useQuery } from "react-query";
import { SequenceMetadataClient } from "@0xsequence/metadata";

import { ValidNetwork } from "@daohaus/keychain-utils";
import { SEQUENCE_CHAIN_NAME } from "../utils/constants";

const fetchNftCollectionMetadata = async ({
  contractAddress,
  chainId,
}: {
  contractAddress?: `0x${string}`;
  chainId?: string;
}) => {
  const sequenceChain = SEQUENCE_CHAIN_NAME[chainId as ValidNetwork];

  if (!sequenceChain || !contractAddress) {
    throw new Error("Invalid args");
  }

  const metadataClient = new SequenceMetadataClient();

  const collectionMeta = await metadataClient.getContractInfoBatch({
    chainID: sequenceChain,
    contractAddresses: [contractAddress],
  });

  console.log("collectionMeta", collectionMeta.contractInfoMap);

  const metadata =
    collectionMeta.contractInfoMap[contractAddress.toLowerCase()];

  console.log("metadata"), metadata;

  return { ...metadata };
};

export const useNftCollectionMetadata = ({
  contractAddress,
  chainId,
}: {
  contractAddress?: string;
  chainId?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`nft-collection-${contractAddress}`],
    () =>
      fetchNftCollectionMetadata({
        contractAddress: contractAddress as `0x${string}`,
        chainId,
      }),
    { enabled: !!contractAddress && !!chainId }
  );

  return { nft: data, error, ...rest };
};
