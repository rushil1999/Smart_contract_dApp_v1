// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Events {
    event NewProjectRegistered(
        address partyAddress,
        address contractAddress,
        uint256 partyCount,
        string name,
        string description,
        string link,
        string unit,
        int256 valueRequired
    );

    event ReceivedToken(
        address from,
        address to,
        uint256 amount,
        string message
    );

    event MinimumTokenRequired(address from, address to, uint256 amount);

    event InternalError(address from, address to, string message);

    event TokensWithdrawn(address from, address to, uint256 amount);
}
