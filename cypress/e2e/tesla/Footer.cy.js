/// <reference types="cypress" />
import Footer from "../../pageobjects/tesla/components/Footer";

describe("Cypress POM Footer Test Suite", function () {
    const footer = new Footer();

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
        footer.navigate();
        cy.url().should('include', footer.getSource());
        cy.title().should('contain', 'Electric Cars, Solar & Clean Energy | Tesla');
    })

    it ("User can scroll down to see the footer items", () => {
        cy.get('.tds-shell').scrollTo('bottom'); // scroll footer items into view
        cy.get(footer.components.legal.selector).should("have.attr", "title", footer.components.legal.title);
        cy.get(footer.components.legal.selector).should(
            "contain.text",
            footer.components.legal.text
        );
    })

    footer.checkFooterItems();

    // it ("Menu items should be present", () => {
    //     menu.checkMainMenu();
    // })
    //
    // it( "Should validate all of the collapsed menu items are present and clickable", () => {
    //     menu.checkCollapsedHamburgerMenu();
    // })


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


    // it ("Homepage title using jQuery", () => {
    //     cy.request("/")
    //         .its('body')
    //         .then(html => {
    //             const $titleHomePage = Cypress.$(html).find('h1').text();
    //             cy.log('Title of Page is: ' + $titleHomePage);
    //         });
    // })
    //
    //
    //
    // it ("Schedule a test drive button is present", () => {
    //     cy.get('.tcl-homepage-hero--overlay > .tcl-homepage-hero__content > .tds--hideon-phone-only > .tds-link', {timeout: 6000}).should("to.have.text", "Schedule a Test Drive")
    //     // cy.get('.tcl-homepage-hero--overlay > .tcl-homepage-hero__content > .tds--hideon-phone-only > .tds-link', {timeout: 6000})
    //     //     .screenshot("/testing/test");
    // })
    // it ("Should make a request to a rest endpoint and make assertions against the data", () => {
    //     cy.request("https://wrrv.com/rest/carbon/uri/").as('rest');
    //     cy.get('@rest').should((response) => {
    //         cy.log("response " + JSON.stringify(response));
    //     });
    // })
    //
    // it ("Should get the cookies and iterate over them", () => {
    //     cy.getCookies().then((cookies) => {
    //         cookies.forEach((cookie) => {
    //             cy.log("cookie", JSON.stringify(cookie))
    //         })
    //     });
    //
    //     cy.end()
    // });
});