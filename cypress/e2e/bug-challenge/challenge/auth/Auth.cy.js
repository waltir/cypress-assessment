/// <reference types="cypress" />
import Auth from "../../../../pageobjects/challenge/components/Auth";

describe("Cypress POM Test Suite", function () {
    const auth = new Auth();

    beforeEach(function (){
        cy.viewport(1440, 1000);
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    after(() => {
        cy.end();

    })

    it ("Should navigate to the auth page", () => {
        auth.navigate();
        cy.url().should('include', auth.getSource());
        cy.title().should('contain', 'Log In - Paylocity Benefits Dashboard');
    })

    it ("Site logo should be present", () => {
        cy
            .get(auth.components.logo.selector).should('be.visible')
            .get(auth.components.logo.selector).should("have.attr", "src", auth.components.logo.src)
            .get(auth.components.logo.selector).should("have.attr", "width", auth.components.logo.width)
            .get(auth.components.logo.selector).should("have.attr", "height", auth.components.logo.height)
            .get(auth.components.logo.selector).should("have.attr", "alt", auth.components.logo.alt)
    })

    it ("Verifies the username and password required validation error strings are displayed", () => {
        auth.usernameAndPasswordRequired();
    })

    it ("Verifies the username or password is incorrect validation error string is displayed", () => {
        auth.usernameOrPasswordIsIncorrect();
    })

    it ("Verifies the user is able to successfully sign in using valid credentials", () => {
        auth.login();
    })

});