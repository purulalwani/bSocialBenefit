// import libraries which we need
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ethjsabi from 'ethjs-abi';

// Import our contract artifacts and turn them into usable abstractions.
import citizen_artifacts from '../../build/contracts/Citizen.json'
import document_artifacts from '../../build/contracts/Document.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Citizen = contract(patient_artifacts);
var Document = contract(condition_artifacts);

var accounts, account;
var myCitizenInstance;
var myDocumentInstance;

// Initialize
function newCitizen() {
  console.log("Create new Citizen");

  web3.personal.unlockAccount(accounts[0], "BE1010be");
  Citizen.setProvider(web3.currentProvider);

	Citizen.at({from: accounts[0], gas: 4712386}).then(
	function(patient) {
		console.log(patient);
		myPatientInstance = patient;
    console.log("Patient contract address...." + myPatientInstance.address);
		//$("#patientContractAddress").html(myPatientInstance.address);

	});
}


// // Update Patient
function updatePatient(name, dob, gender, condition) {

console.log("Updating patient...");
console.log("update patinet - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");

console.log("Updating patient");

myPatientInstance.setPatient(name, dob, gender, condition, condition, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient updated successfully");

              getPatientChangeEventLog();
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
function updatePatientName(name) {

console.log("Updating patient name...");
console.log("update patinet name- unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setName(name, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient name updated successfully");

              getPatientChangeEventLog();
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

// // Update Patient DOB
function updatePatientDOB(dob) {

console.log("Updating patient dob...");
console.log("update patient dob - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient DOB updated successfully");

              getPatientChangeEventLog();
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

// // Update Patient Gender
function updatePatientGender(gender) {

console.log("Updating patient gender...");
console.log("update patient gender - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.setGender(gender, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient gender updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// // Update Patient Condition
function updatePatientCondition(condition) {

console.log("Updating patient condition...");
console.log("update patient condition - unlock account....");
web3.personal.unlockAccount(accounts[0], "BE1010be");



myPatientInstance.addCondition(condition, condition, {from: accounts[0], gas: 4712387}).then(
        		function(){
              $("#updatePatientResult").html("Patient condition updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// Read audit log
function getPatientChangeEventLog(){

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



  var logFilter = web3.eth.filter({address:myPatientInstance.address
    , fromBlock:0});
   logFilter.get(function(error, result){
    if(!error){
      console.log("Patient chnage event: " + result);

      var patientLogTable = $("#patientLog");
      var patientLogHtml = "<tr><th>Event</th><th>Name</th><th>DOB</th><th>Gender</th><th>Conditions</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = patient_artifacts.abi;
        var data = ethjsabi.decodeEvent(abi[9], e.data);
        //console.log(data);
        console.log("Decode Data: " + data[0]);

        var pi = web3.eth.contract(abi).at(e.address);

        console.log("Name=" + pi.name.call(e.blockNumber));
        console.log("dateOfBirth=" + pi.dateOfBirth.call(e.blockNumber));
        console.log("gender=" + pi.gender.call(e.blockNumber));

        var name = pi.name.call(e.blockNumber);
        var dob = pi.dateOfBirth.call(e.blockNumber);
        var gender = pi.gender.call(e.blockNumber);
        var conditions = pi.getCondition.call(e.blockNumber);

        var formatedConditions = formatConditions(conditions);

        patientLogHtml = patientLogHtml + "<tr><td>" + data[0] + "</td><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>" + formatedConditions + "</td><td>" + e.blockNumber + "</td></tr>";

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

    patientLogTable.html(patientLogHtml);
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

        }else if(entity == 'Department'){

        }
    }else{
      alert("Please enter Account/Contract Address Or create new account/contract");
    }
    }
    updateCitizen(name, dob, gender, income, caste);
  });

	$("#updateCitizen").click(function() {
		var name = $("#citizenName").val();
		var dob = $("#citizenDOB").val();
    var gender = $("#citizenGender").val();
    var income = $("#citizenIncome").val();
    var caste = $("#citizenCaste").val();
		updateCitizen(name, dob, gender, income, caste);
	});

  $("#updatePatientName").click(function() {

    var name = $("#patientName").val();
		updatePatientName(name);
	});

  $("#updatePatientDOB").click(function() {
		var dob = $("#patientDOB").val();

		updatePatientDOB(dob);

    });

  $("#updatePatientGender").click(function() {

    var gender = $("#patientGender").val();

		updatePatientGender(gender);
	});

  $("#updatePatientCondition").click(function() {

    var condition = $("#patientCondition").val();
		updatePatientCondition(condition);
	});




};
