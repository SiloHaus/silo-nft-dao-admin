import { useState } from "react";

import {
  AddressDisplay,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Link,
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
import { styled } from "styled-components";
import { tbaAppLink } from "../utils/tokenboundHelpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const NftCardImage = styled.img`
  max-width: 60rem;
  max-height: 30rem;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.card.radius};
`;

type ButtonProps = {
  tokenId: string;
  contractAddress: string;
  nftImage: string;
  isClaimed: boolean;
};
export const NftImageDetails = ({
  tokenId,
  contractAddress,
  nftImage,
  isClaimed,
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

  const mismatchedChain = daoChainId !== chainId;

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (daoId && currentUser) {
    return (
      <Container>
        <NftCardImage src={nftImage} />
        {isClaimed ? (
          <>
            <ParMd>Power: {fromWei(tbaMember?.shares || "0")}</ParMd>
            <ParMd>Meme Token: {fromWei(tbaMember?.loot || "0")} {dao?.lootTokenSymbol}</ParMd>
            <ParMd>Delegating To:</ParMd>
            {tbaMember?.delegatingTo && (
              <AddressDisplay address={tbaMember.delegatingTo} truncate />
            )}
          </>
        ) : (
          <ParMd>Not Claimed</ParMd>
        )}
        <LinkBox>
          <Link href={tbaAppLink({ contractAddress, tokenId, daoChain })}>
            TokenBound
          </Link>
        </LinkBox>
      </Container>
    );
  }
};
