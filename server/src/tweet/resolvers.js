export const Query = {
    Tweets: (_, { limit = 5, skip = 0 }, context) =>
        Promise.resolve(
            context.datastore.tweets
                .slice()
                .sort((a, b) => b.date - a.date)
                .slice(skip, skip + limit)
        ),
    Tweet: (_, { id }, context) =>
        Promise.resolve(context.datastore.tweets.find(tweet => tweet.id == id)),
};
export const Mutation = {
    createTweet: (_, { body }, context) => {
        const nextTweetId =
            context.datastore.tweets.reduce((id, tweet) => {
                return Math.max(id, tweet.id);
            }, -1) + 1;
        const newTweetStats = {
            tweet_id: nextTweetId,
            views: 0,
            likes: 0,
            retweets: 0,
            responses: 0,
        };
        const newTweet = {
            id: nextTweetId,
            date: new Date(),
            author_id: context.author_id,
            body,
            Stats: newTweetStats,
        };

        context.datastore.tweets.push(newTweet);
        context.datastore.stats.push(newTweetStats);
        return Promise.reject(`Because you can't`);
        return Promise.resolve(newTweet);
    },
};
export const Tweet = {
    Author: (tweet, _, context) =>
        context.dataloaders.userById.load(tweet.author_id),
    Stats: (tweet, _, context) =>
        context.dataloaders.statForTweet.load(tweet.id),
};
