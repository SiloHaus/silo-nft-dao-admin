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
  ParLg,
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
import { ConnectTBAButton } from "./ConnectTBAButton";

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

const AddressDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
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
        <ParSm>A TBA lets you own assets and participate in DAOs. All as your NFT.</ParSm>
        <NftCardImage src={nftImage} />

        {isClaimed ? (
          <>
            <ParMd>Power: {fromWei(tbaMember?.shares || "0")}</ParMd>
            {Number(tbaMember?.loot )> 0 && (<ParMd>
              Meme Token: {fromWei(tbaMember?.loot || "0")}{" "}
              {dao?.lootTokenSymbol}
            </ParMd>)}
            <ParMd>Delegating To:</ParMd>
            {tbaMember?.delegatingTo.toLowerCase() == currentUser.toLowerCase() && (
              <AddressDisplayWrapper><ParSm>(Self)</ParSm><AddressDisplay address={tbaMember.delegatingTo} truncate /></AddressDisplayWrapper>
            )}
            {tbaMember?.memberAddress && tbaMember?.delegatingTo == tbaMember?.memberAddress && (
              <AddressDisplayWrapper><ParSm>(TBA)</ParSm><AddressDisplay address={tbaMember.delegatingTo} truncate /><ConnectTBAButton
                tokenId={tokenId}
                contractAddress={contractAddress}
              /></AddressDisplayWrapper>)}
            {tbaMember?.delegatingTo.toLowerCase() == currentUser.toLowerCase() && tbaMember?.memberAddress && tbaMember?.delegatingTo == tbaMember?.memberAddress && (
              <AddressDisplayWrapper><ParSm>Other:</ParSm><AddressDisplay address={tbaMember.delegatingTo} truncate /></AddressDisplayWrapper>
            )}
          </>
        ) : (
          <ParMd>Not Claimed</ParMd>
        )
        }
        <LinkBox>
          <Link href={tbaAppLink({ contractAddress, tokenId, daoChain })}>
            TokenBound
          </Link>
        </LinkBox>
      </Container >
    );
  }
};
