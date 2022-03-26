import { NextPage } from "next";
import { Divider, Box, Flex, VStack, Heading, Alert} from "@chakra-ui/react";

import { Contract } from "ethers";

import CandidateTable from "../components/candidate-table";
import CandidateVoteForm from "../components/candidate-vote-form";
import Candidate from "../models/candidate";
import { useEffect, useState } from "react";
import CandidateSignUpForm from "./candidate-sign-up-form";
import GetRevertedReason from "./get-reverted-reason";

interface IProps {
  election: Contract | undefined;
  address: string;
}

interface IState {
  candidates: Array<Candidate> | null;
}

const CandidateOverview: NextPage<IProps> = (props) => {
  const [state, setState] = useState<IState>({ candidates: null });
  
  useEffect(() => {
    fetchCandidates().then(_ => console.log("Fetched candidates"));

    setInterval(fetchCandidates, 500);
  }, []);

  const fetchCandidates = async () => {
    if (props.election === undefined) {
      return;
    }

    const candidates: Array<Candidate> = [];
    const addresses = await props.election.getCandidateAddresses();

    for (const address of addresses) {
      const candidate = await props.election.candidates(address);

      candidates.push({
        name: candidate.name,
        address: candidate.ownAddress,
        votes: candidate.votes.toNumber()
      });
    }

    setState({
      candidates: candidates
    });
  };

  const handleSignUp = async (name: string | null) => {
    if (props.election === undefined || name == null) {
      return;
    }

    try {
      await props.election.signUpForCandidate(name);
    } catch (error) {
      window.alert(GetRevertedReason(error.data.message));
    }


  };

  const handleVote = async (candidate: Candidate | null) => {
    if (props.election === undefined || candidate == null) {
      return;
    }

    try {
      await props.election.castVote(candidate.address);
    } catch (error) {
      window.alert(GetRevertedReason(error.data.message));
    }


  };


  return (
    <>
      <Flex height="100%" align="stretch">
        <Box width="100%" bg="#111" color="whiteAlpha.700">
          <CandidateTable candidates={state.candidates} />
        </Box>
        <Box height="100%" p={5}>
          <VStack width="23rem" spacing={2}>
            <Box width="100%">
              <Heading as="h4" size="md" pb={2}>Connected wallet</Heading>
              <Alert bg="telegram.200" variant="subtle">
                {props.address}
              </Alert>
              <Divider mt={3} />
            </Box>
            <Box width="100%">
              <Heading as="h4" size="md" pb={2}>Sign-up as candidate</Heading>
              <CandidateSignUpForm onSignUp={handleSignUp} />
              <Divider mt={6} />
            </Box>
            <Box width="100%">
              <Heading as="h4" size="md" pb={2}>Vote for candidate</Heading>
              <CandidateVoteForm candidates={state.candidates} onVote={handleVote} />
              <Divider mt={6} />
            </Box>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default CandidateOverview;