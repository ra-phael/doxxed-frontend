import { SiweMessage } from "siwe";
import { useGetSiweNonceQuery, useVerifySiweMutation } from "../gql/generated";
import { useSigner } from "@thirdweb-dev/react";

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
  });
  return message.prepareMessage();
};

export const useSiwe = () => {
  // turn this into a mutation
  const [{ data, error }, getNonce] = useGetSiweNonceQuery();
  const [, verifySiwe] = useVerifySiweMutation();

  const signer = useSigner();
  const signIn = async (address: string) => {
    const nonce = await getNonce();
    console.log("nonce", nonce);
    if (error || typeof nonce != "string") {
      console.error("Missing nonce to sign in.");
      return;
    }
    if (!signer) {
      console.error("No signer. Is your wallet connected?");
      return;
    }
    console.log("getSiweNonce", data?.getSiweNonce);
    const message = getSiweMessage(address, nonce);
    const sig = await signer.signMessage(message);
    console.log(sig);
    const res = await verifySiwe({ message, nonce });
    console.log("verified success?", res);
  };

  return { signIn };
};
