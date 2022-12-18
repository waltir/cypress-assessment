import EmployeeRequests from "../../../e2e/bug-challenge/api/EmployeeRequests";
import Auth from "./Auth";

const auth = new Auth();

class EmployeeTable {

    components = {
        table: "#employeesTable",
        noEmployeeString: {
            selector: "td",
            value: "No employees found."
        },
        thread: {
            id: {
                selector: "#employeesTable > thead > tr > th:nth-child(1)",
                value: "Id",
                index: 0
            },
            lastName: {
                selector: "#employeesTable > thead > tr > th:nth-child(2)",
                value: "Last Name",
                index: 1
            },
            firstName: {
                selector: "#employeesTable > thead > tr > th:nth-child(3)",
                value: "First Name",
                index: 2
            },
            dependants: {
                selector: "#employeesTable > thead > tr > th:nth-child(4)",
                value: "Dependents",
                index: 3
            },
            salary: {
                selector: "#employeesTable > thead > tr > th:nth-child(5)",
                value: "Salary",
                index: 4
            },
            gross: {
                selector: "#employeesTable > thead > tr > th:nth-child(6)",
                value: "Gross Pay",
                index: 5
            },
            benefits: {
                selector: "#employeesTable > thead > tr > th:nth-child(7)",
                value: "Benefits Cost",
                index: 6
            },
            net: {
                selector: "#employeesTable > thead > tr > th:nth-child(8)",
                value: "Net Pay",
                index: 7
            },
            actions: {
                selector: "#employeesTable > thead > tr > th:nth-child(9)",
                value: "Actions",
                index: 8
            }
        }
    }

    iterateOverTableHeadings() {
        for (const [key, value] of Object.entries(this.components.thread)) {
            it(`Table heading "${value.value}" is displayed`, () => {
                cy.get(value.selector).should('be.visible').should("contain.text", value.value);
            })
        }
    }

    verifyTablePresent() {
        cy.get(this.components.table).should('be.visible');
    }

    verifyEmployee(id, firstName, lastName, dependents, salary, gross, cost, net) {
        cy.get("tbody tr").each((row) => {
            cy.get(row).find("td").each((column, index) => {
                if(row.text().includes(id)){
                    if (index === 0) {
                        cy.get(column).should('be.visible').should("contain.text", id);
                    } else if (index === 1){
                        cy.get(column).should('be.visible').should("contain.text", firstName);
                    } else if (index === 2){
                        cy.get(column).should('be.visible').should("contain.text", lastName);
                    } else if (index === 3){
                        cy.get(column).should('be.visible').should("contain.text", dependents);
                    } else if (index === 4){
                        cy.get(column).should('be.visible').should("contain.text", salary);
                    } else if (index === 5){
                        cy.get(column).should('be.visible').should("contain.text", gross);
                    } else if (index === 6){
                        cy.get(column).should('be.visible').should("contain.text", cost);
                    } else if (index === 7){
                        cy.get(column).should('be.visible').should("contain.text", net);
                    }
                }
            })
        })
    };

    editEmployee(id) {
        cy.get("tbody tr").each((row) => {
            cy.get(row).find("td").each((column, index) => {
                if(index === 0 && column.text().includes(id)){ //  index === 0
                    cy.get(row).find("i.fa-edit").click()
                }
            })
        })
    };

    deleteEmployee(id) {
        cy.get("tbody tr").each((row) => {
            cy.get(row).find("td").each((column, index) => {
                if(index === 0 && column.text().includes(id)){ //  index === 0
                    cy.get(row).find("i.fa-times").click()
                }
            })
        })
    };

    deleteSingleEmloyee() {
        cy.get("i.fa-times").each((employee, index)=>{
            if (index === 0) {
                cy.wait(2000);
                cy.get(employee).click();
                cy.wait(2000);
                cy.get('#deleteEmployee').click();
                cy.wait(2000);
            }
        });
    };

}

export default EmployeeTable;