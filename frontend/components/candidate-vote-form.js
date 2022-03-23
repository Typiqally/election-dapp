import { Button, Select } from "@chakra-ui/react";

export const CandidateVoteForm = () => {
  return (
    <form id="vote-form">
      <Select id="candidate-options" name="candidate" placeholder='Select option'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      <Button type="submit" colorScheme='teal' variant='outline'>
        Cast vote
      </Button>
    </form>
  )
}
