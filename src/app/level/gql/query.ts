import { gql } from '@apollo/client/core';

export const GET_LEVELS_PAGE = gql`
  query getLevels {
    getLevels {
      _id
      level
    }
  }
`;
