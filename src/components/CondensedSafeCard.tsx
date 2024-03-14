import React, { useEffect, useMemo, useState } from 'react';

import { DaoSafe, MolochV3Dao } from '@daohaus/moloch-v3-data';
import { IFindQueryResult } from "@daohaus/data-fetch-utils";

import {
  AddressDisplay,
  Bold,
  DataIndicator,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  H4,
  Link,
  ParLg,
  ParXs,
  Tag,
} from '@daohaus/ui';
import { EthAddress, formatValueTo, generateGnosisUiLink } from '@daohaus/utils';
import { Keychain, ValidNetwork, getNetwork } from '@daohaus/keychain-utils';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  widthQuery,
  Button,
  font,
  DropdownLinkStyles,
} from '@daohaus/ui';
import { useDHConnect } from '@daohaus/connect';
import { RiMore2Fill } from "react-icons/ri/index.js";
import { DataGrid, StyledLink } from './layout/GeneralLayouts';
import { ButtonRouterLink } from './ButtonRouterLink';
import { StyledRouterLink } from './ProfileCard.styles';
import { SafeInfo, fetchSafe } from '../utils/safes';

export const SafeContainer = styled(Card)`
  padding: 2rem;
  width: 100%;
  border: none;
  margin-bottom: 1rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const SafeOverviewCard = styled(Card)`
  background-color: ${({ theme }) => theme.secondary.step3};
  border: none;
  padding: 1rem;
  width: 100%;
`;

export const SafeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .right-section {
    display: flex;
    gap: 1rem;
  }

  .safe-link {
    padding: 0.9rem;
    background-color: ${({ theme }) => theme.secondary.step5};
    border-radius: 4px;
  }
`;

export const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const SafeActionMenuTrigger = styled(Button)`
  width: 0.5rem;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-left {
    color: ${({ theme }) => theme.primary.step9};
    margin-right: 0;
    margin: 5rem;
  }
`;

export const SafeActionMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;
// import { SafeActionMenu } from './SafeActionMenu';

type SafeActionMenuProps = {
    ragequittable: boolean;
    safeAddress: string;
    daoChain: string;
    daoId: string;
  };
  
  export const SafeActionMenu = ({
    ragequittable,
    safeAddress,
    daoChain,
    daoId,
  }: SafeActionMenuProps) => {
    const { address } = useDHConnect();
  
    const networkData = useMemo(() => {
      if (!daoChain) return null;
      return getNetwork(daoChain);
    }, [daoChain]);
  
    // must be connected to view action menu
    if (!address) return null;
  
    return (
      <DropdownMenu>
        <DropdownTrigger asChild>
          <SafeActionMenuTrigger
            IconRight={RiMore2Fill}
            size="sm"
            variant="ghost"
          />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem key="erc20" asChild>
            <SafeActionMenuLink
              to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
                ragequittable
                  ? 'TRANSFER_ERC20'
                  : `TRANSFER_ERC20_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Transfer ERC-20
            </SafeActionMenuLink>
          </DropdownItem>
          <DropdownItem key="eth" asChild>
            <SafeActionMenuLink
              to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
                ragequittable
                  ? 'TRANSFER_NETWORK_TOKEN'
                  : `TRANSFER_NETWORK_TOKEN_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Transfer {networkData?.symbol}
            </SafeActionMenuLink>
          </DropdownItem>
          <DropdownItem key="txbuilder" asChild>
            <SafeActionMenuLink
              to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
                ragequittable
                  ? 'MULTICALL'
                  : `MULTICALL_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Tx Builder
            </SafeActionMenuLink>
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    );
  };

type SafeCardProps = {
  dao: MolochV3Dao;
  safe: DaoSafe;
  daoChain: string;
  includeLinks?: boolean;
};

export const CondensedSafeCard = ({
  dao,
  safe,
  daoChain,
  includeLinks = false,
}: SafeCardProps) => {
  const [safeData, setSafeData] = useState<IFindQueryResult<SafeInfo>>();


  useEffect(() => {

    const getSafeInfo = async (managerAccountAddress: EthAddress) => {
      const safeInfo = await fetchSafe({
        safeAddress: managerAccountAddress,
        networkId: daoChain as ValidNetwork,
      });
      console.log('safeInfo', safeInfo);
      setSafeData(safeInfo);
    }

    if (safe.safeAddress) {
      getSafeInfo(safe.safeAddress as EthAddress);
    }
  }, [safe, daoChain]);

  const isTreasury = useMemo(() => {
    return safe.safeAddress === dao.safeAddress;
  }, [safe, dao]);

  return (
    <SafeContainer>
      <SafeOverviewCard>
        <SafeCardHeader>
          <div>
            <ParLg>{safe.name}</ParLg>
            <TagSection>
              <AddressDisplay
                address={safe.safeAddress}
                truncate
                copy
                explorerNetworkId={daoChain as keyof Keychain}
              />
              {isTreasury && <Tag tagColor="pink">Ragequittable</Tag>}
              {safeData && safeData.data?.modules && safeData.data?.modules.length > 1 && <Tag tagColor="yellow">Managed</Tag>}
            </TagSection>
          </div>
          <DataIndicator
            label="Balance"
            data={formatValueTo({
              value: safe.fiatTotal,
              decimals: 2,
              format: 'currencyShort',
            })}
          />
          <DataIndicator label="Tokens" data={safe.tokenBalances.length} />
          <div className="right-section">
            <div className="safe-link">
              <Link
                href={generateGnosisUiLink({
                  chainId: daoChain as keyof Keychain,
                  address: safe.safeAddress,
                })}
              >
                <ParXs>
                  <Bold>Gnosis Safe</Bold>
                </ParXs>
              </Link>
            </div>
            {includeLinks && (
              <SafeActionMenu
                ragequittable={safe.ragequittable}
                safeAddress={safe.safeAddress}
                daoChain={daoChain}
                daoId={dao.id}
              />
            )}
          </div>

        </SafeCardHeader>
      </SafeOverviewCard>
    </SafeContainer>
  );
};