import { ISelectedFile } from "@/pages/messages/messages.types";
import { ChangeEvent } from "react";

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
