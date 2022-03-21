// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Candidate {
        uint id;
        address addr;
        string name;
        uint votes;
    }

    address[] public candidateAddresses;
    uint candidateAddressCount;

    mapping(address => Candidate) public candidates;

    function getCandidateAddresses() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function signUpForCandidate(string memory name) public {
        require(!validCandidate(msg.sender));
        candidateAddresses.push(msg.sender);
        candidateAddressCount++;
        candidates[msg.sender] = Candidate(candidateAddressCount, msg.sender, name, 0);
    }

    function getCandidate(address addr) public view returns (Candidate memory) {
        return candidates[addr];
    }

    function validCandidate(address addr) public view returns (bool) {
        if(candidates[addr].id != 0) {
            return true;
        }
        return false;
    }

    function getCount() public view returns (uint) {
        return candidateAddressCount;
    }
}