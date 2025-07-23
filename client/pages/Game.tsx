import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Confetti from "@/components/Confetti";
import { useSettings } from "@/contexts/SettingsContext";
import { VALID_WORDS, TARGET_WORDS } from "@/data/words";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Trophy, Zap } from "lucide-react";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Random target word from the target words list
const TARGET_WORD = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];

type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

interface Tile {
  letter: string;
  status: TileStatus;
}

const GameTile = ({ tile, isActive, delay = 0 }: { tile: Tile; isActive: boolean; delay?: number }) => {
  const getStatusStyle = () => {
    switch (tile.status) {
      case 'correct': 
        return 'bg-gradient-to-br from-emerald-400 to-green-600 border-emerald-300 text-white shadow-xl shadow-emerald-500/40 animate-pulse-glow';
      case 'present': 
        return 'bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-300 text-white shadow-xl shadow-amber-500/40 animate-pulse-glow';
      case 'absent': 
        return 'bg-gradient-to-br from-gray-600 to-gray-800 border-gray-500 text-white shadow-xl shadow-gray-500/30';
      default: 
        return tile.letter
          ? 'glass border-white/30 text-white shadow-lg scale-105'
          : 'glass-card border-white/10 text-white/60 shadow-lg';
    }
  };

  const activeStyle = isActive ? 'ring-2 ring-sky-400 scale-110' : '';
  const animationDelay = tile.status !== 'empty' ? { animationDelay: `${delay * 0.1}s` } : {};

  return (
    <div 
      className={`w-16 h-16 border-2 flex items-center justify-center font-bold text-2xl transition-all duration-500 tile-3d ${getStatusStyle()} ${activeStyle}`}
      style={animationDelay}
    >
      {tile.letter}
    </div>
  );
};

const KeyboardKey = ({
  letter,
  onClick,
  status,
  isSpecial = false
}: {
  letter: string;
  onClick: () => void;
  status?: TileStatus;
  isSpecial?: boolean;
}) => {
  const getKeyStyle = () => {
    if (isSpecial) return 'glass-button hover:scale-105 text-white font-bold';
    switch (status) {
      case 'correct': return 'bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:scale-105';
      case 'present': return 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-lg shadow-amber-500/30 hover:scale-105';
      case 'absent': return 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-lg shadow-gray-500/20 hover:scale-105';
      default: return 'glass border-white/20 text-white hover:scale-105 hover:bg-white/10';
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`${getKeyStyle()} font-semibold transition-all duration-300 rounded-xl active:scale-95 ${
        isSpecial ? 'px-6 py-7 text-sm' : 'p-4 min-w-[48px] h-16'
      }`}
      variant="ghost"
    >
      {letter}
    </Button>
  );
};

