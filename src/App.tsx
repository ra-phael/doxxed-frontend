import { useAddress, useSigner } from "@thirdweb-dev/react";
import "./App.css";
import FAQ from "./components/FAQ";
import { Header } from "./components/Header";
import { useSiwe } from "./services/siwe";

function App() {
  const signer = useSigner();
  const address = useAddress();
  const { signIn, isSignedIn } = useSiwe();
  return (
    <>
      <Header />
      <h1>Placeholder</h1>
      {isSignedIn ? (
        <div>You have successfully signed in!</div>
      ) : (
        signer &&
        address && <button onClick={() => signIn(address)}>sign</button>
      )}
      <FAQ />
    </>
  );
}

export default App;
