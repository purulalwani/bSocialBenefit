pragma solidity ^0.4.2;
import "./Document.sol";

contract Citizen {

  string public name = "";
  string public dateOfBirth = "";
  string public gender = "" ;
  address public owner;
  string public income;
  string public caste;
  address[] documents;
  mapping(address=>mapping(string=>string)) accessors;
  address[] schemesEnrolled;
  address[] familyMembers;
  address familyHead;

  // Event that is fired when citizen is changed
  event citizenChanged(string whatChanged);

  function Citizen(){
    owner = msg.sender;
    //providers = new address[](providerSize);
  }

  modifier ownerOnly(){
    require(owner == msg.sender);
    _;
  }

  modifier ownerOrNameAccessorOnly(){
    bool isOwnerOrNameAccessorOnly = false;
    if(owner == msg.sender){
      isOwnerOrNameAccessorOnly = true;
    }else{
      mapping(string=>string) la = accessors[msg.sender];
      bytes memory name = bytes(accessors[msg.sender]["name"]);
      if(!(name.length == 0)){
          isOwnerOrNameAccessorOnly = true;
      }

    }
    if(!isOwnerOrNameAccessorOnly){
      citizenChanged("name access denied");
      throw;
    }
    _;
  }


  // FAMILY^GIVEN^MIDDLE
  function setName(string _name) ownerOrNameAccessorOnly {
    name = _name;
    citizenChanged("name changed"); // fire the event
  }
  // YYYYMMDD
  function setDateOfBirth(string _dateOfBirth) ownerOnly {
    dateOfBirth = _dateOfBirth;
    citizenChanged("dateOfBirth changed"); // fire the event
  }
  // M,F,U,O
  function setGender(string _gender) ownerOnly {
    gender = _gender;
    citizenChanged("gender changed"); // fire the event
  }

  function setIncome(string _income) ownerOnly {
    income = _income;
    citizenChanged("income changed"); // fire the event
  }

  function setCaste(string _caste) ownerOnly {
    caste = _caste;
    citizenChanged("caste changed"); // fire the event
  }

  function setCitizen(string _name, string _dateOfBirth, string _gender, string _income, string _caste) ownerOnly {
    name = _name;
    dateOfBirth = _dateOfBirth;
    gender = _gender;
    income = _income;
    caste = _caste;


    citizenChanged("Citizen Changed"); // fire the event
  }

  function addDocument(string _id, string _hash) ownerOnly{



    Document d = new Document(_id, _hash);
    documents.push(d);
    citizenChanged("document added");
  }

  function getDocuments() ownerOnly returns (address[]){
    return documents;
  }

  function addAccessor(address _accessor, string key, string value) ownerOnly {
    //mapping(string=>string) la;
    //la[key] = value;
    accessors[_accessor][key] =value;
  }

//   function getAccessors(address provider) ownerOnly  returns (mapping(address=>mapping(string=>string))){
//     accessors;
//   }
}
