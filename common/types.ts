export interface IRouteType {
  id: number;
  path: string;
  name: string;
}
export interface IOptionType {
  id: number;
  label: string;
}
export interface INavbarProps {
  routes: IRouteType[];
}

export interface IEmptyStateType {
  title: string;
  image: string;
  subTitle?: string;
  customImageStyle?: string;
}
