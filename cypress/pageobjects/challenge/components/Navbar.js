class Navbar {

    components = {
        brand: {
            selector: "a.navbar-brand",
            href: "/Prod/Benefits",
            value: "Paylocity Benefits Dashboard"
        },
        logOut: {
            selector: ".nav a[href='/Prod/Account/LogOut']",
            href: "/Prod/Account/LogOut",
            value: "Log Out"
        }
    };

    clickBrandInNav() {
        cy
            .get(this.components.brand.selector)
                .should('be.visible')
                .should("contain.text", this.components.brand.value)
                .should("have.attr", "href", this.components.brand.href)
                .click().then(() => {
                    cy
                        .wait(2000)
                        .url().should('include', this.components.brand.href)
                        .get(this.components.brand.selector)
                            .should('be.visible')
                            .should("contain.text", this.components.brand.value)
                            .should("have.attr", "href", this.components.brand.href)
                });
    };

    logout() {
        cy
            .get(this.components.logOut.selector)
            .should('be.visible')
            .should("contain.text", this.components.logOut.value)
            .should("have.attr", "href", this.components.logOut.href)
            .click().then(() => {
            cy
                .wait(2000)
                .url().should('include', "/Prod/Account/LogIn");
        });
    };

}

export default Navbar;