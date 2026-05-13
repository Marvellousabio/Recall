import Landing from './pages/Landing';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Upload from './pages/dashboard/Upload';
import Flashcards from './pages/dashboard/Flashcards';
import Tutor from './pages/dashboard/Tutor';
import Exam from './pages/dashboard/Exam';
import AnalyticsDashboard from './pages/dashboard/Analytics';
import Admin from './pages/Admin';
import AuthDebug from './pages/AuthDebug';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Landing',
    path: '/',
    element: <Landing />,
    public: true,
  },
  {
    name: 'Features',
    path: '/features',
    element: <Features />,
    public: true,
  },
  {
    name: 'Pricing',
    path: '/pricing',
    element: <Pricing />,
    public: true,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
    public: true,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />,
    public: true,
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <Blog />,
    public: true,
  },
  {
    name: 'Blog Post',
    path: '/blog/:slug',
    element: <BlogPost />,
    public: true,
  },
  {
    name: 'Sign In',
    path: '/signin',
    element: <SignIn />,
    public: true,
  },
  {
    name: 'Sign Up',
    path: '/signup',
    element: <SignUp />,
    public: true,
  },
  {
    name: 'Auth Debug',
    path: '/auth-debug',
    element: <AuthDebug />,
    public: true,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    public: false,
  },
  {
    name: 'Upload',
    path: '/dashboard/upload',
    element: <Upload />,
    public: false,
  },
  {
    name: 'Flashcards',
    path: '/dashboard/flashcards',
    element: <Flashcards />,
    public: false,
  },
  {
    name: 'AI Tutor',
    path: '/dashboard/tutor',
    element: <Tutor />,
    public: false,
  },
  {
    name: 'Exam',
    path: '/dashboard/exam',
    element: <Exam />,
    public: false,
  },
  {
    name: 'Analytics',
    path: '/dashboard/analytics',
    element: <AnalyticsDashboard />,
    public: false,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <Admin />,
    public: false,
  },
];
