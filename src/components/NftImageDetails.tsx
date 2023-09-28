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
  fromWei,
  handleErrorMessage,
  isString,
} from "@daohaus/utils";
import { useTxBuilder } from "@daohaus/tx-builder";
import { LOCAL_ABI } from "@daohaus/abis";
import { useDHConnect } from "@daohaus/connect";

import { useTba } from "../hooks/useTba";
import TBA_ACCOUNT from "../abis/tbaAccount.json";
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

const NftCardImage = styled.img`
  min-width: 50rem;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.card.radius};
`;

type ButtonProps = {
  tokenId: string;
  contractAddress: string;
  nftImage: string;
};
export const NftImageDetails = ({
  tokenId,
  contractAddress,
  nftImage,
}: ButtonProps) => {
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();
  const { address: currentUser } = useDHConnect();

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

  console.log("tbaMember", tbaMember);

  const [open, setOpen] = useState(false);

  const mismatchedChain = daoChainId !== chainId;

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (isDeployed && tba && daoId && currentUser && dao?.sharesAddress) {
    return (
      <Container>
        <NftCardImage src={nftImage} />
        <ParMd>Shares: {fromWei(tbaMember?.shares || "0")}</ParMd>
        <ParMd>Loot:{fromWei(tbaMember?.loot || "0")}</ParMd>
        <ParMd>Delegating To:</ParMd>
        {tbaMember?.delegatingTo && (
          <AddressDisplay address={tbaMember.delegatingTo} truncate />
        )}
      </Container>
    );
  }
};
