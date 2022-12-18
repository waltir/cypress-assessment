/// <reference types="cypress" />
import Auth from "../../../../../pageobjects/challenge/components/Auth";
import EmployeeModal from "../../../../../pageobjects/challenge/components/EmployeeModal";
import EmployeeTable from "../../../../../pageobjects/challenge/components/EmployeeTable";

describe("User signs in and adds a new employee", function () {
    const auth = new Auth();
    const modal = new EmployeeModal();
    const table = new EmployeeTable();

    let users = [{
        firstName: "Frank",
        lastName: "Jones",
        dependants: 0
    },{
        firstName: "John",
        lastName: "Doe",
        dependants: 1
    },{
        firstName: "Tom",
        lastName: "Hanks",
        dependants: 17
    },{
        firstName: "Tina",
        lastName: "Smith",
        dependants: 32
    }];

    beforeEach(function (){
        cy.viewport(1440, 1000);
        auth.navigate();
        cy.url().should('include', auth.getSource());
        cy.title().should('contain', 'Log In - Paylocity Benefits Dashboard');
        auth.login();
    })
    after(() => {
        cy.end();
    })

    it ("Should open the add employee modal and close via the 'x' button", () => {
        modal.addEmployee(users[0].firstName, users[0].lastName, users[0].dependants);
        modal.clickAddEmployeeModalXBtn();
    })

    it ("Should open the add employee modal and close via the 'Close' button", () => {
        modal.addEmployee(users[0].firstName, users[0].lastName, users[0].dependants);
        modal.clickAddEmployeeModalCloseBtn();
        table.verifyTablePresent();
    })

    table.iterateOverTableHeadings();

    users.forEach(user => {
        it (`Should open the add employee modal and successfully add ${user.firstName} ${user.lastName} with ${user.dependants} dependants`, () => {
            modal.addEmployee(user.firstName, user.lastName, user.dependants);
            modal.clickAddEmployeeModalAddBtn(user.firstName, user.lastName, user.dependants);
        })
    })

});