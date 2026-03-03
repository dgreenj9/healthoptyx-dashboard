import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getSubject = (externalId) => api.get(`/subjects/${externalId}`);

export const getGlucose = (externalId, start, end) =>
  api.get(`/signals/${externalId}/glucose`, {
    params: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
  });

export const getLatestGlucose = (externalId) =>
  api.get(`/signals/${externalId}/glucose/latest`);

export const getDexcomStatus = (subjectId) =>
  api.get(`/auth/dexcom/status`, { params: { subject_id: subjectId } });

export const createSubject = (externalId) =>
  api.post('/subjects/', { external_id: externalId });

export default api;
