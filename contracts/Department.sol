pragma solidity ^0.4.2;
import "./Scheme.sol";

contract Department {
  string public name = "";
  address public owner;
  address[] schemes;


    function Department(){
      owner = msg.sender;
    }

    // Set Department name
    function setName(string _name) {
      name = _name;
    }



    // add scheme
    function addScheme(string name, string elig, string bene) {
        Scheme s = new Scheme(name, elig,  bene);
        //s.setName(name);
        /*for(uint i = 0; i < eligibility.length; i++){
          s.addEligibility(eligibility[i])
        }
        for(uint i = 0; i < benefits.length; i++){
          s.addBenefit(benefits[i])
        }*/
        schemes.push(s);
        //return s;
    }

    // get schemes
    function getSchemes() returns (address[]) {

        return schemes;
    }
}
