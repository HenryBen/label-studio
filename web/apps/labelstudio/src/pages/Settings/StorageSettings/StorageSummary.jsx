import { format } from "date-fns/esm";
import { useTranslation } from "react-i18next";
import { Button, CodeBlock, IconFileCopy, Space, Tooltip } from "@humansignal/ui";
import { DescriptionList } from "../../../components/DescriptionList/DescriptionList";
import { modal } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { getLastTraceback } from "../../../utils/helpers";
import { useCopyText } from "@humansignal/core/lib/hooks/useCopyText";

// Component to handle copy functionality within the modal
const CopyButton = ({ msg }) => {
  const { t } = useTranslation();
  const [copyText, copied] = useCopyText(msg);

  return (
    <Button variant="neutral" icon={<IconFileCopy />} onClick={copyText} disabled={copied} className="w-[7rem]">
      {copied ? t('storage.copied') : t('storage.copy')}
    </Button>
  );
};

export const StorageSummary = ({ target, storage, className, storageTypes = [] }) => {
  const { t } = useTranslation();
  const storageStatus = storage.status.replace(/_/g, " ").replace(/(^\w)/, (match) => match.toUpperCase());
  const last_sync_count = storage.last_sync_count ? storage.last_sync_count : 0;

  const tasks_existed =
    typeof storage.meta?.tasks_existed !== "undefined" && storage.meta?.tasks_existed !== null
      ? storage.meta.tasks_existed
      : 0;
  const total_annotations =
    typeof storage.meta?.total_annotations !== "undefined" && storage.meta?.total_annotations !== null
      ? storage.meta.total_annotations
      : 0;

  // help text for tasks and annotations
  const tasks_added_help = t('storage.tasksAddedHelp', { count: last_sync_count });
  const tasks_total_help = [
    t('storage.tasksExistedHelp', { count: tasks_existed }),
    t('storage.tasksTotalHelp', { count: tasks_existed + last_sync_count }),
  ].join("\n");
  const annotations_help = t('storage.annotationsHelp', { count: last_sync_count });
  const total_annotations_help =
    typeof storage.meta?.total_annotations !== "undefined"
      ? t('storage.totalAnnotationsHelp', { count: storage.meta.total_annotations })
      : "";

  const handleButtonClick = () => {
    const msg =
      t('storage.errorLogsFor', { 
        exportPrefix: target === "export" ? "export " : "", 
        type: storage.type, 
        id: storage.id, 
        project: storage.project, 
        job: storage.last_sync_job 
      }) + ":\n\n" +
      `${getLastTraceback(storage.traceback)}\n\n` +
      `meta = ${JSON.stringify(storage.meta)}\n`;

    const currentModal = modal({
      title: t('storage.storageSyncErrorLog'),
      body: <CodeBlock code={msg} variant="negative" className="max-h-[50vh] overflow-y-auto" />,
      footer: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {!window.APP_SETTINGS?.whitelabel_is_active && (
            <div>
              <>
                <a
                  href="https://labelstud.io/guide/storage.html#Troubleshooting"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Learn more about cloud storage troubleshooting"
                >
                  {t('storage.seeDocs')}
                </a>{" "}
                {t('storage.troubleshootingTips')}
              </>
            </div>
          )}
          <Space>
            <CopyButton msg={msg} />
            <Button variant="primary" className="w-[7rem]" onClick={() => currentModal.close()}>
              {t('storage.close')}
            </Button>
          </Space>
        </div>
      ),
      style: { width: "700px" },
      optimize: false,
      allowClose: true,
    });
  };

  return (
    <div className={className}>
      <DescriptionList>
        <DescriptionList.Item term={t('storage.type')}>
          {(storageTypes ?? []).find((s) => s.name === storage.type)?.title ?? storage.type}
        </DescriptionList.Item>

        <Oneof value={storage.type}>
          <SummaryS3 case={["s3", "s3s"]} storage={storage} />
          <GSCStorage case="gcs" storage={storage} />
          <AzureStorage case="azure" storage={storage} />
          <RedisStorage case="redis" storage={storage} />
          <LocalStorage case="localfiles" storage={storage} />
        </Oneof>

        <DescriptionList.Item
          term={t('storage.status')}
          help={[
            t('storage.statusInitialized'),
            t('storage.statusQueued'),
            t('storage.statusInProgress'),
            t('storage.statusFailed'),
            t('storage.statusCompletedWithErrors'),
            t('storage.statusCompleted'),
          ].join("\n")}
        >
          {storageStatus === "Failed" || storageStatus === t('storage.statusCompletedWithErrors') ? (
            <span
              className="cursor-pointer border-b border-dashed border-negative-border-subtle text-negative-content"
              onClick={handleButtonClick}
            >
              {storageStatus} ({t('storage.viewLogs')})
            </span>
          ) : (
            storageStatus
          )}
        </DescriptionList.Item>

        {target === "export" ? (
          <DescriptionList.Item term={t('storage.annotations')} help={`${annotations_help}\n${total_annotations_help}`}>
            <Tooltip title={annotations_help}>
              <span>{last_sync_count}</span>
            </Tooltip>
            <Tooltip title={total_annotations_help}>
              <span> ({total_annotations} {t('storage.total')})</span>
            </Tooltip>
          </DescriptionList.Item>
        ) : (
          <DescriptionList.Item term={t('storage.tasks')} help={`${tasks_added_help}\n${tasks_total_help}`}>
            <Tooltip title={`${tasks_added_help}\n${tasks_total_help}`} style={{ whiteSpace: "pre-wrap" }}>
              <span>{last_sync_count + tasks_existed}</span>
            </Tooltip>
            <Tooltip title={tasks_added_help}>
              <span> ({last_sync_count} {t('storage.new')})</span>
            </Tooltip>
          </DescriptionList.Item>
        )}

        <DescriptionList.Item term={t('storage.lastSync')}>
          {storage.last_sync ? format(new Date(storage.last_sync), "MMMM dd, yyyy ∙ HH:mm:ss") : t('storage.notSyncedYet')}
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  );
};

const SummaryS3 = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t('storage.bucket')}>{storage.bucket}</DescriptionList.Item>;
};

const GSCStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t('storage.bucket')}>{storage.bucket}</DescriptionList.Item>;
};

const AzureStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t('storage.container')}>{storage.container}</DescriptionList.Item>;
};

const RedisStorage = ({ storage }) => {
  const { t } = useTranslation();
  return (
    <>
      <DescriptionList.Item term={t('storage.path')}>{storage.path}</DescriptionList.Item>
      <DescriptionList.Item term={t('storage.host')}>
        {storage.host}:{storage.port}/{storage.db}
      </DescriptionList.Item>
    </>
  );
};

const LocalStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t('storage.path')}>{storage.path}</DescriptionList.Item>;
};
