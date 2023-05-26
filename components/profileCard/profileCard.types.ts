export interface IProfileCardProps {
  profileImage: string | null;
  firstName: string;
  lastName?: string;
  designation: string;
  cardBody: React.ReactNode;
  cardFooter?: React.ReactNode;
}
