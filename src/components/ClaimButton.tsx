import { useTxBuilder } from "@daohaus/tx-builder";
import { Button, useToast } from "@daohaus/ui";
import { APP_TX } from "../legos/tx";
import { EthAddress, handleErrorMessage } from "@daohaus/utils";
import { useState } from "react";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { useClaimStatus } from "../hooks/useNftClaimStatus";
import { useDHConnect } from "@daohaus/connect";

enum TxStates {
  Idle = "Idle",
  Loading = "Loading",
  Error = "Error",
  Success = "Token Approved!",
}

type ClaimButtonProps = {
  tokenId: string;
  shamanAddress: string;
  isClaimed?: boolean;
};
export const ClaimButton = ({
  tokenId,
  shamanAddress,
  isClaimed = false,
}: ClaimButtonProps) => {
  const { fireTransaction } = useTxBuilder();
  const { errorToast, successToast } = useToast();
  const { daoChain } = useCurrentDao();
  const { daoChainId, chainId } = useDHConnect();

  const { refetch } = useClaimStatus({
    shamanAddress: shamanAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });
  const [isLoading, setIsLoading] = useState(false);

  const mismatchedChain = daoChainId !== chainId;

  const handleClaim = async () => {
    setIsLoading(true);

    await fireTransaction({
      tx: { ...APP_TX.CLAIM_FOR_NFT, staticArgs: [tokenId] },
      callerState: {
        shamanAddress: shamanAddress,
      },
      lifeCycleFns: {
        onTxError(error) {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Claim Failed", description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess() {
          successToast({
            title: TxStates.Success,
            description: `Successful Claim.`,
          });
          setIsLoading(false);
          refetch();
        },
      },
    });
  };

  return (
    <Button
      onClick={handleClaim}
      color="secondary"
      size="sm"
      fullWidth
      disabled={isClaimed || isLoading || mismatchedChain}
      isLoading={isLoading}
    >
      {isClaimed ? "Claimed" : "Claim"}
    </Button>
  );
};
