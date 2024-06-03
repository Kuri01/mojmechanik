import { AxiosResponse, CancelTokenSource } from "axios";
import BaseApiInstance from "./BaseApiInstance.ts";

/**
 * Klasa ApiClient zarządza komunikacją z różnymi endpointami API.
 * @class
 */
class ApiClient {
  private BaseApiInstance: BaseApiInstance;

  constructor() {
    this.BaseApiInstance = BaseApiInstance.getInstance();
  }

  loginEndpoint = "/auth/login";
  registerEndpoint = "/auth/register";
  userEndpoint = "/auth/user";
  userAddressEndpoint = `${this.userEndpoint}/address`;
  carEndpoint = "/cars";
  carBrandsEndpoint = `${this.carEndpoint}/brands`;
  carModelsEndpoint = `${this.carEndpoint}/models`;
  workshopEndpoint = "/workshops";

  /**
   * Loguje użytkownika.
   * @param {Object} values - Dane logowania użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  login = async (values: any, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.post(
      `${this.loginEndpoint}`,
      values,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Rejestruje nowego użytkownika.
   * @param {Object} values - Dane rejestracyjne użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  register = async (values: any, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.post(
      `${this.registerEndpoint}`,
      values,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Pobiera dane zalogowanego użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getUser = async (cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(
      `${this.userEndpoint}`,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Pobiera adres zalogowanego użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getUserAddress = async (cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(
      `${this.userAddressEndpoint}`,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Aktualizuje dane zalogowanego użytkownika.
   * @param {Object} values - Nowe dane użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  putUser = async (values: any, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.put(
      `${this.userEndpoint}`,
      values,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Aktualizuje adres zalogowanego użytkownika.
   * @param {Object} values - Nowy adres użytkownika.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  putUserAddress = async (values: any, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.put(
      `${this.userAddressEndpoint}`,
      values,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Pobiera listę samochodów.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getCars = async (cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(`${this.carEndpoint}`, {}, cancelToken).then(
      (res) => res.data
    );

  /**
   * Pobiera listę marek samochodów.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getCarBrands = async (cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(
      `${this.carBrandsEndpoint}`,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Pobiera listę modeli samochodów dla danej marki.
   * @param {number} brandId - ID marki samochodu.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getCarModels = async (brandId: number, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(
      `${this.carModelsEndpoint}/${brandId}`,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Dodaje nowy samochód.
   * @param {Object} values - Dane samochodu.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  postCar = async (values: any, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.post(
      `${this.carEndpoint}`,
      values,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Usuwa samochód.
   * @param {number} carId - ID samochodu do usunięcia.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  deleteCar = async (carId: number, cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.delete(
      `${this.carEndpoint}/${carId}`,
      {},
      cancelToken
    ).then((res) => res.data);

  /**
   * Pobiera listę warsztatów.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<any>} Dane zwrócone z serwera.
   */
  getWorkshops = async (cancelToken?: CancelTokenSource) =>
    await this.BaseApiInstance.get(
      `${this.workshopEndpoint}`,
      {},
      cancelToken
    ).then((res) => res.data);
}

export default ApiClient;
