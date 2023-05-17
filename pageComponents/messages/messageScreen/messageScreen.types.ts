export interface IMessageScreenProps {
  candidateData: {
    name: string;
    designation: string;
    techStack: string;
    interviewStatus: string;
    profileImage: string;
    mobile: string;
    id: string;
  };
  userId: string;
  isConnected: boolean;
}
