// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {
    string candidateName;

    constructor() {
        candidateName = "Candidate 1";
    }

    function getCandidate() public view returns (string memory) {
        return candidateName;
    }

    function setCandidate(string memory name) public {
        candidateName = name;
    }
}