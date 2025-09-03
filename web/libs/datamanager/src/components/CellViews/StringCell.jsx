import { format, isValid } from "date-fns";
import { useTranslation } from "react-i18next";
import { dateTimeFormat } from "./DateTimeCell";

export const valueToString = (value, t) => {
  if (typeof value === "string") return value;
  /* if undefined or null we'll treat it as empty string */
  if (value === undefined || value === null) return "";
  if (value instanceof Date && isValid(value)) return format(value, dateTimeFormat);

  try {
    /* JSON.stringify will handle JSON and non-strings, non-null, non-undefined */
    return JSON.stringify(value);
  } catch {
    return t ? t('dataManager.errors.invalidJSON') : "Error: Invalid JSON";
  }
};

export const StringCell = ({ value }) => {
  const { t } = useTranslation();
  const style = {
    maxHeight: "100%",
    overflow: "hidden",
    fontSize: 12,
    lineHeight: "16px",
  };

  return <div style={style} title={valueToString(value, t)}>{valueToString(value, t)}</div>;
};
