import {
    GET_SCHEDULEP_REQUEST, 
    GET_SCHEDULEP_SUCCESS, 
    GET_SCHEDULEP_ERROR 
} from './constants';
import { getData } from '../../../utils/fetch';

export const getScheduleP = () => async (dispatch) => {
    dispatch({type: GET_SCHEDULEP_REQUEST});
    try {
        const response = await getData('/cms/schedule');
        dispatch({ 
            type: GET_SCHEDULEP_SUCCESS, 
            payload: response.data.data 
        });
    } catch (error) {
        dispatch({ 
            type: GET_SCHEDULEP_ERROR, 
            payload: error.message 
        });
    }
};
