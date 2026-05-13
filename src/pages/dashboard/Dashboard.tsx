import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/db/prisma';
import type { Analytics, Flashcard } from '@/types/types';
import { Brain, BookOpen, TrendingUp, Flame, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [dueFlashcards, setDueFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

   const loadDashboardData = async () => {
     if (!user) return;

     const [analyticsData, flashcardsData] = await Promise.all([
       prisma.analytics.findUnique({
         where: { userId: user.id }
       }),
       prisma.flashcard.findMany({
         where: {
           userId: user.id,
           nextReview: {
             lte: new Date()
           }
         },
         orderBy: {
           nextReview: 'asc'
         },
         take: 10
       })
     ]);

     setAnalytics(analyticsData);
     setDueFlashcards(flashcardsData);
     setLoading(false);
   };

   if (loading) {
     return (
       <DashboardLayout>
         <div className="flex items-center justify-center h-full">
           <p className="text-muted-foreground">Loading dashboard...</p>
         </div>
       </DashboardLayout>
     );
   }

   const stats = [
    {
      icon: Brain,
      label: 'Retention Score',
      value: `${analytics?.retention_score || 0}%`,
      color: 'text-primary'
    },
    {
      icon: Target,
      label: 'Mastery Score',
      value: `${analytics?.mastery_score || 0}%`,
      color: 'text-chart-2'
    },
    {
      icon: Flame,
      label: 'Study Streak',
      value: `${analytics?.streak_days || 0} days`,
      color: 'text-chart-4'
    },
    {
      icon: BookOpen,
      label: 'Total Reviews',
      value: analytics?.total_reviews || 0,
      color: 'text-chart-3'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your learning progress today.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold font-metric mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Due for Review
              </CardTitle>
              <CardDescription>
                {dueFlashcards.length} flashcards need your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dueFlashcards.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No flashcards due for review!</p>
                  <p className="text-sm mt-2">Great job staying on top of your studies.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dueFlashcards.slice(0, 5).map((card) => (
                    <div key={card.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{card.question}</p>
                      </div>
                    </div>
                  ))}
                  <Link to="/dashboard/flashcards">
                    <Button className="w-full mt-4">Start Reviewing</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump into your learning workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/upload">
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  Upload Study Material
                </Button>
              </Link>
              <Link to="/dashboard/flashcards">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Review Flashcards
                </Button>
              </Link>
              <Link to="/dashboard/exam">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Take Practice Exam
                </Button>
              </Link>
              <Link to="/dashboard/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your study activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Retention Goal</span>
                  <span className="text-sm text-muted-foreground">{analytics?.retention_score || 0}%</span>
                </div>
                <Progress value={analytics?.retention_score || 0} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Mastery Goal</span>
                  <span className="text-sm text-muted-foreground">{analytics?.mastery_score || 0}%</span>
                </div>
                <Progress value={analytics?.mastery_score || 0} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
