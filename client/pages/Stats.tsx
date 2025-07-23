import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Menu, User, TrendingUp, Target, Zap, Trophy } from "lucide-react";

export default function Stats() {
  // Mock stats data
  const stats = {
    gamesPlayed: 24,
    winPercentage: 87,
    currentStreak: 5,
    maxStreak: 12,
    guessDistribution: [0, 2, 8, 10, 3, 1]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        
        <h1 className="text-2xl font-bold gradient-text">Statistics</h1>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <Menu className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.gamesPlayed}</div>
              <div className="text-sm text-gray-400">Games Played</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.winPercentage}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.currentStreak}</div>
              <div className="text-sm text-gray-400">Current Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.maxStreak}</div>
              <div className="text-sm text-gray-400">Max Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Guess Distribution */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Guess Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.guessDistribution.map((count, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-4">{index + 1}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-6 relative">
                    <div 
                      className="bg-green-500 h-full rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${count === 0 ? 0 : Math.max(8, (count / Math.max(...stats.guessDistribution)) * 100)}%` }}
                    >
                      {count > 0 && <span className="text-xs font-medium text-white">{count}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <Target className="w-8 h-8 text-green-400" />
                <div>
                  <div className="font-medium text-white">First Win</div>
                  <div className="text-sm text-gray-400">Complete your first game</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="font-medium text-white">Streak Master</div>
                  <div className="text-sm text-gray-400">Win 5 games in a row</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link to="/game" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Play Again
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
