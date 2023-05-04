import { ChangeEvent, RefObject } from "react";
import { ISelectedFile } from "@/pages/messages/messages.types";

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
  chatScreenRef: RefObject<HTMLDivElement>;
}
