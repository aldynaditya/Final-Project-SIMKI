import {
    CREATE_CPPT_ENTRY_REQUEST,
    CREATE_CPPT_ENTRY_SUCCESS,
    CREATE_CPPT_ENTRY_FAILURE,
} from './constants';
import { patchData } from '../../../utils/fetch';


export const createCPPTEntry = (episodeId, formData) => async (dispatch) => {
    dispatch({ type: CREATE_CPPT_ENTRY_REQUEST });

    try {
        const response = await patchData(`/cms/emr/${episodeId}/doctor/follow-up`, formData);
        dispatch({
            type: CREATE_CPPT_ENTRY_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CPPT_ENTRY_FAILURE,
            payload: error.message,
        });
    }
};
