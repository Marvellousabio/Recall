// Mock implementations for browser compatibility (using dummy data)
const bcrypt = {
  hash: async (password: string) => `mock_hash_${password}`,
  compare: async (password: string, hash: string) => hash === `mock_hash_${password}`
};

const jwt = {
  sign: (payload: any, secret: string) => `mock_token_${JSON.stringify(payload)}`,
  verify: (token: string, secret: string) => {
    if (token.startsWith('mock_token_')) {
      try {
        return JSON.parse(token.replace('mock_token_', ''));
      } catch {
        return null;
      }
    }
    return null;
  }
};

// Lazy load prisma to avoid top-level await
const getPrisma = async () => {
  const { prisma } = await import('../db/prisma');
  return prisma;
};

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || 'default-secret-change-this';
const JWT_EXPIRES_IN = '7d';

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

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create JWT token
export function createToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch {
    return null;
  }
}

// Get user from token
export async function getUserFromToken(token: string): Promise<User | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    const prisma = await getPrisma();
    const profile = await prisma.profile.findUnique({
      where: { id: decoded.userId }
    });

    if (!profile) return null;

    return {
      id: profile.id,
      username: profile.username,
      email: profile.email || '',
      role: profile.role as 'user' | 'admin'
    };
  } catch {
    return null;
  }
}

// Sign up new user - Demo mode: Accept any input
export async function signUp(email: string, password: string, username: string): Promise<User> {
  // Demo mode: Always create a new user, no validation
  const userId = `demo-user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Create a mock user object
  const mockUser: User = {
    id: userId,
    username: username || `demo-user-${userId.slice(-4)}`,
    email: email || `${username}@demo.com`,
    role: 'user'
  };

  // Store in localStorage for demo persistence
  const demoUsers = JSON.parse(localStorage.getItem('demo-users') || '[]');
  demoUsers.push({
    ...mockUser,
    password, // Store plain password for demo
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('demo-users', JSON.stringify(demoUsers));

  return mockUser;
}

// Sign in user - Demo mode: Accept any email/password
export async function signIn(email: string, password: string): Promise<{ user: User; token: string }> {
  // Demo mode: Check localStorage first for demo users
  const demoUsers = JSON.parse(localStorage.getItem('demo-users') || '[]');
  let user = demoUsers.find((u: any) => u.email === email);

  if (!user) {
    // If not found in demo users, check dummy data
    const dummyProfiles = (await import('../db/dummy-data')).dummyProfiles;
    user = dummyProfiles.find(p => p.email === email);
  }

  if (!user) {
    // Demo mode: Create a user on the fly if it doesn't exist
    user = {
      id: `demo-user-${Date.now()}`,
      username: email.split('@')[0] || 'demo-user',
      email: email,
      role: 'user' as const
    };

    // Add to demo users for future logins
    demoUsers.push({
      ...user,
      password,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('demo-users', JSON.stringify(demoUsers));
  }

  const token = createToken(user.id, user.role);
  return { user, token };
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const prisma = await getPrisma();
    const profile = await prisma.profile.findUnique({
      where: { id: userId }
    });

    if (!profile) return null;

    return {
      id: profile.id,
      username: profile.username,
      email: profile.email || '',
      role: profile.role as 'user' | 'admin'
    };
  } catch {
    return null;
  }
}

// Update user profile
export async function updateUser(userId: string, updates: Partial<Pick<User, 'username' | 'email'>>): Promise<User> {
  try {
    const prisma = await getPrisma();
    const profile = await prisma.profile.update({
      where: { id: userId },
      data: updates
    });

    return {
      id: profile.id,
      username: profile.username,
      email: profile.email || '',
      role: profile.role as 'user' | 'admin'
    };
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

// Promote user to admin (for admin use)
export async function makeAdmin(userId: string): Promise<void> {
  const prisma = await getPrisma();
  await prisma.profile.update({
    where: { id: userId },
    data: { role: 'admin' }
  });
}