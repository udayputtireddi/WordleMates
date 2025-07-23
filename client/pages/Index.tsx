import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GameController2, Users, TrendingUp, Settings, HelpCircle, Menu, User } from "lucide-react";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setIsLoginOpen(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setIsSignupOpen(false);
  };

  const GameTile = ({ letter, status }: { letter: string; status: 'correct' | 'present' | 'absent' }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'correct': return 'bg-wordle-green border-wordle-green';
        case 'present': return 'bg-wordle-yellow border-wordle-yellow';
        case 'absent': return 'bg-wordle-gray border-wordle-gray';
        default: return 'bg-wordle-tile border-wordle-tile';
      }
    };

    return (
      <div className={`w-12 h-12 border-2 flex items-center justify-center text-white font-bold text-lg rounded ${getStatusColor()}`}>
        {letter}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-300/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="text-center z-10">
          {/* Animated Logo */}
          <div className="mb-8 animate-glow">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
              🧩 WordleMates
            </h1>
            <div className="flex justify-center gap-2 mb-6">
              <GameTile letter="W" status="correct" />
              <GameTile letter="O" status="present" />
              <GameTile letter="R" status="absent" />
              <GameTile letter="D" status="correct" />
              <GameTile letter="S" status="present" />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Challenge your friends in the ultimate word game experience. 
            Play together, compete, and master the art of words.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105">
                  Login to Play
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Welcome Back!</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input id="email" type="email" required className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input id="password" type="password" required className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Login
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-green-600 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105">
                  Sign Up Free
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Join WordleMates!</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-gray-300">Username</Label>
                    <Input id="username" required className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <Input id="signup-email" type="email" required className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <Input id="signup-password" type="password" required className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Create Account
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Why Choose WordleMates?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <GameController2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Play Solo</h3>
                <p className="text-gray-300">Master your skills with daily challenges and unlimited practice modes.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Multiplayer</h3>
                <p className="text-gray-300">Challenge friends in real-time or create private rooms for groups.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Track Progress</h3>
                <p className="text-gray-300">Detailed statistics, streaks, and performance analytics.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Settings className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Customizable</h3>
                <p className="text-gray-300">Hard mode, themes, notifications, and personalized settings.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Game Preview Section */}
      <div className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Experience the Game
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Six chances to guess the word. Green means correct letter and position, 
            yellow means correct letter but wrong position.
          </p>

          <div className="grid gap-3 max-w-xs mx-auto mb-8">
            <div className="flex gap-2 justify-center">
              <GameTile letter="P" status="absent" />
              <GameTile letter="L" status="present" />
              <GameTile letter="A" status="correct" />
              <GameTile letter="N" status="absent" />
              <GameTile letter="T" status="absent" />
            </div>
            <div className="flex gap-2 justify-center">
              <GameTile letter="S" status="absent" />
              <GameTile letter="L" status="correct" />
              <GameTile letter="A" status="correct" />
              <GameTile letter="M" status="absent" />
              <GameTile letter="P" status="absent" />
            </div>
            <div className="flex gap-2 justify-center">
              <GameTile letter="B" status="correct" />
              <GameTile letter="L" status="correct" />
              <GameTile letter="A" status="correct" />
              <GameTile letter="C" status="correct" />
              <GameTile letter="K" status="correct" />
            </div>
          </div>

          {!isAuthenticated && (
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
              onClick={() => setIsLoginOpen(true)}
            >
              Start Playing Now
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold gradient-text mb-4">🧩 WordleMates</h3>
          <p className="text-gray-400 mb-4">The ultimate word game experience</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>© 2024 WordleMates</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
