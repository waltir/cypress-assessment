/// <reference types="cypress" />
import Auth from "../../../../pageobjects/challenge/components/Auth";
import Navbar from "../../../../pageobjects/challenge/components/Navbar";

describe("User signs into the application and then signs out", function () {
    const auth = new Auth();
    const nav = new Navbar();

    beforeEach(function (){
        cy.viewport(1440, 1000);
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    after(() => {
        cy.end();

    })

    it ("Verifies the user is able to successfully sign into of the application", () => {
        auth.navigate();
        cy.url().should('include', auth.getSource());
        cy.title().should('contain', 'Log In - Paylocity Benefits Dashboard');
        auth.login();
    })

    it ("Verifies the user is able successfully log out of the application by clicking the log out button", () => {
        nav.logout();
    })

});