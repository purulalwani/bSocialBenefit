pragma solidity ^0.4.2;

contract Benefit {
    // Benefit key
    string public key;
    // Benefit value
    string public value;


    function Benefit(string _key, string _value){
      key = _key;
      value = _value;
    }

    // Set key
    function setkey(string _key) {

        key = _key;
    }



    // Set value
    function setValue(string _value) {

        value = _value;
    }


}
