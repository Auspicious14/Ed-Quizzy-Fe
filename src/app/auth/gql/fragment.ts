import gql from 'graphql-tag';

export const AuthFragment = gql`
  fragment Auth on Auth {
    userId
    firstName
    lastName
    email
    token
  }
`;
export const UserFragment = gql`
  fragment User on User {
    _id
    firstName
    lastName
    email
    phoneNumber
  }
`;
