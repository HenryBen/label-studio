import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconCloudProviderAzure } from "@humansignal/icons";
import { z } from "zod";
import { i18n } from "../../../../../../../libs/datamanager/src/utils/i18n";

export const azureProvider: ProviderConfig = {
  name: "azure",
  title: i18n.t('storage.azureBlobStorage'),
  description: i18n.t('storage.azureBlobStorageDescription'),
  icon: IconCloudProviderAzure,
  fields: [
    {
      name: "container",
      type: "text",
      label: i18n.t('storage.containerName'),
      required: true,
      placeholder: i18n.t('storage.azureContainerPlaceholder'),
      schema: z.string().min(1, i18n.t('storage.containerNameRequired')),
    },
    {
      name: "prefix",
      type: "text",
      label: i18n.t('storage.bucketPrefix'),
      placeholder: i18n.t('storage.bucketPrefixPlaceholder'),
      schema: z.string().optional().default(""),
      target: "export",
    },
    {
      name: "account_name",
      type: "password",
      label: i18n.t('storage.accountName'),
      autoComplete: "off",
      accessKey: true,
      placeholder: i18n.t('storage.azureAccountNamePlaceholder'),
      schema: z.string().optional().default(""),
    },
    {
      name: "account_key",
      type: "password",
      label: i18n.t('storage.accountKey'),
      autoComplete: "new-password",
      accessKey: true,
      placeholder: i18n.t('storage.azureAccountKeyPlaceholder'),
      schema: z.string().optional().default(""),
    },
    {
      name: "presign",
      type: "toggle",
      label: i18n.t('storage.usePresignedUrls'),
      description: i18n.t('storage.usePresignedUrlsDescription'),
      schema: z.boolean().default(true),
      target: "import",
      resetConnection: false,
    },
    {
      name: "presign_ttl",
      type: "counter",
      label: i18n.t('storage.expirePresignedUrls'),
      min: 1,
      max: 10080,
      step: 1,
      schema: z.number().min(1).max(10080).default(15),
      target: "import",
      resetConnection: false,
      dependsOn: {
        field: "presign",
        value: true,
      },
    },
  ],
  layout: [
    { fields: ["container"] },
    { fields: ["prefix"] },
    { fields: ["account_name"] },
    { fields: ["account_key"] },
    { fields: ["presign", "presign_ttl"] },
  ],
};

export default azureProvider;
