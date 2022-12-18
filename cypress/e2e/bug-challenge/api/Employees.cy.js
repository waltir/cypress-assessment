/// <reference types="cypress" />

import EmployeeTable from "./EmployeeRequests";

describe("Employees table API endpoints are functioning as expected", function () {
    let user = [];

    beforeEach(function (){
        cy.viewport(1440, 1000);
    })
    after(() => {
        cy.end();
    })

    it ("Employee table is empty", () => {
        EmployeeTable.deleteAllEmployeees();
        EmployeeTable.getEmployeeList().should("eq", 0);;
    })

    it ("A new employee is successfully added", () => {
        EmployeeTable.addEmployee("Tim", "Jones", 3).then((resp)=>{
            user.push(resp);
        });
    })

    it ("An employee can be fetched from the db", () => {
        EmployeeTable.getEmployee(user[0].id, user[0].firstName, user[0].lastName, user[0].dependants ).then((resp)=>{
            cy.log(resp);
        });
    })

    it ("An employee can be updated", () => {
        EmployeeTable.updateEmployee(user[0].id, "Bon", "Jovi", 2 ).then((resp)=>{
            cy.log(resp);
        });
    })

    it ("An employee can be deleted", () => {
        EmployeeTable.deleteEmployee(user[0].id).then((resp)=>{
            EmployeeTable.getEmployeeList().should("eq", 0);
        });
    })
});