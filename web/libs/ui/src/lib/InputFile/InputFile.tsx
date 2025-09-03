import { IconUpload } from "../../assets/icons";
import clsx from "clsx";
type InputFileProps = HTMLAttributes<HTMLInputElement> & {
  name?: string;
  className?: string;
  text?: React.ReactNode | string;
  noFileSelectedText?: React.ReactNode | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  props?: Record<string, any>;
};

import styles from "./InputFile.module.scss";
import type React from "react";
import { forwardRef, type HTMLAttributes, useCallback, useRef, useState } from "react";
export const InputFile = forwardRef(({ name, className, text, noFileSelectedText, onChange, ...props }: InputFileProps, ref: any) => {
  if (!ref) {
    ref = useRef();
  }
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const interactiveKeys = ["Space", " "];
  const wrapperKeyDownHandler = useCallback(
    (e: any) => {
      if (interactiveKeys.includes(e.key)) {
        e.preventDefault();
        ref.current.click();
      }
    },
    [ref],
  );
  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setSelectedFile(file);
      onChange?.(e);
    },
    [onChange],
  );
  return (
    <div className={styles.container}>
      <label className={clsx(styles.inputWrapper, className)} onKeyDown={wrapperKeyDownHandler}>
        <span className={styles.labelContent}>
          <IconUpload className={styles.icon} /> {text ?? <>Upload Image</>}
        </span>
        <input
          ref={ref}
          type="file"
          className={clsx("file-input", styles.input)}
          name={name}
          {...props}
          onChange={handleChange}
        />
      </label>
      {!selectedFile && noFileSelectedText && (
        <div className={styles.fileStatus}>
          {noFileSelectedText}
        </div>
      )}
      {selectedFile && (
        <div className={styles.fileStatus}>
          {selectedFile.name}
        </div>
      )}
    </div>
  );
});
