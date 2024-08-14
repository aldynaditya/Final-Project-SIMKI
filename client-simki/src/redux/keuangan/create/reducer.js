import { CREATE_LAPORAN_REQUEST, CREATE_LAPORAN_SUCCESS, CREATE_LAPORAN_FAILURE } from './constants';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function laporanReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_LAPORAN_REQUEST:
            return { ...state, loading: true };
        case CREATE_LAPORAN_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case CREATE_LAPORAN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
