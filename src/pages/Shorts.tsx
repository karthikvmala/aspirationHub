import React, { useState } from 'react';
import { PlayCircle, PauseCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface Short {
  id: string;
  title: string;
  url: string;
  category: string;
  thumbnailUrl: string;
  author: string;
  description: string;
}

const sampleShorts: Short[] = [
    {
        id: '1',
        title: 'Morning Yoga Routine',
        url: 'https://www.youtube.com/shorts/8ZcmTl_1ER8',
        category: 'Wellness',
        thumbnailUrl: 'https://articles-1mg.gumlet.io/articles/wp-content/uploads/2015/09/yoga3-2.jpg?compress=true&quality=80&w=640&dpr=2.6',
        author: 'Yoga Guru',
        description: 'Start your day with this refreshing morning yoga routine to boost energy and focus.'
    },
    {
        id: '2',
        title: 'JavaScript Tips & Tricks',
        url: 'https://www.youtube.com/shorts/3tmd-ClpJxA',
        category: 'Learning',
        thumbnailUrl: 'https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg',
        author: 'Code Master',
        description: 'Learn some quick JavaScript tips and tricks to improve your coding skills.'
    },
    {
        id: '3',
        title: 'Motivational Speech',
        url: 'https://www.youtube.com/shorts/2Vv-BfVoq4g',
        category: 'Inspiration',
        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgfbOt-qJ2B93fT3b0tiSw8llcqYC7l9Mg7A&s',
        author: 'Inspire Daily',
        description: 'A powerful motivational speech to help you achieve your goals and dreams.'
    }
];

const ShortsPlayer: React.FC = () => {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleNextShort = () => {
    setCurrentShortIndex((prevIndex) => 
      (prevIndex + 1) % sampleShorts.length
    );
    setIsPlaying(true);
  };

  const handlePreviousShort = () => {
    setCurrentShortIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : sampleShorts.length - 1
    );
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentShort = sampleShorts[currentShortIndex];

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 bg-black flex items-center justify-center"
        style={{
          backgroundImage: `url(${currentShort.thumbnailUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for video controls and information */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePreviousShort}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 rounded-full p-2"
          >
            <ChevronUp className="text-white h-8 w-8" />
          </button>
          <button 
            onClick={handleNextShort}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 rounded-full p-2"
          >
            <ChevronDown className="text-white h-8 w-8" />
          </button>

          {/* Video Controls */}
          <div 
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying ? (
              <PlayCircle className="text-white h-16 w-16 opacity-70" />
            ) : (
              <PauseCircle className="text-white h-16 w-16 opacity-70" />
            )}
          </div>

          {/* Short Details */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {currentShort.category}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">{currentShort.title}</h2>
            <p className="text-sm mb-2">By: {currentShort.author}</p>
            <p className="text-sm">{currentShort.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortsPlayer;