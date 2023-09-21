import { Card, H3, ParSm, widthQuery } from '@daohaus/ui';

import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { ValidNetwork } from '@daohaus/keychain-utils';

import { styled } from 'styled-components';
import { ShamanList } from './ShamanList';

type ShamanSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  includeLinks?: boolean;
};

export const SettingsContainer = styled(Card)`
  width: 110rem;
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const ShamanContainer = styled.div`
  .tokens {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 4rem;
  }
`;
export const ShamanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;


export const ShamanSettings = ({
  dao,
  daoChain,
  includeLinks = false,
}: ShamanSettingsProps) => {
  return (
    <SettingsContainer>
      <ShamanContainer>
        <ShamanCardHeader>
          <H3>Shamans</H3>
        </ShamanCardHeader>
        <div className="description">
          <ParSm>
            Shamans are contracts that can adjust governance settings, token
            settings, and memberships without proposals. Because shamans can
            affect the security of the DAO, be cautious when adding new shamans,
            and remove any that are no longer needed.
          </ParSm>
        </div>

        {dao.shamen && dao.shamen.length > 0 && (
          <ShamanList
            shamen={dao.shamen}
            daoChain={daoChain}
            daoId={dao.id}
            includeLinks={includeLinks}
          />
        )}
      </ShamanContainer>
    </SettingsContainer>
  );
};