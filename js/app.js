// Initialize Web3
const web3 = new Web3("http://localhost:7545")

const contractDetails = {
    address: "",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "castVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "signUpForCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "ballot",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "voted",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "candidate",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidateAddresses",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "votes",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "checkBallot",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "addr",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "votes",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Election.Candidate",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCandidateAddresses",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getTotalVotes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "validCandidate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}

const tableBody = document.getElementById("table-body");
const candidateOptions = document.getElementById("candidate-options");
const voteForm = document.getElementById("vote-form");


web3.eth.getAccounts()
    .then((accounts) => {
        console.log(`Accounts: ${accounts}`)
        voteForm.addEventListener("submit", voteHandler, false);


        const account = accounts[4]
        selectAccount(account)

        const contract = new web3.eth.Contract(contractDetails.abi, contractDetails.address)
        refreshCandidates(contract)

        $("form").on("submit", function (event) {
            event.preventDefault();
            const name = $("input[name=name]").val()

            signUpForCandidate(contract, name, account)
        })

        function voteHandler(evt) {
            let select = document.getElementById('candidate-options');
            let addr = select.options[select.selectedIndex].value;
            window.alert(addr);
            castVote(contract, account, addr);
        }
    })

const selectAccount = (account) => {
    web3.eth.defaultAccount = account
    console.log(`Selected account: ${account}`)
    $("#address").html(account)
}



const refreshCandidates = (contract) => {
    console.log("Fetching candidate name...")
    $("#table-body").empty();
    $("#candidate-options").empty();

    contract.methods.getCandidateAddresses().call((error, result) => {
        console.log(result);
        result.forEach(address => {
            contract.methods.candidates(address).call((error, candidate) => {
            console.log(candidate);
                    //    Create row
                    const row = document.createElement("tr");

                    //    Create cell element for candidate name
                    const nameCell = document.createElement("td");
                    nameCell.innerText = candidate.name;
                    row.appendChild(nameCell);

                    //    Create cell element for candidate votes
                    const votesCell = document.createElement("td");
                    votesCell.innerText = candidate.votes
                    row.appendChild(votesCell);

                    //    Create cell element for candidate address
                    const addrCell = document.createElement("td");
                    addrCell.innerText = candidate.addr;
                    row.appendChild(addrCell);

                    // Adds the new row to the voting table.
                    tableBody.appendChild(row);

                    // Create an option for each candidate
                    const candidateOption = document.createElement("option");
                    candidateOption.value = candidate.addr;
                    candidateOption.innerText = candidate.name + " " + candidate.addr;
                    candidateOptions.appendChild(candidateOption);
                }
            )
        })

    })
}

const signUpForCandidate = (contract, name, account) => {
    console.log(`Sign up for candidate with name: ${name}`)

    contract.methods.signUpForCandidate(name).send({from: account}, () => {
        console.log("Sign up successful...");
        refreshCandidates(contract);
    });
}

const castVote = (contract, account, addr) => {
    contract.methods.castVote(addr).send({from: account}, () => {
        console.log("Successfully voted on candidate");
    });
}
