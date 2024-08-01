import { 
    ADD_USER_REQUEST, 
    ADD_USER_SUCCESS, 
    ADD_USER_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null
};

const addUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return { ...state, loading: true };
        case ADD_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case ADD_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default addUserReducer;
