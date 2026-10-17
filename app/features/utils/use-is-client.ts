import * as React from "react";

export const useIsClient = (): boolean => {
  const [isClient, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
