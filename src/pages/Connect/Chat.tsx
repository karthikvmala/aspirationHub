import React, { useState } from 'react';

interface Message {
  id: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: string;
}

interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

const channels: Channel[] = [
  {
    id: '1',
    name: '🏋️ Fitness Tips',
    messages: [
      {
        id: 'm1',
        username: 'Alice',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Remember to stay hydrated after workouts! 💧',
        timestamp: '10:15 AM',
      },
      {
        id: 'm2',
        username: 'Bob',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Here’s my post-workout smoothie! 🥤',
        image: 'https://source.unsplash.com/400x300/?smoothie',
        timestamp: '10:20 AM',
      },
    ],
  },
  {
    id: '2',
    name: '📚 Learning Goals',
    messages: [
      {
        id: 'm3',
        username: 'Charlie',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: 'I’m tackling JavaScript today! Any tips? 🤔',
        timestamp: '11:00 AM',
      },
      {
        id: 'm4',
        username: 'Dana',
        avatar: 'https://i.pravatar.cc/150?img=4',
        content: 'Check out this visual guide I found! 🎨',
        image: 'https://source.unsplash.com/400x300/?coding',
        timestamp: '11:10 AM',
      },
    ],
  },
  {
    id: '3',
    name: '🎸 Music Practice',
    messages: [
      {
        id: 'm5',
        username: 'Eve',
        avatar: 'https://i.pravatar.cc/150?img=5',
        content: 'Just practiced this new piece on violin 🎻',
        image: 'https://source.unsplash.com/400x300/?violin',
        timestamp: '1:00 PM',
      },
      {
        id: 'm6',
        username: 'Frank',
        avatar: 'https://i.pravatar.cc/150?img=6',
        content: 'Any tips on improving vibrato? 🤔',
        timestamp: '1:10 PM',
      },
    ],
  },
];

const ChatPage: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">💬 Channels</h2>
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeChannel.id === channel.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {channel.name}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">{activeChannel.name}</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {activeChannel.messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-4">
              <img
                src={msg.avatar}
                alt={msg.username}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900">{msg.username}</h4>
                  <span className="text-sm text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-gray-700">{msg.content}</p>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="User upload"
                    className="rounded-lg shadow-md w-64 mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input (Optional for Future) */}
        <div className="bg-white border-t p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
