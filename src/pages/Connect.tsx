import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Heart, Share2, BookOpen, Trophy, Users } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  participantCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Post {
  id: string;
  goalId: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Daily Meditation',
    description: 'Practice mindfulness meditation for 10 minutes every day to reduce stress and improve mental clarity.',
    category: 'Wellness',
    imageUrl: 'https://cdn.tinybuddha.com/wp-content/uploads/2016/01/Man-Meditating.jpg',
    participantCount: 245,
    difficulty: 'Easy'
  },
  {
    id: '2',
    title: '30-Day Coding Challenge',
    description: 'Complete one coding problem each day for 30 days to level up your programming skills.',
    category: 'Learning',
    imageUrl: 'https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8959914/og_image/optimized/0211_JavaScript-Coding-Challenge_Luke-Social-a70614b9438520ac86c4a5eab56b6ece.png',
    participantCount: 532,
    difficulty: 'Hard'
  },
  {
    id: '3',
    title: 'Read 12 Books This Year',
    description: 'Commit to reading at least one book every month and expand your knowledge horizons.',
    category: 'Personal Development',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D',
    participantCount: 412,
    difficulty: 'Medium'
  }
];

const samplePosts: Post[] = [
  {
    id: '101',
    goalId: '1',
    author: {
      name: 'Alice Johnson',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg'
    },
    content: 'Meditation has really helped me stay focused and calm throughout the day. Just completed my 30-day streak!',
    imageUrl: 'https://images.tpointtech.com/definition/images/focus-definition2.png',
    timestamp: '2023-03-01T10:00:00Z',
    likes: 42,
    comments: 7
  },
  {
    id: '102',
    goalId: '2',
    author: {
      name: 'Bob Rodriguez',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    content: 'Day 15 of the coding challenge, and I am learning complex algorithms and data structures. Feeling proud of my progress!',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuu-AC0U07ki6UIDGBWYazBmgCNxDRTG5zmw&s',
    timestamp: '2023-03-02T12:30:00Z',
    likes: 67,
    comments: 12
  },
  {
    id: '103',
    goalId: '3',
    author: {
      name: 'Charlie Wong',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlH235MMP2De5KzKxOx5FOtDtKEYeEQWfmNO_Po6UDmIRH-Y7JaRYH69RhIcjMLG3edNs&usqp=CAU'
    },
    content: 'Just finished my second book of the year - "Atomic Habits" by James Clear. Incredible insights on personal development!',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/0*4WPgySDfHBSQHsmD',
    timestamp: '2023-03-03T09:15:00Z',
    likes: 55,
    comments: 9
  }
];

const Connect: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">
            Trending Aspirations
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/explore"
              className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-md"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Goals
            </Link>
            <Link
              to="/challenges"
              className="flex items-center bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-md"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Join Challenge
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <img 
                src={goal.imageUrl} 
                alt={goal.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${goal.difficulty === 'Easy' ? 'bg-green-50 text-green-600' : 
                       goal.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600' : 
                       'bg-red-50 text-red-600'}`}>
                    {goal.difficulty}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{goal.participantCount}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {goal.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {goal.description}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/connect/posts?goal=${goal.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Posts
                    <FileText className="h-4 w-4 ml-2" />
                  </Link>
                  <Link
                    to={`/connect/chat?goal=${goal.id}`}
                    className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Join Chat
                    <MessageSquare className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Personalized Community Highlights</h2>
          
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt="Post visual" 
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center ${
                        likedPosts.includes(post.id) 
                          ? 'text-red-500' 
                          : 'text-gray-500'
                      } hover:text-red-600`}
                    >
                      <Heart 
                        className={`h-5 w-5 mr-1 ${
                          likedPosts.includes(post.id) 
                            ? 'fill-current' 
                            : ''
                        }`} 
                      />
                      {post.likes}
                    </button>
                    <button className="text-gray-500 hover:text-indigo-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-base mb-4">{post.content}</p>
                
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <Link
                    to={`/connect/post/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    {post.comments} Comments
                  </Link>
                  <Link
                    to={`/connect/goal/${post.goalId}`}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Post Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connect;