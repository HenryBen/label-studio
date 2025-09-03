import { format, isValid } from "date-fns";
import { useTranslation } from "react-i18next";
import { dateTimeFormat } from "../CellViews/DateTimeCell";
import clsx from "clsx";

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

export const TextDataGroup = ({ value, hasImage }) => {
  const { t } = useTranslation();
  const output = valueToString(value, t);
  const style = {
    height: hasImage ? TextDataGroup.height : "auto",
  };

  return (
    <div
      style={style}
      title={output}
      className={clsx("p-tight", {
        "text-wrap leading-normal": !hasImage,
        "text-nowrap": hasImage,
      })}
    >
      {output}
    </div>
  );
};

TextDataGroup.height = 32;
