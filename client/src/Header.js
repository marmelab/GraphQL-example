import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styleSheet = createStyleSheet(theme => ({
    title: {
        margin: '0 auto',
    }
}));

const Header = ({ classes, currentUser }) => (
    <AppBar position="static" color="default">
        <Toolbar>
            {currentUser &&
                <Avatar alt={currentUser.full_name} src={currentUser.avatar_url} />
            }
            <Typography component="span" type="title" color="inherit" className={classes.title}>
                Home
            </Typography>
            <IconButton component={Link} to="/new">
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

export default withStyles(styleSheet)(Header);
