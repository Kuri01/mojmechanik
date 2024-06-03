import axios from "axios";
import { mockGetAllWorkshops } from "./mocks";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Rejestruje nowego użytkownika.
 *
 * @param {Object} data - Dane nowego użytkownika.
 * @returns {Promise} Obietnica zwracająca odpowiedź z serwera.
 */
export const registerUser = (data) => {
  return apiClient.post("/auth/register", data);
};

/**
 * Loguje użytkownika.
 *
 * @param {Object} data - Dane logowania użytkownika.
 * @returns {Promise} Obietnica zwracająca odpowiedź z serwera.
 */
export const loginUser = (data) => {
  return apiClient.post("/auth/login", data);
};

/**
 * Pobiera dane użytkownika.
 *
 * @returns {Promise} Obietnica zwracająca dane użytkownika.
 */
export const getUserData = () => {
  return apiClient.get("/user");
};

/**
 * Aktualizuje dane użytkownika.
 *
 * @param {Object} data - Zaktualizowane dane użytkownika.
 * @returns {Promise} Obietnica zwracająca odpowiedź z serwera.
 */
export const updateUserData = (data) => {
  return apiClient.put("/user", data);
};

/**
 * Pobiera adresy użytkownika.
 *
 * @returns {Promise} Obietnica zwracająca adresy użytkownika.
 */
export const getUserAddresses = () => {
  return apiClient.get("/user/address");
};

/**
 * Aktualizuje adres użytkownika.
 *
 * @param {Object} data - Zaktualizowane dane adresu użytkownika.
 * @returns {Promise} Obietnica zwracająca odpowiedź z serwera.
 */
export const updateUserAddress = (data) => {
  return apiClient.put("/user/address", data);
};

/**
 * Pobiera dostępne godziny warsztatu.
 *
 * @param {number} workshopId - ID warsztatu.
 * @param {string} date - Data w formacie 'yyyy-MM-dd'.
 * @returns {Promise<Object>} Obietnica zwracająca dostępne godziny warsztatu.
 */
export const getAvailableWorkshopHours = (workshopId, date) => {
  const hours = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: hours[Math.floor(Math.random() * hours.length)],
      });
    }, 500);
  });
};

/**
 * Pobiera wszystkie warsztaty.
 *
 * @returns {Promise<Object>} Obietnica zwracająca wszystkie warsztaty.
 */
export const getAllWorkshops = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockGetAllWorkshops,
      });
    }, 500);
  });
};

/**
 * Tworzy nową rezerwację.
 *
 * @param {Object} data - Dane nowej rezerwacji.
 * @returns {Promise<string>} Obietnica zwracająca status operacji.
 */
export const postNewReservation = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 500);
  });
};
