// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./PartyContract.sol";
import "./Events.sol";
import "hardhat/console.sol";


/*
 TODO: 
 1. Commision feature in application
 2. Cannot withdraw amount from PartyContract before a particular minimum amount set by the owner
 3. Minimum donation
 4. Party Contract expiry (Contract will be destryed post expiry)

*/

contract CharityPool is Events {
    uint public totalEntries;
    PartyContract[] public parties;
    mapping(address => uint) data;


    constructor() {
        totalEntries = 0;
    }

    function getCurrentContractAddress() external view returns(address){
        return address(this);
    }

    function getCurrentContractBalance() public view returns(uint){ //Function to get Donor Balance
        return address(this).balance;
    }

    function addNewParty( address _address, string memory name, string memory cause, string memory link)  external returns (address ){
        PartyContract pc = new PartyContract(_address, name, cause, link );  //New Party creates 
        parties.push(pc); //Pushed to public data
        totalEntries = totalEntries+1;
        emit NewPartyRegistered(_address, address(pc), totalEntries, name, cause, link);
        console.log("Party Added", address(pc), totalEntries);
        return address(pc);
    }

    function getContractAddress(uint256 index) external view returns(address){
        PartyContract p = parties[index];
        return address(p);
    }

    function getPartyAddress(uint256 index) external view returns(address)  {
        PartyContract p = parties[index];
        return p.getPartyAddress();
    }
    function getPartyDetails(uint256 index) external view returns(string memory name, string memory cause, string memory link){
        PartyContract p = parties[index];
        return p.getPartyDetails();
    }

    function getPartyBalance(uint256 index) external view returns(uint256 partyBalance){
        partyBalance = this.getContractAddress(index).balance;
        return partyBalance;
    }

    // function sendWei(address payable _address, uint value) external { //Function to send Wei
    //     (bool sent,) = _address.call{value: value}(""); //Call is prefered over send and transact
    //     require(sent , "Could Not send Ether");
    // }

    // receive () external payable { //To receive tokens from external source. Will be stored in contract address unless withdrawn by the user
    //     emit ReceivedWei(msg.value, msg.sender, address(this), "wei");    //Will emit event once something is received
    // }


    function donate(uint256 index, string memory unit) external payable returns(bool){
        emit ReceivedToken(msg.sender, address(this), msg.value, unit); //Events for received tokens from external user
        address to = this.getContractAddress(index);
        bool sent;
        (sent, ) = to.call{value: msg.value}(""); //Sending to specific contract
        return sent;
    } 

    function getTotalParties() external view returns(uint256){
        return totalEntries;
    }



}







