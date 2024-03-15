import { SequenceIndexerClient } from "@0xsequence/indexer";
import { useQuery } from "react-query";
import { SEQUENCE_ENDPOINTS } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { fetchClaimStatus } from "./useNftClaimStatus";
import { EthAddress } from "@daohaus/utils";

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
  shamanAddress,
  chainId,
}: {
  accountAddress: string;
  contractAddress?: string;
  shamanAddress?: string;
  chainId: string;
}) => {
  if (!accountAddress || !contractAddress) {
    throw new Error("Missing Args");
  }
  const sequenceEndPoint = SEQUENCE_ENDPOINTS[chainId as ValidNetwork];
  if (!sequenceEndPoint) {
    throw new Error("Invalid ChainId");
  }

  const indexer = new SequenceIndexerClient(sequenceEndPoint);

  const nftBalances = await indexer.getTokenBalances({
    contractAddress: contractAddress,
    accountAddress: accountAddress,
    includeMetadata: true,
  });

  console.log(">>>> nftBalances", nftBalances);

  const nftsWithClaimStatus = await Promise.all(
    nftBalances.balances.map(async (nft, i) => {
      return {
        ...nft,
        ...(await fetchClaimStatus({
          shamanAddress: shamanAddress as EthAddress,
          tokenId: nft.tokenID,
          chainId,
        })),
      };
    })
  );

  return { balances: nftsWithClaimStatus, page: nftBalances.page };
};

export const useAccountNfts = ({
  accountAddress,
  contractAddress,
  shamanAddress,
  chainId,
}: {
  accountAddress: string;
  contractAddress?: string;
  shamanAddress?: string;
  chainId: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`accountNfts-${accountAddress}-${contractAddress}`],
    () =>
      fetchNftsForAccount({
        accountAddress,
        contractAddress,
        shamanAddress,
        chainId,
      }),
    { enabled: !!accountAddress && !!contractAddress && !!shamanAddress }
  );

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};
