import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, User, Gamepad2, TrendingUp, Settings, HelpCircle, Trophy, LogOut, Home, Crown, Zap } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/game", label: "Play", icon: Gamepad2 },
    { path: "/stats", label: "Statistics", icon: TrendingUp },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/settings", label: "Settings", icon: Settings },
    { path: "/help", label: "Help", icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      {/* Left side - Menu and Logo */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 glass-button transition-all duration-300 hover:scale-110">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass border-white/20 text-white w-80 backdrop-blur-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8 pt-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
                    alt="WordleMates"
                    className="w-10 h-10 logo-glow animate-rotate-3d"
                  />
                  <h2 className="text-2xl font-bold gradient-text">WordleMates</h2>
                </div>
                
                <nav className="flex-1 space-y-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 group animate-stagger-${index + 1} ${
                          isActive(item.path)
                            ? "glass-button border-purple-400/50 text-white shadow-lg shadow-purple-500/20"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className={`w-6 h-6 transition-all duration-300 ${isActive(item.path) ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="border-t border-white/20 pt-6 mt-6">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full justify-start text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 hover:scale-105 px-6 py-4 rounded-xl"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium">Log Out</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
              alt="WordleMates"
              className="w-10 h-10 logo-glow animate-rotate-3d"
            />
            <h1 className="text-2xl font-bold gradient-text">WordleMates</h1>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 relative z-10">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-medium transition-all duration-300 hover:scale-110 px-4 py-2 rounded-lg relative group ${
                isActive(item.path)
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${
                isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Right side - Profile */}
        <div className="relative z-10">
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 glass-button transition-all duration-300 hover:scale-110">
                <User className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass border-white/20 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl gradient-text flex items-center gap-2">
                  <Crown className="w-6 h-6" />
                  Premium Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 glass-card rounded-xl border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl relative">
                    P
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Player123</div>
                    <div className="text-gray-400">player@example.com</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Premium Member</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="glass-card p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Games Played:</span>
                      <span className="text-white font-bold text-lg">24</span>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Win Rate:</span>
                      <span className="text-emerald-400 font-bold text-lg">87%</span>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Streak:</span>
                      <span className="text-purple-400 font-bold text-lg">5 🔥</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to="/settings" className="flex-1" onClick={() => setIsProfileOpen(false)}>
                    <Button variant="ghost" className="w-full glass-button transition-all duration-300 hover:scale-105">
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex-1 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105"
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
