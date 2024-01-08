import { useTxBuilder } from "@daohaus/tx-builder";
import { Button, Dialog, DialogContent, ParMd, useToast } from "@daohaus/ui";
import { APP_TX } from "../legos/tx";
import { EthAddress, handleErrorMessage } from "@daohaus/utils";
import { useState } from "react";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { useClaimStatus } from "../hooks/useNftClaimStatus";
import { useDHConnect } from "@daohaus/connect";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { RiArrowRightLine } from "react-icons/ri";

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
  const { daoChain, daoId } = useCurrentDao();
  const { address, daoChainId, chainId } = useDHConnect();

  const { refetch } = useClaimStatus({
    shamanAddress: shamanAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const mismatchedChain = daoChainId !== chainId;

  const handleClaim = async () => {
    setIsLoading(true);

    await fireTransaction({
      tx: { ...APP_TX.CLAIM_AND_DEPLOY_FOR_NFT, staticArgs: [tokenId] },
      callerState: {
        shamanAddress: shamanAddress,
      },
      lifeCycleFns: {
        onTxError(error) {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Activation Failed", description: errMsg });
          setIsLoading(false);
        },
        onTxSuccess() {
          setOpen(true);
          successToast({
            title: TxStates.Success,
            description: `Successful Activation. Manage Delegation on your profile page.`,
          });
          setIsLoading(false);
          refetch();
        },
      },
    });
  };

  return (
    <>
    <Button
      onClick={handleClaim}
      color="secondary"
      size="sm"
      fullWidth
      disabled={isClaimed || isLoading || mismatchedChain}
      isLoading={isLoading}
    >
      {isClaimed ? "Already Activated" : "Claim Governance Drop"}
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent title="Successfull Governance Claim">
          <ParMd>You have Successfully claimed your NPCs governance power. </ParMd>
          <ParMd>After you have claimed all your NPCs you can manage delegation on your profile page</ParMd>

          <ButtonRouterLink
          color="secondary"
          to={`/molochV3/${daoChain}/${daoId}/member/${address}`}
          IconRight={RiArrowRightLine}
          disabled={!address}
          style={{marginTop: "1rem"}}
        >
          My Profile
        </ButtonRouterLink>
        </DialogContent>
      </Dialog>
    </>
  );
};
