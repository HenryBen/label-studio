import { z } from "zod";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconDocument } from "@humansignal/icons";
import { i18n } from "../../../../../../../libs/datamanager/src/utils/i18n";

export const localFilesProvider: ProviderConfig = {
  name: "localfiles",
  title: i18n.t('storage.localFiles'),
  description: i18n.t('storage.localFilesDescription'),
  icon: IconDocument,
  fields: [
    {
      name: "path",
      type: "text",
      label: i18n.t('storage.absoluteLocalPath'),
      required: true,
      placeholder: i18n.t('storage.localPathPlaceholder'),
      schema: z.string().min(1, i18n.t('storage.pathRequired')),
    },
    {
      name: "prefix",
      type: "text",
      label: i18n.t('storage.path'),
      placeholder: i18n.t('storage.bucketPrefixPlaceholder'),
      schema: z.string().optional().default(""),
      target: "export",
    },
  ],
  layout: [{ fields: ["path"] }, { fields: ["prefix"] }],
};

export default localFilesProvider;
