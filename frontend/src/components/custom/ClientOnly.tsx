import React from 'react';

export type Props = React.PropsWithChildren;

const ClientOnly = ({ children }: Props): JSX.Element | null => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
