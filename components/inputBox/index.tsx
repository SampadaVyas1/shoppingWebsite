import React, {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import ImageComponent from "../image";
import styles from "./inputBox.module.scss";
import { IInputProps } from "./inputBox.types";

const InputBox = (props: IInputProps) => {
  const {
    customClass,
    disabled,
    multiline,
    onChange,
    placeholder,
    autoFocus,
    pattern,
    label,
    error,
    type = "text",
    startIcon,
    ...otherProps
  } = props;
  const [customInputWrapperClass, setCustomInputWrapperClass] =
    useState<string>(
      props.disabled
        ? `${styles.inputWrapper} ${styles.disabled}`
        : `${styles.inputWrapper}`
    );

  const onFocus = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    setCustomInputWrapperClass(`${styles.inputWrapper} ${styles.focus}`);
    props.onFocus && props.onFocus(event);
  };
  const onBlur = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    setCustomInputWrapperClass(`${styles.inputWrapper}`);
    props.onBlur && props.onBlur(event);
  };
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputElement.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={styles.inputBox}>
      {label && <div className={styles.label}>{label}</div>}

      <div className={`${customClass} ${customInputWrapperClass}`}>
        {startIcon && (
          <ImageComponent src={startIcon} customClass={styles.startIcon} />
        )}
        {multiline ? (
          <textarea
            className={styles.inputField}
            disabled={disabled}
            onChange={onChange}
            rows={2}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            {...otherProps}
            autoFocus
          />
        ) : (
          <input
            className={styles.inputField}
            {...otherProps}
            type={type}
            disabled={disabled}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            tabIndex={0}
            autoComplete="off"
            autoFocus={autoFocus}
            pattern={pattern}
            ref={inputElement}
            placeholder={placeholder}
          />
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputBox;
