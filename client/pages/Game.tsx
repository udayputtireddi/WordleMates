import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Simple word list for demo - in a real app this would come from your backend
const VALID_WORDS = ['REACT', 'SWIFT', 'PHONE', 'HOUSE', 'PLANT', 'MUSIC', 'DANCE', 'LIGHT', 'WORLD', 'MAGIC'];
const TARGET_WORD = VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];

type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

interface Tile {
  letter: string;
  status: TileStatus;
}

const GameTile = ({ tile, isActive }: { tile: Tile; isActive: boolean }) => {
  const getStatusColor = () => {
    switch (tile.status) {
      case 'correct': return 'bg-wordle-green border-wordle-green text-white';
      case 'present': return 'bg-wordle-yellow border-wordle-yellow text-white';
      case 'absent': return 'bg-wordle-gray border-wordle-gray text-white';
      default: return isActive ? 'bg-gray-700 border-gray-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-300';
    }
  };

  return (
    <div className={`w-14 h-14 border-2 flex items-center justify-center font-bold text-2xl rounded transition-all duration-300 ${getStatusColor()}`}>
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
  const getKeyColor = () => {
    if (isSpecial) return 'bg-gray-600 hover:bg-gray-500';
    switch (status) {
      case 'correct': return 'bg-wordle-green text-white';
      case 'present': return 'bg-wordle-yellow text-black';
      case 'absent': return 'bg-gray-600 text-gray-300';
      default: return 'bg-gray-500 hover:bg-gray-400 text-white';
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`${getKeyColor()} font-semibold transition-all duration-200 ${
        isSpecial ? 'px-4 py-6 text-sm' : 'p-4 min-w-[44px] h-14'
      }`}
      variant="secondary"
    >
      {letter}
    </Button>
  );
};

export default function Game() {
  const [grid, setGrid] = useState<Tile[][]>(() => 
    Array(MAX_ATTEMPTS).fill(null).map(() => 
      Array(WORD_LENGTH).fill(null).map(() => ({ letter: '', status: 'empty' as TileStatus }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, TileStatus>>({});

  const qwertyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ];

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
    if (currentCol !== WORD_LENGTH) return;

    const currentWord = grid[currentRow].map(tile => tile.letter).join('');
    
    if (!VALID_WORDS.includes(currentWord)) {
      // In a real app, you'd show an error message
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />

      {/* Game Container */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">
              {gameStatus === 'won' ? '🎉 Congratulations!' : '😅 Game Over'}
            </h2>
            <p className="text-xl text-gray-300">
              {gameStatus === 'won' 
                ? `You guessed it in ${currentRow + 1} ${currentRow === 0 ? 'try' : 'tries'}!`
                : `The word was: ${TARGET_WORD}`
              }
            </p>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid gap-2 mb-8">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((tile, colIndex) => (
                <GameTile 
                  key={colIndex} 
                  tile={tile} 
                  isActive={rowIndex === currentRow && colIndex === currentCol}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Virtual Keyboard */}
        <div className="space-y-2 max-w-lg">
          {qwertyLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
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
            className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
}
