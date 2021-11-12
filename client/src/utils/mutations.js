import { gql } from `@apollo/client`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        log(email: $email, password: $password) {
            token 
            user {
                _id 
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $passowrd) {
            token
            user {
                _id 
                username
            }
        }
    }
`;