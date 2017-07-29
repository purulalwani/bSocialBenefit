var Citizen = artifacts.require("./Citizen.sol");
var Document = artifacts.require("./Document.sol");


module.exports = function(deployer) {
  deployer.deploy(Citizen);
  deployer.deploy(Document);

};
