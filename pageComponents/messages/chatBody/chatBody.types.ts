export interface IChatBodyProps {
  isLoading: boolean;
  phone: string;
  onRetry: (message: string, messageId: string) => void;
}
