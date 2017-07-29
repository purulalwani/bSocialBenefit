var Citizen = artifacts.require("./Citizen.sol");
var Document = artifacts.require("./Document.sol");
var Scheme = artifacts.require("./Scheme.sol");
var Department = artifacts.require("./Department.sol");
var Eligibility = artifacts.require("./Eligibility.sol");
var Benefit = artifacts.require("./Benefit.sol");
var Departments = artifacts.require("./Departments.sol");
var SchemeEnrolled = artifacts.require("./SchemeEnrolled.sol");

module.exports = function(deployer) {
  deployer.deploy(Citizen);
  deployer.deploy(Scheme);
  deployer.deploy(Department);
  deployer.deploy(Eligibility);
  deployer.deploy(Benefit);
  deployer.deploy(Departments);
  deployer.deploy(SchemeEnrolled);

};
