import {
    CREATE_NEW_ENTRY_REQUEST,
    CREATE_NEW_ENTRY_SUCCESS,
    CREATE_NEW_ENTRY_FAILURE,
} from './constants';
import { postData } from '../../../utils/fetch';


export const createNewEntry = (id, formData) => async (dispatch) => {
    dispatch({ type: CREATE_NEW_ENTRY_REQUEST });

    try {
        const response = await postData(`/cms/emr/${id}/doctor/new`, formData);
        dispatch({
            type: CREATE_NEW_ENTRY_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_NEW_ENTRY_FAILURE,
            payload: error.message,
        });
    }
};
