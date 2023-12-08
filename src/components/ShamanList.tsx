import { DataSm, widthQuery } from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { styled } from "styled-components";
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
  align-content: space-between;
  align-items: center;
  width: 100%;
  div {
    margin-top: 3rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
      .manage {
        justify-content: flex-start;
        width: 100%;
      }
    }
  }
  .contract {
    display: flex;
    width: 35%;
  }
  .permissions {
    width: 10%;
  }
  .manage {
    display: flex;
    justify-content: flex-end;
    gap: 3rem;
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
        shamen.map((shaman) => {
          if (!shaman.permissions) return null;

          return (
            <ShamanItem
              shaman={shaman}
              daoChain={daoChain}
              daoId={daoId}
              includeLinks={includeLinks}
              key={shaman.id}
            />
          );
        })}
    </>
  );
};