export default function Game() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const [grid, setGrid] = useState<Tile[][]>(() =>
    Array(MAX_ATTEMPTS).fill(null).map(() =>
      Array(WORD_LENGTH).fill(null).map(() => ({ letter: '', status: 'empty' as TileStatus }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, TileStatus>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const qwertyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ];

  // Create floating particles effect
  useEffect(() => {
    if (gameStatus === 'won') {
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        const particles = document.querySelector('.game-particles');
        if (particles) {
          particles.appendChild(particle);
          
          setTimeout(() => {
            particle.remove();
          }, 15000);
        }
      };

      const interval = setInterval(createParticle, 200);
      
      // Create initial burst
      for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 100);
      }

      return () => clearInterval(interval);
    }
  }, [gameStatus]);

  const checkWord = (word: string) => {
    const result: TileStatus[] = Array(WORD_LENGTH).fill('absent');
    const targetLetters = TARGET_WORD.split('');
    const wordLetters = word.split('');

    // First pass: mark correct letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (wordLetters[i] === targetLetters[i]) {
        result[i] = 'correct';
        targetLetters[i] = '*'; // Mark as used
        wordLetters[i] = '*'; // Mark as processed
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (wordLetters[i] !== '*') {
        const targetIndex = targetLetters.indexOf(wordLetters[i]);
        if (targetIndex !== -1) {
          result[i] = 'present';
          targetLetters[targetIndex] = '*'; // Mark as used
        }
      }
    }

    return result;
  };

  const updateKeyboardStatus = (word: string, statuses: TileStatus[]) => {
    const newKeyboardStatus = { ...keyboardStatus };
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const status = statuses[i];
      
      // Don't downgrade keyboard status (correct > present > absent)
      if (!newKeyboardStatus[letter] || 
          (newKeyboardStatus[letter] === 'absent' && status !== 'absent') ||
          (newKeyboardStatus[letter] === 'present' && status === 'correct')) {
        newKeyboardStatus[letter] = status;
      }
    }
    setKeyboardStatus(newKeyboardStatus);
  };

  const submitWord = () => {
    if (currentCol !== WORD_LENGTH) {
      toast({
        title: "Incomplete word",
        description: "Please enter a 5-letter word",
        variant: "destructive",
      });
      return;
    }

    const currentWord = grid[currentRow].map(tile => tile.letter).join('');

    if (!VALID_WORDS.includes(currentWord)) {
      toast({
        title: "Invalid word",
        description: `"${currentWord}" is not a valid word`,
        variant: "destructive",
      });
      // Add shake animation to the current row
      const currentRowElement = document.querySelector(`[data-row="${currentRow}"]`);
      if (currentRowElement) {
        currentRowElement.classList.add('animate-shake');
        setTimeout(() => {
          currentRowElement.classList.remove('animate-shake');
        }, 500);
      }
      return;
    }

    const statuses = checkWord(currentWord);
    updateKeyboardStatus(currentWord, statuses);

    // Update grid with results
    const newGrid = [...grid];
    for (let i = 0; i < WORD_LENGTH; i++) {
      newGrid[currentRow][i].status = statuses[i];
    }
    setGrid(newGrid);

    // Check game status
    if (currentWord === TARGET_WORD) {
      setGameStatus('won');
      if (settings.confettiMode) {
        setShowConfetti(true);
      }
    } else if (currentRow === MAX_ATTEMPTS - 1) {
      setGameStatus('lost');
    } else {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  };

  const addLetter = (letter: string) => {
    if (currentCol >= WORD_LENGTH || gameStatus !== 'playing') return;

    const newGrid = [...grid];
    newGrid[currentRow][currentCol].letter = letter;
    setGrid(newGrid);
    setCurrentCol(currentCol + 1);
  };

  const removeLetter = () => {
    if (currentCol <= 0 || gameStatus !== 'playing') return;

    const newGrid = [...grid];
    newGrid[currentRow][currentCol - 1].letter = '';
    setGrid(newGrid);
    setCurrentCol(currentCol - 1);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameStatus !== 'playing') return;

    if (e.key === 'Enter') {
      submitWord();
    } else if (e.key === 'Backspace') {
      removeLetter();
    } else if (/^[A-Za-z]$/.test(e.key)) {
      addLetter(e.key.toUpperCase());
    }
  }, [currentRow, currentCol, gameStatus]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating particles for celebration */}
      <div className="game-particles fixed inset-0 pointer-events-none z-10"></div>
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-black to-blue-900/20"></div>
      
      <Navigation />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Game Container */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 relative z-20">
        
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-2">WordleMates</h1>
          <p className="text-gray-300 text-lg">Guess the 5-letter word in 6 tries</p>
        </div>

        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <div className="mb-8 text-center glass-card p-8 rounded-2xl border border-white/20 max-w-md">
            <div className="text-6xl mb-4">
              {gameStatus === 'won' ? '🎉' : '😅'}
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              {gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {gameStatus === 'won'
                ? `You guessed it in ${currentRow + 1} ${currentRow === 0 ? 'try' : 'tries'}!`
                : `The word was: ${TARGET_WORD}`
              }
            </p>
            {gameStatus === 'won' && (
              <div className="flex justify-center gap-2 text-yellow-400">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">Victory!</span>
                <Trophy className="w-6 h-6" />
              </div>
            )}
          </div>
        )}

        {/* Game Grid */}
        <div className="grid gap-3 mb-12 glass-card p-8 rounded-2xl border border-white/10">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-3" data-row={rowIndex}>
              {row.map((tile, colIndex) => (
                <GameTile
                  key={colIndex}
                  tile={tile}
                  isActive={rowIndex === currentRow && colIndex === currentCol}
                  delay={colIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Virtual Keyboard */}
        <div className="space-y-3 max-w-2xl glass-card p-6 rounded-2xl border border-white/10">
          {qwertyLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => (
                <KeyboardKey
                  key={key}
                  letter={key}
                  onClick={() => {
                    if (key === 'ENTER') submitWord();
                    else if (key === 'BACK') removeLetter();
                    else addLetter(key);
                  }}
                  status={keyboardStatus[key]}
                  isSpecial={key === 'ENTER' || key === 'BACK'}
                />
              ))}
            </div>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <Button 
            className="mt-8 px-10 py-6 text-xl glass-button hover:scale-105 transition-all duration-500 group"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
            Play Again
          </Button>
        )}

        {/* Game Stats */}
        <div className="mt-8 flex gap-6 text-center">
          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold gradient-text">{currentRow + (gameStatus === 'playing' ? 0 : 1)}</div>
            <div className="text-sm text-gray-400">Attempts</div>
          </div>
          <div className="glass-card p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold gradient-text">{MAX_ATTEMPTS - currentRow - (gameStatus === 'playing' ? 1 : 0)}</div>
            <div className="text-sm text-gray-400">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}
