pragma solidity ^0.4.2;
import "./Department.sol";

contract Departments {

    address[] depts;


    // add department
    function addDepartment(address dept) {

        depts.push(dept);
    }

    // get departments
    function getDepartments() returns (address[]) {

        return depts;
    }
}
