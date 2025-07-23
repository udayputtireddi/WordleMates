import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Users, TrendingUp, Settings, HelpCircle, Menu, User, Trophy } from "lucide-react";

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
        case 'correct': return 'bg-wordle-green border-wordle-green text-white';
        case 'present': return 'bg-wordle-yellow border-wordle-yellow text-white';
        case 'absent': return 'bg-wordle-gray border-wordle-gray text-white';
        default: return 'bg-wordle-tile-empty border-wordle-tile-border text-foreground';
      }
    };

    return (
      <div className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-lg transition-all duration-300 hover:scale-105 ${getStatusColor()}`}>
        {letter}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header - Only show when authenticated */}
      {isAuthenticated && (
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
                alt="WordleMates"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-foreground">WordleMates</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/game" className="text-muted-foreground hover:text-foreground transition-colors">
              Play
            </Link>
            <Link to="/stats" className="text-muted-foreground hover:text-foreground transition-colors">
              Stats
            </Link>
            <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
              Settings
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
            <User className="w-6 h-6" />
          </Button>
        </header>
      )}

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
                alt="WordleMates"
                className="w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-all duration-300"
              />
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                WordleMates
              </h1>
            </div>
            <div className="flex justify-center gap-1 mb-6">
              <GameTile letter="W" status="correct" />
              <GameTile letter="O" status="present" />
              <GameTile letter="R" status="absent" />
              <GameTile letter="D" status="correct" />
              <GameTile letter="S" status="present" />
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Challenge your friends in the ultimate word game experience.
            Play together, compete, and master the art of words.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 py-6 text-lg bg-wordle-green hover:bg-wordle-green/90 text-white transition-all duration-300 hover:scale-105">
                    Login to Play
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Welcome Back!</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input id="email" type="email" required className="bg-input border-border text-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-foreground">Password</Label>
                      <Input id="password" type="password" required className="bg-input border-border text-foreground" />
                    </div>
                    <Button type="submit" className="w-full bg-wordle-green hover:bg-wordle-green/90 text-white">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-border text-foreground hover:bg-accent transition-all duration-300 hover:scale-105">
                    Sign Up Free
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Join WordleMates!</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-foreground">Username</Label>
                      <Input id="username" required className="bg-input border-border text-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                      <Input id="signup-email" type="email" required className="bg-input border-border text-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                      <Input id="signup-password" type="password" required className="bg-input border-border text-foreground" />
                    </div>
                    <Button type="submit" className="w-full bg-wordle-green hover:bg-wordle-green/90 text-white">
                      Create Account
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <Link to="/game">
                <Card className="bg-card border-border hover:border-wordle-green transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Gamepad2 className="w-8 h-8 text-wordle-green mx-auto mb-2" />
                    <div className="text-foreground font-medium">Play</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/stats">
                <Card className="bg-card border-border hover:border-wordle-green transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-wordle-green mx-auto mb-2" />
                    <div className="text-foreground font-medium">Stats</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/leaderboard">
                <Card className="bg-card border-border hover:border-wordle-green transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-8 h-8 text-wordle-yellow mx-auto mb-2" />
                    <div className="text-foreground font-medium">Leaderboard</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/settings">
                <Card className="bg-card border-border hover:border-wordle-green transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Settings className="w-8 h-8 text-wordle-green mx-auto mb-2" />
                    <div className="text-foreground font-medium">Settings</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/help">
                <Card className="bg-card border-border hover:border-wordle-green transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <HelpCircle className="w-8 h-8 text-wordle-green mx-auto mb-2" />
                    <div className="text-foreground font-medium">Help</div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
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
                <Gamepad2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
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
