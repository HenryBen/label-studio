import { useTranslation } from "react-i18next";
import { FilterDropdown } from "../FilterDropdown";

export const Common = [
  {
    key: "empty",
    label: "is empty", // This will be translated in the parent component
    input: (props) => {
      const { t } = useTranslation();
      return (
        <FilterDropdown
          value={props.value ?? false}
          onChange={(value) => props.onChange(value)}
          items={[
            { value: true, label: t('dataManager.filters.yes') },
            { value: false, label: t('dataManager.filters.no') },
          ]}
          disabled={props.disabled}
        />
      );
    },
  },
];

// Helper function to get translated common filter labels
export const getCommonFilterLabels = (t) => ({
  empty: t('dataManager.filters.isEmpty'),
});
