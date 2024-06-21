import { gql } from 'graphql-tag';

export const CourseFragment = gql`
  fragment Course on Course {
    _id
    code
    title
    level
    levelId
    description
    images {
      uri
      name
      type
    }
  }
`;
