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
            avatar_url: 'https://material-ui-1dab0.firebaseapp.com/build/fa158bc2d4774f4ae14cbbec7730af23.jpg',
        },
        {
            id: 11,
            username: 'janedoe',
            first_name: 'Jane',
            last_name: 'Doe',
            avatar_url: 'https://material-ui-1dab0.firebaseapp.com/build/b16427bb030d63fd8e52ea84defda1d1.jpg',
        },
    ],
    stats: [
        { tweet_id: 1, views: 123, likes: 4, retweets: 1, responses: 0 },
        { tweet_id: 2, views: 567, likes: 45, retweets: 63, responses: 6 },
    ],
};
