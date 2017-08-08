import DataLoader from 'dataloader';

export const getStatsForTweet = datastore => ids =>
    Promise.resolve(
        ids.map(id => datastore.stats.find(stat => stat.tweet_id == id)),
    );
export const dataloaders = datastore => ({
    statForTweet: new DataLoader(getStatsForTweet(datastore)),
});
