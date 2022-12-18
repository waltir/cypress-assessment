/// <reference types="cypress" />
import Auth from "../../../../pageobjects/challenge/components/Auth";
import Navbar from "../../../../pageobjects/challenge/components/Navbar";

describe("User signs into the application and then signs out", function () {
    const auth = new Auth();
    const nav = new Navbar();

    beforeEach(function (){
        cy.viewport(1440, 1000);
    })
    after(() => {
        cy.end();

    })

    it ("Verifies the legal string is displayed in the auth footer", () => {
        auth.navigate();
        cy.get(".footer div")
            .should('be.visible')
            .should("contain.text", "© 2022 - Paylocity");
        auth.login();
    })

    it ("Verifies the legal string is displayed in dashboard footer", () => {
        cy.get(".footer div")
            .should('be.visible')
            .should("contain.text", "© 2022 - Paylocity")
    })

});