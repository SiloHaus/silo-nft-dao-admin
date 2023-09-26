import { useQuery } from "react-query";

import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress, createViemClient } from "@daohaus/utils";
import ClaimShamanAbi from "../abis/claimShaman.json";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

const fetchShaman = async ({
  shamen,
  chainId,
  rpcs,
}: {
  shamen?: MolochV3Dao["shamen"];
  chainId?: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!chainId || !shamen) {
    throw new Error("Missing Args");
  }
  const client = createViemClient({
    chainId,
    rpcs,
  });

  const targetShamanName = "NFT6551ClaimerShaman";

  const claimShaman = shamen.find(async (shaman) => {
    try {
      const shamanName = await client.readContract({
        abi: ClaimShamanAbi,
        address: shaman.shamanAddress as EthAddress,
        functionName: "name",
        args: [],
      });

      return shamanName === targetShamanName;
    } catch (e) {
      return false;
    }
  });

  if (claimShaman) {
    const getters = ["nft", "lootPerNft", "sharesPerNft", "paused", "vault"];
    const types = ["address", "uint256", "uint256", "bool", "address"];
    let sdata: { [key: string]: { result: string; type: string } } = {};

    const shamanData = (await Promise.all(
      getters.map(async (getter) => {
        let res;
        try {
          res = await client.readContract({
            abi: ClaimShamanAbi,
            address: claimShaman.shamanAddress as EthAddress,
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

    getters.forEach((getter, i) => {
      sdata[getter] = { result: shamanData[i].toString(), type: types[i] };
    });

    return {
      shamanName: targetShamanName,
      sdata,
      shamanAddress: claimShaman.shamanAddress,
    };
  } else {
    throw new Error("Shaman not found");
  }
};

export const useClaimShaman = ({
  dao,
  chainId,
}: {
  dao?: MolochV3Dao;
  chainId?: ValidNetwork;
}) => {
  const { data, error, ...rest } = useQuery(
    [`claimShaman-${dao?.id}}`],
    () => fetchShaman({ shamen: dao?.shamen, chainId }),
    { enabled: !!dao && !!dao.shamen && !!chainId }
  );

  return { ...data, error, ...rest };
};
