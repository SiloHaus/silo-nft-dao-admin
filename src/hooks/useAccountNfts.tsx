import { SequenceIndexerClient } from "@0xsequence/indexer";
import { useQuery } from "react-query";
import { SEQUENCE_ENDPOINTS } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";

const fetchNftsForAccount = async ({
  accountAddress,
  contractAddress,
  chainId,
}: {
  accountAddress: string;
  contractAddress?: string;
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

  return nftBalances;
};

export const useAccountNfts = ({
  accountAddress,
  contractAddress,
  chainId,
}: {
  accountAddress: string;
  contractAddress?: string;
  chainId: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`accountNfts-${accountAddress}-${contractAddress}`],
    () => fetchNftsForAccount({ accountAddress, contractAddress, chainId }),
    { enabled: !!accountAddress && !!contractAddress }
  );

  return { accountNfts: data?.balances, page: data?.page, error, ...rest };
};
