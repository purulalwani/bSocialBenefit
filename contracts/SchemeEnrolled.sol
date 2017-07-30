pragma solidity ^0.4.2;


contract SchemeEnrolled {

    address scheme;
    string public status;


    function SchemeEnrolled(address _scheme, string _status){
      scheme = _scheme;
      status = _status;
    }
    // add scheme
    function addScheme(address s) {

        scheme = s;
    }

    // get scheme
    function getScheme() returns (address) {

        return scheme;
    }
}
