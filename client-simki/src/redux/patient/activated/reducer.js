import { 
    ACTIVATE_ACCOUNT_REQUEST, 
    ACTIVATE_ACCOUNT_SUCCESS, 
    ACTIVATE_ACCOUNT_FAILURE 
} from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const activatedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_ACCOUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIVATE_ACCOUNT_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case ACTIVATE_ACCOUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };
    default:
        return state;
    }
};

export default activatedReducer;
