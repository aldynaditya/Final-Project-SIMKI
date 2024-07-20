export default function handleError(err) {
    if (err.response && err.response.data && err.response.data.msg) {
        throw new Error(err.response.data.msg);
    } else {
        throw new Error('Internal server error');
    }
}