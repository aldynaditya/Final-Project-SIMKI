import { 
    ADD_USER_REQUEST, 
    ADD_USER_SUCCESS, 
    ADD_USER_FAILURE 
} from './constants';
import { postData } from '../../../utils/fetch';

export const addUserRequest = () => ({
    type: ADD_USER_REQUEST
});

export const addUserSuccess = (data) => ({
    type: ADD_USER_SUCCESS,
    payload: data
});

export const addUserFailure = (error) => ({
    type: ADD_USER_FAILURE,
    payload: error
});

export const addUser = (userData) => async (dispatch) => {
    dispatch(addUserRequest());
    try {
        const response = await postData('/cms/userklinik', userData);
        dispatch(addUserSuccess(response.data));
    } catch (err) {
        dispatch(addUserFailure(err.message));
    }
};
