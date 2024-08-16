import {
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    DELETE_PATIENT_FAILURE,
} from './constants';
import { deleteData } from '../../../utils/fetch';

export const deletePasien = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PATIENT_REQUEST });

    try {
        await deleteData(`/cms/datapasien/${id}`);
        dispatch({ type: DELETE_PATIENT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_PATIENT_FAILURE, payload: error.message });
    }
};
