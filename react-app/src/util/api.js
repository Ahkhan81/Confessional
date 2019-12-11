// const BASE_URI = 'https://cd51c6cf-bd94-4f64-aa59-abace3266f96.mock.pstmn.io';
// const BASE_URI = 'https://localhost:44309/api';
const BASE_URI = 'http://localhost:8000/api';

export async function sendGet(endpoint, data, onSent, onError, onSuccess, token) {
    send(endpoint, data, 'GET', onSent, onError, onSuccess, token);
}

export async function sendPost(endpoint, data, onSent, onError, onSuccess, token) {
    send(endpoint, data, 'POST', onSent, onError, onSuccess, token);
}

export async function sendDelete(endpoint, data, onSent, onError, onSuccess, token) {
    send(endpoint, data, 'DELETE', onSent, onError, onSuccess, token);
}

async function send(
    endpoint,
    data,
    methodType,
    onSent,
    onError,
    onSuccess,
    token)
{
    try {
        let uri = `${BASE_URI}/${endpoint}/`;
        if (methodType === 'GET' && data !== null && Object.keys(data).length > 0) {
            const encode = new URLSearchParams(data);
            uri = `${uri}?${encode}`;
        }

        let options = {
            method: methodType,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
        };
        if (token !== undefined && token !== null) {
            options.headers.Authorization = `Bearer ${token}`;
        }

        if (methodType !== 'GET') {
            if (data !== null && Object.keys(data).length > 0) {
                options.body = JSON.stringify(data);
            }
        }

        let response = await fetch(uri, options);
        if (onSent !== null) {
            onSent();
        }
        const json = await response.json();
        if (response.status === 200) {
            onSuccess(json);
        } else {
            onError(json);
        }
    } catch(error) {
        if (onError !== null) {
            onError(error);
        }
    }
}
