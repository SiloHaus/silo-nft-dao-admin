import { ValidNetwork } from "@daohaus/keychain-utils";
import { H4, Link, ParLg } from "@daohaus/ui";
import { TOKENBOUND_URL } from "../utils/constants";

export const ConnectTBAInstructions = ({
  contractAddress,
  tokenId,
  daoChain,
}: {
  contractAddress: string;
  tokenId: string;
  daoChain: ValidNetwork;
}) => {
  return (
    <>
      <H4>How to connect your Token Bound Account</H4>
      <ParLg>Step 1: Disconnect</ParLg>
      <ParLg>
        Step 2: Connect again with Wallet Connect and copy the connection string
      </ParLg>
      <ParLg>Step 3: Visit the TBA app and connect there</ParLg>

      <Link href={`${TOKENBOUND_URL[daoChain]}/${contractAddress}/${tokenId}`}>
        TBA app
      </Link>
    </>
  );
};
