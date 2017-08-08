import { Query } from './resolvers';

describe('Query', () => {
    describe('Tweets', () => {
        it('returns all tweets', () => {
            const context = {
                datastore: {
                    tweets: [
                        { id: 1, body: 'hello' },
                        { id: 2, body: 'world' },
                    ],
                },
            };
            return Query.Tweets(null, null, context).then(results => {
                expect(results).toEqual([
                    { id: 1, body: 'hello' },
                    { id: 2, body: 'world' },
                ]);
            });
        });
    });
    describe('Tweet', () => {
        it('returns undefined when not found', () => {
            const context = { datastore: { tweets: [] } };
            return Query.Tweet(null, { id: 3 }, context).then(result => {
                expect(result).toBeUndefined();
            });
        });
        it('returns tweet by id', () => {
            const context = {
                datastore: {
                    tweets: [
                        { id: 1, body: 'hello' },
                        { id: 2, body: 'world' },
                    ],
                },
            };
            return Query.Tweet(null, { id: 2 }, context).then(result => {
                expect(result).toEqual({ id: 2, body: 'world' });
            });
        });
    });
});
