import { 
    DAFTAR_REQUEST, 
    DAFTAR_SUCCESS, 
    DAFTAR_FAILURE
} from './constants';

const initialState = {
    loading: false,
    user: null,
    error: null,
};

const daftarReducer = (state = initialState, action) => {
    switch (action.type) {
        case DAFTAR_REQUEST:
            return { ...state, loading: true, error: null };
        case DAFTAR_SUCCESS:
            return { ...state, loading: false, user: action.payload, error: null };
        case DAFTAR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default daftarReducer;
