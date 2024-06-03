import axios from 'axios';
import { mockGetAllWorkshops } from './mocks';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = (data) => {
    return apiClient.post('/auth/register', data);
};

export const loginUser = (data) => {
    return apiClient.post('/auth/login', data);
};

export const getUserData = () => {
    return apiClient.get('/user');
};

export const updateUserData = (data) => {
    return apiClient.put('/user', data);
};

export const getUserAddresses = () => {
    return apiClient.get('/user/address');
};

export const updateUserAddress = (data) => {
    return apiClient.put('/user/address', data);
};

export const getAvailableWorkshopHours = (workshopId, date) => {
    const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: hours[Math.floor(Math.random() * hours.length)],
            });
        }, 500);
    });
};

export const getAllWorkshops = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: mockGetAllWorkshops,
            });
        }, 500);
    });
};

export const postNewReservation = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok');
        }, 500);
    });
};
