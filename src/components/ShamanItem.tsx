import {
  AddressDisplay,
  Button,
  DataSm,
  Dialog,
  DialogContent,
  DialogTrigger,
  Label,
  ParSm,
} from "@daohaus/ui";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";

import { ShamanListContainer } from "./ShamanList";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { formatValueTo, toWholeUnits } from "@daohaus/utils";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { styled } from "styled-components";

const DataPoint = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5rem;
  margin-bottom: 1rem;
`;

type ShamanItemProps = {
  shaman: {
    id: string;
    createdAt: string;
    shamanAddress: string;
    permissions: string;
  };
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
};

export const ShamanItem = ({
  shaman,
  daoChain,
  daoId,
  includeLinks,
}: ShamanItemProps) => {
  const { dao } = useDaoData();
  const { shamanName, sdata } = useClaimShaman({
    dao,
    chainId: daoChain,
  });
  return (
    <ShamanListContainer key={shaman.id}>
      <div className="contract">
        <AddressDisplay
          address={shaman.shamanAddress}
          explorerNetworkId={daoChain as keyof Keychain}
          truncate
        />
      </div>
      <div className="permissions">
        <DataSm>{shaman.permissions}</DataSm>
      </div>

      <div className="manage">
        {shamanName ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                Shaman Info
              </Button>
            </DialogTrigger>
            <DialogContent title={shamanName as string}>
              {sdata && Object.keys(sdata).length > 0
                ? Object.keys(sdata).map((getter: string, idx) => {
                    return (
                      <DataPoint key={idx}>
                        {sdata[getter].type === "address" ? (
                          <>
                            <Label>{`${getter.toUpperCase()} ADDRESS:`}</Label>
                            <AddressDisplay
                              address={sdata[getter].result}
                              explorerNetworkId={daoChain as keyof Keychain}
                              truncate
                            />
                          </>
                        ) : sdata[getter].type === "uint256" ? (
                          <>
                            <Label>{`${getter.toUpperCase()}:`}</Label>
                            <ParSm key={idx}>
                              {formatValueTo({
                                value: toWholeUnits(sdata[getter].result, 18),
                                decimals: 2,
                                format: "number",
                              })}
                            </ParSm>
                          </>
                        ) : (
                          <>
                            <Label>{`${getter.toUpperCase()}:`}</Label>
                            <ParSm key={idx}>
                              {getter}: {sdata[getter].result}
                            </ParSm>
                          </>
                        )}
                      </DataPoint>
                    );
                  })
                : "no further info here"}{" "}
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                Shaman Info
              </Button>
            </DialogTrigger>
            <DialogContent title={"Unknown"}>
              <DataPoint>
                <Label>Address</Label>
                <AddressDisplay
                  address={shaman.shamanAddress}
                  explorerNetworkId={daoChain as keyof Keychain}
                  truncate
                />
              </DataPoint>
              <ParSm>No further info here</ParSm>
            </DialogContent>
          </Dialog>
        )}
        {includeLinks && (
          <ButtonRouterLink
            size="sm"
            color="secondary"
            to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=UPDATE_SHAMAN&defaultValues=${JSON.stringify(
              {
                shamanAddress: shaman.shamanAddress,
                shamanPermission: shaman.permissions,
              }
            )}`}
          >
            Manage
          </ButtonRouterLink>
        )}
      </div>
    </ShamanListContainer>
  );
};
