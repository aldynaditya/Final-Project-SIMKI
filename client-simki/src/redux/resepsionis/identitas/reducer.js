import { GET_IDENTITAS_PASIEN_SUCCESS, GET_IDENTITAS_PASIEN_FAILURE } from './constants';

const initialState = {
    data: [],
    loading: true,
    error: null,
};

const identitasReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IDENTITAS_PASIEN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case GET_IDENTITAS_PASIEN_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default identitasReducer;
