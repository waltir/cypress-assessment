import example from '../../fixtures/example.json';
import "cypress-real-events/support";

class Products {

    components = {
        vehicles: {
            selectors: {
                title: "h1",
                performanceData: 'section[id*="tesla-hero"] .tcl-badges',
                chatButton: {
                    selector: "button[aria-label='Chat button']",
                    svgPath: "M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v9A2.5 2.5 0 0 0 4.5 18H7v2.07a.928.928 0 0 0 1.507.725l3.22-2.576A1 1 0 0 1 12.35 18h7.15a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 19.5 4zm1 11.5a1 1 0 0 1-1 1h-7.15a2.5 2.5 0 0 0-1.56.548L8.5 18.879V17a.5.5 0 0 0-.5-.5H4.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h15c.551 0 1 .449 1 1v9zM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                },
            },
            allModels: [{
                models: {
                    slug: "/models",
                    tabs: {
                        // no tabs on the model S product page
                    },
                    performanceData: {
                        range: "396 mi",
                        zeroto60: "1.99 s",
                        topSpeed: "200 mph",
                        peakPower: "1,020 hp",
                        button: {
                            title: "Order Now",
                            text: "Order Now",
                            href: "/models/design"
                        }
                    }
                },
                modelx: {
                    slug: "/modelx",
                    tabs: {
                        // no tabs on the model X product page
                    },
                    performanceData: {
                        range: "333 mi",
                        zeroto60: "2.5 s",
                        quarterMile: "9.9 s",
                        peakPower: "1,020 hp",
                        button: {
                            title: "Order Now",
                            text: "Order Now",
                            href: "/modelx/design"
                        }
                    }
                },
                modely: {
                    slug: "/modely",
                    tabs: {
                        // no tabs on the model Y product page
                    },
                    performanceData: {
                        range: "330 mi",
                        dualMotor: "AWD",
                        cargoSpace: "76 cu ft",
                        button: {
                            title: "Order Now",
                            text: "Order Now",
                            href: "/modely/design"
                        }
                    }
                },
                model3: {
                    slug: "/model3",
                    tabs: {
                        0: {
                            title: "Model 3"
                        },
                        1: {
                            title: "Safety"
                        },
                        2: {
                            title: "Performance"
                        },
                        3: {
                            title: "Range"
                        },
                        4: {
                            title: "Autopilot"
                        },
                        5: {
                            title: "Interior"
                        },
                        6: {
                            title: "Specs"
                        },
                        7: {
                            title: "Order"
                        }
                    },
                    performanceData: {
                        range: "358 mi",
                        // zeroto60: "3.1",
                        motor: "AWD",
                        button: {
                            title: "Order Now",
                            text: "Order Now",
                            href: "/model3/design"
                        }
                    }
                },
            }],
        }
    }

    // NAVIGATE TO THE CORRECT SLUG PROVIDED IN THE TEST
    navigate(slug) {
        return cy.visit(slug, {failOnStatusCode: false});
    }

    // RETURN THE EXPECTED URL TO THE TEST WHEN REQUIRED
    getSource(slug) {
        return example.baseUrl + slug.split("/")[1];
    }

    // VERIFY THE ANCHOR LINKS IN THE MAIN SLIDE ARE PRESENT AND CLICKING THEM
    // SCROLLS THE USER TO THE CORRECT SLIDE FURTHER DOWN ON THE SCREEN
    iterateOverTabsAndSlides(model) {
        for (const [key, value] of Object.entries(this.components.vehicles.allModels[0][model].tabs)) {
            it(`Anchor link ${key} with value of ${value.title} is present in the main slide and scrolls correct slide`, () => {
                cy.get(`li[data-tabindex="${key}"]`).realHover().then(()=>{
                    cy.contains(`li span[data-button-text="${value.title}"]`, value.title);
                    cy.get(`li[data-tabindex="${key}"]`).click({force:true}).then(()=>{
                        cy.wait(3000);
                        cy.get(`section[data-title="${value.title}"]`, {timeout: 6000}).should('be.visible');
                        cy.get('main[role="main"]').scrollTo('top'); // scroll footer items into view
                        cy.wait(3000);
                    })
                })
            });
        }
    }

    // CHECK THE VEHICLES PERFORMANCE DATA METRICS DISPLAYED IN THE FIRST SLIDE ARE CORRECT
    checkPerformanceData(model) {
        for (const [key, value] of Object.entries(this.components.vehicles.allModels[0][model].performanceData)) {
            if (key !== "button") {
                it(`${key} value of ${value} is present on the page`, () => {
                    cy.get(this.components.vehicles.selectors.performanceData, {timeout: 6000}).should('be.visible').contains(value);
                })
            } else {
                it(`${key} value of ${value.title} is present on the page`, () => {
                    cy.get(this.components.vehicles.selectors.performanceData, {timeout: 6000}).should('be.visible').contains(value.title);
                    cy.get(this.components.vehicles.selectors.performanceData + " a", {timeout: 6000}).should('have.attr', 'href', value.href);
                    cy.get(this.components.vehicles.selectors.performanceData + " a", {timeout: 6000}).should('have.attr', 'title', value.title);
                })
            }
        };
    };


}

export default Products