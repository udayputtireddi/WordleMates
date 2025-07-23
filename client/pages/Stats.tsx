import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Target,
  Zap,
  Trophy,
  Gamepad2,
  Crown,
  Medal,
  Award,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Stats() {
  // Mock stats data
  const stats = {
    gamesPlayed: 24,
    winPercentage: 87,
    currentStreak: 5,
    maxStreak: 12,
    averageGuesses: 3.8,
    totalWins: 21,
    guessDistribution: [0, 2, 8, 10, 3, 1],
  };

  const StatCard = ({ icon: Icon, value, label, gradient, delay = 0 }) => (
    <Card
      className={`glass-card hover:scale-105 transition-all duration-500 animate-stagger-${delay + 1} group overflow-hidden`}
    >
      <CardContent className="p-6 text-center relative">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ background: gradient }}
        ></div>
        <div className="relative z-10">
          <Icon
            className="w-8 h-8 mx-auto mb-3 text-sky-400 animate-float"
            style={{ animationDelay: `${delay * 0.2}s` }}
          />
          <div className="text-3xl font-black gradient-text mb-1">{value}</div>
          <div className="text-sm text-gray-400 font-medium">{label}</div>
        </div>
      </CardContent>
    </Card>
  );

  const Achievement = ({
    icon: Icon,
    title,
    description,
    unlocked = true,
    delay = 0,
  }) => (
    <div
      className={`flex items-center gap-4 p-6 glass-card rounded-xl transition-all duration-500 hover:scale-105 animate-stagger-${delay + 1} ${unlocked ? "" : "opacity-50"}`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${unlocked ? "bg-gradient-to-br from-yellow-400 to-orange-500" : "bg-gray-600"}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-bold text-white text-lg">{title}</div>
        <div className="text-gray-400">{description}</div>
        {unlocked && (
          <div className="text-xs text-yellow-400 font-medium mt-1">
            ✓ Unlocked
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-black to-blue-900/20"></div>

      <Navigation />

      <div className="pt-24 p-6 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black gradient-text mb-4">
            Your Stats
          </h1>
          <p className="text-xl text-gray-300">
            Track your WordleMates journey
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Gamepad2}
            value={stats.gamesPlayed}
            label="Games Played"
            gradient="linear-gradient(135deg, #38bdf8, #3b82f6)"
            delay={0}
          />
          <StatCard
            icon={Trophy}
            value={`${stats.winPercentage}%`}
            label="Win Rate"
            gradient="linear-gradient(135deg, #10b981, #059669)"
            delay={1}
          />
          <StatCard
            icon={Zap}
            value={stats.currentStreak}
            label="Current Streak"
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
            delay={2}
          />
          <StatCard
            icon={Award}
            value={stats.maxStreak}
            label="Best Streak"
            gradient="linear-gradient(135deg, #22d3ee, #0891b2)"
            delay={3}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stats.averageGuesses}
                  </div>
                  <div className="text-gray-400">Average Guesses</div>
                </div>
              </div>
              <div className="text-gray-300">
                You're getting better at finding words efficiently!
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stats.totalWins}
                  </div>
                  <div className="text-gray-400">Total Victories</div>
                </div>
              </div>
              <div className="text-gray-300">
                Keep up the excellent word-guessing skills!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guess Distribution */}
        <Card className="glass-card mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Guess Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.guessDistribution.map((count, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-blue-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                      style={{
                        width: `${count === 0 ? 0 : Math.max(10, (count / Math.max(...stats.guessDistribution)) * 100)}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {count > 0 && (
                        <span className="text-sm font-bold text-white">
                          {count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass-card mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Achievement
                icon={Target}
                title="First Victory"
                description="Complete your first game successfully"
                unlocked={true}
                delay={0}
              />
              <Achievement
                icon={Zap}
                title="Streak Master"
                description="Win 5 games in a row"
                unlocked={true}
                delay={1}
              />
              <Achievement
                icon={Medal}
                title="Word Wizard"
                description="Guess a word in 2 tries"
                unlocked={true}
                delay={2}
              />
              <Achievement
                icon={Crown}
                title="Champion"
                description="Reach a 10-game win streak"
                unlocked={false}
                delay={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/game">
            <Button className="px-12 py-6 text-xl glass-button hover:scale-105 transition-all duration-500 group">
              <Gamepad2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Play Again
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button
              variant="outline"
              className="px-12 py-6 text-xl glass border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-105"
            >
              <Trophy className="w-6 h-6 mr-3" />
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
