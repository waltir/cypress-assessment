import example from '../../fixtures/example.json';

class Menu {

    components = {
        legal: {
            selector: "a[href='/about']",
            title: "Copyright 2022 Tesla Motors",
            text: "Tesla © 2022",
            href: "/about"
        },
        privacy: {
            selector: "a[href='/legal']",
            text: "Privacy & Legal",
            href: "/legal"
        },
        recalls: {
            selector: "a[href*='/vin-recall-search']",
            text: "Vehicle Recalls",
            href: "https://www.tesla.com/vin-recall-search"
        },
        contact: {
            selector: "a[href='/contact']",
            text: "Contact",
            href: "/contact"
        },
        careers: {
            selector: "a[href='/careers']",
            text: "Careers",
            href: "/careers"
        },
        news: {
            selector: "a[href='/blog']",
            text: "News",
            href: "/blog"
        },
        engage: {
            selector: "a[href='https://engage.tesla.com/']",
            text: "Engage",
            href: "https://engage.tesla.com/"
        },
        locations: {
            selector: "a[href='/findus/list']",
            text: "Locations",
            href: "/findus/list"
        }
    }

    navigate() {
        return cy.visit('/', {failOnStatusCode: false});
    }

    getSource() {
        return example.baseUrl;
    }

    checkFooterItems() {
        for (const [key, value] of Object.entries(this.components)) {
            it(`${key} should be present and the value and href are correct`, () => {
                cy.get(this.components.legal.selector).then(() => {
                    (value.selector) ? cy.get(value.selector, {timeout: 6000}).should('be.visible') : null;
                    (value.href) ? cy.get(value.selector, {timeout: 6000}).should("have.attr", "href", value.href) : null;
                    (value.text) ? cy.get(value.selector).should("contain.text", value.text) : null;
                    (value.title) ? cy.get(value.selector).should("have.attr", "title", value.title) : null;
                })
            })
        };
    }
}

export default Menu