/* eslint-disable react/display-name */
import React, {
  ChangeEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
  RefObject,
  useCallback,
  useState,
  FocusEvent,
} from "react";
import styles from "./inputBox.module.scss";
import ImageComponent from "../image";
import Typography from "../typography";
import { INPUT_PLACEHOLDER } from "@/common/constants";
import { TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IInputProps } from "./inputBox.types";

const InputBox = React.forwardRef((props: IInputProps, ref) => {
  const inputRef: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement> =
    useRef(null);
  useImperativeHandle(ref, () => inputRef.current, []);
  const [customInputWrapperClass, setCustomInputWrapperClass] =
    useState<string>(
      props.disabled
        ? `${styles.inputWrapper} ${styles.disabled}`
        : styles.inputWrapper
    );
  const {
    customClass,
    startIcon,
    onStartIconClick,
    multiline,
    endIcon,
    onEndIconClick,
    rows,
    wrap,
    onChange,
    inputProps,
    textAreaProps,
    label,
    error,
    ...otherProps
  } = props;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, disabled } = props;
    !disabled && onChange && onChange(event);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, disabled } = props;
    !disabled && onChange && onChange(event);
  };

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { onFocus } = props;
    setCustomInputWrapperClass(`${styles.inputWrapper} ${styles.focus}`);
    onFocus && onFocus(event);
  };

  const handleTextAreaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { onFocus } = props;
    setCustomInputWrapperClass(`${styles.inputWrapper} ${styles.focus}`);
    onFocus && onFocus(event);
  };

  const handleTextAreaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    const { onBlur } = props;
    setCustomInputWrapperClass(`${styles.inputWrapper}`);
    onBlur && onBlur(event);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { onBlur } = props;
    setCustomInputWrapperClass(`${styles.inputWrapper}`);
    onBlur && onBlur(event);
  };

  return (
    <div className={styles.inputOuter}>
      {label && (
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD}>
          {label}
        </Typography>
      )}
      <div className={`${customClass} ${customInputWrapperClass}`}>
        {startIcon && (
          <div className={styles.startIcon} onClick={onStartIconClick}>
            <ImageComponent src={startIcon} className={styles.icon} />
          </div>
        )}
        {multiline ? (
          <textarea
            {...otherProps}
            {...textAreaProps}
            ref={inputRef as RefObject<HTMLTextAreaElement>}
            className={styles.inputField}
            rows={rows}
            wrap={wrap}
            onChange={handleTextAreaChange}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
            autoComplete="off"
          />
        ) : (
          <input
            {...otherProps}
            {...inputProps}
            ref={inputRef as RefObject<HTMLInputElement>}
            className={styles.inputField}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            autoComplete="off"
          />
        )}
        {endIcon && (
          <div className={styles.endIcon} onClick={onEndIconClick}>
            <ImageComponent src={endIcon} />
          </div>
        )}
      </div>
      {error && (
        <Typography variant={TYPOGRAPHY_VARIANT.ERROR}>{error}</Typography>
      )}
    </div>
  );
});
InputBox.defaultProps = {
  row: 2,
  placeholder: INPUT_PLACEHOLDER,
} as IInputProps;
export default InputBox;
