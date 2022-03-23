import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import ConnectWallet from "../components/connect-wallet";
import CandidateOverview from "../components/candidate-overview";
import Election from "../contracts/Election.json";

import { Contract, ethers } from "ethers";

interface IState {
  selectedAddress: string | undefined;
  provider: any | undefined;
  election: Contract | undefined;
}

const Home: NextPage = () => {

  const [state, setState] = useState<IState>({
    selectedAddress: undefined,
    election: undefined,
    provider: undefined
  });

  const handleWalletConnected = (address: string) => {
    const { provider, election } = initializeEther();

    setState({
      selectedAddress: address,
      provider: provider,
      election: election
    });
  };

  const initializeEther = () => {
    // @ts-ignore
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let election = new ethers.Contract(
      Election.address,
      Election.artifact.abi,
      provider.getSigner(0)
    );

    return { provider, election };
  };

  return (
    <>
      <Head>
        <title>Candidates</title>
        <meta name="description" content="Election Dapp" />
      </Head>
      {
        state.selectedAddress
          ? <CandidateOverview election={state.election} address={state.selectedAddress} />
          : <ConnectWallet onWalletConnected={handleWalletConnected} />
      }
    </>
  );
};

export default Home;
