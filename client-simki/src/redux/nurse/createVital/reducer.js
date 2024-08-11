import {
    CREATE_VITAL_REQUEST,
    CREATE_VITAL_SUCCESS,
    CREATE_VITAL_FAILURE,
} from './constants';

const initialState = {
    vital: null,
    error: null,
    loading: false
};

const createvitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_VITAL_REQUEST:
            return { ...state, loading: true, vital: action.payload };
        case CREATE_VITAL_SUCCESS:
            return { ...state, loading: false, vital: action.payload, error: null};
        case CREATE_VITAL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return initialState;
    }
};

export default createvitalReducer;
