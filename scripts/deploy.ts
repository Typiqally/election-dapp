// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { artifacts, ethers } from "hardhat";
import * as path from "path";
import { Contract } from "ethers";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Election = await ethers.getContractFactory("Election");
  const election = await Election.deploy();
  await election.deployed();

  console.log("Election contract address:", election.address);

  saveContract("Election", election);
}

function saveContract(name: string, contract: Contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "/../frontend/contracts/");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const artifact = artifacts.readArtifactSync(name);
  const contractFile = {
    address: contract.address,
    artifact: artifact,
  };

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractFile, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
