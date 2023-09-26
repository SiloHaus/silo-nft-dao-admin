import { useState } from "react";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Loading,
  ParMd,
  useToast,
} from "@daohaus/ui";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import {
  EthAddress,
  encodeFunction,
  handleErrorMessage,
  isString,
} from "@daohaus/utils";
import { useTxBuilder } from "@daohaus/tx-builder";
import { LOCAL_ABI } from "@daohaus/abis";
import { useDHConnect } from "@daohaus/connect";

import { useTba } from "../hooks/useTba";
import TBA_ACCOUNT from "../abis/tbaAccount.json";

type ButtonProps = {
  tokenId: string;
  contractAddress: string;
};
export const DelegateToOwnerButton = ({
  tokenId,
  contractAddress,
}: ButtonProps) => {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();
  const { address: currentUser } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast } = useToast();
  const { tba, isDeployed, isError, isLoading } = useTba({
    contractAddress: contractAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });
  const { daoChainId, chainId } = useDHConnect();

  const [open, setOpen] = useState(false);

  const mismatchedChain = daoChainId !== chainId;

  const handleClick = (
    tbaAddress: EthAddress,
    userAddress: string,
    sharesAddress: string
  ) => {
    // get encoded delegate function
    console.log(
      "userAddress, sharesAddress, tbaAddress ",
      userAddress,
      sharesAddress,
      tbaAddress
    );

    const encodedDelegate = encodeFunction(LOCAL_ABI.SHARES, "delegate", [
      userAddress,
    ]);
    if (!isString(encodedDelegate)) {
      throw new Error("Unable to encode delegate function");
    }
    console.log("encodedDelegate ", encodedDelegate);
    fireTransaction({
      tx: {
        id: "DELEGATE_TO_OWNER",
        contract: {
          type: "static",
          contractName: "CURRENT_TBA",
          abi: TBA_ACCOUNT,
          targetAddress: tbaAddress,
        },
        method: "executeCall",
        disablePoll: true,
        args: [
          { type: "static", value: sharesAddress },
          { type: "static", value: 0 },
          { type: "static", value: encodedDelegate },
        ],
      },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Delegate Failed", description: errMsg });
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Delegate Success",
            description: "Please wait...",
          });
        },
      },
    });
  };

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (isDeployed && tba && daoId && currentUser && dao?.sharesAddress) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button color="secondary" size="sm">
            Delegate
          </Button>
        </DialogTrigger>

        <DialogContent title="Delegate To Owner">
          <ParMd>You can delegate to your self or another address.</ParMd>
          <Button
            onClick={() => handleClick(tba, currentUser, dao?.sharesAddress)}
            disabled={mismatchedChain}
          >
            Delegate To Owner
          </Button>
          <Checkbox title="Delegate to a different address" />
        </DialogContent>
      </Dialog>
    );
  }
};
