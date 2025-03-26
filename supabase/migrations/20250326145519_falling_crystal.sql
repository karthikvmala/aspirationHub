/*
  # Initial Schema for AspirationHub

  1. New Tables
    - users
      - Stores user profiles and authentication data
    - goals
      - Stores goal categories/aspirations
    - posts
      - Stores posts within goals
    - user_goals
      - Tracks user progress on goals
    - follows
      - Manages user following relationships
    - achievements
      - Stores user achievements
    - chats
      - Stores chat messages within goals
    - shorts
      - Stores short-form video content

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Goals/Aspirations table
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES goals(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  content text NOT NULL,
  media_url text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Goals progress
CREATE TABLE IF NOT EXISTS user_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  goal_id uuid REFERENCES goals(id),
  progress integer DEFAULT 0,
  target integer DEFAULT 100,
  start_date date DEFAULT CURRENT_DATE,
  target_date date,
  status text DEFAULT 'in_progress',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, goal_id)
);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES users(id),
  following_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  description text,
  badge_url text,
  achieved_at timestamptz DEFAULT now()
);

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES goals(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Shorts table
CREATE TABLE IF NOT EXISTS shorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  goal_id uuid REFERENCES goals(id),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE shorts ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Goals policies
CREATE POLICY "Goals are viewable by everyone"
  ON goals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create goals"
  ON goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User Goals policies
CREATE POLICY "User goals are viewable by everyone"
  ON user_goals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their goals"
  ON user_goals FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follow relationships are viewable by everyone"
  ON follows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their follows"
  ON follows FOR ALL
  TO authenticated
  USING (auth.uid() = follower_id);

-- Achievements policies
CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- Chats policies
CREATE POLICY "Chat messages are viewable by goal participants"
  ON chats FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_goals
    WHERE user_goals.goal_id = chats.goal_id
    AND user_goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can send chat messages"
  ON chats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Shorts policies
CREATE POLICY "Shorts are viewable by everyone"
  ON shorts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create shorts"
  ON shorts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);