// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CharityPool = await hre.ethers.getContractFactory("CharityPool");
  const charityPool = await CharityPool.deploy();

  // const PartyContract = await hre.ethers.getContractFactory("PartyContract");
  // const partyContract = await PartyContract.deploy();

  // const Events = await hre.ethers.getContractFactory("Events");
  // const events = await Events.deploy();

  await charityPool.deployed();
  // await partyContract.deployed();
  // await events.deployed();

  console.log("Charity Pool:", charityPool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
