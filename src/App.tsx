import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Connect from './pages/Connect';
import Goals from './pages/Connect/Goals';
import Chat from './pages/Connect/Chat';
import Create from './pages/Create';
import Shorts from './pages/Shorts';
import GoalPage from './pages/GoalPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/connect/goals" element={<Goals />} />
            <Route path="/connect/chat" element={<Chat />} />
            <Route path="/connect/posts" element={<GoalPage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/shorts" element={<Shorts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App