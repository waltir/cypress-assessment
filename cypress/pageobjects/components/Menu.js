import example from '../../fixtures/example.json';

class Menu {

    components = {
        hamburger: {
            selector: "button[action='secondaryNavigationItems']"
        },
        logo: {
            selector: ".tds-site-logo svg path",
            svg: "M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
        },
        menu: [{
            existingInventory: {
                selector: "a[title='Existing Inventory']"
            },
            usedInventory: {
                selector: "a[title='Used Inventory']"
            },
            tradeIn: {
                selector: "a[title='Trade-In']"
            },
            testDrive: {
                selector: "a[title='Test Drive']"
            },
            insurance: {
                selector: "a[title='Insurance']"
            },
            cybertruck: {
                selector: "a[title='Cybertruck']"
            },
            roadster: {
                selector: "a[title='Roadster']"
            },
            semi: {
                selector: "a[title='Semi']"
            },
            charging: {
                selector: "a[title='Charging']"
            },
            powerwall: {
                selector: "a[title='Powerwall']"
            },
            commercialEnergy: {
                selector: "a[title='Commercial Energy']"
            },
            utilities: {
                selector: "a[title='Utilities']"
            },
            findUs: {
                selector: "a[title='Find Us']"
            },
            support: {
                selector: "a[title='Support']"
            },
            investorRelations: {
                selector: "a[title='Investor Relations']"
            },
        }],
        account: {
            selector: "a[title='Account']",
            href: "/teslaaccount"
        },
        shop: {
            selector: "a[title='Shop']",
            href: "https://shop.tesla.com"
        },
        solarPanels: {
            selector: "a[title='Solar Panels']",
            href: "/solarpanels"
        },
        solarRoof: {
            selector: "a[title='Solar Roof']",
            href: "/solarroof"
        },
        modelY: {
            selector: "a[title='Model Y']",
            href: "/modely"
        },
        modelX: {
            selector: "a[title='Model X']",
            href: "/modelx"
        },
        model3: {
            selector: "a[title='Model 3']",
            href: "/model3"
        },
        modelS: {
            selector: "a[title='Model S']",
            href: "/models"
        }
    }

    navigate() {
        return cy.visit('/', {failOnStatusCode: false});
    }

    getSource() {
        return example.baseUrl;
    }

    checkMainMenu() {
        for (const [key, value] of Object.entries(this.components)) {
            if (key !== "menu") {
                it(`${key} is present in the sites main nav and the value and href are correct`, () => {
                    (value.selector) ? cy.get(value.selector, {timeout: 6000}).should('be.visible') : null;
                    (value.href) ? cy.get(value.selector, {timeout: 6000}).should("have.attr", "href", value.href) : null;
                })
            }
        };
    };

    checkCollapsedMenu() {
        for (const [key, value] of Object.entries(this.components.menu[0])) {
            it(`${key} should be present in the sites side nav and the value and href are correct`, () => {
                (value.selector) ? cy.get(value.selector, {timeout: 6000}).should('be.visible') : null;
                (value.href) ? cy.get(value.selector, {timeout: 6000}).should("have.attr", "href", value.href) : null;
            })
        };
    };

}

export default Menu