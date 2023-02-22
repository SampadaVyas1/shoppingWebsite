import React, {
  ChangeEvent,
  Component,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  customClass?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  multiline?: boolean;
  handleChange?: (value: string | number) => void;
  autoFocus?: boolean;
  pattern?: string;
  error?: string;
}

function InputBox(props: IInputProps) {
  const {
    customClass,
    value,
    disabled,
    multiline,
    handleChange,
    placeholder,
    autoFocus,
    pattern,
    label,
    error,
    ...otherProps
  } = props;
  const [customInputWrapperClass, setCustomInputWrapperClass] =
    useState<string>(
      props.disabled
        ? `${styles.inputWrapper} ${styles.disabled}`
        : `${styles.inputWrapper}`
    );

  function onFocus() {
    setCustomInputWrapperClass(`${styles.inputWrapper} ${styles.focus}`);
  }
  function onBlur() {
    setCustomInputWrapperClass(`${styles.inputWrapper}`);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const value = event?.target?.value;
    props.handleChange && props.handleChange(value);
  }
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
        {multiline ? (
          <textarea
            className={styles.inputField}
            disabled={disabled}
            value={value}
            onChange={handleInputChange}
            rows={2}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <input
            className={styles.inputField}
            {...otherProps}
            disabled={disabled}
            value={value}
            onChange={handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            tabIndex={0}
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
}

export default InputBox;
