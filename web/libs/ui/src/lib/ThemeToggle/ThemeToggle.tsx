import { clsx } from "clsx";
import styles from "./ThemeToggle.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ReactComponent as Sun } from "./icons/sun.svg";
import { ReactComponent as Moon } from "./icons/moon.svg";
import { Badge } from "@humansignal/ui";
import { atom, useSetAtom } from "jotai";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  className?: string;
}

const getThemeOptions = (t: any) => [t('themeToggle.auto', 'Auto'), t('themeToggle.light', 'Light'), t('themeToggle.dark', 'Dark')];
const THEME_KEYS = ["Auto", "Light", "Dark"];
const PREFERRED_COLOR_SCHEME_KEY = "preferred-color-scheme";

export const getCurrentTheme = () => {
  const themeSelection = window.localStorage.getItem(PREFERRED_COLOR_SCHEME_KEY) ?? THEME_KEYS[0];
  return themeSelection === THEME_KEYS[0]
    ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "Dark"
      : "Light"
    : themeSelection;
};
export const themeAtom = atom<string>(getCurrentTheme());
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { t } = useTranslation();
  const themeOptions = getThemeOptions(t);
  const presetTheme = window.localStorage.getItem(PREFERRED_COLOR_SCHEME_KEY) ?? THEME_KEYS[1];
  const [theme, setTheme] = useState(presetTheme);
  const systemMode = useMemo(
    () => (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light"),
    [],
  );
  const [appliedTheme, setAppliedTheme] = useState(presetTheme === "Auto" ? systemMode : presetTheme);
  const setThemeAtom = useSetAtom(themeAtom);

  useEffect(() => {
    if (!appliedTheme) return;
    document.documentElement.setAttribute("data-color-scheme", appliedTheme.toLowerCase());
  }, [appliedTheme]);

  const themeChanged = useCallback(() => {
    const length = THEME_KEYS.length;
    const index = (THEME_KEYS.indexOf(theme) + 1) % length;
    const nextTheme = THEME_KEYS[index];

    window.localStorage.setItem(PREFERRED_COLOR_SCHEME_KEY, nextTheme);
    setTheme(nextTheme);
    const newTheme = nextTheme === "Auto" ? systemMode : nextTheme;
    setAppliedTheme(newTheme);
    setThemeAtom(newTheme);
  }, [theme, systemMode, setThemeAtom]);

  const themeLabel = useMemo(() => {
    const themeIndex = THEME_KEYS.findIndex((key) => key.toLowerCase() === theme.toLowerCase());
    return themeIndex !== -1 ? themeOptions[themeIndex] : theme;
  }, [theme, themeOptions]);

  return (
    <button
      className={clsx(styles.themeToggle, className, {
        [styles.dark]: appliedTheme === "Dark",
        [styles.light]: appliedTheme === "Light",
      })}
      onClick={themeChanged}
      type="button"
    >
      <div className={clsx(styles.themeToggle__icon)}>
        <div className={clsx(styles.animationWrapper)}>
          <Moon className={clsx(styles.moon)} />
          <Sun className={clsx(styles.sun)} />
        </div>
      </div>
      <span className={clsx(styles.themeToggle__label)}>{themeLabel}</span>
      <Badge variant="beta" className={styles.betaBadge}>
        {t('themeToggle.beta', 'Beta')}
      </Badge>
    </button>
  );
};

export default ThemeToggle;
