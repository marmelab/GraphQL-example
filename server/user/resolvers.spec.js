import { User, Query } from './resolvers';

describe('Query', () => {
    describe('User', () => {
        it('returns user by id', () => {
            const context = {
                datastore: {
                    users: [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }],
                },
            };
            return Query.User(null, { id: 2 }, context).then(result => {
                expect(result).toEqual({ id: 2, name: 'jane' });
            });
        });
    });
});

describe('User', () => {
    describe('full_name', () => {
        it('concatenates first and last name', () => {
            const user = { first_name: 'John', last_name: 'Doe' };
            User.full_name(user).then(result =>
                expect(result).toEqual('John Doe'),
            );
        });
    });
});
