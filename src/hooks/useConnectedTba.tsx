import { useQuery } from "react-query";
import { TokenboundClient } from "@tokenbound/sdk";

import {
  HAUS_NETWORK_DATA,
  Keychain,
  ValidNetwork,
} from "@daohaus/keychain-utils";
import { EthAddress } from "@daohaus/utils";
import { findMember } from "@daohaus/moloch-v3-data";

const fetchTbaMembership = async ({
  connectedAddress,
  daoId,
  chainId,
  graphApiKeys,
}: {
  connectedAddress?: string;
  daoId?: string;
  chainId?: string;
  graphApiKeys?: Keychain;
}) => {
  if (!connectedAddress || !daoId || !chainId) {
    throw new Error("Missing args");
  }
  const networkId = HAUS_NETWORK_DATA[chainId as ValidNetwork]?.networkId;

  if (!networkId) {
    throw new Error("Invalid ChainId");
  }

  const tokenboundClient = new TokenboundClient({ chainId: networkId });

  const isDeployed = await tokenboundClient.checkAccountDeployment({
    accountAddress: connectedAddress as EthAddress,
  });

  const res =
    isDeployed &&
    (await findMember({
      networkId: chainId as ValidNetwork,
      dao: daoId,
      memberAddress: connectedAddress,
      graphApiKeys,
    }));
  console.log("res", res);

  return { isDeployed, membership: undefined };
};

export const useConnectedTba = ({
  connectedAddress,
  daoId,
  chainId,
  graphApiKeys,
}: {
  connectedAddress?: string;
  daoId?: string;
  chainId?: string;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`connected-tba-${connectedAddress}-${daoId}`],
    () =>
      fetchTbaMembership({ connectedAddress, daoId, chainId, graphApiKeys }),
    { enabled: !!connectedAddress && !!chainId && !!daoId }
  );

  return { ...data, error, ...rest };
};
