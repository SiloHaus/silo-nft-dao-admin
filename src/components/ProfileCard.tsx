import { ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Member } from "@daohaus/moloch-v3-data";
import { useDaoData, useProfile } from "@daohaus/moloch-v3-hooks";
import { DataIndicator, ParLg, Loading } from "@daohaus/ui";
import { formatValueTo, memberUsdValueShare } from "@daohaus/utils";
import {
  AlertContainer,
  LoadingContainer,
  MProfileCard,
} from "./ProfileCard.styles";
import { Profile } from "./Profile";

type ProfileCardProps = {
  daoChain: ValidNetwork;
  daoId: string;
  profileAddress: string;
  member?: MolochV3Member;
  allowLinks?: boolean;
  allowMemberMenu?: boolean;
};

export const ProfileCard = ({
  daoChain,
  daoId,
  profileAddress,
  member,
  allowLinks = false,
  allowMemberMenu = false,
}: ProfileCardProps) => {
  const { dao, isLoading: isLoadingDao } = useDaoData({
    daoChain,
    daoId,
  });
  const { profile: currentProfile, isLoading: isLoadingProfile } = useProfile({
    address: member?.memberAddress || profileAddress || "",
  });

  // console.log("currentProfile >>>", currentProfile);

  if (
    // !member ||
    (!dao && !isLoadingDao) ||
    (!currentProfile && !isLoadingProfile)
  )
    return (
      <AlertContainer>
        <ParLg className="warn">Member Profile Not Found</ParLg>
      </AlertContainer>
    );

  return (
    <MProfileCard>
      {(!dao || 
      // !member || 
      !currentProfile) && (
        <LoadingContainer>
          <Loading size={120} />
        </LoadingContainer>
      )}
      {dao && 
      // member && 
      currentProfile && (
        <>
          <Profile
            daoChain={daoChain}
            dao={dao}
            profile={currentProfile}
            membership={member}
            allowLinks={allowLinks}
            allowMemberMenu={allowMemberMenu}
          />
        </>
      )}
    </MProfileCard>
  );
};
