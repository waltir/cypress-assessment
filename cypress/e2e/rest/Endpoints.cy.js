/// <reference types="cypress" />

describe("Cypress API endpoint verifications", function () {

    beforeEach(function () {
        cy.viewport(1440, 1000);
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        });
    })
    after(() => {
        cy.end();
    })

    it('Fetch a single post', () => {
        cy.request("https://jsonplaceholder.typicode.com/posts/1").as('singlePost');
        cy.get('@singlePost').then(response => {
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq("OK");
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.id).to.eq(1);
            expect(response.body.userId).to.eq(1);
            expect(response.body.title.length).to.be.greaterThan(1);
            expect(response.body.body.length).to.be.greaterThan(1);
        })
    });

    it('Fetch all posts', () => {
        cy.request("https://jsonplaceholder.typicode.com/posts").as('allPosts');
        cy.get('@allPosts').then(response => {
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq("OK");
            expect(response.isOkStatusCode).to.eq(true);
            expect(response.body.length).to.eq(100);
            expect(response.body[0].id).to.be.greaterThan(0);
            expect(response.body[0].userId).to.be.greaterThan(0);
            expect(response.body[0].title.length).to.be.greaterThan(1);
            expect(response.body[0].body.length).to.be.greaterThan(1);
        })
    });

    it('Creating a new post', () => {
        cy.request({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "POST",
            failOnStatusCode: false,
            followRedirect: true,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1
            })
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('title', 'foo');
            expect(response.body).to.have.property('body', 'bar');
            expect(response.body).to.have.property('userId', 1);
            expect(response.body).to.have.property('id', 101);
        });
    });

    it('Updating an existing post', () => {
        cy.request({
            url: "https://jsonplaceholder.typicode.com/posts/50",
            method: "PUT",
            failOnStatusCode: false,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                title: 'tester',
                body: 'testing',
                userId: 1
            })
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('title', 'tester');
            expect(response.body).to.have.property('body', 'testing');
            expect(response.body).to.have.property('userId', 1);
            expect(response.body).to.have.property('id', 50);
        });
    });

    it('Delete an existing post', () => {
        cy.request({
            url: "https://jsonplaceholder.typicode.com/posts/50",
            method: "DELETE",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.request("https://jsonplaceholder.typicode.com/posts/50").as('singlePost');
            cy.get('@singlePost').then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.title).to.not.eq("tester");
                expect(response.body.body).to.not.eq("testing");
                expect(response.body.userId).to.not.eq(1);
            })
        });
    });

});