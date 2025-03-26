import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-6">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-indigo-700">
          Welcome to <span className="text-blue-500">AspirationHub</span> 🎯
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with like-minded people who are striving to become the best
          version of themselves. Our mission is to <strong>motivate and inspire </strong> 
        through interaction, collaboration, and goal sharing.
        </p>
        <div className="space-y-6">
          <Link
            to="/connect"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all text-lg font-semibold"
          >
            Get Started
          </Link>

          {/* Explore Goals and Communities */}
          <div className="flex justify-center gap-6 mt-6">
            <Link
              to="/goals"
              className="flex items-center space-x-2 bg-white shadow-md px-5 py-3 rounded-lg hover:shadow-lg transition-all border border-gray-200"
            >
              <Target className="h-5 w-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">
                Explore Goals
              </span>
            </Link>
            <Link
              to="/communities"
              className="flex items-center space-x-2 bg-white shadow-md px-5 py-3 rounded-lg hover:shadow-lg transition-all border border-gray-200"
            >
              <Users className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                Join Communities
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Goal Overview Section */}
      <div className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Goal 🌱
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At <strong>AspirationHub </strong>, we believe that success thrives in a supportive
          community. Whether you're aiming to build healthy habits, master a new
          skill, or stay consistent with personal development, you'll find
          people who will <strong>motivate and encourage </strong> you at every step.
        </p>
      </div>

      {/* How It Works Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
          <Target className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Set Goals</h3>
          <p className="text-sm text-gray-600">
            Define your aspirations and track your progress with ease.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
          <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Join Communities</h3>
          <p className="text-sm text-gray-600">
            Connect with people who share your goals and stay accountable.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
          <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Share Insights</h3>
          <p className="text-sm text-gray-600">
            Discuss progress, seek advice, and celebrate milestones.
          </p>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="mt-16 text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">
          Ready to Start Your Journey?
        </h3>
        <p className="text-lg text-gray-600">
          Join a vibrant community and take the first step toward transforming
          your goals into reality.
        </p>
      </div>
    </div>
  );
};

export default Home;
