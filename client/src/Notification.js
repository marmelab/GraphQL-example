import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class Notification extends Component {
    handleClose = () => {
        this.props.onClose(this.props.notification.id);
    }

    render() {
        const { notification: { id, message } } = this.props;

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={6e3}
                message={<span>{message}</span>}
                onClick={this.handleClose}
                onRequestClose={this.handleClose}
                open
            />
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.shape({
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Notification;
