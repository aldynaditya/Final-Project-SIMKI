import {
    CREATE_NEW_ENTRY_REQUEST,
    CREATE_NEW_ENTRY_SUCCESS,
    CREATE_NEW_ENTRY_FAILURE,
} from './constants';

const initialState = {
    entry: null,
    error: null,
    loading: false
};

const createnewentryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_ENTRY_REQUEST:
            return { ...state, loading: true };
        case CREATE_NEW_ENTRY_SUCCESS:
            return { ...state, loading: false, entry: action.payload, error: null};
        case CREATE_NEW_ENTRY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createnewentryReducer;
