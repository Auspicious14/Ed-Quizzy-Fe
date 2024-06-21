import { AuthFragment, UserFragment } from './fragment';
import { gql } from '@apollo/client/core';

export const SIGN_IN = gql`
  mutation login($payload: Login!) {
    login(payload: $payload) {
      ...Auth
    }
  }
  ${AuthFragment}
`;

export const SIGN_UP = gql`
  mutation createUser($createUser: CreateUserInput!) {
    createUser(createUser: $createUser) {
      ...User
    }
  }

  ${UserFragment}
`;
