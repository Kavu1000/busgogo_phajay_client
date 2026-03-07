import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// On 401, clear token and  redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),

    register: (data: {
        username: string;
        email: string;
        password: string;
        phone: string;
    }) => api.post('/auth/register', data),

    me: () => api.get('/auth/me'),
};

// ─── Schedules ────────────────────────────────────────────────────────────────

export const scheduleApi = {
    search: (params: {
        from?: string;
        to?: string;
        date?: string;
        passengers?: number;
    }) => api.get('/schedules', { params }),

    getCities: () => api.get('/schedules/cities'),

    getById: (id: string) => api.get(`/schedules/${id}`),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookingApi = {
    create: (data: {
        scheduleId: string;
        seats: string[];
        passengers: {
            title: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
            idCard: string;
        }[];
        contactPhone: string;
        contactEmail: string;
        emergencyContact?: string;
        emergencyPhone?: string;
    }) => api.post('/bookings', data),

    getMyBookings: () => api.get('/bookings/my-bookings'),

    getById: (id: string) => api.get(`/bookings/${id}`),

    cancel: (id: string) => api.delete(`/bookings/${id}`),
};

// ─── Buses ───────────────────────────────────────────────────────────────────

export const busApi = {
    getAll: (params?: Record<string, string | number>) =>
        api.get('/buses', { params }),

    getById: (id: string) => api.get(`/buses/${id}`),

    getSeats: (id: string) => api.get(`/buses/${id}/seats`),
};
// ─── User ───────────────────────────────────────────────────────────────────
export const userApi = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data: {
        username?: string;
        email?: string;
        phone?: string;
        password?: string;
    }) => api.put('/users/profile', data),
};

export default api;
