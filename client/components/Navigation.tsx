import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, User, GameController2, TrendingUp, Settings, HelpCircle, Trophy, LogOut } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/game", label: "Play", icon: GameController2 },
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
    <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
      {/* Left side - Menu and Logo */}
      <div className="flex items-center gap-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-800 border-gray-700 text-white w-80">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pt-4">
                <span className="text-2xl">🧩</span>
                <h2 className="text-xl font-bold gradient-text">WordleMates</h2>
              </div>
              
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              <div className="border-t border-gray-700 pt-4">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full justify-start text-red-400 hover:bg-red-600/20 hover:text-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold gradient-text">🧩 WordleMates</h1>
        </Link>
      </div>

      {/* Center - Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium transition-colors ${
              isActive(item.path)
                ? "text-green-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right side - Profile */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <User className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div>
                <div className="font-medium text-white">Player123</div>
                <div className="text-sm text-gray-400">player@example.com</div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Games Played:</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Win Rate:</span>
                <span className="text-green-400">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Streak:</span>
                <span className="text-green-400">5</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link to="/settings" className="flex-1" onClick={() => setIsProfileOpen(false)}>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                  Settings
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Log Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
