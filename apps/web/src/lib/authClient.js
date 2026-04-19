const AUTH_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/auth';

// Helper: get stored token for Authorization header
const getAuthHeaders = (extra = {}) => {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Content-Type': 'application/json', ...extra };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

export const authClient = {
    async signIn(email, password) {
        const res = await fetch(`${AUTH_BASE}/sign-in/email`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Login failed' }));
            throw new Error(error.message || 'Login failed');
        }

        // Better Auth bearer plugin returns token in 'set-auth-token' response header
        const authToken = res.headers.get('set-auth-token');
        if (authToken) {
            localStorage.setItem('auth_token', authToken);
        }

        const data = await res.json();

        // Fallback: also check response body for token
        const bodyToken = data?.token || data?.session?.token;
        if (bodyToken && !authToken) {
            localStorage.setItem('auth_token', bodyToken);
        }

        return data;
    },

    async signOut() {
        await fetch(`${AUTH_BASE}/sign-out`, {
            method: 'POST',
            credentials: 'include',
            headers: getAuthHeaders(),
        });
        localStorage.removeItem('auth_token');
    },

    async getSession() {
        try {
            const res = await fetch(`${AUTH_BASE}/get-session`, {
                credentials: 'include',
                headers: getAuthHeaders(),
            });
            if (!res.ok) {
                localStorage.removeItem('auth_token');
                return null;
            }
            const data = await res.json();
            if (!data || !data.session) {
                localStorage.removeItem('auth_token');
                return null;
            }
            return data;
        } catch {
            return null;
        }
    },
};
