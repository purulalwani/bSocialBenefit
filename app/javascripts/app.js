// import libraries which we need
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ethjsabi from 'ethjs-abi';

// Import our contract artifacts and turn them into usable abstractions.
import citizen_artifacts from '../../build/contracts/Citizen.json'
import document_artifacts from '../../build/contracts/Document.json'
import scheme_artifacts from '../../build/contracts/Scheme.json'
import department_artifacts from '../../build/contracts/Department.json'
import departments_artifacts from '../../build/contracts/Departments.json'
import eligibility_artifacts from '../../build/contracts/Eligibility.json'
import benefit_artifacts from '../../build/contracts/Benefit.json'
import schemeEnrolled_artifacts from '../../build/contracts/SchemeEnrolled.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Citizen = contract(citizen_artifacts);
var Document = contract(document_artifacts);
var Scheme = contract(scheme_artifacts);
var Department = contract(department_artifacts);
var Departments = contract(departments_artifacts);
var Eligibility = contract(eligibility_artifacts);
var Benefit = contract(benefit_artifacts);
var SchemeEnrolled = contract(schemeEnrolled_artifacts);

var accounts, account;
var myCitizenInstance;
var mySchemeInstance;
var myDepartmentInstance;
var myDepartmentsInstance;
var myEligibilityInstance;
var myBenefitInstance;
var SchemeEnrolled;
var schemesPerDepartment = 0;
var citizenSchemes = 0;
var departmentsAddress = '0x80078f36fff4853ad058dfba4b76d2d997c4b479';

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

        fetchCitizenSchemes(account, myCitizenInstance.address);
          $("#citizenName").val("");


          $("#citizenDOB").val("");


          $("#citizenGender").val("");


          $("#citizenIncome").val("");


          $("#citizenCaste").val("");

          var citizenLogTable = $("#citizenLog");
          var citizenLogHtml = "<tr><th>Event</th><th>Name</th><th>DOB</th><th>Gender</th><th>Caste</th><th>Income</th><th>Block #</th></tr>";

          citizenLogTable.html(citizenLogHtml);
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
        fetchCitizenProfile();
        getCitizenChangeEventLog();
        fetchCitizenSchemes(account, myCitizenInstance.address);
    		//$("#patientContractAddress").html(myPatientInstance.address);

    	});



}

function fetchCitizenProfile(){


  myCitizenInstance.name.call().then(function(result){
    $("#citizenName").val(result);
  });
  myCitizenInstance.dateOfBirth.call().then(function(result){
    $("#citizenDOB").val(result);
  });
  myCitizenInstance.gender.call().then(function(result){
    $("#citizenGender").val(result);
  });
  myCitizenInstance.income.call().then(function(result){
    $("#citizenIncome").val(result);
  });
  myCitizenInstance.caste.call().then(function(result){
    $("#citizenCaste").val(result);
  });


}

function fetchCitizenSchemes(account, address){

  var citizenSchemeEnrolled = myCitizenInstance.getSchemesEnrolled.call();
  var schemeNames = [];
  var schemeStatus = [];
  for(var i = 0; i<citizenSchemeEnrolled.length; i++){
    var schemeEnrolledAbi = schemeEnrolled_artifacts.abi;
    var sei = web3.eth.contract(schemeEnrolledAbi).at(citizenSchemeEnrolled[i]);
    var scheme = sei.getScheme.call();
    schemeStatus.push(sei.getStatus.call());
    var schemeAbi = scheme_artifacts.abi;
    var dsi = web3.eth.contract(schemeAbi).at(scheme);

    var schemeName = dsi.name.call();
    schemeNames.push(schemeName);
  }
  var citizenSchemeTable = $("#citizenScheme");

  var schemeHtml = '<tr><th>Name</th><th>Eligibility</th><th>Benefit</th><th>Action</td></tr>';
  var departmentsAbi = departments_artifacts.abi;
  var dsi = web3.eth.contract(departmentsAbi).at(departmentsAddress);
  var depts = dsi.getDepartments.call();
  var allSchemes = [];
  for(var i = 0; i<depts.length; i++){
    var departmentAbi = department_artifacts.abi;

    var di = web3.eth.contract(departmentAbi).at(depts[i]);
    var schemes = di.getSchemes.call();
    for(var j = 0; j < schemes.length; j++){
      var schemeAbi = scheme_artifacts.abi;
      var dsi = web3.eth.contract(schemeAbi).at(schemes[j]);

      var schemeName = dsi.name.call();
      var eligibility = dsi.elig.call();

      var benefit = dsi.bene.call();
      // if(schemeNames != null && schemeNames.contains(schemeName)){
      //   schemeHtml = schemeHtml + '<tr><td><input type="text" id="schemeName'+citizenSchemes+'" value="'+ schemeName + '"/></td><td><input type="text" id="schemeEligibility'+citizenSchemes+'" value="'+eligibility+'"/></td><td><input type="text" id="schemeBenefit'+citizenSchemes+'" value="'+benefit+'"/></td><td>PENDINGAPPROVAL</td></tr>';;
      // }else{
      schemeHtml = schemeHtml + '<tr><td><input type="text" id="schemeName'+citizenSchemes+'" value="'+ schemeName + '"/></td><td><input type="text" id="schemeEligibility'+citizenSchemes+'" value="'+eligibility+'"/></td><td><input type="text" id="schemeBenefit'+citizenSchemes+'" value="'+benefit+'"/></td><td><button id="applyScheme'+citizenSchemes+'" onclick="javascript:applyScheme('+citizenSchemes+','+schemes[j]+');">Apply</button></td></tr>';;
      // }
      citizenSchemeTable.html(schemeHtml);
      citizenSchemes++;

    }

  }

}

