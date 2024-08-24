import { 
    GET_NOTIF_REQUEST, 
    GET_NOTIF_SUCCESS, 
    GET_NOTIF_FAILURE 
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const notifReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIF_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_NOTIF_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case GET_NOTIF_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default notifReducer;
