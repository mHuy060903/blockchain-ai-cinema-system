// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract chai{

    struct Ticket{
        string nameMovie;
        string nameCinema;
        string numChair;
        string time;
        uint256 price;
        uint timestamp;
        address from;
    }

    Ticket[] tickets;
    address payable owner; //owner is going to receive funds
    constructor(){
        owner = payable(msg.sender);
    }

    function buyTicket(string calldata nameMovie,string calldata nameCinema,string calldata numChair,string calldata time, uint256  price) external payable{
        require(msg.value>0,"Please pay more than 0 ether");
        owner.transfer(msg.value);
        tickets.push(Ticket(nameMovie,nameCinema,numChair,time,price,block.timestamp,msg.sender));
    }

    function getTickets() public view returns(Ticket[] memory){
        return tickets;
    }
}