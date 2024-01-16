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
  ParSm,
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
  ABI,
  EthAddress,
  encodeFunction,
  handleErrorMessage,
  isString,
} from "@daohaus/utils";
import { useTxBuilder } from "@daohaus/tx-builder";
import { LOCAL_ABI } from "@daohaus/abis";
import { useDHConnect } from "@daohaus/connect";
import { RiCheckboxCircleFill } from "react-icons/ri/index.js";

import { useTba } from "../hooks/useTba";
import { erc6551AccountAbiV3 } from "@tokenbound/sdk";
import { styled } from "styled-components";
import { APP_FORM } from "../legos/forms";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { AppFieldLookup } from "../legos/legoConfig";
import { FormBuilder } from "@daohaus/form-builder";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AddressDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const LinkAsButton = styled.a`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  cursor: pointer;
  background-color: #383838;
  border: 0.1rem solid #383838;
  &:hover {
  background-color: #663333;
  border: 0.1rem solid #663333;
  }
  align-items: center;
  align-items: center;
    border-radius: 0.4rem;
    cursor: pointer;
    display: flex;
    font-size: 1.6rem;
    font-weight: 700;
    height: 4.8rem;
    justify-content: center;
    letter-spacing: 1.8px;
    outline: none;
    padding: 1.2rem;
    text-decoration: none;
    transition: 0.2s all;
    width: fit-content;
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
  const [txWaiting, setTxWating] = useState(false);

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
    setTxWating(true);


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
          abi: erc6551AccountAbiV3 as ABI,
          targetAddress: tbaAddress,
        },
        method: "execute",
        disablePoll: true,
        args: [
          { type: "static", value: sharesAddress },
          { type: "static", value: 0 },
          { type: "static", value: encodedDelegate },
          { type: "static", value: 0 },
        ],
      },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Delegate Failed", description: errMsg });
          setTxWating(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Delegate Success",
            description: "Please wait...",
          });
          setTxWating(false);
        },
      },
    });
  };

  if (isError) return null;

  if (isLoading) return <Loading />;

  console.log("tba ", tba);
  console.log("tbaMember?.delegatingTo  ", tbaMember?.delegatingTo);

  if (isDeployed && tba && daoId && currentUser && dao?.sharesAddress) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <LinkAsButton>
            Delegate{" "}
            {tbaMember?.delegatingTo.toLocaleLowerCase() == currentUser.toLocaleLowerCase() && (<Tooltip triggerEl={<RiCheckboxCircleFill color="hsl(131, 41.0%, 46.5%)" />} content="Delegating to self" />)}
            {tbaMember?.delegatingTo.toLocaleLowerCase() == tba.toLocaleLowerCase() && (<Tooltip content="Delegated to NPC" />)}

            {tbaMember?.delegatingTo.toLocaleLowerCase() != currentUser.toLocaleLowerCase() &&
              (tbaMember?.delegatingTo.toLocaleLowerCase() != tba.toLocaleLowerCase() && (
                <Tooltip content="Delegate is not owner or tba" />
              ))}
          </LinkAsButton>
        </DialogTrigger>

        <DialogContent title="Delegate NPC">
          <Container>
            <ParMd>Currently Delegating To:</ParMd>
            {tbaMember?.delegatingTo.toLowerCase() == currentUser.toLowerCase() && (
              <AddressDisplayWrapper><ParSm>(Self)</ParSm><AddressDisplay address={tbaMember.delegatingTo} truncate /></AddressDisplayWrapper>
            )}
            {tbaMember?.memberAddress && tbaMember?.delegatingTo == tbaMember?.memberAddress && (
              <AddressDisplayWrapper><Link to="/about"><ParSm>(NPC)</ParSm></Link><AddressDisplay address={tbaMember.delegatingTo} truncate /></AddressDisplayWrapper>)}
            {tbaMember?.delegatingTo.toLowerCase() != currentUser.toLowerCase() && tbaMember?.memberAddress && tbaMember?.delegatingTo != tbaMember?.memberAddress && (
              <AddressDisplayWrapper><ParSm>(Other)</ParSm><AddressDisplay address={tbaMember.delegatingTo} truncate /></AddressDisplayWrapper>
            )}

            {checked && (
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
                disabled={mismatchedChain || txWaiting}
              >
                Delegate {checked ? "" : "To Your Self"} {txWaiting && <Loading />}
              </Button>


          </Container>
        </DialogContent>
      </Dialog>
    );
  }
};
