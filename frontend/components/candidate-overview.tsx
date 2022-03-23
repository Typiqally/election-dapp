import { NextPage } from "next";
import { Container, VStack } from "@chakra-ui/react";

import { Contract } from "ethers";

import CandidateTable from "../components/candidate-table";
import CandidateVoteForm from "../components/candidate-vote-form";
import Candidate from "../models/candidate";
import { useEffect, useState } from "react";

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

  const handleVote = async (candidate: Candidate | null) => {
    if (props.election === undefined || candidate == null) {
      return;
    }

    await props.election.castVote(candidate.address);
  };

  return (
    <>
      <VStack spacing={5}>
        <p>Your wallet address: {props.address}</p>
        <CandidateTable candidates={state.candidates} />
        <Container maxW="container.sm">
          <CandidateVoteForm candidates={state.candidates} onVote={handleVote} />
        </Container>
      </VStack>
    </>
  );
};

export default CandidateOverview;