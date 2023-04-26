import { ChangeEvent } from "react";
import { ISelectedFile } from "../messages.types";

export interface IChatBottomProps {
  mobile: string;
  message: string;
  handleMessageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedFile: ISelectedFile | null;
  onFileSelection: (file: File, type: string) => void;
  onFileRemoval: () => void;
  onSend: (message: string) => void;
  isLoading: boolean;
}
