/// <reference types="cypress" />
import Menu from "../../pageobjects/tesla/components/Menu";

describe("Cypress POM Test Suite", function () {
    const menu = new Menu();

    beforeEach(function (){
        cy.viewport(1440, 1000);
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    after(() => {
        cy.end();

    })

    it ("Should navigate to the homepage", () => {
        menu.navigate();
        cy.url().should('include', menu.getSource());
        cy.title().should('contain', 'Electric Cars, Solar & Clean Energy | Tesla');
    })

    it ("Site logo should be present", () => {
        cy.get(menu.components.logo.selector).should("have.attr", "d", menu.components.logo.svg)
        cy.get(menu.components.logo.selector).should("have.attr", "fill", "currentColor")
    })

    menu.checkMainMenu();


    it( "Side menu opens after clicking the menu button", () => {
        cy.get(menu.components.hamburger.selector, {timeout: 6000}).should('be.visible').click();
        cy.get(menu.components.menu[0].existingInventory.selector).should("be.visible");
    })

    menu.checkCollapsedMenu();

    // it("Login with valid credentials", function () {
    //     const login = new HomePage();
    //     login.navigate();
    //     login.enterEmail().clear()
    //     // cy.get(login.#selectors[0].button).type("admin@yourstore.com");
    //     login.enterEmail().type('admin@yourstore.com');
    //     login.enterPassword().clear();
    //     login.enterPassword().type('admin');
    //     login.submit().click();
    //     cy.url().should('be.equal', 'https://admin-demo.nopcommerce.com/admin/')
    // });
    // it("View tesla homepage", () => {
    //
    //

    //
    //     const url = example.baseUrl;
    //
    //     // var evt = document.createEvent('Event');
    //     // evt.initEvent('load', false, false);
    //     // // window.dispatchEvent(evt);
    //
    //     // cy.exec(window.dispatchEvent(evt).toString(), {failOnNonZeroExit: false});
    //     // cy.forceVisit(url)
    //
    //     cy.visit(url, {failOnStatusCode: false});
    //     cy.get("a[title='Model S']") // Still nothing happening
    //         .should('not.exist');
    //     // expect(undefined).to.be.undefined
    //     cy.get("button[title='Menu']") // Still nothing happening
    //         .should('be.visible')
    //         .click();
    //     // const login = new HomePage();
    //     // login.navigate();
    //     // login.enterEmail().clear()
    //     // cy.get(login.#selectors[0].button).type("admin@yourstore.com");
    //     // login.enterEmail().type('admin@yourstore.com');
    //     // login.enterPassword().clear();
    //     // login.enterPassword().type('admin');
    //     // login.submit().click();
    //     cy.url().should('to.contain', url)
    //     cy.end();
    // });


    it ("Homepage title using jQuery", () => {
        cy.request("/")
            .its('body')
            .then(html => {
                const $titleHomePage = Cypress.$(html).find('h1').text();
                cy.log('Title of Page is: ' + $titleHomePage);
            });
    })



    it ("Schedule a test drive button is present", () => {
        cy.get('.tcl-homepage-hero--overlay > .tcl-homepage-hero__content > .tds--hideon-phone-only > .tds-link', {timeout: 6000}).should("to.have.text", "Schedule a Test Drive")
        // cy.get('.tcl-homepage-hero--overlay > .tcl-homepage-hero__content > .tds--hideon-phone-only > .tds-link', {timeout: 6000})
        //     .screenshot("/testing/test");
    })
    it ("Should make a request to a rest endpoint and make assertions against the data", () => {
        cy.request("https://wrrv.com/rest/carbon/uri/").as('rest');
        cy.get('@rest').should((response) => {
            cy.log("response " + JSON.stringify(response));
        });
    })

    it ("Should get the cookies and iterate over them", () => {
        cy.getCookies().then((cookies) => {
            cookies.forEach((cookie) => {
                cy.log("cookie", JSON.stringify(cookie))
            })
        });

        cy.end()
    });
});