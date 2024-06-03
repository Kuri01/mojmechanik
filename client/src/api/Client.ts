import { AxiosResponse, CancelTokenSource } from 'axios';
import BaseApiInstance from './BaseApiInstance.ts';

class ApiClient {
    private BaseApiInstance: BaseApiInstance;

    constructor() {
        this.BaseApiInstance = BaseApiInstance.getInstance();
    }

    loginEndpoint = '/auth/login';
    registerEndpoint = '/auth/register';
    userEndpoint = '/auth/user';
    userAddressEndpoint = `${this.userEndpoint}/address`;
    carEndpoint = '/cars';
    carBrandsEndpoint = `${this.carEndpoint}/brands`;
    carModelsEndpoint = `${this.carEndpoint}/models`;
    workshopEndpoint = '/workshops';

    login = async (values: any, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.post(`${this.loginEndpoint}`, values, {}, cancelToken).then((res) => res.data);

    register = async (values: any, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.post(`${this.registerEndpoint}`, values, {}, cancelToken).then((res) => res.data);

    getUser = async (cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.userEndpoint}`, {}, cancelToken).then((res) => res.data);

    getUserAddress = async (cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.userAddressEndpoint}`, {}, cancelToken).then((res) => res.data);

    putUser = async (values: any, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.put(`${this.userEndpoint}`, values, {}, cancelToken).then((res) => res.data);

    putUserAddress = async (values: any, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.put(`${this.userAddressEndpoint}`, values, {}, cancelToken).then((res) => res.data);

    getCars = async (cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.carEndpoint}`, {}, cancelToken).then((res) => res.data);

    getCarBrands = async (cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.carBrandsEndpoint}`, {}, cancelToken).then((res) => res.data);

    getCarModels = async (brandId: number, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.carModelsEndpoint}/${brandId}`, {}, cancelToken).then((res) => res.data);

    postCar = async (values: any, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.post(`${this.carEndpoint}`, values, {}, cancelToken).then((res) => res.data);

    deleteCar = async (carId: number, cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.delete(`${this.carEndpoint}/${carId}`, {}, cancelToken).then((res) => res.data);

    getWorkshops = async (cancelToken?: CancelTokenSource) =>
        await this.BaseApiInstance.get(`${this.workshopEndpoint}`, {}, cancelToken).then((res) => res.data);
}

export default ApiClient;
