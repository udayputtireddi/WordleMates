import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Users, TrendingUp, Settings as SettingsIcon, HelpCircle, Menu, User, Trophy, Sparkles, Zap, Crown } from "lucide-react";

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

  // Create floating particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      const particles = document.querySelector('.particles');
      if (particles) {
        particles.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 30000);
      }
    };

    const interval = setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 200);
    }

    return () => clearInterval(interval);
  }, []);

  const GameTile = ({ letter, status, delay = 0 }: { letter: string; status: 'correct' | 'present' | 'absent'; delay?: number }) => {
    const getStatusStyle = () => {
      switch (status) {
        case 'correct': 
          return 'bg-gradient-to-br from-emerald-400 to-green-600 border-emerald-300 text-white shadow-lg shadow-emerald-500/30';
        case 'present': 
          return 'bg-gradient-to-br from-amber-400 to-yellow-600 border-amber-300 text-white shadow-lg shadow-amber-500/30';
        case 'absent': 
          return 'bg-gradient-to-br from-gray-600 to-gray-800 border-gray-500 text-white shadow-lg shadow-gray-500/30';
        default: 
          return 'glass border-white/20 text-white shadow-lg';
      }
    };

    return (
      <div 
        className={`w-14 h-14 border-2 flex items-center justify-center font-bold text-xl tile-3d ${getStatusStyle()} animate-stagger-${delay + 1}`}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        {letter}
      </div>
    );
  };

  const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <Card className={`glass-card hover:scale-105 transition-all duration-700 animate-stagger-${delay + 1} group`}>
      <CardContent className="p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <Icon className="w-16 h-16 text-sky-400 mx-auto mb-6 animate-float" style={{ animationDelay: `${delay * 0.2}s` }} />
          <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Floating particles background */}
      <div className="particles"></div>

      {/* Navigation - Use the shared Navigation component when authenticated */}
      {isAuthenticated && <Navigation />}

      {/* Hero Section */}
      <div className={`${isAuthenticated ? 'pt-24' : ''} min-h-screen flex flex-col items-center justify-center px-6 relative`}>
        <div className="text-center relative z-10">
          {/* Floating logo with premium effects */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 morph-blob bg-gradient-to-r from-sky-600/20 to-blue-600/20 blur-3xl animate-pulse-glow"></div>
            <div className="flex items-center justify-center gap-6 mb-8 relative">
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
                  alt="WordleMates"
                  className="w-24 h-24 md:w-32 md:h-32 logo-glow animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black gradient-text tracking-tight">
                WordleMates
              </h1>
            </div>
            
            {/* Premium word display */}
            <div className="flex justify-center gap-2 mb-8">
              <GameTile letter="W" status="correct" delay={0} />
              <GameTile letter="O" status="present" delay={1} />
              <GameTile letter="R" status="absent" delay={2} />
              <GameTile letter="D" status="correct" delay={3} />
              <GameTile letter="S" status="present" delay={4} />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the <span className="gradient-text font-semibold">ultimate word game</span> with friends.
            Challenge, compete, and conquer with stunning visuals and smooth gameplay.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-12 py-8 text-xl glass-button hover:scale-110 transition-all duration-500 relative group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      Enter the Game
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md glass border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl gradient-text">Welcome Back!</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-white text-lg">Email</Label>
                      <Input id="email" type="email" required className="glass border-white/20 text-white placeholder:text-gray-400 text-lg py-3" />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-white text-lg">Password</Label>
                      <Input id="password" type="password" required className="glass border-white/20 text-white placeholder:text-gray-400 text-lg py-3" />
                    </div>
                    <Button type="submit" className="w-full glass-button py-4 text-lg">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="px-12 py-8 text-xl glass border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-110">
                    <Crown className="w-6 h-6 mr-3" />
                    Join Premium
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md glass border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl gradient-text">Join WordleMates!</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                      <Label htmlFor="username" className="text-white text-lg">Username</Label>
                      <Input id="username" required className="glass border-white/20 text-white placeholder:text-gray-400 text-lg py-3" />
                    </div>
                    <div>
                      <Label htmlFor="signup-email" className="text-white text-lg">Email</Label>
                      <Input id="signup-email" type="email" required className="glass border-white/20 text-white placeholder:text-gray-400 text-lg py-3" />
                    </div>
                    <div>
                      <Label htmlFor="signup-password" className="text-white text-lg">Password</Label>
                      <Input id="signup-password" type="password" required className="glass border-white/20 text-white placeholder:text-gray-400 text-lg py-3" />
                    </div>
                    <Button type="submit" className="w-full glass-button py-4 text-lg">
                      Create Account
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Link to="/game">
                <Card className="glass-card hover:scale-110 transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <Gamepad2 className="w-12 h-12 text-sky-400 mx-auto mb-4 animate-float" />
                    <div className="text-white font-bold text-lg">Play</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/stats">
                <Card className="glass-card hover:scale-110 transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="w-12 h-12 text-sky-400 mx-auto mb-4 animate-float" />
                    <div className="text-white font-bold text-lg">Stats</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/leaderboard">
                <Card className="glass-card hover:scale-110 transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-float" />
                    <div className="text-white font-bold text-lg">Leaderboard</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/settings">
                <Card className="glass-card hover:scale-110 transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <Settings className="w-12 h-12 text-sky-400 mx-auto mb-4 animate-float" />
                    <div className="text-white font-bold text-lg">Settings</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/help">
                <Card className="glass-card hover:scale-110 transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="w-12 h-12 text-sky-400 mx-auto mb-4 animate-float" />
                    <div className="text-white font-bold text-lg">Help</div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          )}
        </div>

        {/* Scroll indicator with premium styling */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-16 glass border-2 border-sky-400/50 rounded-full flex justify-center animate-float">
            <div className="w-2 h-6 bg-gradient-to-b from-sky-400 to-blue-400 rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 px-6 relative" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black gradient-text mb-6">
              Premium Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes WordleMates the most advanced word game experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Gamepad2}
              title="Solo Mastery"
              description="Perfect your skills with unlimited practice modes, daily challenges, and progressive difficulty levels."
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Multiplayer Arena"
              description="Real-time battles with friends, tournament modes, and private rooms for exclusive competitions."
              delay={1}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Advanced Analytics"
              description="Detailed performance insights, streak tracking, and AI-powered improvement suggestions."
              delay={2}
            />
            <FeatureCard
              icon={Zap}
              title="Premium Experience"
              description="Stunning animations, custom themes, priority support, and exclusive game modes."
              delay={3}
            />
          </div>
        </div>
      </div>

      {/* Game Preview Section */}
      <div className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black gradient-text mb-8">
            See It In Action
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Six chances to find the perfect word. Green tiles mark perfect matches, 
            yellow shows correct letters in wrong positions.
          </p>

          <div className="glass-card p-12 rounded-3xl mb-12">
            <div className="grid gap-4 max-w-sm mx-auto">
              <div className="flex gap-3 justify-center">
                <GameTile letter="P" status="absent" delay={0} />
                <GameTile letter="L" status="present" delay={1} />
                <GameTile letter="A" status="correct" delay={2} />
                <GameTile letter="N" status="absent" delay={3} />
                <GameTile letter="T" status="absent" delay={4} />
              </div>
              <div className="flex gap-3 justify-center">
                <GameTile letter="S" status="absent" delay={0} />
                <GameTile letter="L" status="correct" delay={1} />
                <GameTile letter="A" status="correct" delay={2} />
                <GameTile letter="M" status="absent" delay={3} />
                <GameTile letter="P" status="absent" delay={4} />
              </div>
              <div className="flex gap-3 justify-center">
                <GameTile letter="B" status="correct" delay={0} />
                <GameTile letter="L" status="correct" delay={1} />
                <GameTile letter="A" status="correct" delay={2} />
                <GameTile letter="C" status="correct" delay={3} />
                <GameTile letter="K" status="correct" delay={4} />
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <Button 
              size="lg" 
              className="px-12 py-8 text-xl glass-button hover:scale-110 transition-all duration-500"
              onClick={() => setIsLoginOpen(true)}
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Start Your Journey
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 glass">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
              alt="WordleMates"
              className="w-12 h-12 logo-glow"
            />
            <h3 className="text-3xl font-bold gradient-text">WordleMates</h3>
          </div>
          <p className="text-gray-400 mb-6 text-lg">The ultimate premium word game experience</p>
          <div className="flex justify-center gap-8 text-gray-500">
            <span>© 2024 WordleMates</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
