import { Button } from "@humansignal/ui";
import { Block, Elem } from "apps/labelstudio/src/utils/bem";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import "./EmptyList.scss";
import { HeidiAi } from "apps/labelstudio/src/assets/images";

export const EmptyList: FC = () => {
  const { t } = useTranslation();
  return (
    <Block name="empty-models-list">
      <Elem name="content">
        <Elem name="heidy">
          <HeidiAi />
        </Elem>
        <Elem name="title">{t('organization.createModel')}</Elem>
        <Elem name="caption">{t('organization.buildModelDescription')}</Elem>
        <Button aria-label={t('organization.createNewModelAriaLabel')}>{t('organization.createModel')}</Button>
      </Elem>
    </Block>
  );
};
