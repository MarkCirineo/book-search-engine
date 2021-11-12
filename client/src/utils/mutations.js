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

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: ID!, $image: String!, $link: String!) {
        saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
            _id 
            username
            email
            bookcount 
            savedBooks {
                bookId 
                authors 
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook: async ($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookcount
            savedBooks {
                bookeId
                authors
                description
                title
                image
                link
            }
        }
    }
`;