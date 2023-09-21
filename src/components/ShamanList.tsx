import { AddressDisplay, DataSm, widthQuery } from "@daohaus/ui";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { styled } from "styled-components";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { EthAddress } from "@daohaus/utils";
import { ShamanItem } from "./ShamanItem";

type ShamanListProps = {
  shamen: MolochV3Dao["shamen"];
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
};

export const ShamanListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    margin-top: 3rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
  .contract {
    display: flex;
    width: 60%;
  }
  .permissions {
    width: 20%;
  }
  .manage {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 40%;
  }
`;

export const ShamanList = ({
  shamen,
  daoChain,
  daoId,
  includeLinks,
}: ShamanListProps) => {
  return (
    <>
      <ShamanListContainer>
        <div className="contract">
          <DataSm>Contract</DataSm>
        </div>
        <div className="permissions">
          <DataSm>Permissions</DataSm>
        </div>
      </ShamanListContainer>
      {shamen &&
        shamen.map((shaman) => (
          <ShamanItem
            shaman={shaman}
            daoChain={daoChain}
            daoId={daoId}
            includeLinks={includeLinks}
            key={shaman.id}
          />
        ))}
    </>
  );
};
