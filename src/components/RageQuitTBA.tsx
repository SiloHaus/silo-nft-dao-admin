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
import { APP_CONTRACT } from "../legos/contract";
import RageQuit from "./RageQuitForm";

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
export const RageQuitTBA = ({ tokenId, contractAddress }: ButtonProps) => {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();
  const { address: currentUser } = useDHConnect();
  const { tba, isDeployed, isError, isLoading } = useTba({
    contractAddress: contractAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });

  // const {
  //   isFetched,
  //   isFetching,
  //   member: tbaMember,
  // } = useDaoMember({
  //   daoChain: daoChain || "0x5",
  //   daoId: daoId || "",
  //   memberAddress: tba,
  // });

  const [open, setOpen] = useState(false);

  

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (isDeployed && tba && daoId && currentUser && dao?.sharesAddress) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <LinkAsButton>
            RageQuit{" "}
          </LinkAsButton>
        </DialogTrigger>

        <DialogContent title="Rage Quit TBA">
          <Container>
            <RageQuit tbaAddress={tba} currentUser={currentUser} />
          </Container>
        </DialogContent>
      </Dialog>
    );
  }
};
