import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ReactNode } from "react";
import { Provider as UrqlProvider } from "urql";
import { urqlClient } from "./services/urql";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UrqlProvider value={urqlClient}>
      <ThirdwebProvider>{children}</ThirdwebProvider>
    </UrqlProvider>
  );
};

export default Providers;
