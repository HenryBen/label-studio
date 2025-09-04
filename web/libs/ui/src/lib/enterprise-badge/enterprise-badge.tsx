import clsx from "clsx";
import type { FC } from "react";
import { IconSpark } from "../../assets/icons";
import styles from "./enterprise-badge.module.scss";

/* eslint-disable-next-line */
export interface EnterpriseBadgeProps {
  className?: string;
  filled?: boolean;
  text?: string;
}

export const EnterpriseBadge: FC<EnterpriseBadgeProps> = ({ className, filled, text = "Enterprise" }) => {
  return (
    <div className={clsx(styles.badge, { [styles.filled]: filled }, className)}>
      <div className={clsx(styles.label)}>
        <IconSpark className={clsx(styles.icon)} />
        {text}
      </div>
    </div>
  );
};

export default EnterpriseBadge;
