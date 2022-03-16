// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Events.sol";

contract ProjectContract is Events {
    address partyAddress;
    string name;
    string description;
    string link;
    string unit;
    int256 valueRequired;

    modifier checkForRegisteredUser() {
        require(
            msg.sender == partyAddress,
            "You must be registered to withdraw funds"
        );
        _;
    }

    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        string memory _link,
        string memory _unit,
        int256 _valueRequired
    ) {
        partyAddress = _owner;
        name = _name;
        description = _description;
        link = _link;
        unit = _unit;
        valueRequired = _valueRequired;
    }

    receive() external payable {
        //To receive token from external sources. Will be stored in contract address until withdrawn by the user
        emit ReceivedToken(
            msg.sender,
            address(this),
            msg.value,
            "Token received from Pool"
        ); //Emits event when something is received
    }

    function getPartyAddress() external view returns (address) {
        return partyAddress;
    }

    function getProjectDetails()
        external
        view
        returns (
            string memory _name,
            string memory _description,
            string memory _link,
            string memory _unit,
            int256 _valueRequired
        )
    {
        _name = name;
        _description = description;
        _link = link;
        _unit = unit;
        _valueRequired = valueRequired;
    }

    function getProjectContractBalance() public view returns (uint256) {
        //To get current contract balance
        return address(this).balance;
    }

    function withdraw() public checkForRegisteredUser {
        payable(msg.sender).transfer(address(this).balance);
        emit TokensWithdrawn(
            address(this),
            partyAddress,
            address(this).balance
        );
    }
}
