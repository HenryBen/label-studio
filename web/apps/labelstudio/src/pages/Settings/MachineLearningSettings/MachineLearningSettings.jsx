import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography, Spinner } from "@humansignal/ui";
import { Form, Label, Toggle } from "../../../components/Form";
import { modal } from "../../../components/Modal/Modal";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import { IconModels } from "@humansignal/icons";
import { useAPI } from "../../../providers/ApiProvider";
import { ProjectContext } from "../../../providers/ProjectProvider";
import { MachineLearningList } from "./MachineLearningList";
import { CustomBackendForm } from "./Forms";
import { TestRequest } from "./TestRequest";
import { StartModelTraining } from "./StartModelTraining";
import { useTranslation } from "react-i18next";
import "./MachineLearningSettings.scss";

export const MachineLearningSettings = () => {
  const { t } = useTranslation();
  const api = useAPI();
  const { project } = useContext(ProjectContext);
  const [backends, setBackends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchBackends = useCallback(async () => {
    setLoading(true);
    const models = await api.callApi("mlBackends", {
      params: {
        project: project.id,
        include_static: true,
      },
    });

    if (models) setBackends(models);
    setLoading(false);
    setLoaded(true);
  }, [project, setBackends]);

  const showTrainingModal = useCallback(
    (backend) => {
      const modalProps = {
        title: t('model.modal.startTraining'),
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <StartModelTraining backend={backend} />,
      };

      modal(modalProps);
    },
    [project, t],
  );

  const showRequestModal = useCallback(
    (backend) => {
      const modalProps = {
        title: t('model.modal.testRequest'),
        style: { width: 760 },
        closeOnClickOutside: true,
        body: <TestRequest backend={backend} />,
      };

      modal(modalProps);
    },
    [project, t],
  );

  const showMLFormModal = useCallback(
    (backend) => {
      const action = backend ? "updateMLBackend" : "addMLBackend";
      const modalProps = {
        title: backend ? t('model.modal.editModel') : t('model.modal.connectModel'),
        style: { width: 760 },
        closeOnClickOutside: false,
        body: (
          <CustomBackendForm
            action={action}
            backend={backend}
            project={project}
            onSubmit={() => {
              fetchBackends();
              modalRef.close();
            }}
          />
        ),
      };

      const modalRef = modal(modalProps);
    },
    [project, fetchBackends],
  );

  useEffect(() => {
    if (project.id) {
      fetchBackends();
    }
  }, [project.id]);

  return (
    <section>
      <div className="w-[40rem]">
        <Typography variant="headline" size="medium" className="mb-base">
          {t('model.title')}
        </Typography>
        {loading && <Spinner size={32} />}
        {loaded && backends.length === 0 && (
          <EmptyState
            icon={<IconModels />}
            title={t('model.emptyState.title')}
            description={t('model.emptyState.description')}
            action={
              <Button primary onClick={() => showMLFormModal()} aria-label={t('model.emptyState.buttonAriaLabel')}>
                {t('model.emptyState.buttonText')}
              </Button>
            }
            footer={
              <div>
                {t('model.emptyState.needHelp')}
                <br />
                <a href="https://labelstud.io/guide/ml" target="_blank" rel="noreferrer">
                  {t('model.emptyState.learnMore')}
                </a>
              </div>
            }
          />
        )}
        <MachineLearningList
          onEdit={(backend) => showMLFormModal(backend)}
          onTestRequest={(backend) => showRequestModal(backend)}
          onStartTraining={(backend) => startTrainingModal(backend)}
          fetchBackends={fetchBackends}
          backends={backends}
        />

        {backends.length > 0 && (
          <div className="my-wide">
            <Typography size="small" className="text-neutral-content-subtler">
              {t('model.instructions.intro')}
            </Typography>
            <Typography size="small" className="text-neutral-content-subtler mt-base">
              {t('model.instructions.step1')}
            </Typography>
            <Typography size="small" className="text-neutral-content-subtler mt-tighter">
              {t('model.instructions.step2')}
            </Typography>
            <Typography size="small" className="text-neutral-content-subtler mt-tighter">
              {t('model.instructions.step3')}
            </Typography>
            <Typography size="small" className="text-neutral-content-subtler mt-base">
              {t('model.instructions.prelabelingNote')}{" "}
              <NavLink to="annotation" className="hover:underline">
                {t('model.instructions.annotationSettings')}
              </NavLink>
              .
            </Typography>
          </div>
        )}

        <Form
          action="updateProject"
          formData={{ ...project }}
          params={{ pk: project.id }}
          onSubmit={() => fetchProject()}
        >
          {backends.length > 0 && (
            <div className="p-wide border border-neutral-border rounded-md">
              <Form.Row columnCount={1}>
                <Label text={t('model.configuration.title')} large />

                <div>
                  <Toggle
                    label={t('model.configuration.autoTraining.label')}
                    description={t('model.configuration.autoTraining.description')}
                    name="start_training_on_annotation_update"
                  />
                </div>
              </Form.Row>
            </div>
          )}

          {backends.length > 0 && (
            <Form.Actions>
              <Form.Indicator>
                <span case="success">Saved!</span>
              </Form.Indicator>
              <Button type="submit" look="primary" className="w-[120px]" aria-label="Save machine learning settings">
                Save
              </Button>
            </Form.Actions>
          )}
        </Form>
      </div>
    </section>
  );
};

MachineLearningSettings.title = ({ t }) => t('settings.model');
MachineLearningSettings.path = "/ml";
