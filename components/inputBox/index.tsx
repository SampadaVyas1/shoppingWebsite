import React, {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import ImageComponent from "../image";
import styles from "./inputBox.module.scss";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  customClass?: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  multiline?: boolean;
  handleChange?: (value: any) => void;
  autoFocus?: boolean;
  pattern?: string;
  error?: string;
  startIcon?: string;
}

const InputBox = (props: IInputProps) => {
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
    startIcon,
    ...otherProps
  } = props;
  const [customInputWrapperClass, setCustomInputWrapperClass] =
    useState<string>(
      props.disabled
        ? `${styles.inputWrapper} ${styles.disabled}`
        : `${styles.inputWrapper}`
    );

  const onFocus = () => {
    setCustomInputWrapperClass(`${styles.inputWrapper} ${styles.focus}`);
  };
  const onBlur = () => {
    setCustomInputWrapperClass(`${styles.inputWrapper}`);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event?.target?.value;
    props.handleChange && props.handleChange(value);
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
};

export default InputBox;
