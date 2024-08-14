import { 
    GET_NOTIFIKASI_REQUEST, 
    GET_NOTIFIKASI_SUCCESS, 
    GET_NOTIFIKASI_FAILURE,
    MARK_NOTIFICATIONS_SEEN,
    SET_NOTIFICATIONS_VIEWED
} from './constants';

const initialState = {
    data: [],
    loading: false,
    error: null,
    updatedCount: 0,
    notificationsViewed: false
};

const getnotifikasiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFIKASI_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_NOTIFIKASI_SUCCESS:
            const updatedCount = action.payload.filter(item => item.status === 'updated').length;
            return {
                ...state,
                loading: false,
                data: action.payload,
                updatedCount
            };
        case GET_NOTIFIKASI_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MARK_NOTIFICATIONS_SEEN:
            return {
                ...state,
                updatedCount: 0
            };
        case SET_NOTIFICATIONS_VIEWED:
            return {
                ...state,
                notificationsViewed: true
            };
        default:
            return state;
    }
};

export default getnotifikasiReducer;
