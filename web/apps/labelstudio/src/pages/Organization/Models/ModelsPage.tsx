import { buttonVariant, Space } from "@humansignal/ui";
import { Block } from "apps/labelstudio/src/utils/bem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Page } from "../../types/Page";
import { EmptyList } from "./@components/EmptyList";

export const ModelsPage: Page = () => {
  return (
    <Block name="prompter">
      <EmptyList />
    </Block>
  );
};

ModelsPage.title = (options) => options.t('organization.models');
ModelsPage.titleRaw = "Models";
ModelsPage.path = "/models";

ModelsPage.context = () => {
  const { t } = useTranslation();
  return (
    <Space size="small">
      <Link to="/prompt/settings" className={buttonVariant({ size: "small" })}>
        {t('organization.createModel')}
      </Link>
    </Space>
  );
};
