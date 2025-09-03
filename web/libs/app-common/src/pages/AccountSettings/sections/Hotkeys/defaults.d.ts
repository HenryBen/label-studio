// Type declarations for defaults.js

export interface RawHotkey {
  id: number;
  section: string;
  element: string;
  label: string;
  key: string;
  mac?: string;
  active: boolean;
  description?: string;
  subgroup?: string;
}

export interface HotkeySection {
  id: string;
  title: string | (() => string);
  description?: string | (() => string);
}

export declare const DEFAULT_HOTKEYS: RawHotkey[];
export declare const HOTKEY_SECTIONS: HotkeySection[];