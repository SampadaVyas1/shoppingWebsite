
export interface IButtonState {
  [key: string]: { upKeyDisabled: boolean; downKeyDisabled: boolean };
}

export interface IData {
  [key: string]: any;
}

export interface IHeaderTitleProps {
  id: number;
  title: string;
  sort?: boolean | false;
}

export interface IAdditionalValue {
  colspan: string;
  colspanValue: string;
  customStyle?: string
}

// export interface 
// createdTime
// : 
// "2002-11-13T12:37:05.637Z"
// designation
// : 
// "Associate UX designer"
// experienceLevel
// : 
// "0-2 years"
// id
// : 
// 111
// mobileNumber
// : 
// "1234567891"
// name
// : 
// "Anish Jain"
// recruiter
// : 
// "PA"
// status
// : 
// "Qualified"
// techStack
// : 
// "Design"
// time
// : 
// "03.50pm"