import { z } from "zod";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconCloudProviderRedis } from "@humansignal/icons";
import { i18n } from "../../../../../../../libs/datamanager/src/utils/i18n";

export const redisProvider: ProviderConfig = {
  name: "redis",
  title: i18n.t('storage.redisStorage'),
  description: i18n.t('storage.redisStorageDescription'),
  icon: IconCloudProviderRedis,
  fields: [
    {
      name: "db",
      type: "text",
      label: i18n.t('storage.databaseNumber'),
      placeholder: i18n.t('storage.databaseNumberPlaceholder'),
      schema: z.string().default("1"),
    },
    {
      name: "password",
      type: "password",
      label: i18n.t('storage.password'),
      autoComplete: "new-password",
      placeholder: i18n.t('storage.redisPasswordPlaceholder'),
      schema: z.string().optional().default(""),
    },
    {
      name: "host",
      type: "text",
      label: i18n.t('storage.host'),
      required: true,
      placeholder: i18n.t('storage.redisHostPlaceholder'),
      schema: z.string().min(1, i18n.t('storage.hostRequired')),
    },
    {
      name: "port",
      type: "text",
      label: i18n.t('storage.port'),
      placeholder: i18n.t('storage.redisPortPlaceholder'),
      schema: z.string().default("6379"),
    },
    {
      name: "prefix",
      type: "text",
      label: i18n.t('storage.bucketPrefix'),
      placeholder: i18n.t('storage.bucketPrefixPlaceholder'),
      schema: z.string().optional().default(""),
      target: "export",
    },
  ],
  layout: [{ fields: ["host", "port", "db", "password"] }, { fields: ["prefix"] }],
};

export default redisProvider;
