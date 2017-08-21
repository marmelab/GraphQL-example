import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { compose, gql, graphql } from 'react-apollo';
import { userFragment } from './fragments';

const styleSheet = createStyleSheet(theme => ({
    title: {
        margin: '0 auto',
    }
}));

const Header = ({ classes, data: { currentUser } }) => (
    <AppBar position="static" color="default">
        <Toolbar>
            {currentUser &&
                <Avatar alt={currentUser.full_name} src={currentUser.avatar_url} />
            }
            <Typography type="title" color="inherit" className={classes.title}>
                Home
            </Typography>
            <IconButton>
                <ModeEditIcon /> 
            </IconButton>
        </Toolbar>
    </AppBar>
);

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        full_name: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
    }),
};

const query = gql`
    query headerQuery {
        currentUser: User {
            ...UserFields
        }
    }

    ${userFragment}
`

export default compose(
    graphql(query),
    withStyles(styleSheet),
)(Header);
