// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import * as adminSelectors from "../fixtures/example.json";

export function login(email: string, password: string){
    cy.get('#mat-input-0').type(email);
    cy.get('#mat-input-1').type(password);
    cy.get('button').should('have.class', 'login__form__submit').get('span').contains('Login').click();
}
export function addTestQuizWithOneLevel(name: string, image: string) {
    cy.get('input').first().type(name);
    cy.get('input[ng-reflect-name=thumbnail]').type(image);
    cy.get(adminSelectors.questionsInput).find(adminSelectors.addQuestionButton).click()
    setQuestion(0, "Prvo pitanje");
    setAnswer(0, 0, "Prvi odgovor", true);
    setAnswer(0, 1, "Drugi odgovor", false);
    cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(0).find(adminSelectors.addAnswerButton).click()
    setAnswer(0,2,"Treci odgovor", false);
    setQuestion(1, "Drugo pitanje");
    setAnswer(1,0,"Prvi odgovor", false);
    setAnswer(1, 1, "Drugi odgovor", true);
    deleteLevel(2);
    deleteLevel(1);
    cy.contains('Save quiz').click();
}
export function deleteLevel(index: number){
    cy.get('.quiz-form__wrapper__tabs__tab__label__delete__icon').eq(index).click();
    cy.get('.quiz-dialog__actions__submit').click();
}

export function deleteQuiz(){
    cy.contains(' Delete quiz ').click();
    cy.get('.quiz-dialog__actions__submit').click();
}

export function logOut() {
    cy.get('.header__menu__button').click();
    cy.wait(2000);
    cy.contains('Log out').click();
}
export function addTestQuizWithTwoLevels(name: string, image: string){
    cy.get('input').first().type(name);
    cy.get('input[ng-reflect-name=thumbnail]').type(image);
    cy.get(adminSelectors.questionsInput).find(adminSelectors.addQuestionButton).click()
    setQuestion(0, "Prvo pitanje");
    setAnswer(0, 0, "Prvi odgovor", true);
    setAnswer(0, 1, "Drugi odgovor", false);
    cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(0).find(adminSelectors.addAnswerButton).click()
    setAnswer(0,2,"Treci odgovor", false);
    setQuestion(1, "Drugo pitanje");
    setAnswer(1,0,"Prvi odgovor", false);
    setAnswer(1, 1, "Drugi odgovor", true);
    deleteLevel(2);
    cy.contains('Medium').click();
    setQuestion(0, "Prvo pitanje");
    setAnswer(0, 0, "Prvi odgovor", true);
    setAnswer(0, 1, "Drugi odgovor", false);
    cy.contains('Save quiz').click();
}

export function setQuestion(index: number, question: string) {
    cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(index).find(adminSelectors.questionInput).clear().type(question);
}

export function setAnswer(questionIndex: number, answerIndex: number, answer: string, correct: boolean){
    cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(questionIndex).find(adminSelectors.answersGroup).eq(answerIndex).clear().type(answer);
    if (correct){
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(questionIndex).find("div[ng-reflect-name=questionAnswers]").find('mat-checkbox').eq(answerIndex).click();
    }
};
// Alternatively you can use CommonJS syntax:
// require('./commands')