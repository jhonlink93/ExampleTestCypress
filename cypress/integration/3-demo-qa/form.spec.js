/// <reference types="cypress" />

describe.only('can fill out form on demoqa', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('https://demoqa.com/')
    })
    it('fill form with example data', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('.card-body')
        .contains("Forms")
        .click()
        cy.contains('Practice Form')
        .invoke('attr', 'display') == 'none' ? cy.contains('Forms').click() : cy.contains('Practice Form').click()
        cy.get('.practice-form-wrapper h5')
        .should('have.text', 'Student Registration Form')
        cy.fixture('exampleDataUser').should((profile) => {
            cy.get('#firstName').type(profile.name)
            cy.get('#lastName').type(profile.lastName)
            cy.get('#userEmail').type(profile.email)
            cy.contains(profile.gender).click()
            cy.get('#userNumber').type(profile.mobile)
            cy.get('#dateOfBirthInput').type('{selectall}' + profile.dateBirth + '{enter}')
            let arrayOptions = profile.subject.split(",");
            arrayOptions.forEach(function (elemento, indice, array) {
                cy.get('#subjectsContainer')
                    .type(elemento)
                    .find('.css-26l3qy-menu')
                    .contains(elemento)
                    .click()
            });
            cy.get('.subjects-auto-complete__multi-value')
                .should('have.length', 2)
                .first()
                .should('have.text', arrayOptions[0])
            cy.contains(profile.hobbies).click()
            cy.get('#uploadPicture').attachFile('exampleDataUse.json')
            cy.get('#currentAddress').type(profile.currenAddress)
            cy.get('#state')
                .click()
                .find('.css-26l3qy-menu')
                .contains(profile.state)
                .click()
            cy.get('#city')
                .click()
                .find('.css-26l3qy-menu')
                .contains(profile.city)
                .click()
            cy.get('#submit').click()

            cy.get('#example-modal-sizes-title-lg')
                .should('have.text', 'Thanks for submitting the form')
        })
    })
})