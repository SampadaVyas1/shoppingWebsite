import React, { useState } from "react";
import { pageContext as HomeContext } from "../index";
import Loader from "@/components/loader";

interface IHomeContextProps {
  children: any;
}

export interface IHomeContextStates {
  homeData: any;
  isError: boolean;
  isLoading: boolean;
}

const HomeProvider = (props: IHomeContextProps) => {
  const [homeContextState, setHomeContextState] = useState<IHomeContextStates>({
    homeData: "",
    isError: false,
    isLoading: false,
  });

  // hooks eg. useEffects etc..
  // functions

  const { children } = props;
  const { isError, isLoading } = homeContextState;
  return (
    <HomeContext.Provider value={{ homeContextState }}>
      {!isError ? children : <div>Error</div>}

      {isLoading && <Loader />}
    </HomeContext.Provider>
  );
};
export default HomeProvider;
