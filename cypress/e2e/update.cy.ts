import {addTestQuizWithTwoLevels, deleteLevel, deleteQuiz, login, logOut, setAnswer, setQuestion} from "../support/e2e";
import * as adminSelectors from "../fixtures/example.json";

before(() => {
    cy.visit('localhost:4200/');
    login("mia.zima.4@gmail.com", "1234a1234$");
    cy.wait(5000);
});

beforeEach(() => {
    cy.visit('localhost:4200/admin');
    addTestQuizWithTwoLevels("UpdateTest", "image");
});

describe('Update existing quiz', () => {
    it('Delete one level from existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.wait(2000);
        deleteLevel(1);
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.tabDeleteIcon).should('have.length', 1);
    });

    it('Add new level to existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.tabAddIcon).click();
        setQuestion(0, "Prvo pitanje");
        setAnswer(0, 0, "Prvi odgovor", true);
        setAnswer(0, 1, "Drugi odgovor", false);
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.tabDeleteIcon).should('have.length', 3);
    });
    it('Add new question to existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.wait(3000);
        cy.get(adminSelectors.questionsInput).find(adminSelectors.addQuestionButton).click();
        setQuestion(2, "Trece pitanje");
        setAnswer(2, 0, "Prvi odgovor", true);
        setAnswer(2, 1, "Drugi odgovor", false);
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.wait(3000);
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).should('have.length', 3)
    });
    it('Remove question from existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.questionDeleteIcon).last().click();
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).should('have.length', 1);
    });

    it('Add new answer to question for existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).last().find(adminSelectors.addAnswerButton).click();
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).last().find(adminSelectors.answersGroup).eq(2).type("Treci odgovor")
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).last().find(adminSelectors.answersGroup).should('have.length', 3);
    });

    it('Remove answer from question from existing quiz', () => {
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.answerDeleteIcon).last().click();
        cy.contains('Save quiz').click();
        cy.get(adminSelectors.availableQuizzes).find(adminSelectors.cardTitle).contains('UpdateTest').click();
        cy.contains('edit').click();
        cy.get(adminSelectors.questionsInput).find(adminSelectors.questionGroups).eq(0).find(adminSelectors.answersGroup).should('have.length', 2);
    });
});

afterEach(() => {
    deleteQuiz();
});

after(() => {
    logOut();
});

