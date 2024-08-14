import { 
    GET_EPISODE_REQUEST, 
    GET_EPISODE_SUCCESS, 
    GET_EPISODE_FAILURE 
} from './constants';
import { getData } from '../../../utils/fetch';

export const fetchAllEpisode = (id) => async (dispatch) => {
    dispatch({ type: GET_EPISODE_REQUEST });

    try {
        const response = await getData(`/cms/medical-records/${id}`);
        dispatch({ type: GET_EPISODE_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: GET_EPISODE_FAILURE, payload: error.message });
    }
};
