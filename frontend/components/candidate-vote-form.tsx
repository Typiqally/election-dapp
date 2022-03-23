import { NextPage } from "next";
import { HStack, Button, Select } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Candidate from "../models/candidate";

interface IProps {
  candidates: Array<Candidate> | null;

  onVote(candidate: Candidate | null): void;
}

interface IState {
  candidateAddress: string | null;
}

const CandidateVoteForm: NextPage<IProps> = (props) => {
  const [state, setState] = useState<IState>({ candidateAddress: null });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const candidate = props.candidates?.find(candidate => candidate.address === state.candidateAddress) ?? null;
    props.onVote(candidate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Select name="candidateAddress" placeholder="Select candidate" onChange={handleChange}>
          {
            props.candidates && props.candidates.map(candidate =>
              <option key={candidate.address} value={candidate.address}>{candidate.name}</option>
            )
          }
        </Select>
        <Button type="submit" colorScheme="teal" variant="outline">
          Cast vote
        </Button>
      </HStack>
    </form>
  );
};

export default CandidateVoteForm;
