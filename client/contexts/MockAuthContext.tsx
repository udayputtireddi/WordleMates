import React, { createContext, useContext, useState } from 'react';

interface UserStats {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  totalGuesses: number;
  averageGuesses: number;
  achievements: string[];
}

interface AuthContextType {
  user: any | null;
  userStats: UserStats | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshStats: () => Promise<void>;
  resetStats: () => Promise<void>;
}

const defaultStats: UserStats = {
  gamesPlayed: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
  totalGuesses: 0,
  averageGuesses: 0,
  achievements: []
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats>(defaultStats);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // Mock login - just set a fake user
    setUser({ 
      uid: 'mock-user-123', 
      email: email,
      displayName: email.split('@')[0] 
    });
  };

  const signup = async (email: string, password: string) => {
    // Mock signup - same as login for now
    setUser({ 
      uid: 'mock-user-123', 
      email: email,
      displayName: email.split('@')[0] 
    });
  };

  const loginWithGoogle = async () => {
    // Mock Google login
    setUser({ 
      uid: 'mock-user-123', 
      email: 'player@gmail.com',
      displayName: 'Player123' 
    });
  };

  const logout = async () => {
    setUser(null);
    setUserStats(defaultStats);
  };

  const refreshStats = async () => {
    // Mock refresh - use localStorage for now
    const savedStats = localStorage.getItem('wordlemates-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  };

  const resetStats = async () => {
    setUserStats(defaultStats);
    localStorage.removeItem('wordlemates-stats');
  };

  const value: AuthContextType = {
    user,
    userStats,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    refreshStats,
    resetStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
