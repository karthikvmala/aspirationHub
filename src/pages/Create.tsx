import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Image, Send } from 'lucide-react';

interface CreatePostForm {
  goalId: string;
  content: string;
  mediaUrls: string[];
}

interface CreateGoalForm {
  title: string;
  description: string;
  category: string;
}

function Create() {
  const navigate = useNavigate();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [postForm, setPostForm] = useState<CreatePostForm>({
    goalId: '',
    content: '',
    mediaUrls: [],
  });
  const [goalForm, setGoalForm] = useState<CreateGoalForm>({
    title: '',
    description: '',
    category: '',
  });
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const { data } = await supabase
      .from('goals')
      .select('id, title')
      .order('created_at', { ascending: false });
    
    if (data) setGoals(data);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .insert({
        goal_id: postForm.goalId,
        content: postForm.content,
        media_url: postForm.mediaUrls,
      });

    setLoading(false);
    if (!error) {
      navigate(`/connect/goals/${postForm.goalId}`);
    }
  };

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('goals')
      .insert({
        title: goalForm.title,
        description: goalForm.description,
        category: goalForm.category,
      });

    setLoading(false);
    if (!error) {
      navigate('/connect/goals');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create</h1>
        <button
          onClick={() => setIsCreatingGoal(!isCreatingGoal)}
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          {isCreatingGoal ? 'Create Post Instead' : 'Create Goal Instead'}
        </button>
      </div>

      {isCreatingGoal ? (
        <form onSubmit={handleCreateGoal} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Goal Title
            </label>
            <input
              type="text"
              value={goalForm.title}
              onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={goalForm.description}
              onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={goalForm.category}
              onChange={(e) => setGoalForm({ ...goalForm, category: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Fitness">Fitness</option>
              <option value="Learning">Learning</option>
              <option value="Career">Career</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Goal'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleCreatePost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Goal
            </label>
            <select
              value={postForm.goalId}
              onChange={(e) => setPostForm({ ...postForm, goalId: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            >
              <option value="">Select a goal</option>
              {goals.map((goal: any) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={postForm.content}
              onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media URLs
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="url"
                placeholder="Enter media URL"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const url = (e.target as HTMLInputElement).value;
                    if (url) {
                      setPostForm({
                        ...postForm,
                        mediaUrls: [...postForm.mediaUrls, url],
                      });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-indigo-600"
              >
                <Image className="h-5 w-5" />
              </button>
            </div>
            {postForm.mediaUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {postForm.mediaUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-gray-600 truncate max-w-xs">
                      {url}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPostForm({
                          ...postForm,
                          mediaUrls: postForm.mediaUrls.filter((_, i) => i !== index),
                        })
                      }
                      className="text-gray-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Create;