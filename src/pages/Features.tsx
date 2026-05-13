import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Target, Sparkles, Calendar, Clock, BarChart3, Upload, Cpu, MessageSquare, FileText, TrendingUp, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered RAG Learning',
      description: 'Advanced retrieval-augmented generation for intelligent content processing.',
      details: [
        'Semantic PDF ingestion with intelligent chunking',
        'Vector embeddings for context-aware retrieval',
        'Multi-document knowledge synthesis',
        'Automatic concept extraction and linking'
      ]
    },
    {
      icon: Target,
      title: 'Active Recall Engine',
      description: 'Scientifically proven method to strengthen memory through retrieval practice.',
      details: [
        'AI-generated questions from your materials',
        'Adaptive difficulty based on performance',
        'Multiple question formats (MCQ, short answer, essay)',
        'Instant feedback and explanations'
      ]
    },
    {
      icon: Sparkles,
      title: 'Feynman Mode',
      description: 'Learn by teaching. Simplify complex concepts for deep understanding.',
      details: [
        'ELI5 (Explain Like I\'m 5) explanations',
        'Progressive complexity levels',
        'Analogy generation for difficult concepts',
        'Visual concept mapping'
      ]
    },
    {
      icon: Calendar,
      title: 'Spaced Repetition',
      description: 'SM-2 algorithm optimizes review timing for maximum retention.',
      details: [
        'Personalized review schedules',
        'Dynamic interval adjustment',
        'Review calendar and reminders',
        'Optimal timing for long-term memory'
      ]
    },
    {
      icon: Clock,
      title: 'CBT Exam System',
      description: 'Computer-based testing with real exam conditions.',
      details: [
        'Timed assessments with countdown',
        'Difficulty-weighted question selection',
        'Anti-cheat monitoring and warnings',
        'Detailed performance analytics'
      ]
    },
    {
      icon: BarChart3,
      title: 'Cognitive Analytics',
      description: 'Track your learning journey with detailed insights.',
      details: [
        'Retention heatmaps and curves',
        'Knowledge mastery scoring',
        'Weak topic identification',
        'Study streak tracking'
      ]
    },
    {
      icon: Upload,
      title: 'Smart Upload',
      description: 'Drag and drop any study material for instant processing.',
      details: [
        'PDF, DOCX, TXT support',
        'OCR for scanned documents',
        'Batch upload capabilities',
        'Cloud storage integration'
      ]
    },
    {
      icon: MessageSquare,
      title: 'AI Tutor',
      description: 'Your personal AI assistant for any learning question.',
      details: [
        'Context-aware responses',
        'Step-by-step explanations',
        'Multi-turn conversations',
        'Source citation and references'
      ]
    },
    {
      icon: Cpu,
      title: 'Adaptive Learning',
      description: 'AI adapts to your learning style and pace.',
      details: [
        'Personalized content recommendations',
        'Dynamic difficulty adjustment',
        'Learning pattern recognition',
        'Optimal study session timing'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your improvement over time.',
      details: [
        'Daily, weekly, monthly reports',
        'Mastery level indicators',
        'Goal setting and tracking',
        'Achievement badges'
      ]
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Keyboard shortcuts and command palette for power users.',
      details: [
        'Global command palette (Cmd+K)',
        'Keyboard navigation',
        'Quick flashcard creation',
        'Instant search across all content'
      ]
    },
    {
      icon: FileText,
      title: 'Export & Share',
      description: 'Take your learning materials anywhere.',
      details: [
        'Export flashcards to Anki',
        'PDF study guides',
        'Share decks with friends',
        'Print-friendly formats'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
              Powerful Features for Cognitive Mastery
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to transform your learning and achieve long-term retention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
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

      <Footer />
    </div>
  );
}
