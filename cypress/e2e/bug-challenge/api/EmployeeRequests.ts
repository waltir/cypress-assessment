// QA CHALLENGE MASTER - CYPRESS API TEST FUNCTION CALLS

// GET ALL EMPLOYEES
const getEmployeeList = () => {
    return cy.request({
        url: "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
        method: "GET",
        failOnStatusCode: false,
        headers: {
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        if (response.body.length > 0){
            expect(response.body.length).to.be.greaterThan(0);
            response.body.forEach(function(employee: {id: string, firstName: string, lastName: string, dependants: number}){
                expect(response.body).to.have.property("partitionKey");
                expect(response.body).to.have.property("sortKey");
                expect(response.body).to.have.property("username");
                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("firstName");
                expect(response.body).to.have.property("lastName");
                expect(response.body).to.have.property("dependants");
                expect(response.body).to.have.property("expiration");
                expect(response.body).to.have.property("salary");
                expect(response.body).to.have.property("gross");
                expect(response.body).to.have.property("benefitsCost");
                expect(response.body).to.have.property("net");
                return response.body.length;
            });
        } else {
            expect(response.body.length).to.eq(0);
            return response.body.length;
        }
    });
};

// ADD A NEW EMPLOYEE
const addEmployee = (firstName: string, lastName: string, dependants: number) => {
    return cy.request({
        url: "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
        method: "POST",
        failOnStatusCode: false,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            dependants: dependants
        })
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('firstName', firstName);
        expect(response.body).to.have.property('lastName', lastName);
        expect(response.body).to.have.property('dependants', dependants);
        expect(response.body).to.have.property('salary', 52000);
        expect(response.body).to.have.property('gross', 2000);
        // expect(response.body).to.have.property('benefitsCost', 76.92308); // 38.46 every two weeks, 83.33 per month
        // expect(response.body).to.have.property('net', 1923.0769);
        return {
            id: response.body.id,
            firstName: response.body.firstName,
            lastName: response.body.lastName,
            dependants: response.body.dependants
        }
    });
};

// GET A SPECIFIC EMPLOYEE
const getEmployee = (id: string, firstName: string, lastName: string, dependants: number) => {
    return cy.request({
        url: `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
        method: "GET",
        failOnStatusCode: false,
        headers: {
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        }
    }).then((response:any) => {

        const dependantCalc = (dependants * 500) / 26;
        const employeeCalc = 1000 / 26;
        const monthlyCalc = 2000 - employeeCalc - dependantCalc;
        const benefitsCost = employeeCalc + dependantCalc;
        const net = monthlyCalc;
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', id);
        expect(response.body).to.have.property('firstName', firstName);
        expect(response.body).to.have.property('lastName', lastName);
        expect(response.body).to.have.property('dependants', dependants);
        expect(response.body).to.have.property('salary', 52000);
        expect(response.body).to.have.property('gross', 2000);
        expect(parseFloat(response.body.benefitsCost).toFixed(4).toString()).to.eq(parseFloat(String(benefitsCost)).toFixed(4))
        expect(parseFloat(response.body.net.toFixed(4)).toString()).to.eq(parseFloat(String(net)).toFixed(4))
        expect(response.body).to.have.property('expiration');
    });
};

// UPDATE A SPECIFIC EMPLOYEE
const updateEmployee = (id: string, firstName: string, lastName: string, dependants: number) => {
    return cy.request({
        url: "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
        method: "PUT",
        failOnStatusCode: false,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        },
        body: JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            dependants: dependants
        })
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', id);
        expect(response.body).to.have.property('firstName', firstName);
        expect(response.body).to.have.property('lastName', lastName);
        expect(response.body).to.have.property('dependants', dependants);
        expect(response.body).to.have.property('salary', 52000);
        expect(response.body).to.have.property('gross', 2000);
        expect(response.body).to.have.property('benefitsCost', 76.92308); // 38.46 every two weeks, 83.33 per month
        expect(response.body).to.have.property('net', 1923.0769);
    });
};

// DELETE A SPECIFIC EMPLOYEE
const deleteEmployee = (id: number) => {
    return cy.request({
        url: `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${id}`,
        method: "DELETE",
        failOnStatusCode: false,
        headers: {
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.equal(0);
        expect(response.body).to.not.have.property('id');
        expect(response.body).to.not.have.property('firstName');
        expect(response.body).to.not.have.property('lastName');
        expect(response.body).to.not.have.property('dependants');
        expect(response.body).to.not.have.property('salary');
        expect(response.body).to.not.have.property('gross');
        expect(response.body).to.not.have.property('benefitsCost');
        expect(response.body).to.not.have.property('net');
    });
};


// DELETE A SPECIFIC EMPLOYEE
const deleteAllEmployeees = () => {
    return cy.request({
        url: "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees",
        method: "GET",
        failOnStatusCode: false,
        headers: {
            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        if (response.body.length > 0){
           return response.body.forEach(function(employee){
                cy.request({
                        url: `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/${employee.id}`,
                        method: "DELETE",
                        failOnStatusCode: false,
                        headers: {
                            "Authorization": "Basic VGVzdFVzZXIyODU6YydySj9bRVsqdTUq"
                        },
                    }).then((re) => {
                        expect(re.status).to.eq(200);
                    });
            });
        }
    });
};

export default { getEmployeeList, addEmployee, getEmployee, updateEmployee, deleteAllEmployeees, deleteEmployee};