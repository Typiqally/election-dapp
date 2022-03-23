import { NextPage } from "next";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import Candidate from "../models/candidate";

interface IProps {
  candidates: Array<Candidate> | null;
}

const CandidateTable: NextPage<IProps> = (props) => {
  console.log(props.candidates)

  return (
    <Table id="candidates" variant="simple">
      <TableCaption>Candidate list</TableCaption>
      <Thead>
        <Tr>
          <Th>Candidate</Th>
          <Th>Number of votes</Th>
          <Th>Address</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          props.candidates && props.candidates.map(candidate => {
            return (
              <Tr>
                <Td>{candidate.name}</Td>
                <Td>{candidate.votes}</Td>
                <Td>{candidate.address}</Td>
              </Tr>
            );
          })
        }
      </Tbody>
    </Table>
  );
};

export default CandidateTable;