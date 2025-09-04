import React from "react";
import { Spinner } from "../../../components";
import { useAPI } from "../../../providers/ApiProvider";
import { cn } from "../../../utils/bem";
import "./Config.scss";
import { IconInfo } from "@humansignal/icons";
import { Button } from "@humansignal/ui";
import { useTranslation } from "react-i18next";

const listClass = cn("templates-list");

const Arrow = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Arrow Icon</title>
    <path opacity="0.9" d="M2 10L6 6L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const TemplatesInGroup = ({ templates, group, onSelectRecipe }) => {
  const picked = templates
    .filter((recipe) => recipe.group === group)
    // templates without `order` go to the end of the list
    .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));

  return (
    <ul>
      {picked.map((recipe) => (
        <li key={recipe.title} onClick={() => onSelectRecipe(recipe)} className={listClass.elem("template")}>
          <img src={recipe.image} alt={""} />
          <h3>{recipe.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export const TemplatesList = ({ selectedGroup, selectedRecipe, onCustomTemplate, onSelectGroup, onSelectRecipe }) => {
  const [groups, setGroups] = React.useState([]);
  const [templates, setTemplates] = React.useState();
  const api = useAPI();
  const { t } = useTranslation();

  const getTranslatedGroupName = (groupName) => {
    const groupKey = groupName.toLowerCase().replace(/[^a-z0-9]/g, '');
    switch (groupKey) {
      case 'computervision':
        return t('createProject.recipes.groups.computerVision');
      case 'naturallanguageprocessing':
        return t('createProject.recipes.groups.nlp');
      case 'audiospeechprocessing':
        return t('createProject.recipes.groups.audioSpeechProcessing');
      case 'conversationalai':
        return t('createProject.recipes.groups.conversationalAi');
      case 'rankingscoring':
        return t('createProject.recipes.groups.rankingScoring');
      case 'structureddataparsing':
        return t('createProject.recipes.groups.structuredDataParsing');
      case 'timeseriesanalysis':
        return t('createProject.recipes.groups.timeSeriesAnalysis');
      case 'videos':
        return t('createProject.recipes.groups.videos');
      case 'generativeai':
        return t('createProject.recipes.groups.generativeAi');
      default:
        return groupName;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await api.callApi("configTemplates");

      if (!res) return;
      const { templates, groups } = res;

      setTemplates(templates);
      setGroups(groups);
    };
    fetchData();
  }, []);

  const selected = selectedGroup || groups[0];

  return (
    <div className={listClass}>
      <aside className={listClass.elem("sidebar")}>
        <ul>
          {groups.map((group) => (
            <li
              key={group}
              onClick={() => onSelectGroup(group)}
              className={listClass.elem("group").mod({
                active: selected === group,
                selected: selectedRecipe?.group === group,
              })}
            >
              {getTranslatedGroupName(group)}
              <Arrow />
            </li>
          ))}
        </ul>
        <Button
          type="button"
          align="left"
          look="string"
          size="small"
          onClick={onCustomTemplate}
          className="w-full"
          aria-label={t('createProject.recipes.customTemplate')}
        >
          {t('createProject.recipes.customTemplate')}
        </Button>
      </aside>
      <main>
        {!templates && <Spinner style={{ width: "100%", height: 200 }} />}
        <TemplatesInGroup templates={templates || []} group={selected} onSelectRecipe={onSelectRecipe} />
      </main>
      <footer className="flex items-center justify-center gap-1">
        <IconInfo className={listClass.elem("info-icon")} width="20" height="20" />
        <span>
          {t('createProject.recipes.documentationText')}{" "}
          <a href="https://labelstud.io/guide" target="_blank" rel="noreferrer">
            {t('createProject.recipes.contributeTemplate')}
          </a>
          .
        </span>
      </footer>
    </div>
  );
};