function applyScheme(index, schemeAddress){
  var account = $("#accountAddress").val();
  myCitizenInstance.addEnrolledScheme(schemeAddress,"PENDINGAPPROVAL", {from: account, gas: 4712387}).then(
          		function(){
                $("#saveSchemeResult").html("Scheme Applied successfully");


              }

            );
            var schemeAbi = scheme_artifacts.abi;
            var dsi = web3.eth.contract(schemeAbi).at(schemeAddress);
            dsi.addCitizen(myCitizenInstance.address, {from: account, gas: 4712387}).then(
                    		function(){
                          $("#saveSchemeResult").html("Scheme Applied successfully");


                        }

                      );

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

/** Department code */

// Create New Department
function newDepartment() {
  console.log("Create new department");

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
      Department.setProvider(web3.currentProvider);
      web3.personal.unlockAccount(account, "BE1010be");
    	Department.new({from: account, gas: 4712386}).then(
    	function(department) {
    		console.log(department);
    		myDepartmentInstance = department;
        console.log("Department contract address...." + myDepartmentInstance.address);
        console.log("Department account address...." + account);

        $("#contractAddress").val(myDepartmentInstance.address);
        $("#accountAddress").val(account);
        $("#departmentName").val("");

        addToDepartments(account, myDepartmentInstance.address);


    		//$("#patientContractAddress").html(myPatientInstance.address);

    	});
    });
  }else{
    alert("Issue creating the account, please try after sometime");
  }
  //});


}

function addToDepartments(account, address){
  var departmentsAbi = departments_artifacts.abi;
  var di = web3.eth.contract(departmentsAbi).at(departmentsAddress);
  di.addDepartment(address, {from: account, gas: 4712387});
}

// Existing Department
function exisitingDepartment(account, contract) {
  console.log("Exsiting Department");


      Department.setProvider(web3.currentProvider);
      web3.personal.unlockAccount(account, "BE1010be");
    	Department.at(contract).then(
    	function(department) {
    		console.log(department);
    		myDepartmentInstance = department;
        console.log("Department contract address...." + myDepartmentInstance.address);
        console.log("Department account address...." + account);

        $("#contractAddress").val(myDepartmentInstance.address);
        $("#accountAddress").val(account);

        fetchDepartmentProfile();

        //$("#patientContractAddress").html(myPatientInstance.address);

    	});



}

