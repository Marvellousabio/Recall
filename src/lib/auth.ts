export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export async function signUp(email: string, password: string, username: string): Promise<User> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Sign up failed' }));
    throw new Error(error.error || 'Sign up failed');
  }

  const data = await response.json();
  return data.user;
}

export async function signIn(email: string, password: string): Promise<{ user: User; token: string }> {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Sign in failed' }));
    throw new Error(error.error || 'Sign in failed');
  }

  return response.json();
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}` }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function updateUser(userId: string, updates: { username?: string; email?: string }): Promise<User> {
  const response = await fetch(`/api/auth/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
}

export async function makeAdmin(userId: string): Promise<void> {
  throw new Error('Not implemented');
}

export async function hashPassword(password: string): Promise<string> {
  throw new Error('Not implemented on client');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  throw new Error('Not implemented on client');
}

export function createToken(userId: string, role: string): string {
  throw new Error('Not implemented on client');
}

export function verifyToken(token: string): AuthToken | null {
  throw new Error('Not implemented on client');
}
