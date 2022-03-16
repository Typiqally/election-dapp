// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Candidate {
        address addr;
        string name;
        uint votes;
    }

    Candidate[] public candidates;

    function allCandidates() public view returns(Candidate[] memory) {
        return candidates;
    }

    function signUpForCandidate(string memory name) public {
        candidates.push(Candidate(msg.sender, name, 0));
    }
}