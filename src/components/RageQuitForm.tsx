import { useMemo, useState } from 'react';

import { FormBuilder, useFormBuilder } from '@daohaus/form-builder';
import { ABI, NETWORK_TOKEN_ETH_ADDRESS, TokenBalance, encodeFunction, handleErrorMessage, isString } from '@daohaus/utils';
import { COMMON_FORMS } from '@daohaus/moloch-v3-legos';
import { sortTokensForRageQuit } from '@daohaus/moloch-v3-fields';
import { FieldValues } from 'react-hook-form';

import { AppFieldLookup } from '../legos/legoConfig';
import {
    useConnectedMember,
    useCurrentDao,
    useDaoData,
    useDaoMembers,
} from '@daohaus/moloch-v3-hooks';
import { LOCAL_ABI } from '@daohaus/abis';
import { erc6551AccountAbiV3 } from '@tokenbound/sdk';
import { useTxBuilder } from '@daohaus/tx-builder';
import { useToast } from '@daohaus/ui';

export const RageQuit = ({
    tbaAddress,
    currentUser
}: {
    tbaAddress: string;
    currentUser: string;
}) => {
    const { dao, refetch } = useDaoData();
    const { refetch: refetchMembers } = useDaoMembers();
    const { daoChain, daoId } = useCurrentDao();
    const { fireTransaction } = useTxBuilder();
    const { errorToast, defaultToast } = useToast();
    const [txWaiting, setTxWating] = useState(false);


    const defaultFields = useMemo(() => {
        if (dao) {
            const treasury = dao.vaults.find(
                (v) => dao.safeAddress === v.safeAddress
            );

            return {
                tba: tbaAddress,
                to: currentUser,
                tokens:
                    treasury &&
                    sortTokensForRageQuit(
                        treasury.tokenBalances
                            .filter((token: TokenBalance) => Number(token.balance) > 0)
                            .map(
                                (token: TokenBalance) =>
                                    token.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS
                            )
                    ),
            };
        }
    }, [currentUser, dao]);

    const handleSubmit = (formVaules: FieldValues) => {

        if (!dao) {
            return;
        }
        setTxWating(true);

        const encodedRagequit = encodeFunction(LOCAL_ABI.BAAL, "ragequit", [
            formVaules.to,
            formVaules.sharesToBurn,
            formVaules.lootToBurn,
            formVaules.tokens,
        ]);
        if (!isString(encodedRagequit)) {
            throw new Error("Unable to encode delegate function");
        }

        console.log(encodedRagequit);

        fireTransaction({
            tx: {
                id: "RAGEQUIT_TO_OWNER",
                contract: {
                    type: "static",
                    contractName: "CURRENT_TBA",
                    abi: erc6551AccountAbiV3 as ABI,
                    targetAddress: tbaAddress as `0x${string}`,
                },
                method: "execute",
                disablePoll: true,
                args: [
                    { type: "static", value: dao.id },
                    { type: "static", value: 0 },
                    { type: "static", value: encodedRagequit },
                    { type: "static", value: 0 },
                ],
            },
            lifeCycleFns: {
                onTxError: (error) => {
                    const errMsg = handleErrorMessage({
                        error,
                    });
                    errorToast({ title: "Ragequit Failed", description: errMsg });
                    setTxWating(false);
                },
                onTxSuccess: () => {
                    defaultToast({
                        title: "Ragequit Success",
                        description: "Please wait...",
                    });
                    setTxWating(false);
                },
            },
        });
    }

    if (!dao || !currentUser) {
        return null;
    }


    //   const encodedRagequit = encodeFunction(LOCAL_ABI.BAAL, "ragequit", [

    //   ]);

    return (
        <FormBuilder
            defaultValues={defaultFields}
            form={{
                id: 'RAGEQUIT',
                title: 'Ragequit',
                subtitle: 'Receive tokens in exchange for its shares and/or loot.',
                fields: [
                    {
                        id: 'tba',
                        type: 'input',
                        label: 'Address of TBA',
                        expectType: 'ethAddress',
                        placeholder: '0x...',
                    },
                    {
                        id: 'tokenAmounts',
                        type: 'formSegment',
                        title: 'Step 1. Select voting and/or non-voting tokens to ragequit',
                        fields: [
                            {
                                id: 'sharesToBurn',
                                type: 'tbaRageQuitToken',
                            },
                            { id: 'lootToBurn', type: 'tbaRageQuitToken' },
                        ],
                    },
                    {
                        id: 'tokenAddresses',
                        type: 'formSegment',
                        title:
                            'Step 2. Select treasury tokens you want to receive in exchange for your DAO tokens',
                        fields: [{ id: 'tokens', type: 'ragequitTokenList' }],
                    },
                    {
                        id: 'checkRender',
                        type: 'checkRender',
                        gateLabel: 'Ragequit to different address (optional)',
                        components: [
                            {
                                id: 'to',
                                type: 'input',
                                label: 'Address to send funds',
                                expectType: 'ethAddress',
                                placeholder: '0x...',
                            },
                        ],
                    },
                ]
            }}
            customFields={AppFieldLookup}
            onSubmit={handleSubmit}
            //   lifeCycleFns={{
            //     onPollSuccess: () => {
            //       onFormComplete();
            //     },
            //   }}
            targetNetwork={daoChain}
        />
    );
}

export default RageQuit;