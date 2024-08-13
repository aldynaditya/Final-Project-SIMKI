import { 
    GET_INDEX_PROSEDUR_REQUEST, 
    GET_INDEX_PROSEDUR_SUCCESS, 
    GET_INDEX_PROSEDUR_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchOrderProsedur = () => async (dispatch) => {
    dispatch({ type: GET_INDEX_PROSEDUR_REQUEST });

    try {
        const response = await getData('/cms/emr');
        dispatch({ type: GET_INDEX_PROSEDUR_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_INDEX_PROSEDUR_FAILURE, payload: error.message });
    }
};
