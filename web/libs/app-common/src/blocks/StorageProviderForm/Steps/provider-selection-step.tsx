import { Label } from "@humansignal/ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProviderGrid } from "../components";
import type { ProviderConfig } from "../types/provider";

interface ProviderSelectionStepProps {
  formData: {
    provider: string;
  };
  errors: {
    provider?: string;
  };
  handleSelectChange: (name: string, value: string) => void;
  setFormState: (updater: (prevState: any) => any) => void;
  storageTypesLoading?: boolean;
  target?: "import" | "export";
  providers: Record<string, ProviderConfig>;
}

export const ProviderSelectionStep = ({
  formData,
  errors,
  handleSelectChange,
  providers,
}: ProviderSelectionStepProps) => {
  const { t } = useTranslation();
  
  // Set default provider if none is selected and we have options
  useEffect(() => {
    if (!formData.provider && Object.entries(providers).length > 0) {
      handleSelectChange("provider", providers[0].name);
    }
  }, [providers, formData.provider, handleSelectChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t('storage.chooseCloudStorageProvider')}</h2>
        <p className="text-muted-foreground">{t('storage.selectCloudStorageService')}</p>
      </div>

      <div className="space-y-2">
        <Label text={t('storage.storageProvider')} required />
        <ProviderGrid
          providers={Object.values(providers)}
          selectedProvider={formData.provider}
          onProviderSelect={(providerName) => handleSelectChange("provider", providerName)}
          error={errors.provider}
        />
      </div>
    </div>
  );
};
