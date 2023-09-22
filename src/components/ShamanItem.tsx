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
  const { shamanName, sdata } = useClaimShaman({
    contractAddress: shaman.shamanAddress as `0x${string}`,
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
                {(shamanName as string).slice(0, 32)}
              </Button>
            </DialogTrigger>
            <DialogContent title={shamanName as string}>
              {sdata && Object.keys(sdata).length > 0
                ? Object.keys(sdata).map((getter: string, idx) => {
                    return (
                      <div key={idx}>
                        {sdata[getter].type === "address" ? (
                          <>
                            <Label>{`${getter} Address:`}</Label>
                            <AddressDisplay
                              address={sdata[getter].result}
                              explorerNetworkId={daoChain as keyof Keychain}
                              truncate
                            />
                          </>
                        ) : sdata[getter].type === "uint256" ? (
                          <ParSm key={idx}>
                            {getter}:{" "}
                            {formatValueTo({
                              value: toWholeUnits(sdata[getter].result, 18),
                              decimals: 2,
                              format: "number",
                            })}
                          </ParSm>
                        ) : (
                          <ParSm key={idx}>
                            {getter}: {sdata[getter].result}
                          </ParSm>
                        )}
                      </div>
                    );
                  })
                : "no further info here"}{" "}
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"sm"} variant={"outline"}>
                Unknown
              </Button>
            </DialogTrigger>
            <DialogContent title={"Unknown"}>
              <>
                <Label>Address</Label>
                <AddressDisplay
                  address={shaman.shamanAddress}
                  explorerNetworkId={daoChain as keyof Keychain}
                  truncate
                />
                <ParSm>No further info here</ParSm>
              </>
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
