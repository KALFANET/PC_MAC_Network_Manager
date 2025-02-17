// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Monitor, Activity, Package, Users, Settings, Terminal, Bell, Menu } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import useSystemStore from './store';
import { Device } from './types';
import Dashboard from "./components/Dashboard";
import DevicesPage from './pages/DevicesPage';
import Performance from './pages/Performance';
import UsersPage from './pages/UsersPage';
import RemoteControl from './pages/RemoteControl';
import SettingsPage from './pages/Settings';

const App: React.FC = () => {
  const { device, updatedevice } = useSystemStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ devices: Device[] }>('/api/devices');
        updatedevice(response.data.devices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [updatedevice]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'software', label: 'Software', icon: Package },
    { id: 'remote', label: 'Remote Control', icon: Terminal },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Activity className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2">טוען...</span>
      </div>
    );
  }

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r flex flex-col transition-all duration-300`}>
          <div className="p-4 border-b flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <Layout className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">Network Manager</span>
              </div>
            ) : (
              <Layout className="h-6 w-6 text-blue-600 mx-auto" />
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(item => (
              <Link
                to={`/${item.id}`}
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b h-16">
            <div className="flex items-center justify-between px-6 h-full">
              <h1 className="text-xl font-semibold">
                {menuItems.find(item => item.id === currentPage)?.label}
              </h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              {device.length > 0 ? (
                <>
                  <Route path="/" element={<Dashboard devices={device} />} />
                  <Route path="/dashboard" element={<Dashboard devices={device} />} />
                  <Route path="/devices" element={<DevicesPage devices={device}></DevicesPage>} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/remote" element={<RemoteControl />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </>
              ) : (
                <Route 
                  path="*" 
                  element={
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">אין מכשירים זמינים</p>
                    </div>
                  } 
                />
              )}
            </Routes>
          </main>
        </div>
      </div>
  );
};

export default App;