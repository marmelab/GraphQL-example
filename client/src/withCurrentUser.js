import { gql, graphql } from 'react-apollo';
import { userFragment } from './fragments';

const query = gql`
    query headerQuery {
        currentUser: User {
            ...UserFields
        }
    }

    ${userFragment}
`

export default graphql(query);
