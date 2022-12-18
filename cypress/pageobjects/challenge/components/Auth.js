import example from '../../../fixtures/example.json';
import auth from '../../../fixtures/auth.json';

class Auth {

    components = {
        username: {
            label: "label[for='Username']",
            labelText: "Username",
            input: "input[name='Username']",
        },
        password: {
            label: "label[for='Password']",
            labelText: "Password",
            input: "input[name='Password']",
        },
        validation: {
            section: ".validation-summary-errors",
            userNameText: "The Username field is required.",
            passwordText: "The Password field is required.",
            moreProblemsSelector: ".validation-summary-errors span",
            moreProblemsList: ".validation-summary-errors li",
            moreProblemsText: "There were one or more problems that prevented you from logging in:",
            wrongPassword: "The specified username or password is incorrect."
        },
        submit: {
            selector: "button[type='submit']",
            text: "Log In"
        },
        logo: {
            selector: "img[alt='Paylocity']",
            src: "https://access.paylocity.com/images/paylocity-logo.svg",
            width: 227,
            height: 94,
            alt: "Paylocity"
        }
    };

    navigate() {
        return cy.visit(`${this.getSource()}/Prod/Account/Login`, {failOnStatusCode: false});
    };

    getSource() {
        return example.paylocityUrl;
    };

    login() {
        // this.navigate();
        cy.get(this.components.username.input).clear().type(auth.username);
        cy.get(this.components.username.label).should("contain.text", this.components.username.labelText);
        cy.get(this.components.password.input).clear().type(auth.password);
        cy.get(this.components.password.label).should("contain.text", this.components.password.labelText);
        cy.get(this.components.submit.selector).click();
    };

    usernameAndPasswordRequired() {
        return cy.get(this.components.submit.selector).click().then(() => {
            cy.get(this.components.validation.section).should('be.visible')
            cy.get(this.components.validation.moreProblemsSelector).should("contain.text", this.components.validation.moreProblemsText);

            cy.get(this.components.validation.moreProblemsList).each((item)=>{
                cy.get(item).should(($text) => {
                    const t1 = $text.text();
                    if (t1.includes("Password")){
                        expect(t1).to.equal("The Password field is required.");
                    } else if (t1.includes("Username")) {
                        expect(t1).to.equal("The Username field is required.");
                    }
                })
            });
        })
    };

    usernameOrPasswordIsIncorrect() {
        return cy.get(this.components.submit.selector).click().then(() => {
            cy.get(this.components.validation.section).should('be.visible')
            cy.get(this.components.validation.moreProblemsSelector).should("contain.text", this.components.validation.moreProblemsText);
            cy.get(this.components.username.input).type(auth.username);
            cy.get(this.components.password.input).type("wrongpass");
            cy.get(this.components.submit.selector).click();
            cy.get(this.components.validation.moreProblemsList).each((item)=>{
                cy.get(item).should(($text) => {
                    const t1 = $text.text();
                    expect(t1).to.equal(this.components.validation.wrongPassword);
                })
            });
        })
    };

}

export default Auth;