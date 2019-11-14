const BASE_URI = '';

export async function sendGet(endpoint, data, onSent, onError, onSuccess) {
    send(endpoint, data, 'GET', onSent, onError, onSuccess);
}

export async function sendPost(endpoint, data, onSent, onError, onSuccess) {
    send(endpoint, data, 'POST', onSent, onError, onSuccess);
}

async function send(
    endpoint,
    data,
    methodType,
    onSent,
    onError,
    onSuccess)
{
    try {
        let uri = `${BASE_URI}/${endpoint}`;
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
        if (methodType !== 'GET') {
            if (data !== null && Object.keys(data).length > 0) {
                options.body = data;
            }
        }

        let response = await fetch(uri, options);
        if (onSent !== null) {
            onSent();
        }
        const json = await response.json();
        if (onSuccess !== null) {
            if (json.success) {
                onSuccess(json);
            } else {
                onError(json.error);
            }
        }
    } catch(error) {
        if (onError !== null) {
            onError(error);
        }
    }
}
