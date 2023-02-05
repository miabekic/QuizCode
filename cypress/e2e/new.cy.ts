import {
    addTestQuizWithOneLevel,
    addTestQuizWithTwoLevels,
    deleteQuiz,
    login,
    logOut,
    setQuestion
} from "../support/e2e";

import * as selectors from "../fixtures/example.json";


describe('Add quiz', () => {
    before(() => {
        cy.visit('localhost:4200/');
        login("mia.zima.4@gmail.com", "1234a1234$");
        cy.wait(5000);
    });

    it('Check if submit button is disabled after entering only few obligatory data', () => {
        cy.visit("localhost:4200/admin");
        cy.get('input').first().type('Name');
        cy.get(selectors.imageUrlInput).type("Image");
        setQuestion(0, "Prvo pitanje");
        cy.contains('Save quiz').should('be.disabled');
    });

    it('Add new quiz', () => {
        cy.visit("localhost:4200/admin");
        addTestQuizWithOneLevel("FirstTest", "image");
        cy.wait(3000);
        cy.get(selectors.availableQuizzes).find(selectors.cardTitle).should('contain.text', 'FirstTest');
    });

    it('Add quiz with two levels', () => {
        cy.visit("localhost:4200/admin");
        addTestQuizWithTwoLevels("SecondTest", "image");
        cy.get(selectors.availableQuizzes).find(selectors.cardTitle).should('contain.text', 'SecondTest');
    });

    after(() => {
        logOut();
    });
});

describe('Delete quiz', () => {
    before(() => {
        cy.visit('localhost:4200/');
        login("mia.zima.4@gmail.com", "1234a1234$");
        cy.wait(10000);
        cy.visit('localhost:4200/admin');
        addTestQuizWithOneLevel("Quiz", "Image");
    });
    it('Delete whole quiz', () => {
        cy.get(selectors.availableQuizzes).find(selectors.cardTitle).contains('Quiz').click();
        cy.contains('edit').click();
        cy.get('input').first().should('have.value', 'Quiz');
        deleteQuiz();
        cy.get(selectors.availableQuizzes).find(selectors.cardTitle).should('not.contain.text', 'Quiz');
    });

    after(() => {
       logOut();
    });
});

