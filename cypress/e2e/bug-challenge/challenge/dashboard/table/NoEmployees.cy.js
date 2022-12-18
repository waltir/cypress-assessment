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

    it ("Employee dashboard is rendered in an empty state", () => {
        table.verifyTablePresent();
        cy.get(table.components.noEmployeeString.selector)
            .should('be.visible')
            .should("contain.text", table.components.noEmployeeString.value)
    });

});