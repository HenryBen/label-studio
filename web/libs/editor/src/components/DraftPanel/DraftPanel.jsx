import { observer } from "mobx-react";
import { Button, Tooltip } from "@humansignal/ui";
import { useTranslation } from "react-i18next";
import Utils from "../../utils";
import { cn } from "../../utils/bem";

import "./DraftPanel.scss";

const panel = cn("draft-panel");

export const DraftPanel = observer(({ item }) => {
  const { t } = useTranslation();
  if (!item.draftSaved && !item.versions.draft) return null;
  const saved = item.draft && item.draftSaved ? ` ${t('editor.annotations.draft.saved')} ${Utils.UDate.prettyDate(item.draftSaved)}` : "";

  if (!item.selected) {
    if (!item.draft) return null;
    return <div className={panel}>{t('editor.annotations.draft.label')}{saved}</div>;
  }
  if (!item.versions.result || !item.versions.result.length) {
    return <div className={panel}>{saved ? `${t('editor.annotations.draft.label')}${saved}` : t('editor.annotations.draft.notSubmitted')}</div>;
  }
  return (
    <div className={panel}>
      <Tooltip
        alignment="top-left"
        title={item.draftSelected ? t('editor.annotations.draft.switchToOriginal') : t('editor.annotations.draft.switchToCurrent')}
      >
        <Button
          type="button"
          size="smaller"
          look="string"
          onClick={() => item.toggleDraft()}
          className={panel.elem("toggle")}
          aria-label={t('editor.annotations.draft.toggleMode')}
        >
          {item.draftSelected ? t('editor.annotations.draft.label') : t('editor.annotations.draft.original')}
        </Button>
      </Tooltip>
      {saved}
    </div>
  );
});
