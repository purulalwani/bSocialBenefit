pragma solidity ^0.4.2;


contract SchemeEnrolled {

    address scheme;
    string public status;


    // add scheme
    function addScheme(address s) {

        scheme = s;
    }

    // get scheme
    function getScheme() returns (address) {

        return scheme;
    }
}
