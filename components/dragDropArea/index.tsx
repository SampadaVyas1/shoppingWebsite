import { useRef, useState } from "react";
import Button from "../button";
import Typography from "../typography";
import styles from "./dragDropArea.module.scss";
import { BUTTON_VARIANT, EVENT, TYPOGRAPHY_VARIANT } from "@/common/enums";
import { IDragDropArea } from "./dragDropArea.types";

const DragDropArea = (props: IDragDropArea) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === EVENT.DRAG_ENTER || event.type === EVENT.DRAG_OVER) {
      setDragActive(true);
    } else if (event.type === EVENT.DRAG_LEAVE) {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const file = event.dataTransfer.files;
    if (
      file &&
      file[0] &&
      (file[0].type === "text/csv" || file[0].type === "text/xlsx")
    ) {
      setFile(event.dataTransfer.files[0].name);
    }
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0].name);
    }
  };

  const onButtonClick = () => {
    inputRef.current!.click();
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form
      className={`${styles.formFileUpload} ${props.customStyle}`}
      onDragEnter={handleDrag}
      onSubmit={onFormSubmit}
    >
      <input
        ref={inputRef}
        type="file"
        className={styles.inputFileUpload}
        multiple={true}
        accept=".csv, .xlsx"
        onChange={handleChange}
      />

      <label
        htmlFor="inputFileUpload"
        className={
          dragActive
            ? `${styles.labelFileUpload} ${styles.dragActive}`
            : styles.labelFileUpload
        }
      >
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}>
          Drag and drop your file here
        </Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.TEXT_MEDIUM_REGULAR}>
          or
        </Typography>
        {file && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_SEMIBOLD}
            customStyle={styles.fileName}
          >
            {file}
          </Typography>
        )}
        <Button
          customStyle={styles.uploadButton}
          variant={BUTTON_VARIANT.OUTLINED}
          onClick={onButtonClick}
        >
          Browse
        </Button>

        <Typography
          variant={TYPOGRAPHY_VARIANT.TEXT_SMALL_REGULAR}
          customStyle={styles.message}
        >
          only .xlsx, .csv files are supported
        </Typography>
      </label>
      {dragActive && (
        <div
          className={styles.dragFileElement}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};
export default DragDropArea;
