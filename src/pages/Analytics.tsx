import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const mockData = {
  weeklyProgress: [
    { day: 'Mon', completed: 5, total: 7 },
    { day: 'Tue', completed: 6, total: 7 },
    { day: 'Wed', completed: 4, total: 7 },
    { day: 'Thu', completed: 7, total: 7 },
    { day: 'Fri', completed: 5, total: 7 },
    { day: 'Sat', completed: 3, total: 7 },
    { day: 'Sun', completed: 6, total: 7 },
  ],
  categoryDistribution: [
    { name: 'Fitness', value: 35 },
    { name: 'Learning', value: 25 },
    { name: 'Career', value: 20 },
    { name: 'Personal', value: 20 },
  ],
  monthlyTrend: [
    { month: 'Jan', completion: 75 },
    { month: 'Feb', completion: 82 },
    { month: 'Mar', completion: 88 },
  ],
};

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

function Analytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weekly Progress */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4F46E5" name="Completed Tasks" />
                <Bar dataKey="total" fill="#E5E7EB" name="Total Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Goals by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Completion Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  name="Completion Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-indigo-900 font-semibold">Average Completion</h3>
          <p className="text-3xl font-bold text-indigo-600">82%</p>
          <p className="text-indigo-700 text-sm">+5% from last month</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="text-green-900 font-semibold">Active Goals</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-green-700 text-sm">2 completed this week</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl">
          <h3 className="text-yellow-900 font-semibold">Streak</h3>
          <p className="text-3xl font-bold text-yellow-600">15 days</p>
          <p className="text-yellow-700 text-sm">Personal best: 21 days</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;