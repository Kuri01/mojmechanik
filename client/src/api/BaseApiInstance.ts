import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import qs from 'qs';

export const decodeJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(
        atob(base64Url)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(base64);
}

/**
 * BaseApiInstance is a singleton class that provides a single instance of axios
 *
 * @class BaseApiInstance
 * @example
 * import BaseApiInstance from 'api/BaseApiInstance';
 *
 * const api = BaseApiInstance.getInstance();
 *
 * api.get('/some-endpoint').then(response => {
 *  return response.data;
 * });
 *
 * @method {BaseApiInstance} getInstance - Returns the instance of BaseApiInstance
 * @method {AxiosResponse} get - Makes a GET request
 * @method {AxiosResponse} post - Makes a POST request
 * @method {AxiosResponse} put - Makes a PUT request
 * @method {AxiosResponse} patch - Makes a PATCH request
 * @method {AxiosResponse} delete - Makes a DELETE request
 *
 * */

class BaseApiInstance {
    private static baseURL = `http://localhost:3001/api`;
    private static instance: BaseApiInstance;
    private axiosInstance: AxiosInstance;
    private refreshAxiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: BaseApiInstance.baseURL,
            headers: { 'Content-Type': 'application/json' },
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
            timeout: 10000,
        });

        this.refreshAxiosInstance = axios.create({
            baseURL: BaseApiInstance.baseURL,
            headers: { 'Content-Type': 'application/json' },
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
            timeout: 10000,
        });

        this.initializeRequestInterceptor();
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(async (req) => {
            const accessToken = localStorage.getItem('access_token');

            if (accessToken) {
                const { exp } = decodeJwt(accessToken);

                if (Date.now() >= exp * 1000) {
                    await this.refreshToken();
                }

                req.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            }
            return req;
        });
    }

    private navigateToLogin() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('refresh_expires_in');
        window.location.href = '/';
    }

    private async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            try {
                const response = await this.refreshAxiosInstance.post('/refresh-ph', {
                    refresh_token: refreshToken,
                });

                if (response.data.access_token) {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('expires_in', response.data.expires_in);
                    localStorage.setItem('refresh_expires_in', response.data.refresh_expires_in);
                    if (response.data.refresh_token) {
                        localStorage.setItem('refresh_token', response.data.refresh_token);
                    }
                } else {
                    this.navigateToLogin();
                    throw new Error('No access token returned from the server.');
                }
            } catch (error) {
                this.navigateToLogin();
                throw new Error('Error refreshing token');
            }
        }
    }

    public static getInstance(): BaseApiInstance {
        if (!BaseApiInstance.instance) {
            BaseApiInstance.instance = new BaseApiInstance();
        }
        return BaseApiInstance.instance;
    }

    public get(url: string, config = {}, cancelToken?: CancelTokenSource) {
        return this.axiosInstance.get(url, {
            ...config,
            cancelToken: cancelToken?.token,
        });
    }

    public post(url: string, data = {}, config = {}, cancelToken?: CancelTokenSource) {
        return this.axiosInstance.post(url, data, {
            ...config,
            cancelToken: cancelToken?.token,
        });
    }

    public put(url: string, data = {}, config = {}, cancelToken?: CancelTokenSource) {
        return this.axiosInstance.put(url, data, {
            ...config,
            cancelToken: cancelToken?.token,
        });
    }

    public patch(url: string, data = {}, config = {}, cancelToken?: CancelTokenSource) {
        return this.axiosInstance.patch(url, data, {
            ...config,
            cancelToken: cancelToken?.token,
        });
    }

    public delete(url: string, config = {}, cancelToken?: CancelTokenSource) {
        return this.axiosInstance.delete(url, {
            ...config,
            cancelToken: cancelToken?.token,
        });
    }
}

export default BaseApiInstance;
