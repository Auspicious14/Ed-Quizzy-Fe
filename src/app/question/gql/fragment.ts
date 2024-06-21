import gql from 'graphql-tag';

export const QuestionFragment = gql`
  fragment Question on Question {
    _id
    courseId
    quizId
    question
    answer
    options
    course {
      _id
      title
      level
    }
  }
`;
