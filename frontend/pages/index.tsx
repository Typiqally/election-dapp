import type { NextPage } from 'next'
import Head from 'next/head'
import { CandidateTable } from '../components/candidate-table.js'
import { CandidateVoteForm } from '../components/candidate-vote-form'
import { Container, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <><Head>
      <title>Candidates</title>
      <meta name="description" content="Election Dapp" />
    </Head><CandidateTable /><VStack>
      <Container maxW="container.md">
        <CandidateVoteForm />
      </Container>
    </VStack></>
  )
}

export default Home
