import {
    CREATE_ACTION_REQUEST,
    CREATE_ACTION_SUCCESS,
    CREATE_ACTION_FAILURE,
} from './constants';

const initialState = {
    act: null,
    erroract: null,
    loadingact: false
};

const updateactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ACTION_REQUEST:
            return { ...state, loading: true };
        case CREATE_ACTION_SUCCESS:
            return { ...state, loading: false, act: action.payload, error: null};
        case CREATE_ACTION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default updateactionReducer;
