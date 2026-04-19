const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api';

export async function api(path, options = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers,
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(error.error || 'API Error');
    }

    return res.json();
}

export const publicApi = {
    getHome: () => api('/home'),
    getAbout: () => api('/about'),
    getContact: () => api('/contact'),
    getProjects: () => api('/projects'),
    getProject: (slug) => api(`/projects/${slug}`),
};

export const adminApi = {
    getHome: () => api('/admin/home'),
    updateHome: (data) => api('/admin/home', { method: 'PUT', body: JSON.stringify(data) }),
    getAbout: () => api('/admin/about'),
    updateAbout: (data) => api('/admin/about', { method: 'PUT', body: JSON.stringify(data) }),
    getContact: () => api('/admin/contact'),
    updateContact: (data) => api('/admin/contact', { method: 'PUT', body: JSON.stringify(data) }),
    getProjects: () => api('/admin/projects'),
    getProject: (id) => api(`/admin/projects/${id}`),
    createProject: (data) => api('/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
    updateProject: (id, data) => api(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProject: (id) => api(`/admin/projects/${id}`, { method: 'DELETE' }),
};
