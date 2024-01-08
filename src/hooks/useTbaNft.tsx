import { useQuery } from "react-query";
import { TBVersion, TokenboundClient } from "@tokenbound/sdk";
import { SequenceMetadataClient } from "@0xsequence/metadata";

import { HAUS_NETWORK_DATA, Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { SEQUENCE_CHAIN_NAME } from "../utils/constants";
import NftAbi from "../abis/nft.json";
import { createViemClient } from "@daohaus/utils";


const fetchNftForTba = async ({
  tbaAddress,
  chainId,
  rpcs
}: {
  tbaAddress: `0x${string}`;
  chainId?: string;
  rpcs?: Keychain;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;
  const sequenceChain = SEQUENCE_CHAIN_NAME[chainId as ValidNetwork];

  if (!networkId || !sequenceChain) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({
    chainId: networkId,
    version: TBVersion.V3,
  });

  const nft = await tokenboundClient.getNFT({
    accountAddress: tbaAddress,
  });

  let metadata;
  let owner;
  if (nft) {
    const metadataClient = new SequenceMetadataClient();

    const tokenMetadata = await metadataClient.getTokenMetadata({
      chainID: sequenceChain,
      contractAddress: nft.tokenContract,
      tokenIDs: [nft.tokenId],
    });

    metadata = tokenMetadata.tokenMetadata[0];

    const client = createViemClient({
      chainId: chainId as ValidNetwork,
      rpcs,
    });


    try {
      owner = await client.readContract({
        abi: NftAbi,
        address: nft.tokenContract,
        functionName: "ownerOf",
        args: [nft.tokenId],
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  return { tbaData: nft, metadata, owner };
};

export const useTbaNft = ({
  tbaAddress,
  chainId,
  rpcs
}: {
  tbaAddress: `0x${string}`;
  chainId?: string;
  rpcs?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tbaNft-${tbaAddress}`],
    () => fetchNftForTba({ tbaAddress, chainId }),
    { enabled: !!tbaAddress && !!chainId }
  );

  return { nft: data, error, ...rest };
};
