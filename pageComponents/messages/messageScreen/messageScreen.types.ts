export interface IMessageScreenProps {
  candidateData: {
    name: string;
    designation: string;
    techStack: string;
    interviewLevel: string;
    profileImage: string;
    mobile: string;
    id: string;
    associatedTa: string;
    recruiterFirstName: string;
  };
  recruiterName: string;
  userId: string;
  isConnected: boolean;
}
