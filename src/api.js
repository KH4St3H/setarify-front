import axios from 'axios';

const BASE_URL = "https://spectacular.ir";
//creating an axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false // This attaches cookies (e.g., refresh token) to the request
});

axiosInstance.interceptors.request.use(
  function (config) {
      const token = localStorage.getItem('accessToken');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  function (error) {
      return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
      return response;
  },
  async function (error) {

      const originalRequest = error.config;

      if (error.response && error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
             const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
                refreshToken
              });
              if (response) {
                  //update the access token
                  localStorage.setItem('accessToken', response.data.access);

                  originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                  return axiosInstance(originalRequest);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      }

      return Promise.reject(error);
  }
);

const api = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // Albums
  getAlbums: async () => {
    const response =await fetch(`${BASE_URL}/api/albums/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Failed to fetch albums');
    return response.json();
  },

  // Songs
  getSongs: async (query = '') => {
    const response = axiosInstance.get(`${BASE_URL}/api/songs/?search=${query}`).then(res => res.data);
    return response;
  },

  // Playlists
  getPlaylists: async () => {
    const response = await fetch(`${BASE_URL}/api/playlists/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Failed to fetch playlists');
    return response.json();
  },

  getSongUrl: async (slug) => {
    const response = axiosInstance.get(`${BASE_URL}/api/songs/${slug}/get_url/`).then(r => r.data).catch(() => {throw new Error('Failed to get this song')});
    return response;
  },

  likeSong: async (slug) => {
    const response = await axiosInstance.get(`${BASE_URL}/api/songs/${slug}/like/`).then(r => r.data).catch(() => {throw new Error('Failed')});
    return true;
  },
  dislikeSong: async (slug) => {
    const response = await axiosInstance.get(`${BASE_URL}/api/songs/${slug}/dislike/`).then(r => r.data).catch(() => {throw new Error('Failed')});
    return {"ok": true};
  },
};
export {api};