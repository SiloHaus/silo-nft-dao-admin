import { useQuery } from "react-query";
import { TBVersion, TokenboundClient } from "@tokenbound/sdk";

import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress } from "@daohaus/utils";

const fetchTbaForNft = async ({
  contractAddress,
  tokenId,
  chainId,
}: {
  contractAddress: `0x${string}`;
  tokenId: string;
  chainId?: string;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;

  if (!networkId) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({
    chainId: networkId,
    version: TBVersion.V3,
  });

  const tokenBoundAccount = await tokenboundClient.getAccount({
    tokenContract: contractAddress,
    tokenId,
  });

  const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
    accountAddress: tokenBoundAccount,
  });

  return { tba: tokenBoundAccount, isDeployed: isAccountDeployed };
};

const fetchIsTba = async ({
  accountAddress,
  chainId,
}: {
  accountAddress: `0x${string}`;
  chainId?: string;
}) => {
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;

  if (!networkId) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({
    chainId: networkId,
    version: TBVersion.V3,
  });

  const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
    accountAddress: accountAddress,
  });

  return { tbaAddress: accountAddress, isDeployed: isAccountDeployed };
};

export const useTba = ({
  contractAddress,
  tokenId,
  chainId,
}: {
  contractAddress: `0x${string}`;
  tokenId: string;
  chainId?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tba-${contractAddress}-${tokenId}`],
    () => fetchTbaForNft({ contractAddress, tokenId, chainId }),
    { enabled: !!contractAddress && !!chainId }
  );

  return { ...data, error, ...rest };
};

export const useTbaMember = ({
  memberAddress,
  chainId,
}: {
  memberAddress: EthAddress;
  chainId?: string;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tba-member-${memberAddress}`],
    () => fetchIsTba({ accountAddress: memberAddress, chainId }),
    { enabled: !!memberAddress && !!chainId }
  );

  return { ...data, error, ...rest };
};
