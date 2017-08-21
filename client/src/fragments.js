import { gql } from 'react-apollo';

export const userFragment = gql`
    fragment UserFields on User {
        id
        username
        full_name
        avatar_url
    }
`;
