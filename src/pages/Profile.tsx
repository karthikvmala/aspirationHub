import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Users } from 'lucide-react';

const mockData = {
  progressData: [
    { date: '2024-01', progress: 65 },
    { date: '2024-02', progress: 78 },
    { date: '2024-03', progress: 85 },
  ],
  achievements: [
    { id: 1, title: '30 Day Streak', date: '2024-03-15' },
    { id: 2, title: 'First Goal Completed', date: '2024-02-28' },
  ],
  goals: [
    { id: 1, title: 'Learn Spanish', progress: 75 },
    { id: 2, title: 'Read 24 Books in 2024', progress: 45 },
    { id: 3, title: 'Exercise 3x per week', progress: 90 },
  ],
};

function Profile() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
          <p className="text-gray-600">Aspiring polyglot & lifelong learner</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="flex items-center text-sm text-gray-500">
              <Target className="h-4 w-4 mr-1" />
              12 Goals
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              245 Followers
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Trophy className="h-4 w-4 mr-1" />
              8 Achievements
            </span>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Goals</h2>
        <div className="space-y-4">
          {mockData.goals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{goal.title}</span>
                <span className="text-sm text-gray-500">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <div className="space-y-4">
          {mockData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-500">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;