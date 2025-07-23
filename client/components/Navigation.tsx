import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, User, Gamepad2, TrendingUp, Settings, HelpCircle, Trophy, LogOut, Home } from "lucide-react";

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
    <header className="flex items-center justify-between p-4 border-b border-border bg-background">
      {/* Left side - Menu and Logo */}
      <div className="flex items-center gap-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent transition-all duration-200 hover:scale-105">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background border-border text-foreground w-80">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pt-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
                  alt="WordleMates"
                  className="w-8 h-8"
                />
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                        isActive(item.path)
                          ? "bg-wordle-green text-white"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
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
        
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-200">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fda94b5400eec417db21cb7a4e8a60aa1%2Fe6699201d16d4c7f8c018fadb85ed265?format=webp&width=800"
            alt="WordleMates"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold gradient-text">WordleMates</h1>
        </Link>
      </div>

      {/* Center - Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 relative z-10">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium transition-all duration-200 hover:scale-105 px-3 py-2 rounded ${
              isActive(item.path)
                ? "text-wordle-green"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right side - Profile */}
      <div className="relative z-10">
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent transition-all duration-200 hover:scale-105">
              <User className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-background border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Profile</DialogTitle>
            </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-wordle-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <div>
                <div className="font-medium text-foreground">Player123</div>
                <div className="text-sm text-muted-foreground">player@example.com</div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Games Played:</span>
                <span className="text-foreground">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Win Rate:</span>
                <span className="text-wordle-green">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Streak:</span>
                <span className="text-wordle-green">5</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link to="/settings" className="flex-1" onClick={() => setIsProfileOpen(false)}>
                <Button variant="outline" className="w-full border-border text-foreground transition-all duration-200">
                  Settings
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 transition-all duration-200"
              >
                Log Out
              </Button>
            </div>
          </div>
        </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
