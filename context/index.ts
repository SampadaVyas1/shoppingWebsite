import React from "react";
const pageContext = React.createContext<any>(null);
const pageProvider = pageContext.Provider;
const pageConsumer = pageContext.Consumer;
export { pageContext, pageProvider, pageConsumer };
