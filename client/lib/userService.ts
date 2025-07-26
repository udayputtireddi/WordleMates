import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  totalGuesses: number;
  averageGuesses: number;
  lastPlayed: any;
  achievements: string[];
}

export interface GameResult {
  won: boolean;
  guesses: number;
  word: string;
  date: any;
  attempts: string[];
}

const defaultStats: UserStats = {
  gamesPlayed: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0], // Index 0 = 1 guess, Index 5 = 6 guesses
  totalGuesses: 0,
  averageGuesses: 0,
  lastPlayed: null,
  achievements: []
};

export const userService = {
  // Initialize user profile
  async initializeUser(user: User) {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || `Player${user.uid.slice(0, 6)}`,
        createdAt: serverTimestamp(),
        stats: defaultStats
      });
    }
    
    return userDoc.exists() ? userDoc.data() : null;
  },

  // Get user stats
  async getUserStats(userId: string): Promise<UserStats> {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().stats || defaultStats;
    }
    
    return defaultStats;
  },

  // Record a game result
  async recordGameResult(userId: string, result: GameResult) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return;
    
    const currentStats = userDoc.data().stats || defaultStats;
    
    // Calculate new stats
    const newStats = { ...currentStats };
    newStats.gamesPlayed += 1;
    newStats.lastPlayed = serverTimestamp();
    
    if (result.won) {
      newStats.wins += 1;
      newStats.currentStreak += 1;
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
      
      // Update guess distribution (result.guesses is 1-6)
      if (result.guesses >= 1 && result.guesses <= 6) {
        newStats.guessDistribution[result.guesses - 1] += 1;
      }
      
      newStats.totalGuesses += result.guesses;
    } else {
      newStats.currentStreak = 0;
    }
    
    // Calculate average guesses
    if (newStats.wins > 0) {
      newStats.averageGuesses = Math.round((newStats.totalGuesses / newStats.wins) * 10) / 10;
    }
    
    // Update user document
    await updateDoc(userRef, {
      stats: newStats
    });
    
    // Record individual game
    const gameRef = doc(collection(db, 'games'));
    await setDoc(gameRef, {
      userId,
      ...result,
      timestamp: serverTimestamp()
    });
    
    return newStats;
  },

  // Reset user stats
  async resetUserStats(userId: string) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      stats: defaultStats
    });
    
    return defaultStats;
  },

  // Get leaderboard
  async getLeaderboard() {
    // Implementation for leaderboard data
    // This would require proper indexing in Firestore
    return [];
  },

  // Unlock achievement
  async unlockAchievement(userId: string, achievementId: string) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const currentStats = userDoc.data().stats || defaultStats;
      if (!currentStats.achievements.includes(achievementId)) {
        currentStats.achievements.push(achievementId);
        await updateDoc(userRef, {
          'stats.achievements': currentStats.achievements
        });
      }
    }
  }
};
