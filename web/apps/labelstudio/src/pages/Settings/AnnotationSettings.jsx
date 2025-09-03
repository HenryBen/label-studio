import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@humansignal/ui";
import { Form, TextArea, Toggle } from "../../components/Form";
import { MenubarContext } from "../../components/Menubar/Menubar";
import { Block, Elem } from "../../utils/bem";
import { useTranslation } from "react-i18next";

import { ModelVersionSelector } from "./AnnotationSettings/ModelVersionSelector";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Divider } from "../../components/Divider/Divider";

export const AnnotationSettings = () => {
  const { t } = useTranslation();
  const { project, fetchProject } = useContext(ProjectContext);
  const pageContext = useContext(MenubarContext);
  const formRef = useRef();
  const [collab, setCollab] = useState(null);

  useEffect(() => {
    pageContext.setProps({ formRef });
  }, [formRef]);

  const updateProject = useCallback(() => {
    fetchProject(project.id, true);
  }, [project]);

  return (
    <Block name="annotation-settings">
      <Elem name={"wrapper"}>
        <h1>{t('annotationSettings.title')}</h1>
        <Block name="settings-wrapper">
          <Form
            ref={formRef}
            action="updateProject"
            formData={{ ...project }}
            params={{ pk: project.id }}
            onSubmit={updateProject}
          >
            <Form.Row columnCount={1}>
              <Elem name={"header"}>{t('annotationSettings.labelingInstructions.title')}</Elem>
              <div class="settings-description">
                <p style={{ marginBottom: "0" }}>{t('annotationSettings.labelingInstructions.description1')}</p>
                <p style={{ marginTop: "8px" }}>
                  {t('annotationSettings.labelingInstructions.description2')}
                </p>
              </div>
              <div>
                <Toggle label={t('annotationSettings.labelingInstructions.showBeforeLabeling')} name="show_instruction" />
              </div>
              <TextArea name="expert_instruction" style={{ minHeight: 128, maxWidth: "520px" }} />
            </Form.Row>

            <Divider height={32} />

            <Form.Row columnCount={1}>
              <br />
              <Elem name={"header"}>{t('annotationSettings.prelabeling.title')}</Elem>
              <div>
                <Toggle
                  label={t('annotationSettings.prelabeling.usePredictions')}
                  description={<span>{t('annotationSettings.prelabeling.description')}</span>}
                  name="show_collab_predictions"
                  onChange={(e) => {
                    setCollab(e.target.checked);
                  }}
                />
              </div>

              {(collab !== null ? collab : project.show_collab_predictions) && <ModelVersionSelector />}
            </Form.Row>

            <Form.Actions>
              <Form.Indicator>
                <span case="success">{t('annotationSettings.saved')}</span>
              </Form.Indicator>
              <Button type="submit" look="primary" className="w-[150px]" aria-label={t('annotationSettings.saveAriaLabel')}>
                {t('annotationSettings.save')}
              </Button>
            </Form.Actions>
          </Form>
        </Block>
      </Elem>
    </Block>
  );
};

AnnotationSettings.title = ({ t }) => t('settings.annotation');
AnnotationSettings.path = "/annotation";
