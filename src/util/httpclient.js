import axios from 'axios';
import qs from 'querystring';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_DELETE = 'delete';

function requestAPI(method, url, _headers = {}, _dataBody, isJSON = false, timeout=90) {
    const headers = _headers;
    let dataBody = _dataBody;

    if (isJSON) {
        headers['Content-Type'] = 'application/json';
    }

    if (isJSON && (method === METHOD_POST || method === METHOD_PUT)) {
        headers['Content-Type'] = 'application/json';
    } else if (method === METHOD_POST || method === METHOD_PUT) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        dataBody = qs.stringify(dataBody);
    }
    const config = {
        url,
        headers,
        method,
        validateStatus: () => true,
        timeout: timeout * 1000,
    };

    if (method === METHOD_GET) {
        config.params = dataBody;
        config.paramsSerializer=params => {
            return qs.stringify(params)
        }
    } else {
        config.data = dataBody;
    }

    return axios(config);
}

const HttpClient = {
    get(url, dataBody, isJSON = false, headers = {}) {
        return requestAPI(METHOD_GET, url, headers, dataBody, isJSON);
    },

    post(url, dataBody, isJSON = false, headers = {}) {
        return requestAPI(METHOD_POST, url, headers, dataBody, isJSON);
    },

    put(url, dataBody, isJSON = false, headers = {}) {
        return requestAPI(METHOD_PUT, url, headers, dataBody, isJSON);
    },

    delete(url, dataBody, isJSON = false, headers = {}) {
        return requestAPI(METHOD_DELETE, url, headers, dataBody, isJSON);
    },
};

export default HttpClient;
