import { SiweMessage } from "siwe";
import {
  useGetSiweNonceMutation,
  useVerifySiweMutation,
} from "../gql/generated";
import { useSigner } from "@thirdweb-dev/react";
import { useState } from "react";

const domain = window.location.host;
const origin = window.location.origin;
const statement = "Sign this message to prove ownership of your address.";

export const getSiweMessage = (address: string, nonce: string) => {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce,
    expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // expires in 1 day
  });
  return message.prepareMessage();
};

export const useSiwe = () => {
  const [, getNonce] = useGetSiweNonceMutation();
  const [, verifySiwe] = useVerifySiweMutation();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signer = useSigner();
  const signIn = async (address: string) => {
    try {
      const { data, error } = await getNonce({});
      const nonce = data?.getSiweNonce;
      if (error || typeof nonce != "string") {
        console.error(`Missing nonce to sign in. Error: ${error}`);
        return;
      }
      if (!signer) {
        console.error("No signer. Is your wallet connected?");
        return;
      }
      const message = getSiweMessage(address, nonce);
      const signature = await signer.signMessage(message);
      console.log(signature);
      const response = await verifySiwe({ message, signature });
      setIsSignedIn(!!response.data?.verifySiwe);
    } catch (error) {
      console.error(`Sign In With Ethereum failed: ${error}`);
    }
  };

  return { signIn, isSignedIn };
};
