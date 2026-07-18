import * as React from "react";

/**
 * A hook to check we are in the client-side.
 * @returns A boolean indicating if we are in the client-side.
 */
export const useIsClient = (): boolean => {
  const [isClient, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
