import axios, { AxiosInstance, CancelTokenSource } from "axios";
import qs from "qs";

/**
 * Dekoduje token JWT.
 * @param {string} token - Token JWT do dekodowania.
 * @returns {Object} Zdekodowane dane z tokena.
 */
export const decodeJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

/**
 * Parsuje token JWT.
 * @param {string} token - Token JWT do parsowania.
 * @returns {Object} Sparsowane dane z tokena.
 */
export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(base64);
}

/**
 * Klasa BaseApiInstance jest singletonem, który dostarcza pojedynczą instancję axios.
 * @class
 * @example
 * import BaseApiInstance from 'api/BaseApiInstance';
 * const api = BaseApiInstance.getInstance();
 * api.get('/some-endpoint').then(response => {
 *  return response.data;
 * });
 *
 * @method {BaseApiInstance} getInstance - Zwraca instancję BaseApiInstance
 * @method {AxiosResponse} get - Wykonuje żądanie GET
 * @method {AxiosResponse} post - Wykonuje żądanie POST
 * @method {AxiosResponse} put - Wykonuje żądanie PUT
 * @method {AxiosResponse} patch - Wykonuje żądanie PATCH
 * @method {AxiosResponse} delete - Wykonuje żądanie DELETE
 */

class BaseApiInstance {
  private static baseURL = `http://localhost:3001/api`;
  private static instance: BaseApiInstance;
  private axiosInstance: AxiosInstance;
  private refreshAxiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BaseApiInstance.baseURL,
      headers: { "Content-Type": "application/json" },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "comma" }),
      timeout: 10000,
    });

    this.refreshAxiosInstance = axios.create({
      baseURL: BaseApiInstance.baseURL,
      headers: { "Content-Type": "application/json" },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "comma" }),
      timeout: 10000,
    });

    this.initializeRequestInterceptor();
  }

  /**
   * Inicjalizuje interceptor żądań, który dodaje token dostępu do nagłówków.
   * @private
   */
  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(async (req) => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const { exp } = decodeJwt(accessToken);

        if (Date.now() >= exp * 1000) {
          await this.refreshToken();
        }

        req.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
      }
      return req;
    });
  }

  /**
   * Przekierowuje użytkownika na stronę logowania.
   * @private
   */
  private navigateToLogin() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("refresh_expires_in");
    window.location.href = "/";
  }

  /**
   * Odświeża token dostępu.
   * @private
   * @throws {Error} Jeśli nie uda się odświeżyć tokena.
   */
  private async refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      try {
        const response = await this.refreshAxiosInstance.post("/refresh-ph", {
          refresh_token: refreshToken,
        });

        if (response.data.access_token) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("expires_in", response.data.expires_in);
          localStorage.setItem(
            "refresh_expires_in",
            response.data.refresh_expires_in
          );
          if (response.data.refresh_token) {
            localStorage.setItem("refresh_token", response.data.refresh_token);
          }
        } else {
          this.navigateToLogin();
          throw new Error("Brak tokena dostępu zwróconego z serwera.");
        }
      } catch (error) {
        this.navigateToLogin();
        throw new Error("Błąd podczas odświeżania tokena");
      }
    }
  }

  /**
   * Zwraca instancję BaseApiInstance.
   * @returns {BaseApiInstance} Instancja BaseApiInstance.
   */
  public static getInstance(): BaseApiInstance {
    if (!BaseApiInstance.instance) {
      BaseApiInstance.instance = new BaseApiInstance();
    }
    return BaseApiInstance.instance;
  }

  /**
   * Wykonuje żądanie GET.
   * @param {string} url - URL do wysłania żądania.
   * @param {Object} [config={}] - Konfiguracja żądania.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<AxiosResponse>} Odpowiedź z serwera.
   */
  public get(url: string, config = {}, cancelToken?: CancelTokenSource) {
    return this.axiosInstance.get(url, {
      ...config,
      cancelToken: cancelToken?.token,
    });
  }

  /**
   * Wykonuje żądanie POST.
   * @param {string} url - URL do wysłania żądania.
   * @param {Object} [data={}] - Dane do wysłania.
   * @param {Object} [config={}] - Konfiguracja żądania.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<AxiosResponse>} Odpowiedź z serwera.
   */
  public post(
    url: string,
    data = {},
    config = {},
    cancelToken?: CancelTokenSource
  ) {
    return this.axiosInstance.post(url, data, {
      ...config,
      cancelToken: cancelToken?.token,
    });
  }

  /**
   * Wykonuje żądanie PUT.
   * @param {string} url - URL do wysłania żądania.
   * @param {Object} [data={}] - Dane do wysłania.
   * @param {Object} [config={}] - Konfiguracja żądania.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<AxiosResponse>} Odpowiedź z serwera.
   */
  public put(
    url: string,
    data = {},
    config = {},
    cancelToken?: CancelTokenSource
  ) {
    return this.axiosInstance.put(url, data, {
      ...config,
      cancelToken: cancelToken?.token,
    });
  }

  /**
   * Wykonuje żądanie PATCH.
   * @param {string} url - URL do wysłania żądania.
   * @param {Object} [data={}] - Dane do wysłania.
   * @param {Object} [config={}] - Konfiguracja żądania.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<AxiosResponse>} Odpowiedź z serwera.
   */
  public patch(
    url: string,
    data = {},
    config = {},
    cancelToken?: CancelTokenSource
  ) {
    return this.axiosInstance.patch(url, data, {
      ...config,
      cancelToken: cancelToken?.token,
    });
  }

  /**
   * Wykonuje żądanie DELETE.
   * @param {string} url - URL do wysłania żądania.
   * @param {Object} [config={}] - Konfiguracja żądania.
   * @param {CancelTokenSource} [cancelToken] - Token anulujący żądanie.
   * @returns {Promise<AxiosResponse>} Odpowiedź z serwera.
   */
  public delete(url: string, config = {}, cancelToken?: CancelTokenSource) {
    return this.axiosInstance.delete(url, {
      ...config,
      cancelToken: cancelToken?.token,
    });
  }
}

export default BaseApiInstance;
