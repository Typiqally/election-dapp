// Initialize Web3
const web3 = new Web3("http://localhost:7545")

const contractDetails = {
    address: "0x85FF46eEFa14F35E90690B5ed392CcE9c39E4D38",
    abi: [
        {
            "inputs": [],
            "name": "allCandidates",
            "outputs": [
                {
                    "components": [
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
                    "internalType": "struct Election.Candidate[]",
                    "name": "",
                    "type": "tuple[]"
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
            "name": "candidates",
            "outputs": [
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
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "signUpForCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}

web3.eth.getAccounts()
    .then((accounts) => {
        console.log(`Accounts: ${accounts}`)

        const account = accounts[0]
        selectAccount(account)

        const contract = new web3.eth.Contract(contractDetails.abi, contractDetails.address)
        refreshCandidates(contract)

        $("form").on("submit", function (event) {
            event.preventDefault();
            const name = $("input[name=name]").val()

            signUpForCandidate(contract, name, account)
        })
    })

const selectAccount = (account) => {
    web3.eth.defaultAccount = account
    console.log(`Selected account: ${account}`)
    $("#address").html(account)
}

const tableBody = document.getElementById("table-body");
const candidateOptions = document.getElementById("candidate-options");
const voteForm = document.getElementById("vote-form");

const refreshCandidates = (contract) => {
    console.log("Fetching candidate name...")
    $("#table-body").empty();
    contract.methods.allCandidates().call((error, result) => {
        result.forEach((result) => {

            //    Create row
            const row = document.createElement("tr");

            //    Create cell element for candidate name
            const nameCell = document.createElement("td");
            nameCell.innerText = result.name;
            row.appendChild(nameCell);

            //    Create cell element for candidate votes
            const votesCell = document.createElement("td");
            votesCell.innerText = result.votes
            row.appendChild(votesCell);

            //    Create cell element for candidate address
            const addrCell = document.createElement("td");
            addrCell.innerText = result.addr;
            row.appendChild(addrCell);

            // Adds the new row to the voting table.
            tableBody.appendChild(row);

            // Create an option for each candidate
            const candidateOption = document.createElement("option");
            candidateOption.value = result.name;
            candidateOption.innerText = result.name;
            candidateOptions.appendChild(candidateOption);
        })
    })
}

const signUpForCandidate = (contract, name, account) => {
    console.log(`Sign up for candidate with name: ${name}`)

    contract.methods.signUpForCandidate(name).send({from: account}, () => {
        console.log("Sign up successful...")
        refreshCandidates(contract)
    });
}