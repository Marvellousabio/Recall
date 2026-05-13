import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { useAuth } from '@/contexts/AuthContext';
import {
  Brain,
  Sparkles,
  Target,
  Clock,
  BarChart3,
  ArrowRight,
  Check,
  Calendar,
  Play
} from 'lucide-react';

export default function Landing() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      await signIn('demo@example.com', 'demo123');
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered RAG Learning',
      description: 'Advanced PDF ingestion with semantic chunking, vector embeddings, and intelligent context retrieval.',
      details: ['PDF ingestion', 'Semantic chunking', 'Vector embeddings', 'Context retrieval']
    },
    {
      icon: Target,
      title: 'Active Recall Engine',
      description: 'AI-generated questions and answers that reinforce memory through retrieval practice.',
      details: ['AI-generated Q&A', 'Retrieval practice', 'Memory reinforcement', 'Adaptive difficulty']
    },
    {
      icon: Sparkles,
      title: 'Feynman Mode',
      description: 'Simplify complex concepts with AI explanations designed for deep understanding.',
      details: ['Explain simply', 'Beginner toggle', 'Concept simplification', 'ELI5 mode']
    },
    {
      icon: Calendar,
      title: 'Spaced Repetition',
      description: 'SM-2 algorithm automatically schedules reviews for optimal long-term retention.',
      details: ['SM-2 algorithm', 'Dynamic scheduling', 'Review calendar', 'Optimal timing']
    },
    {
      icon: Clock,
      title: 'CBT Exam System',
      description: 'Timed assessments with difficulty weighting and anti-cheat monitoring.',
      details: ['Timed assessments', 'Difficulty weighting', 'Anti-cheat system', 'Real exam simulation']
    },
    {
      icon: BarChart3,
      title: 'AI Cognitive Analytics',
      description: 'Track retention, identify weak topics, and visualize your mastery journey.',
      details: ['Retention heatmaps', 'Focus metrics', 'Knowledge graph', 'Mastery scoring']
    }
  ];

  const stats = [
    { value: '70%', label: 'of learning forgotten traditionally' },
    { value: '90%', label: 'retention with retrieval practice' },
    { value: '40%', label: 'less study time required' },
    { value: 'AI', label: 'adaptive mastery engine' }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload PDFs / Notes',
      description: 'Drag and drop your study materials, textbooks, or lecture notes.'
    },
    {
      number: '02',
      title: 'AI Extracts Concepts',
      description: 'Our AI understands and semantically chunks your content.'
    },
    {
      number: '03',
      title: 'Generate Learning Content',
      description: 'AI creates flashcards, questions, summaries, and ELI5 explanations.'
    },
    {
      number: '04',
      title: 'Smart Scheduling',
      description: 'SM-2 algorithm schedules reviews automatically for optimal retention.'
    },
    {
      number: '05',
      title: 'Track Progress',
      description: 'Retention analytics optimize your learning journey.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Medical Student',
      content: 'Project Recall transformed how I study. The AI-generated flashcards and spaced repetition helped me ace my exams with 40% less study time.',
      avatar: 'SC'
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Engineer',
      content: 'The Feynman mode is incredible. It breaks down complex technical concepts into simple explanations that actually stick.',
      avatar: 'MJ'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Law Student',
      content: 'The CBT exam mode perfectly simulates real test conditions. My retention score went from 60% to 92% in just 3 months.',
      avatar: 'ER'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Cognitive Mastery Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-balance">
              Stop Forgetting What You Learn.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Project Recall transforms your notes, PDFs, and textbooks into an AI-powered cognitive mastery system using Active Recall and Spaced Repetition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning Smarter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={handleDemoLogin}
              >
                <Play className="mr-2 h-4 w-4" />
                Try Live Demo
              </Button>
              <a href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-16 max-w-5xl mx-auto">
            <Card className="glass cognitive-glow">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold font-metric text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Transform your study materials into an intelligent learning system in five simple steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start opacity-80 intersect:opacity-100 transition-all duration-700" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold font-metric text-primary">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Powered by neuroscience and AI to optimize your cognitive performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="h-full opacity-80 intersect:opacity-100 transition-all duration-700" style={{ transitionDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">
              Trusted by Students & Professionals
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Join thousands who have transformed their learning with Project Recall.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6 text-pretty">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <Card className="glass cognitive-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-balance">
                Ready to Master Your Learning?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Join Project Recall today and experience the future of cognitive mastery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleDemoLogin}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Try Live Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
