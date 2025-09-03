import { z } from "zod";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconCloudProviderGCS } from "@humansignal/icons";
import { i18n } from "../../../../../../../libs/datamanager/src/utils/i18n";

export const gcsProvider: ProviderConfig = {
  name: "gcs",
  title: i18n.t('storage.googleCloudStorage'),
  description: i18n.t('storage.googleCloudStorageDescription'),
  icon: IconCloudProviderGCS,
  fields: [
    {
      name: "bucket",
      type: "text",
      label: i18n.t('storage.bucketName'),
      required: true,
      schema: z.string().min(1, i18n.t('storage.bucketNameRequired')),
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
      name: "google_application_credentials",
      type: "password",
      label: i18n.t('storage.googleApplicationCredentials'),
      description: i18n.t('storage.googleApplicationCredentialsDescription'),
      autoComplete: "new-password",
      accessKey: true,
      schema: z.string().optional().default(""), // JSON validation could be added if needed
    },
    {
      name: "google_project_id",
      type: "text",
      label: i18n.t('storage.googleProjectId'),
      description: i18n.t('storage.googleProjectIdDescription'),
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
    { fields: ["bucket"] },
    { fields: ["prefix"] },
    { fields: ["google_application_credentials"] },
    { fields: ["google_project_id"] },
    { fields: ["presign", "presign_ttl"] },
  ],
};

export default gcsProvider;
