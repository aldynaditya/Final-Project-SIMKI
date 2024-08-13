import { 
    GET_INDEX_SURAT_REQUEST, 
    GET_INDEX_SURAT_SUCCESS, 
    GET_INDEX_SURAT_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchOrderSurat = (id) => async (dispatch) => {
    dispatch({ type: GET_INDEX_SURAT_REQUEST });

    try {
        const response = await getData(`/cms/order-surat/${id}`);
        dispatch({ type: GET_INDEX_SURAT_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_INDEX_SURAT_FAILURE, payload: error.message });
    }
};
