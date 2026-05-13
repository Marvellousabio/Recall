import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { prisma } from '@/db/prisma';
import type { ExamSession } from '@/types/types';
// Simple toast replacement

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Exam() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get('id');

  const [exam, setExam] = useState<ExamSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [tabSwitches, setTabSwitches] = useState(0);

  // Load exam data
  useEffect(() => {
    const loadExam = async () => {
      if (!examId || !user) {
        setLoading(false);
        return;
      }

      try {
        const examData = await prisma.examSession.findUnique({
          where: { id: examId }
        });

        if (examData && examData.user_id === user.id) {
          setExam(examData);
          setTimeLeft(examData.duration_seconds || 3600);
        }
      } catch (error) {
        console.error('Failed to load exam:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [examId, user]);

  const questions: Question[] = exam ? [
    {
      id: '1',
      question: `Question 1 for ${exam.title}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 0
    },
    {
      id: '2',
      question: `Question 2 for ${exam.title}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 1
    },
    {
      id: '3',
      question: `Question 3 for ${exam.title}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 2
    },
    {
      id: '4',
      question: `Question 4 for ${exam.title}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 3
    },
    {
      id: '5',
      question: `Question 5 for ${exam.title}`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 0
    }
  ] : [
    {
      id: '1',
      question: 'What is the primary benefit of Active Recall?',
      options: [
        'It makes studying faster',
        'It strengthens memory through retrieval practice',
        'It reduces the need for repetition',
        'It eliminates the need for understanding'
      ],
      correctAnswer: 1
    },
    {
      id: '2',
      question: 'What does the SM-2 algorithm optimize?',
      options: [
        'Study speed',
        'Content generation',
        'Review timing for retention',
        'Question difficulty'
      ],
      correctAnswer: 2
    }
  ];

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        console.warn('Tab switch detected! Please stay on this page during the exam.');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [started]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    console.log('Exam completed!');
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeLeft(3600);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading exam...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!exam && examId) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Exam not found</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!started) {
    return (
      <DashboardLayout>
        <div className="p-6 md:p-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">CBT Exam Mode</CardTitle>
                {exam && <CardDescription>{exam.title}</CardDescription>}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Exam Instructions:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>This exam contains {questions.length} questions</li>
                        <li>Time limit: {Math.floor((exam?.duration_seconds || 3600) / 60)} minutes</li>
                        <li>Tab switching will be monitored</li>
                        <li>You cannot go back to previous questions</li>
                        <li>Your progress will be saved automatically</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-2xl font-bold font-metric">{questions.length}</div>
                      <div className="text-sm text-muted-foreground">Questions</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-2xl font-bold font-metric">{Math.floor((exam?.duration_seconds || 3600) / 60)}</div>
                      <div className="text-sm text-muted-foreground">Minutes</div>
                    </div>
                  </div>
                </div>

                <Button onClick={handleStart} className="w-full" size="lg">
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-48 mt-2" />
            </div>
            <div className="flex items-center gap-2 text-lg font-metric">
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {tabSwitches > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              {tabSwitches} tab switch{tabSwitches > 1 ? 'es' : ''} detected
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="h-3 w-3 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Exam'}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
