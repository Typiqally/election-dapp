import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption
} from "@chakra-ui/react";

export const CandidateTable = () => {
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
        <Tr>
          <Td>Koen</Td>
          <Td>5</Td>
          <Td>Placeholder address</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
