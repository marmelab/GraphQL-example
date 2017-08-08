export default {
    tweets: [
        { id: 1, body: 'Lorem Ipsum', date: new Date(), author_id: 10 },
        { id: 2, body: 'Sic dolor amet', date: new Date(), author_id: 11 },
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
    stats: [
        { tweet_id: 1, views: 123, likes: 4, retweets: 1, responses: 0 },
        { tweet_id: 2, views: 567, likes: 45, retweets: 63, responses: 6 },
    ],
};
