pragma solidity ^0.4.2;

contract Eligibility {
    // eligibility key
    string public key;
    // eligibility value
    string public value;


    function Eligibility(string _key, string _value){
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
