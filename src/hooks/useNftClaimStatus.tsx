import { useQuery } from "react-query";
import { TokenboundClient } from "@tokenbound/sdk";

import {
  HAUS_NETWORK_DATA,
  Keychain,
  ValidNetwork,
} from "@daohaus/keychain-utils";
import { EthAddress, createViemClient, isNumberish } from "@daohaus/utils";

import ClaimShamanAbi from "../abis/claimShaman.json";

const fetchClaimStatus = async ({
  shamanAddress,
  tokenId,
  chainId,
  rpcs,
}: {
  shamanAddress?: EthAddress;
  tokenId: string;
  chainId?: string;
  rpcs?: Keychain;
}) => {
  if (!chainId || !shamanAddress) {
    throw new Error("Missing Args");
  }

  const client = createViemClient({
    chainId: chainId as ValidNetwork,
    rpcs,
  });

  let claimTime;
  try {
    claimTime = await client.readContract({
      abi: ClaimShamanAbi,
      address: shamanAddress,
      functionName: "claims",
      args: [tokenId],
    });
  } catch (e) {
    console.log("error", e);
  }

  return { claimTime, isClaimed: Number(claimTime) > 0 };
};

export const useClaimStatus = ({
  shamanAddress,
  tokenId,
  chainId,
  rpcs,
}: {
  shamanAddress?: EthAddress;
  tokenId: string;
  chainId?: string;
  rpcs?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`nft-${shamanAddress}-${tokenId}-claimStatus`],
    () => fetchClaimStatus({ shamanAddress, tokenId, chainId, rpcs }),
    { enabled: !!shamanAddress && !!chainId && !!tokenId }
  );

  return { ...data, error, ...rest };
};
