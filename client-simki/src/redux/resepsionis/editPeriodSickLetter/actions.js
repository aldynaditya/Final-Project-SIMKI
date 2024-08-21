import {
    EDIT_PERIOD_REQUEST,
    EDIT_PERIOD_SUCCESS,
    EDIT_PERIOD_FAILURE,
} from './constants';
import { patchData } from '../../../utils/fetch';

export const editPeriode = (id, data) => async (dispatch) => {
    dispatch({ type: EDIT_PERIOD_REQUEST });

    try {
        await patchData(`/cms/suratsakit/${id}`, data);
        dispatch({
            type: EDIT_PERIOD_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: EDIT_PERIOD_FAILURE,
            payload: error.message,
        });
    }
};
