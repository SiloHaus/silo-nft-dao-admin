import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import ClaimShamanAbi from "../abis/claimShaman.json";


const fetchShaman = async ({
  contractAddress,
  chainId,
  rpcs,
}: {
  contractAddress: `0x${string}`;
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {

  if (!chainId) {
    throw new Error("Invalid ChainId");
  }

  const client = createViemClient({
    chainId,
    rpcs,
  });

  const getters = [
    "nft",
    "lootPerNft",
    "sharesPerNft",
    "paused",
    "vault"
  ];
  const shamanData = await Promise.all(
    getters.map(async (getter) => {
      return (await client.readContract({
        abi: ClaimShamanAbi,
        address: contractAddress,
        functionName: getter,
        args: [],
      }));
    })
  ) as string[];


  const nftAddress = shamanData[0];
  const lootPerNft = shamanData[1];
  const sharesPerNft = shamanData[2];
  const paused = shamanData[3];
  const vaultAddress = shamanData[4];
  console.log("shamanData", shamanData);

  return {  nftAddress, lootPerNft, sharesPerNft, paused, vaultAddress };
};

export const useClaimShaman = ({
  contractAddress,
  chainId,
}: {
  contractAddress: `0x${string}`;
  chainId?: ValidNetwork;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tba-${contractAddress}}`],
    () => fetchShaman({ contractAddress, chainId }),
    { enabled: !!contractAddress && !!chainId }
  );

  return { ...data, error, ...rest };
};
