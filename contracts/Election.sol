// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Candidate {
        uint id;
        address addr;
        string name;
        uint votes;
    }

    struct Ballot {
        uint id;
        bool voted;
        address voter;
        address candidate;
    }

    address[] public candidateAddresses;
    uint candidateAddressCount;
    uint voteCount;

    mapping(address => Candidate) public candidates;
    mapping(address => Ballot) public ballot;

    function getCandidateAddresses() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function signUpForCandidate(string memory name) public {
        require(!validCandidate(msg.sender));
        candidateAddresses.push(msg.sender);
        candidateAddressCount++;
        candidates[msg.sender] = Candidate(candidateAddressCount, msg.sender, name, 0);
    }

    function castVote(address addr) public {
        if(checkBallot(msg.sender) == false){
            require(validCandidate(addr));
            candidates[addr].votes += 1;
            voteCount++;
            ballot[msg.sender] = Ballot(voteCount, true, msg.sender, addr);
        }
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

    function checkBallot(address addr) public view returns (bool) {
        if(ballot[addr].id != 0) {
            return true;
        }
        return false;
    }

    function getCount() public view returns (uint) {
        return candidateAddressCount;
    }

    function getTotalVotes(address addr) public view returns (uint) {
        return candidates[addr].votes;
    }
}