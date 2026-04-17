const AUTH_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/auth';

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
        return res.json();
    },

    async signOut() {
        await fetch(`${AUTH_BASE}/sign-out`, {
            method: 'POST',
            credentials: 'include',
        });
    },

    async getSession() {
        try {
            const res = await fetch(`${AUTH_BASE}/get-session`, {
                credentials: 'include',
            });
            if (!res.ok) return null;
            return res.json();
        } catch {
            return null;
        }
    },
};
