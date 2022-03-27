import { NextPage } from "next";
import { Button, Box, VStack, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  onWalletConnected(address: string): void;
}

interface IState {
  error: {
    title: string
    message: string
  } | null;
}

const ConnectWallet: NextPage<IProps> = (props) => {
  const HARDHAT_NETWORK_ID = 1337;

  const [state, setState] = useState<IState>({ error: null });

  const connectWallet = async () => {
    // @ts-ignore
    const [selectedAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });

    if (!validateNetwork()) {
      setState({
        error: {
          title: "Invalid network",
          message: "Please connect MetaMask to localhost"
        }
      });

      return;
    }

    props.onWalletConnected(selectedAddress);
  };

  const validateNetwork = () => {
    // @ts-ignore
    return window.ethereum.networkVersion == HARDHAT_NETWORK_ID;
  };

  return (
    <Flex
      align="center"
      justify="center"
      h="100%"
      bg="#111"
      color="whiteAlpha.800"
    >
      <Box>
        <VStack>
          {
            state.error &&
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{state.error.title}</AlertTitle>
              <AlertDescription>{state.error.message}</AlertDescription>
            </Alert>
          }
          <p>Please login to your wallet</p>
          <Button colorScheme="telegram" onClick={connectWallet}>
            Connect wallet
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ConnectWallet;