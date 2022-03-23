import { CandidateTable } from "./candidate-table";
import { CandidateVoteForm } from "./candidate-vote-form";
import { Container, VStack } from "@chakra-ui/react";
import React, {useEffect} from "react";

export const DApp = () => {
  useEffect(() => {
    const tableBody = document.getElementById("table-body");
    const candidateOptions = document.getElementById("candidate-options");
    const voteForm = document.getElementById("vote-form");
    console.log("test");

    voteForm.addEventListener("submit", voteHandler, false);

    function voteHandler() {
      let select = document.getElementById("candidate-options");
      let addr = select.options[select.selectedIndex].value;
      window.alert(addr);
    }
  })

  return (
    <>
      <CandidateTable />
      <VStack>
        <Container maxW="container.sm">
          <CandidateVoteForm />
        </Container>
      </VStack></>
  );
};