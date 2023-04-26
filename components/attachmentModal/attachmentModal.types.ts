export interface IAttachmentModalProps {
  open?: boolean;
  onSelection: (fileData: any, fileType: string) => void;
}
