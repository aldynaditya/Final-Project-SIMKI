import {
    CREATE_CPPT_ENTRY_REQUEST,
    CREATE_CPPT_ENTRY_SUCCESS,
    CREATE_CPPT_ENTRY_FAILURE,
} from './constants';

const initialState = {
    cppt: null,
    error: null,
    loading: false
};

const createcpptentryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CPPT_ENTRY_REQUEST:
            return { ...state, loading: true };
        case CREATE_CPPT_ENTRY_SUCCESS:
            return { ...state, loading: false, cppt: action.payload, error: null};
        case CREATE_CPPT_ENTRY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createcpptentryReducer;
