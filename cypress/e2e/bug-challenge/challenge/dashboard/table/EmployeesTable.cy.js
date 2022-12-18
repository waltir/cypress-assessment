/// <reference types="cypress" />
import Auth from "../../../../../pageobjects/challenge/components/Auth";
import EmployeeTable from "../../../../../pageobjects/challenge/components/EmployeeTable";
import api from "../../../api/EmployeeRequests";

describe("Employees table is displayed as expected", function () {
    const auth = new Auth();
    const table = new EmployeeTable();

    before(function (){
        api.deleteAllEmployeees();
        cy.viewport(1440, 1000);
        auth.navigate();
        cy.url().should('include', auth.getSource());
        cy.title().should('contain', 'Log In - Paylocity Benefits Dashboard');
        auth.login();
    })
    after(() => {
        cy.end();
    })

    it ("Employee table is displayed", () => {
        table.verifyTablePresent();
        table.verifyEmployee("ed731087-b5c1-4479-a101-5fe05d8e1224", "chris", "bunce", 3, 52000, 2000, 96.15, 1903.85);
        // table.editEmployee("ed731087-b5c1-4479-a101-5fe05d8e1224");
        // table.deleteEmployee("ed731087-b5c1-4479-a101-5fe05d8e1224");
    })

    table.iterateOverTableHeadings();



});