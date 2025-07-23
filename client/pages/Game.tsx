import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Confetti from "@/components/Confetti";
import { useSettings } from "@/contexts/SettingsContext";
import { VALID_WORDS, TARGET_WORDS } from "@/data/words";
import { useToast } from "@/hooks/use-toast";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// Random target word from the target words list
const TARGET_WORD = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];

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
      default: return tile.letter
        ? 'bg-wordle-tile-empty border-wordle-tile-border text-foreground border-2'
        : 'bg-wordle-tile-empty border-wordle-tile-border text-foreground';
    }
  };

  const activeStyle = isActive ? 'scale-105' : '';

  return (
    <div className={`w-14 h-14 border-2 flex items-center justify-center font-bold text-2xl transition-all duration-300 ${getStatusColor()} ${activeStyle}`}>
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
    if (isSpecial) return 'bg-muted hover:bg-muted/80 text-foreground';
    switch (status) {
      case 'correct': return 'bg-wordle-green text-white';
      case 'present': return 'bg-wordle-yellow text-white';
      case 'absent': return 'bg-wordle-gray text-white';
      default: return 'bg-muted hover:bg-muted/80 text-foreground';
    }
  };

  return (
    <Button
      onClick={onClick}
      className={`${getKeyColor()} font-semibold transition-all duration-200 rounded hover:scale-105 active:scale-95 ${
        isSpecial ? 'px-4 py-6 text-sm' : 'p-4 min-w-[44px] h-14'
      }`}
      variant="secondary"
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Game Container */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <div className="mb-6 text-center bg-card p-6 rounded-lg border">
            <h2 className="text-3xl font-bold mb-2">
              {gameStatus === 'won' ? '🎉 Congratulations!' : '😅 Game Over'}
            </h2>
            <p className="text-xl text-muted-foreground">
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
            <div key={rowIndex} className="flex gap-2" data-row={rowIndex}>
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
