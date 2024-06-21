import { gql } from '@apollo/client/core';
import { QuestionFragment } from './fragment';

export const FIND_QUESTION_BY_QUIZ = gql`
  query getQuestionByQuiz($quizId: String!) {
    getQuestionByQuiz(quizId: $quizId) {
      ...Question
    }
  }
  ${QuestionFragment}
`;

export const GENERATE_QUESTION = gql`
  mutation generateQuestions($payload: CreateQuestionInput!) {
    generateQuestions(payload: $payload) {
      ...Question
    }
  }
  ${QuestionFragment}
`;
