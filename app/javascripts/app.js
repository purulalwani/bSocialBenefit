// import libraries which we need
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ethjsabi from 'ethjs-abi';

// Import our contract artifacts and turn them into usable abstractions.
import citizen_artifacts from '../../build/contracts/Citizen.json'
import document_artifacts from '../../build/contracts/Document.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Citizen = contract(citizen_artifacts);
var Document = contract(document_artifacts);

var accounts, account;
var myCitizenInstance;
var myDocumentInstance;

// Create New Citizen
function newCitizen() {
  console.log("Create new Citizen");

var account = web3.personal.newAccount("BE1010be");
  //web3.personal.newAccount("BE1010be").then(function(account){

if(account != null && account != ''){
  //var account = acc1.result;
    web3.personal.unlockAccount(accounts[0], "BE1010be");
    web3.eth.sendTransaction({from:accounts[0], to:account, value:20000000000000000000}, function(error, result){
      if(error){
        alert("Issue creating the account, please try after sometime");
      }

      var transaction = web3.eth.getTransaction(result);


      while(transaction.blockNumber == null || transaction.blockNumber <= 0){
        transaction = web3.eth.getTransaction(result);
        console.log("waiting for transaction to mined...");
      }
      Citizen.setProvider(web3.currentProvider);
      web3.personal.unlockAccount(account, "BE1010be");
    	Citizen.new({from: account, gas: 4712386}).then(
    	function(citizen) {
    		console.log(citizen);
    		myCitizenInstance = citizen;
        console.log("Citizen contract address...." + myCitizenInstance.address);
        console.log("Citizen account address...." + account);

        $("#contractAddress").val(myCitizenInstance.address);
        $("#accountAddress").val(account);
    		//$("#patientContractAddress").html(myPatientInstance.address);

    	});
    });
  }else{
    alert("Issue creating the account, please try after sometime");
  }
  //});


}

// Existing Citizen
function exisitingCitizen(account, contract) {
  console.log("Exsiting Citizen");


      Citizen.setProvider(web3.currentProvider);
      web3.personal.unlockAccount(account, "BE1010be");
    	Citizen.at(contract).then(
    	function(citizen) {
    		console.log(citizen);
    		myCitizenInstance = citizen;
        console.log("Citizen contract address...." + myCitizenInstance.address);
        console.log("Citizen account address...." + account);

        $("#contractAddress").val(myCitizenInstance.address);
        $("#accountAddress").val(account);
    		//$("#patientContractAddress").html(myPatientInstance.address);

    	});



}


// // Update Citizen
function updateCitizen(name, dob, gender, income, caste) {

console.log("Updating Citizen...");
console.log("update citizen - unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");

console.log("Updating citizen");

myCitizenInstance.setCitizen(name, dob, gender, income, caste, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen updated successfully");

              getCitizenChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// 	myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// 		function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     		function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         		function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     		})
// 		});
}

// // Update Patient Name
function updateCitizenName(name) {

console.log("Updating citizen name...");
console.log("update citizen name- unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myCitizenInstance.setName(name, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen name updated successfully");

              getCitizenChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// 	myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// 		function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     		function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         		function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     		})
// 		});
}

// // Update Citizen DOB
function updateCitizenDOB(dob) {

console.log("Updating citizen dob...");
console.log("update citizen dob - unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myCitizenInstance.setDateOfBirth(dob, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen DOB updated successfully");

              getCitizenChangeEventLog();
            }

          );


}

// // Update Citizen Gender
function updateCitizenGender(gender) {

console.log("Updating citizen gender...");
console.log("update citizen gender - unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myCitizenInstance.setGender(gender, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen gender updated successfully");

              getCitizenChangeEventLog();
            }

          );


}

// // Update Citizen Caste
function updateCitizenCaste(caste) {

console.log("Updating Citizen Caste...");
console.log("update Citizen caste - unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myCitizenInstance.setCaste(caste, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen caste updated successfully");

              getCitizenChangeEventLog();
            }

          );


}

// // Update Citizen Income
function updateCitizenIncome(income) {

console.log("Updating Citizen income...");
console.log("update Citizen income - unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myCitizenInstance.setIncome(income, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateCitizenResult").html("Citizen income updated successfully");

              getCitizenChangeEventLog();
            }

          );


}

