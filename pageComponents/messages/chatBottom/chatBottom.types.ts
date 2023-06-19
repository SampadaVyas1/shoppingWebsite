import { ChangeEvent, RefObject } from "react";
import { ISelectedFile } from "@/common/types/messages.types";

export interface IChatBottomProps {
  candidateName: string;
  message: string;
  handleMessageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedFile: ISelectedFile | null;
  onFileSelection: (file: File, type: string) => void;
  onTemplateSend?: (template: any) => void;
  onFileRemoval: () => void;
  // onSend: (message: string) => void;
  onSend: any;

  isLoading: boolean;
  chatScreenRef: RefObject<HTMLDivElement>;
}
