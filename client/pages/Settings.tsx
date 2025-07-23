import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Volume2, Zap, RotateCcw, LogOut } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useSettings } from "@/contexts/SettingsContext";

export default function Settings() {
  const [hardMode, setHardMode] = useState(false);
  const [confettiMode, setConfettiMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleResetStats = () => {
    if (confirm("Are you sure you want to reset all your statistics? This action cannot be undone.")) {
      // Reset stats logic would go here
      alert("Statistics reset successfully!");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      // Logout logic would go here
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Game Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-green-400" />
              Game Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Hard Mode</div>
                <div className="text-sm text-gray-400">
                  Any revealed hints must be used in subsequent guesses
                </div>
              </div>
              <Switch 
                checked={hardMode} 
                onCheckedChange={setHardMode}
                className="data-[state=checked]:bg-green-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Confetti Animation</div>
                <div className="text-sm text-gray-400">
                  Show celebration animation when you win
                </div>
              </div>
              <Switch 
                checked={confettiMode} 
                onCheckedChange={setConfettiMode}
                className="data-[state=checked]:bg-green-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Sound Effects</div>
                <div className="text-sm text-gray-400">
                  Play sounds for game interactions
                </div>
              </div>
              <Switch 
                checked={soundEffects} 
                onCheckedChange={setSoundEffects}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-green-400" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="font-medium text-white">Username</div>
              <div className="text-sm text-gray-400">player123</div>
            </div>
            
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <div className="font-medium text-white">Email</div>
              <div className="text-sm text-gray-400">player@example.com</div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gray-800/50 border-red-700 border-2">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="destructive" 
              onClick={handleResetStats}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Statistics
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>

        {/* Back to Game */}
        <div className="flex gap-4">
          <Link to="/game" className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Back to Game
            </Button>
          </Link>
          <Link to="/stats" className="flex-1">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
              View Stats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
