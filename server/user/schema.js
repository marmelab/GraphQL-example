import Base from '../base';

const User = `
extend type Query {
    User: User
}
type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: Url
}
`;

export default () => [User, Base];
