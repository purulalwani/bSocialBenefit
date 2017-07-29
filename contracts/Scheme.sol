pragma solidity ^0.4.2;
import "./Eligibility.sol";
import "./Benefit.sol";

contract Scheme {
  string public name = "";
  address[] eligibility;
  address[] benefits;
  address public owner;
  address[] citizenEnrolled;
  string public elig;
  string public bene;


    /*function Scheme(){
      owner = msg.sender;
    }*/

    function Scheme(string _name, string _elig, string _bene){
      owner = msg.sender;
      elig = _elig;
      bene = _bene;
      name = _name;
    }

    // Set Department name
    function setName(string _name) {

        name = _name;
    }

    // Set eligibility
    function addEligibility(string _key, string _value) {

      Eligibility e = new Eligibility(_key, _value);
        eligibility.push(e);
    }

    // get eligibility
    function getEligibility() returns (address[]) {

        return eligibility;
    }

    // Set benefit
    function addBenefit(string _key, string _value) {

      Benefit b = new Benefit(_key, _value);
        benefits.push(b);
    }

    // get benefit
    function getBenefits() returns (address[]) {

        return benefits;
    }

    // add citizen
    function addCitizen(address citizen) {

        citizenEnrolled.push(citizen);
    }

    // get citizen
    function getCitizens() returns (address[]) {

        return citizenEnrolled;
    }
}