function fetchDepartmentProfile(){

  myDepartmentInstance.name.call().then(function(result){
    $("#departmentName").val(result);
  });

  var departmentSchemeTable = $("#departmentScheme");

  var schemeHtml = '<tr><th>Name</th><th>Eligibility</th><th>Benefit</th><th>Action</td></tr>';
  var departmentAbi = department_artifacts.abi;
  var di = web3.eth.contract(departmentAbi).at(myDepartmentInstance.address);
  var schemes = di.getSchemes.call();
  for (var i = 0; i < schemes.length; i++) {

  if(schemes[i] != null && schemes[i] != ""){
    var schemeAbi = scheme_artifacts.abi;
    var dsi = web3.eth.contract(schemeAbi).at(schemes[i]);
    var schemeName = dsi.name.call();
    var eligibility = dsi.elig.call();
    // var eligibilityStr = ""
    // for(var j = 0; j < eligibility.length; j++){
    //   if(j != 0 ) eligibilityStr = eligibilityStr + ";";
    //   var eligibilityAbi = eligibility_artifacts.abi;
    //   var dsi = web3.eth.contract(eligibilityAbi).at(eligibility[j]);
    //   var eligibilityKey = dsi.key.call();
    //   var eligibilityValue = dsi.value.call();
    //   eligibilityStr = eligibilityKey + "=" + eligibilityValue;
    // }
    var benefit = dsi.bene.call();
    // var benefitStr = ""
    // for(var j = 0; j < benefits.length; j++){
    //   if(j != 0 ) benefitStr = benefitsStr + ";";
    //   var benefitAbi = benefit_artifacts.abi;
    //   var dsi = web3.eth.contract(benefitAbi).at(benefits[j]);
    //   var benefitKey = dsi.key.call();
    //   var benefitValue = dsi.value.call();
    //   benefitStr = benefitKey + "=" + benefitValue;
    // }


  }

  schemeHtml = schemeHtml + '<tr><td><input type="text" id="schemeName'+schemesPerDepartment+'" value="'+ schemeName + '"/></td><td><input type="text" id="schemeEligibility'+schemesPerDepartment+'" value="'+eligibility+'"/></td><td><input type="text" id="schemeBenefit'+schemesPerDepartment+'" value="'+benefit+'"/></td><td><button id="editScheme'+schemesPerDepartment+'">Edit</button></td></tr>';;
  departmentSchemeTable.html(schemeHtml);
  schemesPerDepartment++;
  }

}


// // Update Department Name
function updateDepartmentName(name) {

console.log("Updating Department name...");
console.log("update department name- unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myDepartmentInstance.setName(name, {from: accountAddress, gas: 4712387}).then(
        		function(){
              $("#updateDepartmentResult").html("Department name updated successfully");

              //getCitizenChangeEventLog();
            }

          );


}

// // save scheme
function saveScheme(name, eligibility, benefit) {

console.log("Saving scheme...");
console.log("Saving scheme- unlock account....");
var accountAddress = $("#accountAddress").val();
web3.personal.unlockAccount(accountAddress, "BE1010be");



myDepartmentInstance.addScheme(name, eligibility, benefit, {from: accountAddress, gas: 4712387}).then(function(error, result){
              if(error) console.log(error);
              // var eattrs = eligibility.split(";");
              // var schemeAbi = scheme_artifacts.abi;
              // var dsi = web3.eth.contract(schemeAbi).at(result);
              // console.log(eattrs.length);
              // for(var i = 0; i < eattrs.length; i++){
              //   var temp = eattrs[i].split("=");
              //   dsi.addEligibility(temp[0], temp[1], {from: accountAddress, gas: 4712387});
              //  }
              //
              // var battrs = benefit.split(";");
              // for(var i=0; i < battrs.length; i++){
              //   var temp = battrs[i].split("=");
              //   dsi.addBenefit(temp[0], temp[1], {from: accountAddress, gas: 4712387});
              // }

              $("#saveSchemeResult").html("Scheme added successfully");
              fetchDepartmentProfile();

              //getCitizenChangeEventLog();
            }

          );


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

  /**
  Citizen Related Code
  */

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



  /**
  Department related code
  */

  $("#updateDepartmentName").click(function() {

    var name = $("#departmentName").val();
    updateDepartmentName(name);
  });

  $("#addSchemeRow").click(function() {

    var departmentSchemeTable = $("#departmentScheme");

    var schemeHtml = '<tr><td><input type="text" id="schemeName" /></td><td><input type="text" id="schemeEligibility" /></td><td><input type="text" id="schemeBenefit"/></td><td><button id="saveScheme">Save</button></td></tr>';
    departmentSchemeTable.append(schemeHtml);
    $("#saveScheme").click(function() {

      var name = $("#schemeName").val();
      var eligibility = $("#schemeEligibility").val();
      var benefit = $("#schemeEligibility").val();


      saveScheme(name, eligibility, benefit);

    });

  });

  $("#saveScheme").click(function() {

    var name = $("#schemeName").val();
    var eligibility = $("#schemeEligibility").val();
    var benefit = $("#schemeEligibility").val();


    saveScheme(name, eligibility, benefit);
  });


};
