import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Settings as SettingsIcon,
  Volume2,
  Zap,
  RotateCcw,
  LogOut,
  User,
  Crown,
  Shield,
  Palette,
  Bell,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useSettings } from "@/contexts/SettingsContext";

export default function Settings() {
  const { settings, updateSetting } = useSettings();

  const handleResetStats = () => {
    if (
      confirm(
        "Are you sure you want to reset all your statistics? This action cannot be undone.",
      )
    ) {
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

  const SettingCard = ({ icon: Icon, title, children, delay = 0 }) => (
    <Card
      className={`glass-card hover:scale-105 transition-all duration-500 animate-stagger-${delay + 1}`}
    >
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );

  const SettingItem = ({ title, description, children }) => (
    <div className="flex items-center justify-between p-4 glass rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex-1">
        <div className="font-medium text-white text-lg">{title}</div>
        <div className="text-sm text-gray-400 mt-1">{description}</div>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-black to-blue-900/20"></div>

      <Navigation />

      <div className="pt-24 p-6 max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black gradient-text mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Customize your WordleMates experience
          </p>
        </div>

        {/* Game Settings */}
        <SettingCard icon={SettingsIcon} title="Game Settings" delay={0}>
          <SettingItem
            title="Hard Mode"
            description="Any revealed hints must be used in subsequent guesses"
          >
            <Switch
              checked={settings.hardMode}
              onCheckedChange={(checked) => updateSetting("hardMode", checked)}
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>

          <SettingItem
            title="Dark Theme"
            description="Use dark theme for better visibility"
          >
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => updateSetting("darkMode", checked)}
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>

          <SettingItem
            title="High Contrast"
            description="Increase color contrast for accessibility"
          >
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) =>
                updateSetting("highContrast", checked)
              }
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>
        </SettingCard>

        {/* Audio & Visual Settings */}
        <SettingCard icon={Volume2} title="Audio & Visual" delay={1}>
          <SettingItem
            title="Sound Effects"
            description="Play audio feedback for game interactions"
          >
            <Switch
              checked={settings.soundEffects}
              onCheckedChange={(checked) =>
                updateSetting("soundEffects", checked)
              }
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>

          <SettingItem
            title="Confetti Animation"
            description="Celebrate victories with confetti"
          >
            <Switch
              checked={settings.confettiMode}
              onCheckedChange={(checked) =>
                updateSetting("confettiMode", checked)
              }
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>

          <SettingItem
            title="Animations"
            description="Enable smooth transitions and effects"
          >
            <Switch
              checked={settings.animations || true}
              onCheckedChange={(checked) =>
                updateSetting("animations", checked)
              }
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>
        </SettingCard>

        {/* Notifications */}
        <SettingCard icon={Bell} title="Notifications" delay={2}>
          <SettingItem
            title="Daily Reminders"
            description="Get reminded to play your daily game"
          >
            <Switch
              checked={false}
              onCheckedChange={(checked) => {}}
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>

          <SettingItem
            title="Achievement Alerts"
            description="Notify when you unlock new achievements"
          >
            <Switch
              checked={true}
              onCheckedChange={(checked) => {}}
              className="data-[state=checked]:bg-sky-600"
            />
          </SettingItem>
        </SettingCard>

        {/* Account Actions */}
        <SettingCard icon={User} title="Account" delay={3}>
          <div className="space-y-4">
            <div className="p-4 glass rounded-xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl relative">
                  P
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-xl">Player123</div>
                  <div className="text-gray-400">player@example.com</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">
                      Premium Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleResetStats}
              variant="outline"
              className="w-full glass border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 py-4"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              Reset Statistics
            </Button>

            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 py-4"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </div>
        </SettingCard>

        {/* Premium Features */}
        <Card className="glass-card border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                <Shield className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="font-medium text-white">
                    Ad-Free Experience
                  </div>
                  <div className="text-sm text-gray-400">
                    Enjoy uninterrupted gameplay
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                <Palette className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="font-medium text-white">Exclusive Themes</div>
                  <div className="text-sm text-gray-400">
                    Access premium visual themes
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Link to="/stats" className="flex-1">
            <Button
              variant="outline"
              className="w-full glass border-white/30 hover:bg-white/10 transition-all duration-300 py-4 hover:scale-105"
            >
              View Statistics
            </Button>
          </Link>
          <Link to="/game" className="flex-1">
            <Button className="w-full glass-button transition-all duration-300 py-4 hover:scale-105">
              Back to Game
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
