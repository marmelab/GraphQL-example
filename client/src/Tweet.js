import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import CachedIcon from 'material-ui-icons/Cached';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import ChatBubbleOutlineIcon from 'material-ui-icons/ChatBubbleOutline';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Link } from 'react-router-dom';

const styleSheet = createStyleSheet(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        marginRight: '0.5rem',
    },
    fullName: {
        color: theme.palette.text.secondary,
        fontWeight: 'bold',
        marginRight: '0.5rem',
    },
    userName: {
        color: theme.palette.text.secondary,
        marginRight: '0.5rem',
    },
    separator: {
        color: theme.palette.text.secondary,
        marginRight: '0.5rem',
    },
    date: {
        color: theme.palette.text.secondary,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    icon: {
        marginRight: '0.5rem',
    },
    stats: {
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
}));

const Tweet = ({ classes, tweet, showDetailsLink }) => (
    <Card>
        <CardContent className={classes.container}>
            <Avatar className={classes.avatar} alt={tweet.Author.full_name} src={tweet.Author.avatar_url} />
            <div>
                <span className={classes.fullName}>
                    {tweet.Author.full_name}
                </span>
                <span className={classes.userName}>
                    {tweet.Author.username}
                </span>
                <span className={classes.separator}>-</span>
                <span className={classes.date}>
                    {distanceInWordsToNow(tweet.date)}
                </span>
                <Typography component="p">
                    {tweet.body}
                </Typography>
                {showDetailsLink && <Link to={`/${tweet.id}`}>Details</Link>}
                <div className={classes.buttons}>
                    <div className={classes.stats}>
                        <ChatBubbleOutlineIcon className={classes.icon} /> 
                        {tweet.Stats.responses}
                    </div>
                    <div className={classes.stats}>
                        <CachedIcon className={classes.icon} />
                        {tweet.Stats.retweets}
                    </div>
                    <div className={classes.stats}>
                        <FavoriteBorderIcon className={classes.icon} />
                        {tweet.Stats.likes}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

Tweet.propTypes = {
    classes: PropTypes.object.isRequired,
    showDetailsLink: PropTypes.bool.isRequired,
    tweet: PropTypes.shape({
        id: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        Author: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            full_name: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
        }).isRequired,
        Stats: PropTypes.shape({
            views: PropTypes.number.isRequired,
            likes: PropTypes.number.isRequired,
            retweets: PropTypes.number.isRequired,
            responses: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default withStyles(styleSheet)(Tweet);
