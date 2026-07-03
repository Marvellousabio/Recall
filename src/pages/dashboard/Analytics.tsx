import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import type { Analytics } from '@/types/types';
import { TrendingUp, Target, Brain, Calendar } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    if (!user) return;

    try {
      const data = await api.getAnalytics(user.id);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const retentionData = [
    { day: 'Mon', retention: 65 },
    { day: 'Tue', retention: 72 },
    { day: 'Wed', retention: 78 },
    { day: 'Thu', retention: 75 },
    { day: 'Fri', retention: 82 },
    { day: 'Sat', retention: 85 },
    { day: 'Sun', retention: 88 }
  ];

  const reviewData = [
    { week: 'Week 1', reviews: 45 },
    { week: 'Week 2', reviews: 62 },
    { week: 'Week 3', reviews: 78 },
    { week: 'Week 4', reviews: 95 }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    {
      icon: Brain,
      label: 'Retention Score',
      value: `${analytics?.retention_score || 0}%`,
      change: '+12%',
      positive: true
    },
    {
      icon: Target,
      label: 'Mastery Score',
      value: `${analytics?.mastery_score || 0}%`,
      change: '+8%',
      positive: true
    },
    {
      icon: Calendar,
      label: 'Study Streak',
      value: `${analytics?.streak_days || 0} days`,
      change: 'Current',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Total Reviews',
      value: analytics?.total_reviews || 0,
      change: '+24',
      positive: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and cognitive performance.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className={`text-sm font-medium ${stat.positive ? 'text-chart-2' : 'text-destructive'}`}>
                      {stat.change}
                    </span>
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
              <CardTitle>Memory Retention Curve</CardTitle>
              <CardDescription>Your retention rate over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-primary rounded" style={{ width: `${day.retention}%` }}></div>
                      <span className="text-sm font-medium">{day.retention}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Consistency</CardTitle>
              <CardDescription>Number of reviews completed per week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewData.map((week, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{week.week}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-primary rounded" style={{ width: `${week.reviews}px` }}></div>
                      <span className="text-sm font-medium">{week.reviews}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge Mastery Map</CardTitle>
            <CardDescription>Your performance across different topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { topic: 'Active Recall', mastery: 85, color: 'bg-chart-1' },
                { topic: 'Spaced Repetition', mastery: 72, color: 'bg-chart-2' },
                { topic: 'Cognitive Science', mastery: 68, color: 'bg-chart-3' },
                { topic: 'Memory Techniques', mastery: 90, color: 'bg-chart-4' },
                { topic: 'Study Strategies', mastery: 78, color: 'bg-chart-5' },
                { topic: 'Learning Theory', mastery: 65, color: 'bg-chart-1' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.topic}</span>
                    <span className="text-sm text-muted-foreground">{item.mastery}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
