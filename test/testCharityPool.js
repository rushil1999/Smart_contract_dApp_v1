const { expect } = require("chai");
const { ethers } = require("ethers");
describe("Charity Pool Contract", async function  () {

  it("Testing New Party Creation", async function () {
    const [owner, donor, party] = await hre.ethers.getSigners();
    const CharityPool = await hre.ethers.getContractFactory("CharityPool");
    // const charityPool = await CharityPool.deploy({value: hre.ethers.utils.parseEther("40")});
    const charityPool = await CharityPool.deploy();
    await charityPool.deployed();

    const ownerBalance = await owner.getBalance();

    // console.log("Contract deployed by ", owner.address);
    // console.log("Account balance of address that deployed the contract",ownerBalance);
    // console.log("Contract Address", charityPool.address);

    //Adding new Party
    const newParty = await charityPool.addNewParty(party.address, "A", "B", "C");
    // console.log("Party Balance before transaction", await charityPool.getPartyBalance(0));
    expect(hre.ethers.utils.formatEther(await charityPool.getPartyBalance(0))).to.equal('0.0');
  });

  it("Testing ReceivedToken event emittion on received Donation to charity Pool", async function(){
    const [owner, donor, party] = await hre.ethers.getSigners();
    const CharityPool = await hre.ethers.getContractFactory("CharityPool");
    // const charityPool = await CharityPool.deploy({value: hre.ethers.utils.parseEther("40")});
    const charityPool = await CharityPool.deploy();
    await charityPool.deployed();

    const ownerBalance = await owner.getBalance();


    // console.log("Contract deployed by ", owner.address);
    // console.log("Account balance of address that deployed the contract",ownerBalance);
    // console.log("Contract Address", charityPool.address);

    //Adding new Party
    const newParty = await charityPool.addNewParty(party.address, "A", "B", "C");
    // console.log("Party Balance before transaction", await charityPool.getPartyBalance(0));

    //Sending money to contract
    expect(await charityPool.connect(donor).donate(0, "ether", {value: hre.ethers.utils.parseEther("15")})).to
    .emit(charityPool, 'ReceivedToken')
    .withArgs(donor.address, charityPool.address, hre.ethers.utils.parseEther("15"), "ether");

    // console.log("Party Balance after transaction", await charityPool.getPartyBalance(0));
    // console.log("Main Contract Balance after transaction", await charityPool.getCurrentContractBalance());
  });

  it("Testing ReceivedToken event emittion on received Donation to Specific Party", async function(){
    const [owner, donor, party] = await hre.ethers.getSigners();
    const CharityPool = await hre.ethers.getContractFactory("CharityPool");
    // const charityPool = await CharityPool.deploy({value: hre.ethers.utils.parseEther("40")});
    const charityPool = await CharityPool.deploy();
    await charityPool.deployed();

    const ownerBalance = await owner.getBalance();


    // console.log("Contract deployed by ", owner.address);
    // console.log("Account balance of address that deployed the contract",ownerBalance);
    // console.log("Contract Address", charityPool.address);

    //Adding new Party
    const newParty = await charityPool.addNewParty(party.address, "A", "B", "C");
    // console.log("Party Balance before transaction", await charityPool.getPartyBalance(0));

    //Sending money to contract
    expect(await charityPool.connect(donor).donate(0, "ether", {value: hre.ethers.utils.parseEther("15")})).to
    .emit(newParty, 'ReceivedToken')
    .withArgs(charityPool.address, newParty.address, hre.ethers.utils.parseEther("15"), "ether");

    // console.log("Party Balance after transaction", await charityPool.getPartyBalance(0));
    // console.log("Main Contract Balance after transaction", await charityPool.getCurrentContractBalance());
  });
  // it("Token withdrawn by the party", async function(){
  //   const [owner, donor, party] = await hre.ethers.getSigners();
  //   const CharityPool = await hre.ethers.getContractFactory("CharityPool");
  //   // const charityPool = await CharityPool.deploy({value: hre.ethers.utils.parseEther("40")});
  //   const charityPool = await CharityPool.deploy();
  //   await charityPool.deployed();

  //   const ownerBalance = await owner.getBalance();


  //   // console.log("Contract deployed by ", owner.address);
  //   // console.log("Account balance of address that deployed the contract",ownerBalance);
  //   // console.log("Contract Address", charityPool.address);

  //   //Adding new Party
  //   const newParty = await charityPool.addNewParty(party.address, "A", "B", "C");
  //   // console.log("Party Balance before transaction", await charityPool.getPartyBalance(0));

  //   //Sending money to contract
  //   await charityPool.connect(donor).donate(0, "ether", {value: hre.ethers.utils.parseEther("15")});

  //   await newParty.connect(party).withdraw();

  //   expect(hre.ethers.utils.formatEther(await newParty.getPartyBalance(0))).to.equal('0.0');

  //   // console.log("Party Balance after transaction", await charityPool.getPartyBalance(0));
  //   // console.log("Main Contract Balance after transaction", await charityPool.getCurrentContractBalance());
  // });
});



