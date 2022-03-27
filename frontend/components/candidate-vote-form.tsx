import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { VStack, Button, Select, FormLabel, FormControl } from "@chakra-ui/react";
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
      <VStack align="end">
        <FormControl>
          <FormLabel htmlFor="candidateAddress">Candidate</FormLabel>
          <Select id="candidateAddress" name="candidateAddress" onChange={handleChange}>
            {
              props.candidates && props.candidates.map(candidate => {
                  return (
                    <option key={candidate.address} value={candidate.address}>
                      {candidate.name}
                    </option>
                  );
                }
              )
            }
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="telegram">
          Cast vote
        </Button>
      </VStack>
    </form>
  );
};

export default CandidateVoteForm;
