import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};

export default Providers;
