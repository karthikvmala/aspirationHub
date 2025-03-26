import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

interface Post {
  id: string;
  username: string;
  avatar: string;
  postImage: string;
  tip: string;
  question: string;
  category: string;
  likes: number;
}

const samplePosts: Post[] = [
  {
    id: '1',
    username: 'Alice',
    avatar: 'https://i.pravatar.cc/150?img=1',
    postImage: 'https://i.pinimg.com/236x/e5/24/d1/e524d1d14252daa2b81366a854a3f642.jpg',
    tip: 'Set a specific time each day for reading to build a consistent habit.',
    question: 'What time of day works best for you to read?',
    category: 'Advice',
    likes: 24,
  },
  {
    id: '2',
    username: 'Bob',
    avatar: 'https://i.pravatar.cc/150?img=2',
    postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEC2bdyCOdCLS8lqtQdvlf1XYR3K3MG4A1ow&s',
    tip: 'Join a book club to stay motivated and discover new genres.',
    question: 'What’s your favorite book club recommendation?',
    category: 'Question',
    likes: 36,
  },
  {
    id: '3',
    username: 'Charlie',
    avatar: 'https://i.pravatar.cc/150?img=3',
    postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNaei9bj-pWAdo0YJwJ9T_rdk1wm8dqhNZhO1IGyZPFKijkN3hgsfs5HyOXSkGrcRVD-zFDzEB6-9EBXS_XfRWg-_vLbDNcolWqeVPDiU',
    tip: 'Read at least 10 pages a day to maintain a reading habit.',
    question: 'How do you make time for reading daily?',
    category: 'Question',
    likes: 18,
  },
];

const GoalPage: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: number }>(
    samplePosts.reduce((acc, post) => {
      acc[post.id] = post.likes;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleLike = (postId: string) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + 1,
    }));
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">🔥 Content Page</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Post Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={post.postImage}
              alt={post.category}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{post.username}</h3>
                  <span className="text-sm text-gray-500">{post.category}</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-2">{post.tip}</p>

              <div className="flex items-center text-gray-600 text-sm">
                <MessageCircle className="h-4 w-4 mr-1 text-indigo-600" />
                <span>{post.question}</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-red-500 hover:text-red-600"
                >
                  <Heart className="h-5 w-5 mr-1" />
                  {likes[post.id]} Likes
                </button>
                <button
                  className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Discuss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalPage;
