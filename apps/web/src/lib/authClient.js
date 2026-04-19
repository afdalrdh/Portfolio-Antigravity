const AUTH_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/auth';

const getHeaders = (headers = {}) => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...headers
    };
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
        const data = await res.json();
        // If the server returns a token in the body (bearer plugin), or we can get it from headers
        // Better Auth bearer plugin returns it as `token` in the response body of sign-in
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        return data;
    },

    async signOut() {
        await fetch(`${AUTH_BASE}/sign-out`, {
            method: 'POST',
            credentials: 'include',
            headers: getHeaders(),
        });
        localStorage.removeItem('auth_token');
    },

    async getSession() {
        try {
            const res = await fetch(`${AUTH_BASE}/get-session`, {
                credentials: 'include',
                headers: getHeaders(),
            });
            if (!res.ok) {
                localStorage.removeItem('auth_token');
                return null;
            }
            return res.json();
        } catch {
            return null;
        }
    },
};
