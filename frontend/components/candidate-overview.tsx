import { NextPage } from "next";
import { Container, VStack } from "@chakra-ui/react";

import CandidateTable from "../components/candidate-table";
import CandidateVoteForm from "../components/candidate-vote-form";
import Candidate from "../models/candidate";

interface IProps {
  address: string;
}

const CandidateOverview: NextPage<IProps> = (props) => {
  const candidates: Array<Candidate> = [
    {
      name: "Jelle",
      votes: 5,
      address: "0x1B8A276D99c5EF88d56D3033406aa075A0bb521b"
    },
    {
      name: "Koen",
      votes: 15,
      address: "0x31ce5Fca09e9a94A5376577E11E27424b4aad59E"
    }
  ];

  const handleVote = (candidate: Candidate | null) => {
    console.log(candidate);
  };

  return (
    <>
      <VStack spacing={5}>
        <p>Your wallet address: {props.address}</p>
        <CandidateTable candidates={candidates} />
        <Container maxW="container.sm">
          <CandidateVoteForm candidates={candidates} onVote={handleVote} />
        </Container>
      </VStack>
    </>
  );
};

export default CandidateOverview;