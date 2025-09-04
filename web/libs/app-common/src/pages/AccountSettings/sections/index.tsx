import { PersonalInfo } from "./PersonalInfo";
import { EmailPreferences } from "./EmailPreferences";
import { PersonalAccessToken, PersonalAccessTokenDescription } from "./PersonalAccessToken";
import { MembershipInfo } from "./MembershipInfo";
import { HotkeysManager } from "./Hotkeys";
import type React from "react";
import { PersonalJWTToken } from "./PersonalJWTToken";
import type { AuthTokenSettings } from "../types";
import { ff } from "@humansignal/core";
import { Badge } from "@humansignal/ui";
import type { TFunction } from "i18next";


export type SectionType = {
  title: string | React.ReactNode;
  id: string;
  component: React.FC;
  description?: React.FC;
};

export const accountSettingsSections = (settings: AuthTokenSettings, t?: TFunction): SectionType[] => {
  return [
    {
      title: t ? t('accountSettings.personalInfo') : "Personal Info",
      id: "personal-info",
      component: PersonalInfo,
    },
    {
      title: (
        <div className="flex items-center gap-tight">
          <span>{t ? t('accountSettings.hotkeysTitle') : "Hotkeys"}</span>
          <Badge variant="beta" title={t ? t('themeToggle.beta') : "Beta"}>{t ? t('themeToggle.beta') : "Beta"}</Badge>
        </div>
      ),
      id: "hotkeys",
      component: HotkeysManager,
      description: () => t ? t('accountSettings.hotkeysDescription') : "Customize keyboard shortcuts for faster navigation and actions.",
    },
    {
      title: t ? t('accountSettings.emailPreferences') : "Email Preferences",
      id: "email-preferences",
      component: EmailPreferences,
    },
    {
      title: t ? t('accountSettings.membershipInfo') : "Membership Info",
      id: "membership-info",
      component: MembershipInfo,
    },
    settings.api_tokens_enabled &&
      ff.isActive(ff.FF_AUTH_TOKENS) && {
        title: t ? t('accountSettings.personalAccessToken') : "Personal Access Token",
        id: "personal-access-token",
        component: PersonalJWTToken,
        description: PersonalAccessTokenDescription,
      },
    settings.legacy_api_tokens_enabled && {
      title: ff.isActive(ff.FF_AUTH_TOKENS) 
        ? (t ? t('accountSettings.legacyToken') : "Legacy Token")
        : (t ? t('accountSettings.accessToken') : "Access Token"),
      id: "legacy-token",
      component: PersonalAccessToken,
      description: PersonalAccessTokenDescription,
    },
  ].filter(Boolean) as SectionType[];
};
