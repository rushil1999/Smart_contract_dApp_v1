// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Events{

    event NewPartyRegistered(
        address partyAddress,
        address contractAddress,
        uint256 partyCount,
        string name, 
        string cause, 
        string link
    );

    event ReceivedToken(
        address from, 
        address to,
        uint amount, 
        string message
    );

    event MinimumTokenRequired(
        address from,
        address to, 
        uint amount
    );

    event InternalError(
        address from, 
        address to,
        string message
    );

    event TokensWithdrawn(
        address from,
        address to,
        uint amount
    );
}