// Read audit log
function getCitizenChangeEventLog(){

//   var patientChangedEventAll = myPatientInstance.PatientChanged({},
//     {address:myPatientInstance.address
//     ,fromBlock: 0, toBlock: 'latest'});
// patientChangedEventAll.get(function(err, logs) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   logs.forEach(function(log) {
//
//     console.log("Key="+ log.args.key + " Value="+ log.args.value);
//
//
//   }
//   //patientChangedEventAll.stopWatching();
//   // append details of result.args to UI
// });



  var logFilter = web3.eth.filter({address:myCitizenInstance.address
    , fromBlock:0});
   logFilter.get(function(error, result){
    if(!error){
      console.log("Citizen chnage event: " + result);

      var citizenLogTable = $("#citizenLog");
      var citizenLogHtml = "<tr><th>Event</th><th>Name</th><th>DOB</th><th>Gender</th><th>Caste</th><th>Income</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = citizen_artifacts.abi;
        var data = ethjsabi.decodeEvent(abi[16], e.data);
        //console.log(data);
        console.log("Decode Data: " + data[0]);

        var ci = web3.eth.contract(abi).at(e.address);

        console.log("Name=" + ci.name.call(e.blockNumber));
        console.log("dateOfBirth=" + ci.dateOfBirth.call(e.blockNumber));
        console.log("gender=" + ci.gender.call(e.blockNumber));

        var name = ci.name.call(e.blockNumber);
        var dob = ci.dateOfBirth.call(e.blockNumber);
        var gender = ci.gender.call(e.blockNumber);
        var caste = ci.caste.call(e.blockNumber);
        var income = ci.income.call(e.blockNumber);

        //var formatedConditions = formatConditions(conditions);

        citizenLogHtml = citizenLogHtml + "<tr><td>" + data[0] + "</td><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + caste + "</td><td>" + income + "</td><td>" + e.blockNumber + "</td></tr>";

        // web3.eth.getBlock(e.blockNumber, function(err, block) {
        //   myPatientInstance.name(e.blockNumber, function(err,name) {
        //     myPatientInstance.dateOfBirth(e.blockNumber, function(err,dateOfBirth) {
        //       myPatientInstance.gender(e.blockNumber, function(err,gender) {
        //         // Add an object with all the data so it can be displayed
        //         console.log("Name: " + name);
        //         console.log("DOB: " + dateOfBirth);
        //         console.log("gender: " + gender);
        //
        //       });
        //     });
        //   });
        //   });
      }
    );

    citizenLogTable.html(citizenLogHtml);
    }
  });


}

function formatConditions(conditions){

  var conditionAbi = condition_artifacts.abi;
  var formatedConditions = "";
  for (var i = 0; i < conditions.length; i++) {

  if(conditions[i] != null && conditions[i] != ""){
    var ci = web3.eth.contract(conditionAbi).at(conditions[i]);
    formatedConditions = formatedConditions + ci.desc();
  }

  }

  return formatedConditions;
}

window.onload = function() {

console.log("window onload...");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

	web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    //console.log("accounts : " + accounts);

  	//initializePatient();
  });

	// Wire up the UI elements


  $("#login").click(function() {
    var userType = $("#userType").val();
    var entity = $("#entity").val();
    var accountAddress = $("#accountAddress").val();
    var contractAddress = $("#contractAddress").val();
    if(userType == 'New'){
      if(entity == 'Citizen'){
        newCitizen();
      }else if(entity == 'Department'){
        newDepartment();
      }
    }else if (userType == 'Existing'){
      if(accountAddress != '' && contractAddress != ''){
        if(entity == 'Citizen'){
          exisitingCitizen(accountAddress, contractAddress);
        }else if(entity == 'Department'){
          exisitingDepartment(accountAddress, contractAddress);
        }
    }else{
      alert("Please enter Account/Contract Address Or create new account/contract");
    }
    }
    //updateCitizen(name, dob, gender, income, caste);
  });

	$("#updateCitizen").click(function() {
		var name = $("#citizenName").val();
		var dob = $("#citizenDOB").val();
    var gender = $("#citizenGender").val();
    var income = $("#citizenIncome").val();
    var caste = $("#citizenCaste").val();
		updateCitizen(name, dob, gender, income, caste);
	});

  $("#updateCitizenName").click(function() {

    var name = $("#citizenName").val();
		updateCitizenName(name);
	});

  $("#updateCitizenDOB").click(function() {
		var dob = $("#citizenDOB").val();

		updateCitizenDOB(dob);

    });

  $("#updateCitizenGender").click(function() {

    var gender = $("#citizenGender").val();

		updateCitizenGender(gender);
	});

  $("#updateCitizenIncome").click(function() {

    var income = $("#citizenIncome").val();
		updateCitizenIncome(income);
	});

  $("#updateCitizenCaste").click(function() {

    var caste = $("#citizenCaste").val();
		updateCitizenCaste(caste);
	});




};
