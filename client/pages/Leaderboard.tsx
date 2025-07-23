import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock leaderboard data
const mockLeaderboardData = {
  daily: [
    {
      rank: 1,
      username: "WordMaster2024",
      score: 2850,
      gamesWon: 15,
      winRate: 94,
      streak: 12,
    },
    {
      rank: 2,
      username: "PuzzleQueen",
      score: 2720,
      gamesWon: 14,
      winRate: 88,
      streak: 8,
    },
    {
      rank: 3,
      username: "LetterLord",
      score: 2650,
      gamesWon: 13,
      winRate: 87,
      streak: 6,
    },
    {
      rank: 4,
      username: "WordWizard",
      score: 2580,
      gamesWon: 12,
      winRate: 86,
      streak: 5,
    },
    {
      rank: 5,
      username: "VocabViper",
      score: 2520,
      gamesWon: 11,
      winRate: 85,
      streak: 7,
    },
    {
      rank: 6,
      username: "GrammarGuru",
      score: 2480,
      gamesWon: 10,
      winRate: 83,
      streak: 4,
    },
    {
      rank: 7,
      username: "SpellSlayer",
      score: 2420,
      gamesWon: 9,
      winRate: 82,
      streak: 3,
    },
    {
      rank: 8,
      username: "WordWeaver",
      score: 2380,
      gamesWon: 8,
      winRate: 80,
      streak: 2,
    },
    {
      rank: 9,
      username: "Player123",
      score: 2350,
      gamesWon: 7,
      winRate: 78,
      streak: 5,
    }, // Current user
    {
      rank: 10,
      username: "LetterLover",
      score: 2320,
      gamesWon: 6,
      winRate: 75,
      streak: 1,
    },
  ],
  weekly: [
    {
      rank: 1,
      username: "WordMaster2024",
      score: 18500,
      gamesWon: 95,
      winRate: 92,
      streak: 15,
    },
    {
      rank: 2,
      username: "PuzzleQueen",
      score: 17800,
      gamesWon: 89,
      winRate: 89,
      streak: 12,
    },
    {
      rank: 3,
      username: "LetterLord",
      score: 17200,
      gamesWon: 86,
      winRate: 88,
      streak: 10,
    },
    {
      rank: 4,
      username: "WordWizard",
      score: 16900,
      gamesWon: 82,
      winRate: 87,
      streak: 8,
    },
    {
      rank: 5,
      username: "VocabViper",
      score: 16500,
      gamesWon: 78,
      winRate: 85,
      streak: 9,
    },
    {
      rank: 12,
      username: "Player123",
      score: 14200,
      gamesWon: 65,
      winRate: 78,
      streak: 5,
    }, // Current user
  ],
  allTime: [
    {
      rank: 1,
      username: "WordMaster2024",
      score: 125000,
      gamesWon: 650,
      winRate: 95,
      streak: 25,
    },
    {
      rank: 2,
      username: "PuzzleQueen",
      score: 118000,
      gamesWon: 620,
      winRate: 92,
      streak: 20,
    },
    {
      rank: 3,
      username: "LetterLord",
      score: 112000,
      gamesWon: 580,
      winRate: 90,
      streak: 18,
    },
    {
      rank: 4,
      username: "WordWizard",
      score: 108000,
      gamesWon: 560,
      winRate: 89,
      streak: 15,
    },
    {
      rank: 5,
      username: "VocabViper",
      score: 105000,
      gamesWon: 540,
      winRate: 88,
      streak: 22,
    },
    {
      rank: 87,
      username: "Player123",
      score: 45000,
      gamesWon: 240,
      winRate: 78,
      streak: 5,
    }, // Current user
  ],
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">
          {rank}
        </span>
      );
  }
};

const getRankBadge = (rank: number) => {
  if (rank === 1)
    return <Badge className="bg-yellow-500 text-black">👑 Champion</Badge>;
  if (rank <= 3) return <Badge className="bg-green-600">🏆 Top 3</Badge>;
  if (rank <= 10) return <Badge className="bg-blue-600">⭐ Top 10</Badge>;
  if (rank <= 50) return <Badge className="bg-purple-600">💎 Top 50</Badge>;
  return <Badge variant="secondary">🎯 Competitor</Badge>;
};

const LeaderboardTable = ({
  data,
  period,
}: {
  data: typeof mockLeaderboardData.daily;
  period: string;
}) => {
  return (
    <div className="space-y-3">
      {data.map((player, index) => {
        const isCurrentUser = player.username === "Player123";
        return (
          <Card
            key={player.rank}
            className={`transition-all duration-200 ${
              isCurrentUser
                ? "bg-green-600/20 border-green-500 ring-2 ring-green-500/30"
                : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700/50 rounded-full">
                    {getRankIcon(player.rank)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${isCurrentUser ? "text-green-400" : "text-white"}`}
                      >
                        {player.username}
                        {isCurrentUser && (
                          <span className="text-sm text-green-400">(You)</span>
                        )}
                      </span>
                      {getRankBadge(player.rank)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.gamesWon} wins • {player.winRate}% win rate •{" "}
                      {player.streak} streak
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />

      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-300 text-lg">
            See how you stack up against other WordleMates players
          </p>
        </div>

        {/* Tabs for different time periods */}
        <Tabs
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="daily"
              className="flex items-center gap-2 data-[state=active]:bg-green-600"
            >
              <Clock className="w-4 h-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="flex items-center gap-2 data-[state=active]:bg-green-600"
            >
              <Calendar className="w-4 h-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="allTime"
              className="flex items-center gap-2 data-[state=active]:bg-green-600"
            >
              <TrendingUp className="w-4 h-4" />
              All Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  Daily Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Rankings reset every day at midnight UTC. Compete daily for
                  the top spot!
                </p>
              </CardContent>
            </Card>
            <LeaderboardTable data={mockLeaderboardData.daily} period="daily" />
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  Weekly Legends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Weekly rankings showcase consistent performance. Rankings
                  reset every Monday.
                </p>
              </CardContent>
            </Card>
            <LeaderboardTable
              data={mockLeaderboardData.weekly}
              period="weekly"
            />
          </TabsContent>

          <TabsContent value="allTime" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Hall of Fame
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  The ultimate WordleMates champions. These rankings represent
                  lifetime achievement.
                </p>
              </CardContent>
            </Card>
            <LeaderboardTable
              data={mockLeaderboardData.allTime}
              period="allTime"
            />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link to="/game" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Trophy className="w-4 h-4 mr-2" />
              Play to Climb
            </Button>
          </Link>
          <Link to="/stats" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              My Stats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
