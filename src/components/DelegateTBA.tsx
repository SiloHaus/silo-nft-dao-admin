import { useState } from "react";

import {
  AddressDisplay,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Loading,
  ParMd,
  Tooltip,
  WarningText,
  WrappedInput,
  useToast,
} from "@daohaus/ui";
import {
  useCurrentDao,
  useDaoData,
  useDaoMember,
} from "@daohaus/moloch-v3-hooks";
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
import { erc6551AccountAbiV2 } from "@tokenbound/sdk";
import { styled } from "styled-components";
import { APP_FORM } from "../legos/forms";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { AppFieldLookup } from "../legos/legoConfig";
import { FormBuilder } from "@daohaus/form-builder";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

type ButtonProps = {
  tokenId: string;
  contractAddress: string;
};
export const DelegateTBA = ({ tokenId, contractAddress }: ButtonProps) => {
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

  const {
    isFetched,
    isFetching,
    member: tbaMember,
  } = useDaoMember({
    daoChain: daoChain || "0x5",
    daoId: daoId || "",
    memberAddress: tba,
  });

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputAddress, setInputAddress] = useState(currentUser);

  const mismatchedChain = daoChainId !== chainId;

  const toggleChecked = () => {
    setInputAddress(currentUser);
    setChecked(!checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
  };

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
          abi: erc6551AccountAbiV2,
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
            {tbaMember?.delegatingTo != currentUser ||
              (tbaMember?.delegatingTo != tba && (
                <Tooltip content="Delegate is not owner or tba" />
              ))}
          </Button>
        </DialogTrigger>

        <DialogContent title="Delegate TBA">
          <Container>
            <ParMd>
              Delegate to {checked ? "a different Address" : "the NFT Owner"}:
            </ParMd>
            {!checked ? (
              <AddressDisplay address={currentUser} truncate={true} />
            ) : (
              <Input
                id="delegateAddress"
                onChange={handleChange}
                disabled={isLoading}
                full
                placeholder={"0x..."}
              />
            )}
            <Checkbox
              onCheckedChange={toggleChecked}
              checked={checked}
              defaultChecked={false}
              title="Delegate to a different address"
            />
            <Button
              onClick={() =>
                handleClick(
                  tba,
                  inputAddress || currentUser,
                  dao?.sharesAddress
                )
              }
              disabled={mismatchedChain}
            >
              Delegate
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    );
  }
};
