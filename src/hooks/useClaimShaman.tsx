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

  let shamanName;
  try{
    shamanName = await client.readContract({
      abi: ClaimShamanAbi,
      address: contractAddress,
      functionName: "name",
      args: [],
    });
  } catch (e) {
    shamanName = ""
    console.log("error", e);
  }

  let getters: string[] = [];
  let sdata: {[key: string]: any } = {};

  if(shamanName === "NFT6551ClaimerShaman") {
  getters = [
    "nft",
    "lootPerNft",
    "sharesPerNft",
    "paused",
    "vault"
  ];
}
  const shamanData = await Promise.all(
    getters.map(async (getter) => {
        let res;
        try{
      res = (await client.readContract({
        abi: ClaimShamanAbi,
        address: contractAddress,
        functionName: getter,
        args: [],
      }));
    } catch (e) {
        console.log("error", e);
        res = undefined
    }
      return res;
    })
  ) as string[];

  // loop through getters and add to sdata as key value pairs
    getters.forEach((getter, i) => {
        sdata[getter] = shamanData[i];
    });

  console.log("shamanData", sdata);

  return {  shamanName, sdata };
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
