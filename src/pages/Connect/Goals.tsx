import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  _count: {
    posts: number;
    participants: number;
  }
}

function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const { data, error } = await supabase
          .from('goals')
          .select(`
            *,
            posts(count),
            user_goals(count)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const goalsWithCounts = data.map(goal => ({
          ...goal,
          _count: {
            posts: goal.posts[0].count,
            participants: goal.user_goals[0].count
          }
        }));

        setGoals(goalsWithCounts);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Explore Goals</h1>
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create New Goal
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                  {goal.category}
                </span>
                <Link
                  to={`/connect/chat?goal=${goal.id}`}
                  className="text-gray-400 hover:text-indigo-600"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {goal.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {goal.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {goal._count.posts}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {goal._count.participants}
                  </span>
                </div>
                <Link
                  to={`/connect/goals/${goal.id}`}
                  className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;