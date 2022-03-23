// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Candidate {
        address ownAddress;
        string name;
        uint votes;
    }

    struct Vote {
        address ownAddress;
        address candidateAddress;
    }

    address[] public candidateAddresses;

    mapping(address => Candidate) public candidates;
    mapping(address => Vote) public ballot;

    function getCandidateAddresses() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function signUpForCandidate(string memory name) public {
        require(!candidateExists(msg.sender));

        candidates[msg.sender] = Candidate(msg.sender, name, 0);
        candidateAddresses.push(msg.sender);
    }

    function castVote(address _address) public {
        require(ballotExists(msg.sender));

        require(candidateExists(_address));
        candidates[_address].votes += 1;
        ballot[msg.sender] = Vote(msg.sender, _address);
    }

    function candidateExists(address _address) public view returns (bool) {
        if (candidates[_address].ownAddress != address(0)) {
            return true;
        }

        return false;
    }

    function ballotExists(address _address) public view returns (bool) {
        if (ballot[_address].ownAddress != address(0)) {
            return true;
        }

        return false;
    }
}