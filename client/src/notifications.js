import uuid from 'uuid';
export const NOTIFY = 'NOTIFY';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const notify = message => ({
    type: NOTIFY,
    payload: message,
});

export const removeNotification = id => ({
    type: REMOVE_NOTIFICATION,
    payload: id,
});

const initialState = [];

export default (previousState = initialState, action) => {
    if (action.type === NOTIFY) {
        return [
            ...previousState,
            { id: uuid.v1(), message: action.payload },
        ];
    }

    if (action.type === REMOVE_NOTIFICATION) {
        return [
            ...previousState.slice(0, previousState.findIndex(n => n.id === action.payload)),
            ...previousState.slice(previousState.findIndex(n => n.id === action.payload) + 1),
        ]
    }

    return previousState;
}
