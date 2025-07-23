import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Target, Clock, Users, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";

const GameTile = ({ letter, status }: { letter: string; status: 'correct' | 'present' | 'absent' | 'empty' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'correct': return 'bg-wordle-green border-wordle-green text-white';
      case 'present': return 'bg-wordle-yellow border-wordle-yellow text-white';
      case 'absent': return 'bg-wordle-gray border-wordle-gray text-white';
      default: return 'bg-gray-700 border-gray-500 text-white';
    }
  };

  return (
    <div className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-lg rounded ${getStatusColor()}`}>
      {letter}
    </div>
  );
};

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />

      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Basic Rules */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Basic Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-300">
              <p className="mb-4">
                Guess the <strong className="text-white">WORDLE</strong> in 6 tries or less. Each guess must be a valid 5-letter word.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>You have 6 attempts to guess the correct word</li>
                <li>Each guess must be a valid 5-letter word</li>
                <li>After each guess, the color of the tiles will change to show how close your guess was</li>
                <li>Letters can appear multiple times in the target word</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Color Examples */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-green-400" />
              Color Meanings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Green Example */}
            <div>
              <div className="flex gap-2 mb-2">
                <GameTile letter="W" status="correct" />
                <GameTile letter="E" status="empty" />
                <GameTile letter="A" status="empty" />
                <GameTile letter="R" status="empty" />
                <GameTile letter="Y" status="empty" />
              </div>
              <p className="text-gray-300">
                <span className="text-green-400 font-semibold">Green:</span> The letter <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>

            {/* Yellow Example */}
            <div>
              <div className="flex gap-2 mb-2">
                <GameTile letter="P" status="empty" />
                <GameTile letter="I" status="present" />
                <GameTile letter="L" status="empty" />
                <GameTile letter="L" status="empty" />
                <GameTile letter="S" status="empty" />
              </div>
              <p className="text-gray-300">
                <span className="text-yellow-400 font-semibold">Yellow:</span> The letter <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>

            {/* Gray Example */}
            <div>
              <div className="flex gap-2 mb-2">
                <GameTile letter="V" status="absent" />
                <GameTile letter="A" status="empty" />
                <GameTile letter="G" status="empty" />
                <GameTile letter="U" status="empty" />
                <GameTile letter="E" status="empty" />
              </div>
              <p className="text-gray-300">
                <span className="text-gray-400 font-semibold">Gray:</span> The letter <strong>V</strong> is not in the word in any spot.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Strategy */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Tips and Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Starting Words</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Use words with common vowels (A, E, I, O, U)</li>
                  <li>Include frequent consonants (R, S, T, L, N)</li>
                  <li>Good starters: ARISE, AUDIO, ADIEU</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Strategy Tips</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Don't reuse gray letters</li>
                  <li>Try to place yellow letters in new positions</li>
                  <li>Use different letters to gather more information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Multiplayer Features */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Multiplayer Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-300">
              <h4 className="font-semibold text-white mb-2">Coming Soon!</h4>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Private Rooms:</strong> Create rooms and invite friends with a code</li>
                <li><strong>Real-time Competition:</strong> Race against friends with the same word</li>
                <li><strong>Leaderboards:</strong> See daily, weekly, and all-time top players</li>
                <li><strong>Team Challenges:</strong> Collaborate or compete in groups</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Hard Mode */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-400" />
              Hard Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-300">
              <p className="mb-4">
                In Hard Mode, any revealed hints must be used in subsequent guesses:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Green letters must stay in the same position</li>
                <li>Yellow letters must be included in your next guess</li>
                <li>This makes the game more challenging but also more strategic</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Back to Game Button */}
        <div className="flex gap-4">
          <Link to="/game" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Start Playing
            </Button>
          </Link>
          <Link to="/settings" className="flex-1">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
