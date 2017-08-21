export const Query = {
    Tweets: (_, __, context) => Promise.resolve(context.datastore.tweets),
    Tweet: (_, { id }, context) =>
        Promise.resolve(context.datastore.tweets.find(tweet => tweet.id == id)),
};
export const Mutation = {
    createTweet: (_, { body }, context) => {
        const nextTweetId =
            context.datastore.tweets.reduce((id, tweet) => {
                return Math.max(id, tweet.id);
            }, -1) + 1;
        const newTweet = {
            id: nextTweetId,
            date: new Date(),
            author_id: context.author_id,
            body,
        };
        context.datastore.tweets.push(newTweet);
        return Promise.resolve(newTweet);
    },
};
export const Tweet = {
    Author: (tweet, _, context) =>
        context.dataloaders.userById.load(tweet.author_id),
    Stats: (tweet, _, context) =>
        context.dataloaders.statForTweet.load(tweet.id),
};
