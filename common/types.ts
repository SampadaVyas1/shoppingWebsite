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
