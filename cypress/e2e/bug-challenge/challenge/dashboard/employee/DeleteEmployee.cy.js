/// <reference types="cypress" />

import Auth from "../../../../../pageobjects/challenge/components/Auth";
import EmployeeTable from "../../../../../pageobjects/challenge/components/EmployeeTable";

describe("Employees table is displayed as expected", function () {
    const auth = new Auth();
    const table = new EmployeeTable();


    beforeEach(function (){
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
    })

    it ("A single employees can be successfully deleted", () => {
        table.deleteSingleEmloyee();
    })
});