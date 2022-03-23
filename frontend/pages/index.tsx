import { NextPage } from "next";
import Head from "next/head";
import { Container, VStack } from "@chakra-ui/react";

import CandidateTable from "../components/candidate-table";
import CandidateVoteForm from "../components/candidate-vote-form";
import Candidate from "../models/candidate";

const Home: NextPage = () => {
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
  ]

  const handleVote = (candidate: string | null) => {
    console.log(candidate);
  };

  return (
    <>
      <Head>
        <title>Candidates</title>
        <meta name="description" content="Election Dapp" />
      </Head>
      <CandidateTable candidates={candidates}/>
      <VStack>
        <Container maxW="container.sm">
          <CandidateVoteForm candidates={candidates} onVote={handleVote} />
        </Container>
      </VStack>
    </>
  );
};

export default Home;
