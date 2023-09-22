import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Loading,
  useToast,
} from "@daohaus/ui";
import { useState } from "react";
import { ConnectTBAInstructions } from "./ConnectTBAInstructions";
import { NFT_ADDRESS, TOKENBOUND_URL } from "../utils/constants";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  EthAddress,
  encodeFunction,
  encodeValues,
  handleErrorMessage,
  isString,
} from "@daohaus/utils";
import { useTba } from "../hooks/useTba";
import { tbaAppLink } from "../utils/tokenboundHelpers";

import TBA_ACCOUNT from "../abis/tbaAccount.json";

import { useTxBuilder } from "@daohaus/tx-builder";
import { LOCAL_ABI } from "@daohaus/abis";
import { useDHConnect } from "@daohaus/connect";

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
  const { errorToast, defaultToast, successToast } = useToast();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { tba, isDeployed, isError, isLoading } = useTba({
    contractAddress: contractAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });

  console.log("tba ", tba, isDeployed);

  const [open, setOpen] = useState(false);

  const handleClick = (
    tbaAddress: EthAddress,
    daoAddress: string,
    userAddress: string,
    sharesAddress: string
  ) => {
    setIsDataLoading(true);

    // get encoded delegate function
    console.log("userAddress, sharesAddress, tbaAddress ", userAddress, sharesAddress, tbaAddress);

    // const encodedValues = encodeValues(["address"], [userAddress]);
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
          setIsDataLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Delegate Success",
            description: "Please wait...",
          });
          // refetch();
          setIsDataLoading(false);
        },
      },
    });
  };

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (!isDeployed && tba && daoId && currentUser && dao?.sharesAddress) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button color="secondary" size="sm" fullWidth>
            Delegate
          </Button>
        </DialogTrigger>

        <DialogContent title="Delegate To Owner">
          Delegate To Owner here
          <Button
            onClick={() =>
              handleClick(tba, daoId, currentUser, dao?.sharesAddress)
            }
          >
            Delegate To Owner
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
};
