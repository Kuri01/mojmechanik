import { useCallback, useState } from "react";

/**
 * Hak do obsługi zapytań API.
 *
 * @function
 * @param {function} fn - Funkcja wykonująca zapytanie API.
 * @returns {Object} Obiekt zawierający dane, stan ładowania, błąd i funkcję do pobierania danych.
 */

const useApi = (fn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Funkcja do pobierania danych z API.
   *
   * @async
   * @function
   * @param {Object} options - Opcje przekazane do funkcji zapytania API.
   * @returns {Promise<Object>} Obietnica zwracająca odpowiedź z API.
   * @throws {Error} Zwraca błąd, jeśli zapytanie się nie powiodło.
   */

  const fetchData = useCallback(
    async (options) => {
      try {
        setLoading(true);
        const response = await fn(options);
        setData(response);
        return response;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { data, loading, error, fetchData };
};

export default useApi;
