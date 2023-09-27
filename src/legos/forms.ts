import { FormLego } from "@daohaus/form-builder";
import { FIELD } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./legoConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

const PROPOSAL_SETTINGS_FIELDS = [FIELD.PROPOSAL_EXPIRY, FIELD.PROP_OFFERING];

export const APP_FORM: Record<string, CustomFormLego> = {
  SIGNAL: {
    id: "SIGNAL",
    title: "Signal Form",
    subtitle: "Signal Proposal",
    description: "Ratify on-chain using a DAO proposal.",
    requiredFields: { title: true, description: true },
    log: true,
    tx: APP_TX.POST_SIGNAL,
    fields: [
      FIELD.TITLE,
      FIELD.DESCRIPTION,
      FIELD.LINK,
      APP_FIELD.TEST_FIELD,
      ...PROPOSAL_SETTINGS_FIELDS,
    ],
  },
  DELEGATE_TBA: {
    id: "DELEGATE_TBA",
    title: "Delegate Form",
    subtitle: "Delegate Voting Power",
    description: "Delegate your voting power to another member of the DAO.",
    requiredFields: { },
    log: true,
    fields: [
      FIELD.INPUT_ADDRESS,
    ],
  },
};
