import { NextPage } from "next";
import { VStack, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

interface IProps {
  onSignUp(name: string | null): void;
}

interface IState {
  name: string | null;
}

const CandidateSignUpForm: NextPage<IProps> = (props) => {
  const [state, setState] = useState<IState>({ name: null });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSignUp(state.name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack align="end">
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <Input id="name" name="name" type="text" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="telegram">
          Sign up
        </Button>
      </VStack>
    </form>
  );
};

export default CandidateSignUpForm;
