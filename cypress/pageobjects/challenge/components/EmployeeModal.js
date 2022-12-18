import EmployeeRequests from "../../../e2e/bug-challenge/api/EmployeeRequests";
import EmployeeTable from "../../challenge/components/EmployeeTable";

const table = new EmployeeTable();

class EmployeeModal {



    components = {
        addemployeebtn: {
            selector: "#add",
            value: "Add Employee"
        },
        deletebtn: {
            selector: "#employeesTable > tbody > tr:nth-child(1) > td:nth-child(9) > i.fas.fa-times"
        },
        editbtn: {
            selector: "#employeesTable > tbody > tr:nth-child(1) > td:nth-child(9) > i.fas.fa-edit"
        },



        addAndEditEmployeeModal: {
            title: {
                value: "Add Employee",
                selector: "h5.modal-title"
            },
            closeXbtn: {
                selector: "#employeeModal button.close[data-dismiss='modal'] span",
                value: "×"
            },
            firstName: {
                selector: "#firstName",
                name: "firstName",
                label: {
                    selector: "label[for='firstName']",
                    value: "First Name:"
                }
            },
            lastName: {
                selector: "#lastName",
                name: "lastName",
                label: {
                    selector: "label[for='lastName']",
                    value: "Last Name:"
                }
            },
            dependants: {
                selector: "#dependants",
                name: "dependants",
                label: {
                    selector: "label[for='dependants']",
                    value: "Dependants:"
                }
            },
            addbtn: {
                selector: "#addEmployee",
                value: "Add"
            },
            updateBtn: {
                selector: "#updateEmployee",
                value: "Update"
            },
            cancelbtn: {
                selector: "#employeeModal button.btn-secondary[data-dismiss='modal']",
                value: "Cancel"
            }
        },
        deleteEmployeeModal: {
            title: {
                value: "Delete Employee",
                selector: "h5.modal-title"
            },
            closeXbtn: {
                selector: "#deleteModal button.close[data-dismiss='modal']",
                value: "x"
            },
            firstName: {
                selector: "#deleteFirstName",
            },
            lastName: {
                selector: "#deleteLastName"
            },
            deleteBtn: {
                selector: "#deleteEmployee"
            },
            cancelBtn: {
                selector: "#deleteModal > div > div > div.modal-footer > button.btn.btn-secondary"
            }
        }
    };

    firstName(value){
        cy
            .get(this.components.addAndEditEmployeeModal.firstName.label.selector)
                .should('be.visible')
                .should("contain.text", this.components.addAndEditEmployeeModal.firstName.label.value)
            .get(this.components.addAndEditEmployeeModal.firstName.selector)
                .should('be.visible')
                .should("have.attr", "name", this.components.addAndEditEmployeeModal.firstName.name)
                .clear()
                .type(value)
                .invoke('val')
            .get(this.components.addAndEditEmployeeModal.firstName.selector)
                .should('have.value', value)
    }

    lastName(value){
        cy
            .get(this.components.addAndEditEmployeeModal.lastName.label.selector)
            .should('be.visible')
            .should("contain.text", this.components.addAndEditEmployeeModal.lastName.label.value)
            .get(this.components.addAndEditEmployeeModal.lastName.selector)
            .should('be.visible')
            .should("have.attr", "name", this.components.addAndEditEmployeeModal.lastName.name)
            .clear()
            .type(value)
            .invoke('val')
            .get(this.components.addAndEditEmployeeModal.lastName.selector)
            .should('have.value', value)
    }

    dependants(value){
        cy
            .get(this.components.addAndEditEmployeeModal.dependants.label.selector)
            .should('be.visible')
            .should("contain.text", this.components.addAndEditEmployeeModal.dependants.label.value)
            .get(this.components.addAndEditEmployeeModal.dependants.selector)
            .should('be.visible')
            .should("have.attr", "name", this.components.addAndEditEmployeeModal.dependants.name)
            .clear()
            .type(value)
            .invoke('val')
            .get(this.components.addAndEditEmployeeModal.dependants.selector)
            .should('have.value', value)
    }

    openAddEmployeeModal(){
        cy.get(this.components.addemployeebtn.selector).click().then(() => {
            cy
                .get(this.components.addAndEditEmployeeModal.title.selector)
                .should('be.visible')
                .should("contain.text", this.components.addAndEditEmployeeModal.title.value)
        });
    }

    clickAddEmployeeModalXBtn(){
        cy
            .get(this.components.addAndEditEmployeeModal.closeXbtn.selector)
                .should('be.visible')
                .should("contain.text", this.components.addAndEditEmployeeModal.closeXbtn.value)
                .click().then(() => {
                    cy.get(this.components.addAndEditEmployeeModal.title.selector).should('not.be.visible')
                });
    }

    clickAddEmployeeModalCloseBtn(){
        cy
            .get(this.components.addAndEditEmployeeModal.cancelbtn.selector).should('be.visible')
            .should("contain.text", this.components.addAndEditEmployeeModal.cancelbtn.value)
            .click().then(() => {
                cy.get(this.components.addAndEditEmployeeModal.title.selector).should('not.be.visible')
            });
    }

    clickAddEmployeeModalAddBtn(firstName, lastName, dependants){
        cy.intercept({
            method: 'POST', // Route all GET requests
            url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees', // that have a URL that matches '/users/*'
        }).as('addEmployee') // and force the response to be: []
        cy
            .get(this.components.addAndEditEmployeeModal.addbtn.selector).should('be.visible')
            .should("contain.text", this.components.addAndEditEmployeeModal.addbtn.value)
            .click().then(() => {
                cy.wait('@addEmployee').then((interception) => {
                    const body = interception.response.body;

                    const dependantCalc = (dependants * 500) / 26;
                    const employeeCalc = 1000 / 26;
                    const monthlyCalc = 2000 - employeeCalc - dependantCalc;
                    const benefitsCost = employeeCalc + dependantCalc;
                    const net = monthlyCalc;

                    expect(interception.response.statusCode).to.eq(200);
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('firstName', firstName);
                    expect(body).to.have.property('lastName', lastName);
                    expect(body).to.have.property('dependants', dependants);
                    expect(body).to.have.property('salary', 52000);
                    expect(body).to.have.property('gross', 2000);
                    expect(parseFloat(body.benefitsCost).toFixed(4).toString()).to.eq(parseFloat(benefitsCost).toFixed(4))
                    expect(parseFloat(body.net.toFixed(4)).toString()).to.eq(parseFloat(net).toFixed(4))


                    // VERIFY THE EMPLOYEE RECORD IS FOUND IN THE DATABASE
                    EmployeeRequests.getEmployee(body.id, body.firstName, body.lastName, body.dependants);

                    // VERIFY THE EMPLOYEE APPEARS IN THE EMPLOYEE TABLE
                    table.verifyEmployee(body.id, body.firstName, body.lastName, body.dependants, parseFloat(body.salary).toFixed(2), parseFloat(body.gross).toFixed(2), parseFloat(body.benefitsCost).toFixed(2), parseFloat(body.net).toFixed(2));

                })
                cy.get(this.components.addAndEditEmployeeModal.title.selector).should('not.be.visible')
            });
    }

    addEmployee(first, last, dependents){
        this.openAddEmployeeModal();
        this.firstName(first);
        this.lastName(last);
        this.dependants(dependents);
    };

    editEmployee(){

    };

    deleteEmployee(){

    };

}

export default EmployeeModal;