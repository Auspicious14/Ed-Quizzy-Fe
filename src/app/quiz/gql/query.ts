import { gql } from '@apollo/client/core';
import { QuizFragment } from './fragment';

export const FIND_QUIZ_BY_COURSE = gql`
  query getQuizByCourse($courseId: String!) {
    getQuizByCourse(courseId: $courseId) {
      ...Quiz
    }
  }
  ${QuizFragment}
`;

export const QUIZ_PAGE = gql`
  query getQuizes {
    getQuizes {
      ...Quiz
    }
  }
  ${QuizFragment}
`;

export const FIND_QUIZ_BY_ID = gql`
  query getQuizById($id: String!) {
    getQuizById(id: $id) {
      ...Quiz
    }
  }

  ${QuizFragment}
`;

export const GENERATE_QUIZ = gql`
  mutation generateQuiz($courseTitle: String!, $courseId: string!) {
    generateQuiz(courseTitle: $courseTitle, courseId: $courseId) {
      ...Quiz
    }
  }
  ${QuizFragment}
`;
export const UPDATE_QUIZ = gql`
  mutation updateQuiz($id: String!, $payload: UpdateQuizInput!) {
    updateQuiz(id: $id, payload: $payload) {
      ...Quiz
    }
  }
  ${QuizFragment}
`;
