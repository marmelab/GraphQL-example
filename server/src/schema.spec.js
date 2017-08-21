import { graphql } from 'graphql';
import schema from './schema';

it('responds to the Tweets query', () => {
    // stubs
    const datastore = {
        tweets: [
            { id: 1, body: 'hello', author_id: 10 },
            { id: 2, body: 'world', author_id: 11 },
        ],
        users: [
            {
                id: 10,
                username: 'johndoe',
                first_name: 'John',
                last_name: 'Doe',
                avatar_url: 'acme.com/avatars/10',
            },
            {
                id: 11,
                username: 'janedoe',
                first_name: 'Jane',
                last_name: 'Doe',
                avatar_url: 'acme.com/avatars/11',
            },
        ],
    };
    const context = {
        datastore,
        dataloaders: {
            userById: {
                load: id =>
                    Promise.resolve(
                        datastore.users.find(user => user.id == id),
                    ),
            },
        },
    };
    // now onto the test itself
    const query = '{ Tweets { id body Author { username } }}';
    return graphql(schema, query, null, context).then(results => {
        expect(results).toEqual({
            data: {
                Tweets: [
                    { id: '1', body: 'hello', Author: { username: 'johndoe' } },
                    { id: '2', body: 'world', Author: { username: 'janedoe' } },
                ],
            },
        });
    });
});
