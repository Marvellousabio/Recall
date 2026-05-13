-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text,
  role public.user_role NOT NULL DEFAULT 'user'::public.user_role,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create study_materials table
CREATE TABLE public.study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create flashcards table
CREATE TABLE public.flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid REFERENCES public.study_materials(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  difficulty int DEFAULT 0,
  next_review timestamptz,
  interval_days int DEFAULT 1,
  ease_factor numeric DEFAULT 2.5,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create review_sessions table
CREATE TABLE public.review_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  flashcard_id uuid NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  rating int NOT NULL,
  reviewed_at timestamptz NOT NULL DEFAULT now()
);

-- Create exam_sessions table
CREATE TABLE public.exam_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  score numeric,
  total_questions int,
  duration_seconds int,
  completed_at timestamptz NOT NULL DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  retention_score numeric DEFAULT 0,
  mastery_score numeric DEFAULT 0,
  streak_days int DEFAULT 0,
  last_review timestamptz,
  total_reviews int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL,
  author text NOT NULL,
  cover_image text,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Storage policies for uploads bucket
CREATE POLICY "Users can upload files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view files" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'uploads');

-- Create function to handle new user registration
CREATE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    'user'::public.user_role
  );
  
  INSERT INTO public.analytics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create helper function to check roles
CREATE OR REPLACE FUNCTION has_role(uid uuid, role_name text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles p
    WHERE p.id = uid AND p.role = role_name::user_role
  );
$$;

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Create public_profiles view
CREATE VIEW public_profiles AS
  SELECT id, username, avatar_url, role FROM profiles;

-- RLS Policies for study_materials
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own materials" ON study_materials
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own materials" ON study_materials
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own materials" ON study_materials
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own materials" ON study_materials
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to materials" ON study_materials
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for flashcards
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own flashcards" ON flashcards
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own flashcards" ON flashcards
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own flashcards" ON flashcards
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcards" ON flashcards
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for review_sessions
ALTER TABLE public.review_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reviews" ON review_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reviews" ON review_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for exam_sessions
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own exams" ON exam_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exams" ON exam_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for analytics
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analytics" ON analytics
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" ON analytics
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for blog_posts (public read, admin write)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));