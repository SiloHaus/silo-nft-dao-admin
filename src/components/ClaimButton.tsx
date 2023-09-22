import { useTxBuilder } from "@daohaus/tx-builder";
import { Button, useToast } from "@daohaus/ui";
import { APP_TX } from "../legos/tx";
import { handleErrorMessage } from "@daohaus/utils";
import { useState } from "react";

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
  const { errorToast, defaultToast, successToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    console.log("claiming tokenId, shamanAddress", tokenId, shamanAddress);
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
      disabled={isClaimed || isLoading}
    >
      {isClaimed ? "Claimed" : "Claim"}
    </Button>
  );
};
