// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Events.sol";

contract PartyContract is Events{

    address partyAddress;
    string name;
    string cause;
    string link;


    modifier checkForRegisteredUser{
        require(msg.sender == partyAddress, "You must be registered to withdraw funds");
        _;
    }

    constructor(address _owner, string memory _name, string memory _cause, string memory _link) {
        partyAddress = _owner;
        name = _name;
        cause = _cause;
        link = _link;
    }

    receive() external payable { //To receive token from external sources. Will be stored in contract address until withdrawn by the user
        emit ReceivedToken(msg.sender, address(this), msg.value, "Token received from Pool"); //Emits event when something is received
    }


    function getPartyAddress() external view returns(address){
        return partyAddress;
    }

    function getPartyDetails() external view returns(string memory _name, string memory _cause, string memory _link){
        _name = name;
        _cause = cause;
        _link = link;
    }

    function getPartyBalance() public view returns (uint) { //To get current contract balance
        return address(this).balance;
    }

    function withdraw() public checkForRegisteredUser {
        payable(msg.sender).transfer(address(this).balance);
        emit TokensWithdrawn(address(this), partyAddress, address(this).balance);
    }


}