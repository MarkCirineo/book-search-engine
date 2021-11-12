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