pragma solidity ^0.4.2;

contract Document {
    // Document id
    string public id;
    // Document hash
    string public docHash;


    function Document(string _id, string _hash){
      id = _id;
      docHash = _hash;
    }

    // Set Document ID
    function setId(string _id) {

        id = _id;
    }

    // Set Document hash
    function setDesc(string _hash) {

        docHash = _hash;
    }
}
