import { useMemo } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { toWholeUnits, handleBaseUnits } from '@daohaus/utils';
import { Buildable, Button, WrappedInput, Field } from '@daohaus/ui';
import { useConnectedMember, useDaoData, useDaoMember } from '@daohaus/moloch-v3-hooks';
import { Keychain } from '@daohaus/keychain-utils';

export const RagequitToken = (props: Buildable<Field>) => {
  const { id } = props;
  const { setValue, getValues,  } = useFormContext();
  const { dao } = useDaoData();
  if (!dao) return null;

  const tbaAddress  = getValues("tba");

  if (!tbaAddress) return null;


  const { member } = useDaoMember({
    daoId: dao.id,
    daoChain: "0x5" as keyof Keychain,
    memberAddress: tbaAddress,
  });

  if (!member) return null;

  const daoTokenData = useMemo(() => {
    if (!dao || !tbaAddress) return null;
    return {
      label:
        id === 'sharesToBurn'
          ? `Voting Tokens (${dao.shareTokenSymbol})`
          : `Non-Voting Tokens (${dao.lootTokenSymbol})`,
      maxAmount:
        id === 'sharesToBurn' ? member.shares : member.loot,
    };
  }, [tbaAddress, member, dao, id]);

  const setMax = () => {
    setValue(id, toWholeUnits(daoTokenData?.maxAmount || '0'));
  };

  const newRules: RegisterOptions = {
    setValueAs: (value) => handleBaseUnits(value, 18),
    ...props.rules,
  };

  if (!daoTokenData) {
    return null;
  }

  return (
    <WrappedInput
      {...props}
      id={id}
      label={daoTokenData.label}
      defaultValue="0"
      rightAddon={
        <Button color="secondary" size="sm" onClick={setMax}>
          Max: {toWholeUnits(daoTokenData.maxAmount || '0')}
        </Button>
      }
      rules={newRules}
    />
  );
};