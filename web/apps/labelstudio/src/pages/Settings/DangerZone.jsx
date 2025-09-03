import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@humansignal/ui";
import { Label } from "../../components/Form";
import { confirm } from "../../components/Modal/Modal";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAPI } from "../../providers/ApiProvider";
import { useProject } from "../../providers/ProjectProvider";
import { cn } from "../../utils/bem";

export const DangerZone = () => {
  const { t } = useTranslation();
  const { project } = useProject();
  const api = useAPI();
  const history = useHistory();
  const [processing, setProcessing] = useState(null);

  const handleOnClick = (type) => () => {
    confirm({
      title: t('dangerZone.confirmation.title'),
      body: t('dangerZone.confirmation.body'),
      okText: t('dangerZone.confirmation.proceed'),
      buttonLook: "negative",
      onOk: async () => {
        setProcessing(type);
        if (type === "annotations") {
          // console.log('delete annotations');
        } else if (type === "tasks") {
          // console.log('delete tasks');
        } else if (type === "predictions") {
          // console.log('delete predictions');
        } else if (type === "reset_cache") {
          await api.callApi("projectResetCache", {
            params: {
              pk: project.id,
            },
          });
        } else if (type === "tabs") {
          await api.callApi("deleteTabs", {
            body: {
              project: project.id,
            },
          });
        } else if (type === "project") {
          await api.callApi("deleteProject", {
            params: {
              pk: project.id,
            },
          });
          history.replace("/projects");
        }
        setProcessing(null);
      },
    });
  };

  const buttons = useMemo(
    () => [
      {
        type: "annotations",
        disabled: true, //&& !project.total_annotations_number,
        label: t('dangerZone.deleteAnnotations.label', { count: project.total_annotations_number }),
      },
      {
        type: "tasks",
        disabled: true, //&& !project.task_number,
        label: t('dangerZone.deleteTasks.label', { count: project.task_number }),
      },
      {
        type: "predictions",
        disabled: true, //&& !project.total_predictions_number,
        label: t('dangerZone.deletePredictions.label', { count: project.total_predictions_number }),
      },
      {
        type: "reset_cache",
        help: t('dangerZone.resetCache.help'),
        label: t('dangerZone.resetCache.label'),
      },
      {
        type: "tabs",
        help: t('dangerZone.dropTabs.help'),
        label: t('dangerZone.dropTabs.label'),
      },
      {
        type: "project",
        help: t('dangerZone.deleteProject.help'),
        label: t('dangerZone.deleteProject.label'),
      },
    ],
    [project],
  );

  return (
    <div className={cn("simple-settings")}>
      <h1>{t('dangerZone.title')}</h1>
      <Label description={t('dangerZone.description')} />

      {project.id ? (
        <div style={{ marginTop: 16 }}>
          {buttons.map((btn) => {
            const waiting = processing === btn.type;
            const disabled = btn.disabled || (processing && !waiting);

            return (
              btn.disabled !== true && (
                <div className={cn("settings-wrapper")} key={btn.type}>
                  <h3>{btn.label}</h3>
                  {btn.help && <Label description={btn.help} style={{ width: 600, display: "block" }} />}
                  <Button
                    key={btn.type}
                    variant="negative"
                    look="outlined"
                    disabled={disabled}
                    waiting={waiting}
                    onClick={handleOnClick(btn.type)}
                    style={{ marginTop: 16 }}
                  >
                    {btn.label}
                  </Button>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Spinner size={32} />
        </div>
      )}
    </div>
  );
};

DangerZone.title = ({ t }) => t('dangerZone.title');
DangerZone.path = "/danger-zone";
