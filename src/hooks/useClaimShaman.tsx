import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { createViemClient } from "@daohaus/utils";
import ClaimShamanAbi from "../abis/claimShaman.json";

const fetchShaman = async ({
  contractAddress,
  chainId,
  rpcs,
}: {
  contractAddress?: `0x${string}`;
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!chainId || !contractAddress) {
    throw new Error("Invalid ChainId");
  }

  const client = createViemClient({
    chainId,
    rpcs,
  });

  let shamanName;
  try {
    shamanName = await client.readContract({
      abi: ClaimShamanAbi,
      address: contractAddress,
      functionName: "name",
      args: [],
    });
  } catch (e) {
    shamanName = "";
    console.log("error", e);
  }

  let getters: string[] = [];
  let types: string[] = [];

  let sdata: { [key: string]: { result: string; type: string } } = {};

  // switch if known shaman
  if (shamanName === "NFT6551ClaimerShaman") {
    getters = ["nft", "lootPerNft", "sharesPerNft", "paused", "vault"];
    types = ["address", "uint256", "uint256", "bool", "address"];
  }
  const shamanData = (await Promise.all(
    getters.map(async (getter) => {
      let res;
      try {
        res = await client.readContract({
          abi: ClaimShamanAbi,
          address: contractAddress,
          functionName: getter,
          args: [],
        });
      } catch (e) {
        console.log("error", e);
        res = undefined;
      }

      return res;
    })
  )) as string[];

  // loop through getters and add to sdata as key value pairs
  getters.forEach((getter, i) => {
    sdata[getter] = { result: shamanData[i].toString(), type: types[i] };
  });

  console.log("shamanData", shamanName, shamanData);
  console.log("sData", sdata);

  console.log("contractAddress", contractAddress);

  return { shamanName, sdata, shamanAddress: contractAddress };
};

export const useClaimShaman = ({
  contractAddress,
  chainId,
}: {
  contractAddress?: `0x${string}`;
  chainId?: ValidNetwork;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tba-${contractAddress}}`],
    () => fetchShaman({ contractAddress, chainId }),
    { enabled: !!contractAddress && !!chainId }
  );

  return { ...data, error, ...rest };
};
