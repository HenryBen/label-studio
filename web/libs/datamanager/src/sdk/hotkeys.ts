import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { toStudlyCaps } from "strman";
import { keymap } from "./keymap";

export type Hotkey = {
  label: string;
  description: string;
  shortcut?: string;
  macos?: string;
  other?: string;
};

const readableShortcut = (shortcut: string | null | undefined) => {
  if (!shortcut || typeof shortcut !== "string") {
    return "";
  }

  return shortcut
    .split("+")
    .map((str) => toStudlyCaps(str))
    .join(" + ");
};

export const useShortcut = (
  actionName: keyof typeof keymap,
  callback: () => void,
  options = { showShortcut: true },
  dependencies = undefined,
) => {
  const { t } = useTranslation();
  const action = keymap[actionName] as Hotkey;
  const isMacos = /mac/i.test(navigator.platform);

  let shortcut = action.shortcut ?? ((isMacos ? action.macos : action.other) as string);

  // Check for custom shortcut in app settings
  const customMapping = (window.APP_SETTINGS as any)?.lookupHotkey?.(`data_manager:${actionName}`);
  if (customMapping) {
    // Explicitly use the custom key even if it's null
    shortcut = customMapping.key;
  }

  useHotkeys(
    shortcut,
    () => {
      callback();
    },
    {
      keyup: false,
      element: document.body,
    } as any,
    dependencies,
  );

  // Get translation for the label, fallback to the key if translation not found
  const translationKey = `hotkeys.${actionName}.label`;
  const translatedLabel = t(translationKey, { defaultValue: action.label });
  const title = translatedLabel + (options.showShortcut ? `: [ ${readableShortcut(shortcut)} ]` : "");
  console.log('---22222222222----', {
    actionName,
    translationKey,
    translatedLabel,
    defaultValue: action.label,
    title
  });
  return title;
};
