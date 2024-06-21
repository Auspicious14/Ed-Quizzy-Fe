import gql from 'graphql-tag';

export const QuizFragment = gql`
  fragment Quiz on Quiz {
    _id
    courseId
    name
    description
    timeLimit
    level
    score
    status
    images {
      uri
      name
      type
    }
  }
`;
